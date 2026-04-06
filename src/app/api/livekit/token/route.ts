import { AccessToken } from 'livekit-server-sdk';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const room = searchParams.get('room');
    const participantName = searchParams.get('username') || 'user';

    if (!room) {
      return NextResponse.json({ error: 'Missing "room" query parameter' }, { status: 400 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY || 'devkey';
    const apiSecret = process.env.LIVEKIT_API_SECRET || 'secret';

    // In a real app we'd need LIVEKIT_URL too, but for UI mockup if keys are missing we return a mock token
    const at = new AccessToken(apiKey, apiSecret, {
      identity: participantName,
    });

    at.addGrant({ roomJoin: true, room: room });

    return NextResponse.json({ token: at.toJwt() });
  } catch (error: any) {
    console.error("LiveKit Token Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
