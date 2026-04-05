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

export default function HomePage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [text, setText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | undefined>();
  const [generatedVoiceName, setGeneratedVoiceName] = useState<string | undefined>();

  const handleGenerateVoice = async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setGeneratedAudioUrl(undefined);
    setGeneratedVoiceName(undefined);

    try {
      const selectedVoice = VOICE_DATA[activeIndex];
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, voiceKey: selectedVoice.name }),
      });

      if (!res.ok) throw new Error("Failed to generate TTS");

      const data = await res.json();
      if (data.audio) {
        const audioUrl = `data:audio/mp3;base64,${data.audio}`;
        setGeneratedAudioUrl(audioUrl);
        setGeneratedVoiceName(selectedVoice.name);

        window.dispatchEvent(new CustomEvent('playGeneratedVoice', { detail: selectedVoice.name }));
      } else {
        throw new Error(data.error || "No audio returned");
      }
    } catch (e) {
      console.error("Generate Voice Error:", e);
      alert("Error generating voice. Please check the console.");
    } finally {
      setIsGenerating(false);
    }
  };

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
      <section className="w-full">
        <VoiceHero
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          generatedAudioUrl={generatedAudioUrl}
          generatedVoiceName={generatedVoiceName}
        />
      </section>

      {/* ── GENERATE VOICE SECTION ── */}
      <section className="w-full py-12 px-6 relative flex flex-col items-center border-t border-white/5">
        <div className="max-w-2xl w-full flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-serif text-white mb-2">Generate Custom Voice</h2>
            <p className="text-zinc-400 text-sm">
              Type something below and hear {VOICE_DATA[activeIndex]?.name} speak it using Gemini 2.5 Flash TTS.
            </p>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Enter text for ${VOICE_DATA[activeIndex]?.name} to say...`}
            className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-all resize-none"
          />

          <div className="flex justify-center">
            <button
              onClick={handleGenerateVoice}
              disabled={isGenerating || !text.trim()}
              className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {isGenerating ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> GENERATING...</>
              ) : (
                <>GENERATE VOICE</>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* ── LIVE VOICE AGENTS ── */}
      <LiveVoiceAgents activeIndex={activeIndex} />

      {/* ── TRY IT FREE ── */}
      <TryItFree />

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
