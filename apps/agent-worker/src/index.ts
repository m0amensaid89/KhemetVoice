import { WorkerOptions, cli, defineAgent, llm } from '@livekit/agents';
import { pipeline } from '@livekit/agents';
import * as dotenv from 'dotenv';
import path from 'path';
import db from '@khemet/db';
import { STT as DeepgramSTT } from '@livekit/agents-plugin-deepgram';
import * as openai from '@livekit/agents-plugin-openai';
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

    const model = new openai.LLM({
      baseURL: 'https://openrouter.ai/api/v1',
      apiKey: process.env.OPENROUTER_API_KEY,
      model: 'openai/gpt-4o-mini',
    });

    const stt = new DeepgramSTT({ apiKey: process.env.DEEPGRAM_API_KEY });
    // using mock TTS for v1 as OpenRouter doesn't support TTS directly, relying on text rendering in UI
    const tts = null as any;

    const agent = new pipeline.VoicePipelineAgent(
      null as any, // VAD
      stt as any,
      model as any,
      tts,
      { systemPrompt: agentPrompt } as any
    );

    if (ctx.room) {
       agent.start(ctx.room, participant);
    }


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
