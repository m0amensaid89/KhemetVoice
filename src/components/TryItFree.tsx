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

    const defaultText = `Hi, I am ${selectedVoiceA.name}. Thank you for choosing Khemet Voice.`;
    const textToGenerate = textA.trim() ? textA.trim() : defaultText;

    if (!textToGenerate.trim()) return;

    setLoading(true);
    setVizState("generating");

    try {
      const res = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: textToGenerate,
          styleInstructions: styleInstructions || "",
          voiceKey: selectedVoiceA.name
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate voice");
      }

      const newCount = triesUsed + 1;
      localStorage.setItem("kv_tries", String(newCount));
      setTriesUsed(newCount);

      if (data.audioBase64) {
        const byteCharacters = atob(data.audioBase64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const audioBlob = new Blob([byteArray], { type: 'audio/mp3' });
        const audioUrl = URL.createObjectURL(audioBlob);

        const audio = new Audio(audioUrl);
        audio.onended = () => {
          setVizState("idle");
        };
        await audio.play();
        console.log("✅ Generate Voice SUCCESS - audio playing");

        // Keep viz state as playing
        setVizState("playing");

        // Let the parent know, if needed for anything else (like pushing to the global hero state if that's still desired)
        if (onGenerateSuccess) {
           onGenerateSuccess(audioUrl, selectedVoiceA.name);
        }
      } else {
        console.error("No audioBase64 received");
        setVizState("idle");
      }
    } catch (err) {
      console.error("Generate Voice error:", err);
      alert("Error generating voice. Please check the console.");
      setVizState("idle");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 border border-white/5 bg-[#09090b] rounded-xl flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-serif text-white mb-1">Generate Voice</h2>
        <p className="text-zinc-400 text-xs mb-2">3 generations included.</p>
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border ${triesLeft > 0 ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
          {triesLeft} of 3 left
        </span>
      </div>

      <div className="flex flex-col gap-4">
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

      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => { setTriesUsed(0); setShowModal(false); }}
      />
    </div>
  );
}
