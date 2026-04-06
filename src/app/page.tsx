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

      {/* ── 4-BOX HORIZONTAL LAYOUT ── */}
      <section className="w-full max-w-[1600px] mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-4 gap-4 bg-[#09090b]">

        {/* BOX 1: BIG ANIMATED GLOWING CIRCLE */}
        <div className="flex justify-center items-center p-4 border border-white/5 rounded-xl bg-[#09090b]">
          <VoiceVisualizer
            color={activeVoice?.cardColor || "#D4AF37"}
            state={vizState}
            label={activeVoice?.name || "Khemet Voice"}
            size={220}
          />
        </div>

        {/* BOX 2: HERO SELECTION BOXES */}
        <div className="flex flex-col justify-center items-center p-4 border border-white/5 rounded-xl bg-[#09090b]">
          <div className="grid grid-cols-2 gap-3 w-full max-w-sm h-full max-h-[400px] overflow-y-auto scrollbar-hide">
            {VOICE_DATA.map((voice, index) => {
              const selected = activeIndex === index;
              const isLast = index === VOICE_DATA.length - 1;
              return (
                <button
                  key={voice.name}
                  onClick={() => setActiveIndex(index)}
                  className={`flex flex-col gap-1 p-3 rounded-lg border transition-all w-full ${isLast ? 'col-span-2' : ''}`}
                  style={{
                    borderColor: selected ? "#D4AF37" : "rgba(255,255,255,0.1)",
                    boxShadow: selected ? "0 0 12px rgba(212,175,55,0.4)" : "none",
                    background: selected ? "rgba(212,175,55,0.15)" : "#09090b",
                  }}
                >
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: voice.cardColor || "#D4AF37" }} />
                    <span className={`text-sm font-bold truncate ${selected ? "text-[#D4AF37]" : "text-white"}`}>{voice.name}</span>
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <span className="text-zinc-500 text-[10px] uppercase tracking-wider">{voice.pitch}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* BOX 3: LIVE VOICE AGENTS */}
        <div className="flex justify-center items-stretch">
          <LiveVoiceAgents activeIndex={activeIndex} setVizState={setVizState} />
        </div>

        {/* BOX 4: TRY IT FREE */}
        <div className="flex justify-center items-stretch">
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
