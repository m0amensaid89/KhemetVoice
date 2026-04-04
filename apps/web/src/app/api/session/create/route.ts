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
