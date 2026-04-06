"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { VOICE_DATA } from "@/data/voiceData";
import { Loader2, Lock, Play, Pause } from "lucide-react";
import { RegisterModal } from "./RegisterModal";

const STYLES = ["Professional", "Warm", "Energetic", "Formal", "Calm", "Storytelling"];

import type { VisualizerState } from "./VoiceVisualizer";

interface TryItFreeProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  setVizState: (state: VisualizerState) => void;
  onGenerateSuccess?: (audioUrl: string, voiceName: string) => void;
}

export function TryItFree({ activeIndex, setActiveIndex, setVizState, onGenerateSuccess }: TryItFreeProps) {
  const selectedVoiceA = VOICE_DATA[activeIndex] || VOICE_DATA[0];
  const [styleInstructions, setStyleInstructions] = useState("");
  const [style, setStyle] = useState("Professional");
  const [textA, setTextA] = useState("");
  const [loading, setLoading] = useState(false);
  const [triesUsed, setTriesUsed] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    if (localStorage.getItem("kv_tries_date") !== today) {
      localStorage.setItem("kv_tries", "0");
      localStorage.setItem("kv_tries_date", today);
    }
    setTriesUsed(parseInt(localStorage.getItem("kv_tries") || "0"));
  }, []);

  const triesLeft = 3 - triesUsed;

  const handleGenerate = async () => {
    if (triesLeft <= 0) { setShowModal(true); return; }

    // Use default text if none is provided
    const defaultText = `Hi, I am ${selectedVoiceA.name}. Thank you for choosing Khemet Voice.`;
    const textToGenerate = textA.trim() ? textA.trim() : defaultText;

    setLoading(true);
    setVizState("generating");

    try {
      const body = {
        text: textToGenerate,
        styleInstructions: styleInstructions.trim(),
        voiceKey: selectedVoiceA.name
      };

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate voice");
      }

      const newCount = triesUsed + 1;
      localStorage.setItem("kv_tries", String(newCount));
      setTriesUsed(newCount);

      if (data.audioBase64) {
        const audioUrl = `data:audio/mp3;base64,${data.audioBase64}`;
        if (onGenerateSuccess) {
          // Pass the audio to the global Framer Motion player instead of playing locally
          onGenerateSuccess(audioUrl, selectedVoiceA.name);

          // Scroll up so user can see it playing in the hero carousel
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        throw new Error(data.error || "No audio returned");
      }
    } catch (e) {
      console.error("Generate Voice Error:", e);
      alert("Error generating voice. Please check the console.");
    } finally {
      setLoading(false);
      setVizState("idle");
    }
  };

  return (
    <section className="w-full py-16 px-6 bg-[#09090b] h-full">
      <div className="w-full max-w-xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-serif text-white mb-2">
            Try Khemet Voice Free
          </h2>
          <p className="text-zinc-400 mb-4">Experience the power. 3 generations included — no credit card required.</p>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${triesLeft > 0 ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
            {triesLeft} of 3 remaining today
          </span>
        </div>

        <div className="flex flex-col gap-8">
            {/* Step 3 — Style */}
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Style</p>
              <div className="flex flex-wrap gap-2">
                {STYLES.map(s => (
                  <button key={s} onClick={() => setStyle(s)}
                    className={`px-4 py-1.5 rounded-full text-sm transition-all ${style === s ? "bg-[#D4AF37] text-black font-bold" : "bg-zinc-800 text-zinc-400 hover:text-white"}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4 — Instructions & Text */}
            <div className="flex flex-col gap-6">
              <div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Style Instructions</p>
                <textarea value={styleInstructions} onChange={e => setStyleInstructions(e.target.value)} maxLength={300}
                  placeholder="Speak as a powerful ancient Egyptian pharaoh with deep resonant commanding voice..."
                  className="w-full h-24 bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/40 resize-none" />
              </div>
              <div>
                <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">Text</p>
                <textarea value={textA} onChange={e => setTextA(e.target.value)} maxLength={300}
                  placeholder="Type what your voice agent will say..."
                  className="w-full h-28 bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/40 resize-none" />
                <p className="text-right text-xs text-zinc-600 mt-1">{textA.length} / 300</p>
              </div>
            </div>

            {/* Step 5 — Generate */}
            <div className="flex flex-col gap-3 pt-2">
              <button onClick={handleGenerate}
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#D4AF37] text-black font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                {loading ? <><Loader2 size={16} className="animate-spin" /> GENERATING...</> : "GENERATE VOICE"}
              </button>
            </div>
        </div>
      </div>

      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => { setTriesUsed(0); setShowModal(false); }}
      />
    </section>
  );
}
