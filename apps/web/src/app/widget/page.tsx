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
