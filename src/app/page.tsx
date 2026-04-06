"use client"
import { useState } from "react";
import { VoiceHero } from "@/components/VoiceHero";
import { TryItFree } from "@/components/TryItFree";
import { PricingSection } from "@/components/PricingSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Loader2 } from "lucide-react";
import { VOICE_DATA } from "@/data/voiceData";
import { LiveVoiceAgents } from "@/components/LiveVoiceAgents";
import { VoiceVisualizer, VisualizerState } from "@/components/VoiceVisualizer";

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | undefined>();
  const [generatedVoiceName, setGeneratedVoiceName] = useState<string | undefined>();
  const [vizState, setVizState] = useState<VisualizerState>("idle");

  const activeVoice = VOICE_DATA[activeIndex];

  // We need to keep the visualizer pulsing while the generated audio is playing.
  // The global 'playingVoice' state is in VoiceHero, but let's just listen to the event
  // to start playing, and pass a callback to TryItFree to set vizState="playing".
  // Note: For TryItFree, I already set setVizState={setVizState}
  // The actual audio plays in VoiceHero.

  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">

      {/* ── NAV ── */}
      <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/5 absolute top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Khemet Voice" className="h-10 w-auto object-contain" />
          <span
            className="text-white uppercase hidden sm:block"
            style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            Voice of Khemet
          </span>
        </div>
        <Link href="/auth">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <ArrowRight className="w-4 h-4" />
            REGISTER NOW
          </button>
        </Link>
      </nav>

      {/* ── 3D CAROUSEL HERO ── */}
      <section className="w-full pt-20">
        <VoiceHero
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          generatedAudioUrl={generatedAudioUrl}
          generatedVoiceName={generatedVoiceName}
          setVizState={setVizState}
        />
      </section>

      {/* ── 50/50 SPLIT SCREEN: VISUALIZER & HERO SELECTION ── */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/5 bg-[#09090b]">

        {/* LEFT COLUMN: BIG ANIMATED GLOWING CIRCLE */}
        <div className="border-r border-white/5 flex justify-center items-center py-12">
          <VoiceVisualizer
            color={activeVoice?.cardColor || "#D4AF37"}
            state={vizState}
            label={activeVoice?.name || "Khemet Voice"}
            size={480}
          />
        </div>

        {/* RIGHT COLUMN: HERO SELECTION BOXES */}
        <div className="flex justify-center items-center py-12">
          <div className="grid grid-cols-2 gap-4 px-6 max-w-2xl w-full">
            {VOICE_DATA.map((voice, index) => {
              const selected = activeIndex === index;
              const isLast = index === VOICE_DATA.length - 1;
              return (
                <button
                  key={voice.name}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col gap-2 p-5 rounded-xl border transition-all w-full ${isLast ? 'col-span-2 max-w-[50%] mx-auto' : ''}`}
                  style={{
                    borderColor: selected ? "#D4AF37" : "rgba(255,255,255,0.1)",
                    boxShadow: selected ? "0 0 20px rgba(212,175,55,0.4)" : "none",
                    background: selected ? "rgba(212,175,55,0.15)" : "#09090b",
                  }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: voice.cardColor || "#D4AF37" }} />
                    <span className={`text-lg font-bold truncate ${selected ? "text-[#D4AF37]" : "text-white"}`}>{voice.name}</span>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <span className="text-zinc-400 text-sm truncate">{(voice.characteristics as string).split(",")[0]}</span>
                    <span className="text-zinc-500 text-xs uppercase tracking-wider">{voice.pitch}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </section>

      {/* ── 50/50 SPLIT SCREEN: LIVE AGENTS & TRY IT FREE ── */}
      <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-white/5">

        {/* LEFT COLUMN: LIVE VOICE AGENTS */}
        <div className="border-r border-white/5 bg-[#09090b]">
          <LiveVoiceAgents activeIndex={activeIndex} setVizState={setVizState} />
        </div>

        {/* RIGHT COLUMN: TRY IT FREE */}
        <div className="bg-[#09090b]">
          <TryItFree
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            setVizState={setVizState}
            onGenerateSuccess={(audioUrl, voiceName) => {
              setGeneratedAudioUrl(audioUrl);
              setGeneratedVoiceName(voiceName);
              const voiceIndex = VOICE_DATA.findIndex(v => v.name === voiceName);
              if (voiceIndex !== -1) {
                setActiveIndex(voiceIndex);
              }
              window.dispatchEvent(new CustomEvent('playGeneratedVoice', { detail: voiceName }));
            }}
          />
        </div>

      </section>

      {/* ── PRICING ── */}
      <PricingSection />

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-6 px-8 flex items-center justify-between text-xs text-zinc-600">
        <span>© 2026 Khemet Voice. All rights reserved.</span>
        <span>Built for the MENA enterprise.</span>
      </footer>

    </div>
  );
}
