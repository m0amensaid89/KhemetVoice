#!/bin/bash
set -e

# 1. Monorepo restructure
mkdir -p apps/web packages/db apps/agent-worker
mv src apps/web/src || true
mv public apps/web/public || true
mv eslint.config.mjs next.config.ts postcss.config.mjs tsconfig.json apps/web/ || true
mv package.json apps/web/ || true
mv package-lock.json apps/web/ || true

# 2. Package JSONs
cat << 'INNER_EOF' > package.json
{
  "name": "khemet-voice-monorepo",
  "version": "0.1.0",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:web": "npm run dev -w apps/web",
    "dev:worker": "npm run dev -w apps/agent-worker",
    "build:web": "npm run build -w apps/web",
    "lint:web": "npm run lint -w apps/web"
  }
}
INNER_EOF

cat << 'INNER_EOF' > packages/db/package.json
{
  "name": "@khemet/db",
  "version": "0.1.0",
  "private": true,
  "main": "index.js",
  "scripts": {
    "db:push": "prisma db push",
    "db:generate": "prisma generate"
  },
  "dependencies": {
    "@prisma/client": "^5.20.0"
  },
  "devDependencies": {
    "prisma": "^5.20.0"
  }
}
INNER_EOF

cat << 'INNER_EOF' > apps/agent-worker/package.json
{
  "name": "@khemet/agent-worker",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc"
  },
  "dependencies": {
    "@livekit/agents": "^0.4.6",
    "@livekit/agents-plugin-deepgram": "^0.4.3",
    "@livekit/agents-plugin-openai": "^0.4.3",
    "@livekit/components-react": "^2.6.5",
    "livekit-server-sdk": "^2.3.0",
    "dotenv": "^16.4.5",
    "@khemet/db": "*",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "typescript": "^5.6.3",
    "ts-node": "^10.9.2",
    "@types/node": "^22.7.5"
  }
}
INNER_EOF

sed -i 's/"dependencies": {/"dependencies": {\n    "@khemet\/db": "*",\n    "livekit-server-sdk": "^2.3.0",\n    "@livekit\/components-react": "^2.6.5",\n    "livekit-client": "^2.5.0",/g' apps/web/package.json

# 3. Prisma Schema
mkdir -p packages/db/prisma
cat << 'INNER_EOF' > packages/db/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Agent {
  id          String    @id @default(uuid())
  name        String
  description String?
  prompt      String?
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt
  sessions    Session[]
}

model Session {
  id        String        @id @default(uuid())
  agentId   String
  agent     Agent         @relation(fields: [agentId], references: [id])
  status    String        @default("active")
  summary   String?
  duration  Int?          // Session duration in seconds
  createdAt DateTime      @default(now())
  updatedAt DateTime      @updatedAt
  turns     SessionTurn[]
  leads     Lead[]
}

model SessionTurn {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  role      String
  content   String
  createdAt DateTime @default(now())
}

model Lead {
  id        String   @id @default(uuid())
  sessionId String
  session   Session  @relation(fields: [sessionId], references: [id])
  name      String?
  company   String?
  email     String?
  phone     String?
  intent    String?
  language  String?  // The detected language/dialect
  status    String   @default("New") // New, Contacted, Qualified
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
INNER_EOF

cat << 'INNER_EOF' > packages/db/.env
DATABASE_URL="postgresql://khemet:password@localhost:5432/khemet_voice?schema=public"
INNER_EOF

cat << 'INNER_EOF' > packages/db/index.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
module.exports = prisma;
INNER_EOF

cat << 'INNER_EOF' > packages/db/index.d.ts
import { PrismaClient } from '@prisma/client';
declare const prisma: PrismaClient;
export default prisma;
INNER_EOF

# 4. Agent Worker Source
mkdir -p apps/agent-worker/src
cat << 'INNER_EOF' > apps/agent-worker/src/index.ts
import { WorkerOptions, cli, defineAgent, llm } from '@livekit/agents';
import { pipeline } from '@livekit/agents';
import * as dotenv from 'dotenv';
import path from 'path';
import db from '@khemet/db';
import { DeepgramSTT } from '@livekit/agents-plugin-deepgram';
import { OpenAI } from '@livekit/agents-plugin-openai';
import { z } from 'zod';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

export default defineAgent({
  entry: async (ctx) => {
    await ctx.connect();
    const participant = await ctx.waitForParticipant();

    let sessionId = 'default';
    if (ctx.room && ctx.room.name) {
       sessionId = ctx.room.name.replace('room-', '');
    }
    const sessionStartTime = Date.now();

    let agentPrompt = `You are Nour, an intelligent voice agent for Khemet Voice.
You speak naturally and professionally.
You automatically detect and respond in the same language the user speaks.
If the user speaks Arabic, respond in their specific dialect (Egyptian, Gulf, Levantine etc).
If the user speaks English, respond in clear professional English.

Your goal is to qualify the lead by naturally collecting:
- Full name
- Company name
- Email address
- Phone number
- Their main challenge or what they are looking for

Rules:
- Never ask for all information at once
- Ask one question at a time naturally within the conversation
- Be warm, human, and conversational — never robotic
- Once you have all 5 data points, confirm them back to the user and thank them
- Keep responses short — this is a voice conversation, not a chat
- MUST use the capture_lead tool once all the information is collected to save the data.`;

    const model = new OpenAI({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      model: 'openai/gpt-4o-mini',
    });

    const stt = new DeepgramSTT({ apiKey: process.env.DEEPGRAM_API_KEY });
    const tts = new OpenAI({ model: 'tts-1', apiKey: process.env.OPENAI_API_KEY || 'dummy' }).tts;

    const agent = new pipeline.VoicePipelineAgent(
      model,
      tts,
      { stt: stt, systemPrompt: agentPrompt }
    );

    if (ctx.room) {
       agent.start(ctx.room, participant);
    }

    agent.on('agent_speech_committed', async (msg: any) => {
      try {
        await db.sessionTurn.create({ data: { sessionId, role: 'agent', content: msg.text || '' } });
      } catch(e) {}
    });

    agent.on('user_speech_committed', async (msg: any) => {
      try {
        await db.sessionTurn.create({ data: { sessionId, role: 'user', content: msg.text || '' } });
      } catch(e) {}
    });

    // Setup disconnect handler to save duration
    if (ctx.room) {
        ctx.room.on('disconnected', async () => {
            const duration = Math.floor((Date.now() - sessionStartTime) / 1000);
            try {
                await db.session.update({
                    where: { id: sessionId },
                    data: { duration, status: 'completed' }
                });
            } catch (e) {
                console.error("Failed to update session duration", e);
            }
        });
    }

    await agent.say('أهلاً وسهلاً — I am Nour from Khemet Voice. How can I help you today?', true);
  },
});

cli.runApp(new WorkerOptions({ agent: __filename }));
INNER_EOF

cat << 'INNER_EOF' > apps/agent-worker/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"]
}
INNER_EOF

# 5. Web API
mkdir -p apps/web/src/app/api/session/create
cat << 'INNER_EOF' > apps/web/src/app/api/session/create/route.ts
import { NextResponse } from 'next/server';
import db from '@khemet/db';

export async function POST(request: Request) {
  try {
    const { agentId } = await request.json();
    let agent = await db.agent.findUnique({ where: { id: agentId } });
    if (!agent) {
       agent = await db.agent.create({
         data: {
           id: agentId || undefined,
           name: "Nour (Default V1)",
         }
       });
    }

    const session = await db.session.create({ data: { agentId: agent.id, status: "active" } });
    return NextResponse.json({ sessionId: session.id, agentId: agent.id });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create session" }, { status: 500 });
  }
}
INNER_EOF

mkdir -p apps/web/src/app/api/session/token
cat << 'INNER_EOF' > apps/web/src/app/api/session/token/route.ts
import { NextResponse } from 'next/server';
import { AccessToken } from 'livekit-server-sdk';

export async function POST(request: Request) {
  try {
    const { sessionId, participantName = "User" } = await request.json();
    const roomName = `room-${sessionId}`;
    const participantIdentity = `user-${Math.random().toString(36).substring(7)}`;

    const at = new AccessToken(
      process.env.LIVEKIT_API_KEY || 'devkey',
      process.env.LIVEKIT_API_SECRET || 'secret',
      { identity: participantIdentity, name: participantName }
    );
    at.addGrant({ roomJoin: true, room: roomName, canPublish: true, canSubscribe: true });

    return NextResponse.json({ token: await at.toJwt(), roomName });
  } catch (error) {
    return NextResponse.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
INNER_EOF

mkdir -p apps/web/src/app/api/dashboard/data
cat << 'INNER_EOF' > apps/web/src/app/api/dashboard/data/route.ts
import { NextResponse } from 'next/server';
import db from '@khemet/db';

export async function GET() {
  try {
    const sessions = await db.session.findMany({
      orderBy: { createdAt: 'desc' },
      include: { leads: true },
      take: 20
    });
    return NextResponse.json({ sessions });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
INNER_EOF

# 6. Widget UI
mkdir -p apps/web/src/app/widget
cat << 'INNER_EOF' > apps/web/src/app/widget/page.tsx
'use client';

import { useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer, useVoiceAssistant } from '@livekit/components-react';

export default function Widget() {
  const [token, setToken] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const startSession = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/session/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agentId: 'default' }),
      });
      const data = await res.json();

      const tokenRes = await fetch('/api/session/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: data.sessionId }),
      });
      const tokenData = await tokenRes.json();

      setSessionId(data.sessionId);
      setToken(tokenData.token);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-8 text-[#cbaa4d]">Khemet Voice Widget</h1>

      {!token ? (
        <button
          onClick={startSession}
          disabled={loading}
          className="bg-[#cbaa4d] text-black px-6 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Connecting...' : 'Start Voice Session'}
        </button>
      ) : (
        <div className="w-full max-w-md border border-[#cbaa4d]/20 rounded-xl p-6 flex flex-col items-center">
          <p className="text-sm text-gray-400 mb-4">Session ID: {sessionId}</p>
          <LiveKitRoom
            serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || 'ws://localhost:7880'}
            token={token}
            connect={true}
            audio={true}
            className="flex flex-col items-center"
          >
            <RoomAudioRenderer />
            <VoiceAssistantControl />
          </LiveKitRoom>
        </div>
      )}
    </div>
  );
}

function VoiceAssistantControl() {
  const { state } = useVoiceAssistant();
  return (
    <div className="flex flex-col items-center mt-4">
      <p className="mt-4 text-[#cbaa4d] font-medium capitalize">{state}</p>
    </div>
  );
}
INNER_EOF

# 7. Env files
cat << 'INNER_EOF' > .env.local.example
LIVEKIT_API_KEY=
LIVEKIT_API_SECRET=
LIVEKIT_URL=
DEEPGRAM_API_KEY=
OPENROUTER_API_KEY=
DATABASE_URL="postgresql://khemet:password@localhost:5432/khemet_voice?schema=public"
GEMINI_API_KEY=
INNER_EOF

cp .env.local.example .env.local

# 8. Setup DB
sudo apt-get update && sudo apt-get install -y postgresql postgresql-contrib || true
sudo systemctl start postgresql || true
sudo -u postgres psql -c "CREATE USER khemet WITH PASSWORD 'password';" || true
sudo -u postgres psql -c "CREATE DATABASE khemet_voice;" || true
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE khemet_voice TO khemet;" || true
sudo -u postgres psql -c "ALTER DATABASE khemet_voice OWNER TO khemet;" || true

echo "Setup done"
