"use client";

import { useState } from "react";
import { Loader2, Mic, MicOff, PhoneOff } from "lucide-react";
import {
  LiveKitRoom,
  RoomAudioRenderer,
  BarVisualizer,
  useVoiceAssistant,
  useLocalParticipant,
  VoiceAssistantControlBar
} from "@livekit/components-react";
import { VOICE_DATA } from "@/data/voiceData";
import "@livekit/components-styles";
import type { VisualizerState } from "./VoiceVisualizer";
import { useEffect } from "react";

interface LiveVoiceAgentsProps {
  activeIndex: number;
  setVizState?: (state: VisualizerState) => void;
}

export function LiveVoiceAgents({ activeIndex, setVizState }: LiveVoiceAgentsProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const selectedVoice = VOICE_DATA[activeIndex];

  const handleStartSession = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log("✅ Mic permission granted - Live session started");

      if (!process.env.NEXT_PUBLIC_LIVEKIT_URL) {
        alert("Sovereign Live Voice integration is currently unavailable. Please try again later.");
        return;
      }

      setIsConnecting(true);
      const roomName = `room-${selectedVoice.name}-${Math.random().toString(36).substring(7)}`;
      const res = await fetch(`/api/livekit/token?room=${roomName}&username=user`);

      if (!res.ok) {
          throw new Error("Failed to get token");
      }

      const data = await res.json();

      if (data.token) {
        setToken(data.token);
        setIsConnected(true);
      } else {
        throw new Error(data.error || "Failed to get token");
      }
    } catch (err) {
      console.error("Live Agent error:", err);
      alert("Microphone permission denied or Sovereign Live Voice integration in progress.");
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setToken(null);
  };

  return (
    <section className="w-full py-16 px-6 relative flex flex-col items-center border-t border-white/5">
      <div className="max-w-4xl w-full flex flex-col items-center gap-8">

        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-2">Live Voice Agents</h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Experience our ultra-low latency conversational AI.
            Speak directly with {selectedVoice?.name} in real-time.
          </p>
        </div>

        {!isConnected ? (
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center p-4 bg-black/40"
              style={{ borderColor: selectedVoice?.cardColor }}
            >
              <img
                src={selectedVoice?.imageUrl}
                alt={selectedVoice?.name}
                className="w-full h-full object-contain brightness-0 invert opacity-80"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif text-white">{selectedVoice?.name}</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Ready for call</p>
            </div>

            <button
              onClick={handleStartSession}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {isConnecting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> CONNECTING...</>
              ) : (
                <><Mic className="w-5 h-5" /> START LIVE SESSION</>
              )}
            </button>
          </div>
        ) : (
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl">
            <LiveKitRoom
              token={token!}
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL || "wss://mock.livekit.cloud"}
              connect={true}
              audio={true}
              video={false}
              onDisconnected={handleDisconnect}
              className="w-full"
            >
              <RoomAudioRenderer />
              <ActiveSessionUI selectedVoice={selectedVoice} setVizState={setVizState} />
            </LiveKitRoom>
          </div>
        )}
      </div>
    </section>
  );
}

function ActiveSessionUI({ selectedVoice, setVizState }: { selectedVoice: any, setVizState?: (state: VisualizerState) => void }) {
  const { state, audioTrack } = useVoiceAssistant();
  const { localParticipant } = useLocalParticipant();

  useEffect(() => {
    if (setVizState) {
      if (state === "speaking") {
        setVizState("playing");
      } else if (state === "listening") {
        setVizState("generating");
      } else {
        setVizState("idle");
      }
    }
  }, [state, setVizState]);

  return (
    <div className="flex flex-col h-[500px] w-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-black/40 border border-white/20"
            style={{ backgroundColor: `${selectedVoice?.cardColor}30` }}
          >
            <img
              src={selectedVoice?.imageUrl}
              alt={selectedVoice?.name}
              className="w-full h-full object-contain brightness-0 invert"
            />
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">{selectedVoice?.name}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${state === 'listening' || state === 'speaking' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${state === 'listening' || state === 'speaking' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
              </span>
              <span className="text-zinc-400 capitalize">{state || 'connecting...'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main visualizer area */}
      <div className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-b from-transparent to-black/40 p-8">
         <div className="h-32 w-full max-w-md flex items-center justify-center">
            {audioTrack ? (
              <BarVisualizer
                state={state}
                barCount={7}
                trackRef={audioTrack}
                className="h-full w-full opacity-80"
                style={{ '--lk-va-bar-width': '12px', color: selectedVoice?.cardColor || '#D4AF37' } as any}
              />
            ) : (
              <div className="text-zinc-600 text-sm animate-pulse">Waiting for agent audio...</div>
            )}
         </div>
      </div>

      {/* Transcript / Subtitles area */}
      <div className="h-32 border-t border-white/5 bg-black/60 p-4 flex flex-col-reverse overflow-y-auto">
        <p className="text-center text-zinc-500 text-xs italic">Live transcription would appear here...</p>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white/5 border-t border-white/10 flex justify-center pb-8">
        <VoiceAssistantControlBar controls={{ leave: true }} />
      </div>
    </div>
  );
}
