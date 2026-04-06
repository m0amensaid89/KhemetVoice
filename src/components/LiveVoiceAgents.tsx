"use client";

import { useState } from "react";
import { Mic, Phone, PhoneOff, Activity } from "lucide-react";
// @livekit/components-react will be used eventually, mock for now if no connection URL

export function LiveVoiceAgents({ selectedHero }: { selectedHero: string }) {
  const [inSession, setInSession] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [transcript, setTranscript] = useState<string[]>([
    "System: Ready to connect..."
  ]);

  const handleStart = () => {
    setConnecting(true);
    setTranscript(["System: Connecting to sovereign voice cluster..."]);

    // Simulate connection
    setTimeout(() => {
      setConnecting(false);
      setInSession(true);
      setTranscript([
        `System: Connected securely.`,
        `${selectedHero}: Greetings. I am ready to converse.`
      ]);
    }, 1500);
  };

  const handleEnd = () => {
    setInSession(false);
    setTranscript(["System: Session ended securely."]);
  };

  return (
    <div className="w-full mt-10 p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-md">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white mb-1">Live Voice Agents</h3>
          <p className="text-sm text-zinc-400">Experience ultra-low latency sovereign conversations.</p>
        </div>

        {!inSession ? (
          <button
            onClick={handleStart}
            disabled={connecting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {connecting ? (
              <><Activity className="w-4 h-4 animate-pulse" /> Connecting...</>
            ) : (
              <><Phone className="w-4 h-4" /> Start Live Session with {selectedHero}</>
            )}
          </button>
        ) : (
          <button
            onClick={handleEnd}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500/20 text-red-500 border border-red-500/50 font-bold text-sm transition-all hover:scale-105 active:scale-95"
          >
            <PhoneOff className="w-4 h-4" /> End Session
          </button>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-6 h-64">
        {/* Visualizer Area */}
        <div className="flex-shrink-0 w-full md:w-64 bg-zinc-900 rounded-lg border border-white/5 flex flex-col items-center justify-center relative overflow-hidden">
          {inSession ? (
            <>
              <div className="absolute inset-0 bg-[#D4AF37]/5 animate-pulse" />
              <Mic className="w-12 h-12 text-[#D4AF37] mb-4 z-10" />
              <div className="flex items-end gap-1 h-12 z-10">
                {[...Array(12)].map((_, i) => {
                  const pseudoRandom1 = (i * 17) % 100;
                  const pseudoRandom2 = ((i * 23) % 100) / 100;
                  return (
                    <div
                      key={i}
                      className="w-1.5 bg-[#D4AF37] rounded-full"
                      style={{
                        height: `${Math.max(20, pseudoRandom1)}%`,
                        animation: `pulse ${0.5 + pseudoRandom2}s infinite alternate`
                      }}
                    />
                  );
                })}
              </div>
              <p className="text-xs text-[#D4AF37] mt-4 font-bold tracking-widest z-10">LISTENING</p>
            </>
          ) : (
            <>
              <Mic className="w-12 h-12 text-zinc-600 mb-4" />
              <div className="w-32 h-1 bg-zinc-800 rounded-full" />
              <p className="text-xs text-zinc-500 mt-4 font-bold tracking-widest">INACTIVE</p>
            </>
          )}
        </div>

        {/* Transcript Area */}
        <div className="flex-1 bg-zinc-900 rounded-lg border border-white/5 p-4 flex flex-col">
          <p className="text-xs text-zinc-500 font-bold tracking-widest mb-3 uppercase border-b border-white/5 pb-2">
            Secure Transcript
          </p>
          <div className="flex-1 overflow-y-auto flex flex-col gap-2 font-mono text-sm">
            {transcript.map((line, i) => (
              <div key={i} className={`p-2 rounded ${line.startsWith('System') ? 'text-zinc-500' : 'text-zinc-300'}`}>
                {line.startsWith('System') ? (
                  <span className="opacity-70">{line}</span>
                ) : (
                  <>
                    <span className="text-[#D4AF37] font-bold">{line.split(':')[0]}:</span>
                    {line.substring(line.indexOf(':') + 1)}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
