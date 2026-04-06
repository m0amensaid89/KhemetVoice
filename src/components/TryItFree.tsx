"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { VOICE_DATA } from "@/data/voiceData";
import { Loader2, Lock, Play, Pause } from "lucide-react";
import { RegisterModal } from "./RegisterModal";

const STYLES = ["Professional", "Warm", "Energetic", "Formal", "Calm", "Storytelling"];

type VisualizerState = "idle" | "generating" | "playing";

function VoiceVisualizer({ color, state, label, size = 320 }: { color: string; state: VisualizerState; label: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spikesRef = useRef<number[]>(Array(72).fill(0));
  const targetRef = useRef<number[]>(Array(72).fill(0));
  const frameRef = useRef(0);
  const animRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef(
    Array.from({ length: 20 }, () => ({
      x: Math.random() * 400,
      y: Math.random() * 300,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.08 + 0.02,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }))
  );

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = canvas.width;
    const H = canvas.height;
    const cx = W / 2;
    const cy = H / 2;
    const baseR = Math.min(W, H) * 0.3;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#09090b";
    ctx.fillRect(0, 0, W, H);

    // Particles
    particlesRef.current.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.fill();
    });

    frameRef.current++;

    if (state === "playing") {
      // Update spike targets every 4 frames
      if (frameRef.current % 4 === 0) {
        targetRef.current = Array(72).fill(0).map(() => Math.random() * 28 + 4);
      }
      // Lerp spikes
      spikesRef.current = spikesRef.current.map((s, i) =>
        s + (targetRef.current[i] - s) * 0.15
      );
    } else {
      // Return to 0
      spikesRef.current = spikesRef.current.map((s) => s + (0 - s) * 0.1);
    }

    // Glow
    const glowR = state === "playing" ? baseR + 8 : baseR + 2;
    const gradient = ctx.createRadialGradient(cx, cy, glowR * 0.7, cx, cy, glowR + (state === "playing" ? 30 : 15));
    gradient.addColorStop(0, color + (state === "playing" ? "40" : "20"));
    gradient.addColorStop(1, "transparent");
    ctx.beginPath();
    ctx.arc(cx, cy, glowR + (state === "playing" ? 30 : 15), 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    // Spikes
    if (state === "playing") {
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      for (let i = 0; i < 72; i++) {
        const angle = (i / 72) * Math.PI * 2 - Math.PI / 2;
        const h = spikesRef.current[i];
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * (baseR + h);
        const y2 = cy + Math.sin(angle) * (baseR + h);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = 2;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
    }

    // Spinning arc for generating
    if (state === "generating") {
      ctx.beginPath();
      const startAngle = (frameRef.current * 0.05) % (Math.PI * 2);
      ctx.arc(cx, cy, baseR, startAngle, startAngle + Math.PI * 1.2);
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.stroke();
    }

    // Circle ring
    const pulseScale = state === "idle" ? 1 + Math.sin(frameRef.current * 0.03) * 0.01 : 1;
    ctx.beginPath();
    ctx.arc(cx, cy, baseR * pulseScale, 0, Math.PI * 2);
    ctx.strokeStyle = color;
    ctx.lineWidth = state === "playing" ? 1.5 : 2;
    ctx.shadowBlur = state === "playing" ? 20 : 10;
    ctx.shadowColor = color;
    ctx.stroke();
    ctx.shadowBlur = 0;

    animRef.current = requestAnimationFrame(draw);
  }, [state, color]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [draw]);

  return (
    <div className="flex flex-col items-center gap-3">
      <canvas ref={canvasRef} width={size} height={size} className="rounded-xl w-full h-full" />
      <p className="text-sm font-bold uppercase tracking-widest" style={{ color }}>{label}</p>
    </div>
  );
}

interface TryItFreeProps {
  onGenerateSuccess?: (audioUrl: string, voiceName: string) => void;
}

export function TryItFree({ onGenerateSuccess }: TryItFreeProps) {
  const [selectedVoiceA, setSelectedVoiceA] = useState(VOICE_DATA[0]);
  const [style, setStyle] = useState("Professional");
  const [textA, setTextA] = useState("");
  const [loading, setLoading] = useState(false);
  const [vizState, setVizState] = useState<VisualizerState>("idle");
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
        voiceKey: selectedVoiceA.name
      };

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate TTS");
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

  const VoiceCard = ({ voice, selected, onSelect }: { voice: typeof VOICE_DATA[0]; selected: boolean; onSelect: () => void }) => (
    <button
      onClick={onSelect}
      className="flex-shrink-0 flex flex-col gap-1 p-3 rounded-lg border transition-all w-28"
      style={{
        borderColor: selected ? "#D4AF37" : "rgba(255,255,255,0.1)",
        boxShadow: selected ? "0 0 12px rgba(212,175,55,0.5)" : "none",
        background: selected ? "rgba(212,175,55,0.12)" : "#09090b",
      }}
    >
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: voice.cardColor || "#D4AF37" }} />
        <span className={`text-xs font-bold truncate ${selected ? "text-[#D4AF37]" : "text-white"}`}>{voice.name}</span>
      </div>
      <span className="text-zinc-500 text-[10px]">{voice.pitch}</span>
      <span className="text-zinc-400 text-[10px] truncate">{(voice.characteristics as string).split(",")[0]}</span>
    </button>
  );

  return (
    <section className="w-full py-20 px-6 bg-[#09090b] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>
            Try Khemet Voice Free
          </h2>
          <p className="text-zinc-400 mb-4">Experience the power. 3 generations included — no credit card required.</p>
          <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold border ${triesLeft > 0 ? "bg-[#D4AF37]/10 border-[#D4AF37]/30 text-[#D4AF37]" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>
            {triesLeft} of 3 remaining today
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* LEFT — Controls */}
          <div className="flex flex-col gap-6">
            {/* Step 1 — Voice selector */}
            <div>
              <p className="text-zinc-400 text-xs uppercase tracking-widest mb-3">
                Select Voice
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {VOICE_DATA.map(v => <VoiceCard key={v.name} voice={v} selected={selectedVoiceA.name === v.name} onSelect={() => setSelectedVoiceA(v)} />)}
              </div>
            </div>

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

            {/* Step 4 — Text */}
            <div className="flex flex-col gap-3">
              <div>
                <textarea value={textA} onChange={e => setTextA(e.target.value)} maxLength={300}
                  placeholder="Type what your voice agent will say..."
                  className="w-full h-28 bg-zinc-900 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4AF37]/40 resize-none" />
                <p className="text-right text-xs text-zinc-600 mt-1">{textA.length} / 300</p>
              </div>
            </div>

            {/* Step 5 — Generate */}
            <div className="flex flex-col gap-3">
              <button onClick={handleGenerate}
                disabled={loading}
                className="w-full py-3 rounded-lg bg-[#D4AF37] text-black font-bold text-sm flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Generating...</> : "Generate Voice"}
              </button>
            </div>
          </div>

          {/* RIGHT — Visualizer */}
          <div className="flex flex-col items-stretch justify-between w-full sticky top-0">
            <VoiceVisualizer
              color={selectedVoiceA.cardColor || "#D4AF37"}
              state={vizState}
              label={selectedVoiceA.name}
              size={480}
            />
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
