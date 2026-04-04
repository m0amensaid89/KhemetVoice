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
