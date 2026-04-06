import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing GOOGLE_API_KEY' }, { status: 500 });
  }

  // NOTE: Providing the API key directly to the client is necessary to establish
  // the client-side WebSocket connection directly to Google's Live API.
  // In a truly production-secure environment, you would use a proxy WebSocket server,
  // but for pure Gemini Live integration directly from the browser, the token/key is required.
  return NextResponse.json({ token: apiKey });
}
