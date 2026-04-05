"use client";

import React, { useState, useEffect, useRef } from "react";
import { VOICE_DATA } from "@/data/voiceData";
import { Play, Pause, Lock, Loader2 } from "lucide-react";
import { RegisterModal } from "./RegisterModal";
import { Voice } from "@/types/voice";

const STYLES = ["Professional", "Warm", "Energetic", "Formal", "Calm", "Storytelling"];

export function TryItFree() {
  const [speakersMode, setSpeakersMode] = useState<1 | 2>(1);
  const [selectedVoiceA, setSelectedVoiceA] = useState<Voice | null>(null);
  const [selectedVoiceB, setSelectedVoiceB] = useState<Voice | null>(null);
  const [selectedStyle, setSelectedStyle] = useState(STYLES[0]);

  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");

  const [isGenerating, setIsGenerating] = useState(false);
  const [playbackState, setPlaybackState] = useState<"IDLE" | "GENERATING" | "PLAYING" | "PLAYING_B">("IDLE");

  const [triesUsed, setTriesUsed] = useState(0);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRefA = useRef<HTMLAudioElement | null>(null);
  const audioRefB = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>(0);

  // Load tries
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if (localStorage.getItem('kv_tries_date') !== today) {
      localStorage.setItem('kv_tries', '0');
      localStorage.setItem('kv_tries_date', today);
    }
    setTriesUsed(parseInt(localStorage.getItem('kv_tries') || '0'));
  }, []);

  // Cleanup audio
  useEffect(() => {
    return () => {
      if (audioRefA.current) {
        audioRefA.current.pause();
        audioRefA.current.src = "";
      }
      if (audioRefB.current) {
        audioRefB.current.pause();
        audioRefB.current.src = "";
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleGenerate = async () => {
    if (triesUsed >= 3) {
      setShowRegisterModal(true);
      return;
    }

    setIsGenerating(true);
    setPlaybackState("GENERATING");

    try {
      const payload = speakersMode === 1 ? {
        mode: "single",
        speakers: [{
          text: textA,
          style: selectedStyle,
          voiceName: selectedVoiceA?.name || VOICE_DATA[0].name
        }]
      } : {
        mode: "dual",
        speakers: [
          {
            text: textA,
            style: selectedStyle,
            voiceName: selectedVoiceA?.name || VOICE_DATA[0].name
          },
          {
            text: textB,
            style: selectedStyle,
            voiceName: selectedVoiceB?.name || VOICE_DATA[1].name
          }
        ]
      };

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Generation failed");
      const data = await res.json();

      const newTries = triesUsed + 1;
      setTriesUsed(newTries);
      localStorage.setItem("kv_tries", newTries.toString());

      if (speakersMode === 1 && data.audio) {
        playAudio(data.audio, "A");
      } else if (speakersMode === 2 && data.audioA && data.audioB) {
        // Dual play logic: play A then B
        playAudioSeq(data.audioA, data.audioB);
      }
    } catch (err) {
      console.error(err);
      setPlaybackState("IDLE");
    } finally {
      setIsGenerating(false);
    }
  };

  const playAudioSeq = (base64A: string, base64B: string) => {
    setPlaybackState("PLAYING");

    const audioA = new Audio(`data:audio/wav;base64,${base64A}`);
    audioRefA.current = audioA;

    audioA.onended = () => {
      setPlaybackState("PLAYING_B");
      const audioB = new Audio(`data:audio/wav;base64,${base64B}`);
      audioRefB.current = audioB;
      audioB.onended = () => setPlaybackState("IDLE");
      audioB.play().catch(console.error);
    };

    audioA.play().catch(console.error);
  };

  const playAudio = (base64Data: string, speaker: "A" | "B") => {
    const audio = new Audio(`data:audio/wav;base64,${base64Data}`);

    if (speaker === "A") {
      audioRefA.current = audio;
      setPlaybackState("PLAYING");
    } else {
      audioRefB.current = audio;
      setPlaybackState("PLAYING_B");
    }

    audio.onended = () => setPlaybackState("IDLE");
    audio.play().catch(console.error);
  };

  const togglePlayPause = () => {
    const activeRef = playbackState === "PLAYING" ? audioRefA : audioRefB;
    if (activeRef.current) {
      if (activeRef.current.paused) {
        activeRef.current.play();
        setPlaybackState(playbackState === "PLAYING_B" ? "PLAYING_B" : "PLAYING");
      } else {
        activeRef.current.pause();
      }
    }
  };

  // Canvas visualizer effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width;
    let h = canvas.height;

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        w = parent.clientWidth;
        h = parent.clientHeight;
        canvas.width = w;
        canvas.height = h;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 20 }).map(() => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.08 + 0.04
    }));

    let time = 0;

    let targetSpikesA = Array(72).fill(4);
    let currentSpikesA = Array(72).fill(4);
    let targetSpikesB = Array(72).fill(4);
    let currentSpikesB = Array(72).fill(4);

    const drawCircle = (cx: number, cy: number, r: number, color: string, state: "IDLE" | "GENERATING" | "PLAYING", label?: string, currentSpikes?: number[], isSecondary?: boolean) => {
      ctx.save();

      if (label) {
        ctx.font = "10px sans-serif";
        ctx.fillStyle = color;
        ctx.textAlign = "center";
        ctx.fillText(label, cx, cy - r - 40);
      }

      if (state === "IDLE") {
        const pulse = 1 + Math.sin(time * 0.05) * 0.02;
        ctx.beginPath();
        ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;
        ctx.globalAlpha = 0.4;
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(cx, cy, r * pulse, 0, Math.PI * 2);
        ctx.stroke();
      }
      else if (state === "GENERATING") {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(time * 0.1);
        ctx.beginPath();
        ctx.arc(0, 0, r, 0, Math.PI * 1.5);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.setLineDash([15, 15]);
        ctx.stroke();
        ctx.restore();
      }
      else if (state === "PLAYING" && currentSpikes) {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 40;
        ctx.shadowColor = color;
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.beginPath();
        for (let i = 0; i < 72; i++) {
          const angle = (i / 72) * Math.PI * 2;
          const spikeH = currentSpikes[i];

          const x1 = cx + Math.cos(angle) * r;
          const y1 = cy + Math.sin(angle) * r;
          const x2 = cx + Math.cos(angle) * (r + spikeH);
          const y2 = cy + Math.sin(angle) * (r + spikeH);

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
        }
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (!label) {
          ctx.font = "bold 14px sans-serif";
          ctx.fillStyle = color;
          ctx.textAlign = "center";
          ctx.fillText(isSecondary ? (selectedVoiceB?.name || "VOICE") : (selectedVoiceA?.name || VOICE_DATA[0].name), cx, cy + r + 40);
        }
      }

      ctx.restore();
    };

    const render = () => {
      time++;
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, w, h);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });

      if (time % 4 === 0) {
        for(let i=0; i<72; i++) {
          targetSpikesA[i] = playbackState === "PLAYING" ? 4 + Math.random() * 24 : 4;
          targetSpikesB[i] = playbackState === "PLAYING_B" ? 4 + Math.random() * 24 : 4;
        }
      }
      for(let i=0; i<72; i++) {
        currentSpikesA[i] += (targetSpikesA[i] - currentSpikesA[i]) * 0.15;
        currentSpikesB[i] += (targetSpikesB[i] - currentSpikesB[i]) * 0.15;
      }

      const colorA = selectedVoiceA?.cardColor || VOICE_DATA[0].cardColor || "#ffffff";
      const colorB = selectedVoiceB?.cardColor || "#a78bfa";

      if (speakersMode === 1) {
        let state: "IDLE" | "GENERATING" | "PLAYING" = "IDLE";
        if (playbackState === "GENERATING") state = "GENERATING";
        if (playbackState === "PLAYING") state = "PLAYING";

        drawCircle(w/2, h/2, 120, colorA, state, undefined, currentSpikesA, false);
      } else {
        const cx1 = w/2 - 120;
        const cx2 = w/2 + 120;
        const cy = h/2;

        let stateA: "IDLE" | "GENERATING" | "PLAYING" = "IDLE";
        let stateB: "IDLE" | "GENERATING" | "PLAYING" = "IDLE";

        if (playbackState === "GENERATING") { stateA = "GENERATING"; stateB = "GENERATING"; }
        if (playbackState === "PLAYING") { stateA = "PLAYING"; }
        if (playbackState === "PLAYING_B") { stateB = "PLAYING"; }

        drawCircle(cx1, cy, 80, colorA, stateA, "AGENT", currentSpikesA, false);
        drawCircle(cx2, cy, 80, colorB, stateB, "CUSTOMER", currentSpikesB, true);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [speakersMode, selectedVoiceA, selectedVoiceB, playbackState]);


  const renderVoiceRow = (
    selectedVoice: Voice | null,
    onSelect: (v: Voice) => void
  ) => (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
      {VOICE_DATA.map(voice => {
        const isSelected = selectedVoice?.name === voice.name;
        const firstChar = voice.characteristics.split(",")[0].trim();

        return (
          <button
            key={voice.name}
            onClick={() => onSelect(voice)}
            className={`shrink-0 w-[120px] h-[80px] rounded-lg border bg-zinc-900 flex flex-col p-3 text-left transition-all relative overflow-hidden`}
            style={{
              borderColor: isSelected ? voice.cardColor : "rgba(255,255,255,0.1)",
              boxShadow: isSelected ? `0 0 12px ${voice.cardColor}60` : "none"
            }}
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-bold text-white text-sm">{voice.name}</span>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: voice.cardColor }} />
            </div>
            <div className="text-zinc-600 text-xs mb-1">{voice.pitch}</div>
            <div className="text-zinc-400 text-xs truncate">{firstChar}</div>
          </button>
        );
      })}
    </div>
  );

  const isGenerateDisabled = isGenerating || (speakersMode === 1 ? !textA : (!textA || !textB));

  const visualizerContent = (
    <>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute bottom-6 flex gap-4 z-10 w-full justify-center">
        <button
          onClick={togglePlayPause}
          disabled={playbackState === "IDLE"}
          className={`p-3 rounded-full bg-zinc-900 border border-white/10 transition-colors ${
            playbackState !== "IDLE" ? 'text-white hover:border-[#D4AF37]' : 'text-zinc-600'
          }`}
        >
          {playbackState === "PLAYING" || playbackState === "PLAYING_B" ? <Pause size={20} /> : <Play size={20} />}
        </button>

        <button
          onClick={() => setShowRegisterModal(true)}
          className="p-3 rounded-full bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white hover:border-[#D4AF37] transition-colors flex items-center justify-center gap-2"
          title="Download requires registration"
        >
          <Lock size={16} />
        </button>
      </div>
    </>
  );

  return (
    <section className="w-full bg-[#09090b] text-white">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #D4AF37;
          border-radius: 4px;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #D4AF37 #000000;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-medium mb-4">Try Khemet Voice Free</h2>
          <p className="text-xl text-zinc-400 mb-6">Experience the power. 3 generations included — no credit card required.</p>
          <div className={`inline-flex items-center px-4 py-1.5 rounded-full border text-sm font-bold transition-colors ${
            triesUsed >= 3
              ? 'border-red-500 text-red-500 bg-red-500/10'
              : 'border-[#D4AF37] text-[#D4AF37] bg-[#D4AF37]/10'
          }`}>
            {Math.max(0, 3 - triesUsed)} of 3 remaining
          </div>
        </div>

        {/* 1 SPEAKER MODE LAYOUT */}
        {speakersMode === 1 && (
          <div className="flex flex-col md:flex-row gap-8 max-w-[1000px] mx-auto">
            <div className="flex-1 flex flex-col gap-8">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="flex gap-3">
                    {[1, 2].map((num) => (
                      <button
                        key={num}
                        onClick={() => setSpeakersMode(num as 1 | 2)}
                        className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
                          speakersMode === num
                            ? 'border-[#D4AF37] text-[#D4AF37]'
                            : 'border-white/10 text-zinc-400 hover:border-white/20'
                        }`}
                      >
                        {num} Speaker{num > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="text-[#D4AF37] text-xs font-bold uppercase mb-3">Select Voice</div>
                {renderVoiceRow(selectedVoiceA, setSelectedVoiceA)}
              </div>

              <div>
                <div className="text-sm text-zinc-400 mb-2">Script</div>
                <div className="relative">
                  <textarea
                    className="w-full h-32 bg-zinc-900 border border-white/10 rounded-lg p-4 text-white resize-none focus:outline-none focus:border-[#D4AF37] custom-scrollbar"
                    placeholder="Type what your voice agent will say..."
                    maxLength={300}
                    value={textA}
                    onChange={(e) => setTextA(e.target.value)}
                  />
                  <div className="text-right text-xs text-zinc-500 mt-1">{textA.length} / 300</div>
                </div>
              </div>

              <div>
                <div className="text-sm text-zinc-400 mb-3 text-center">Speaking Style</div>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {STYLES.map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedStyle === style
                          ? 'bg-[#D4AF37] text-black'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleGenerate}
                  disabled={isGenerateDisabled}
                  className={`w-full py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                    isGenerateDisabled
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                      : 'bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90'
                  }`}
                >
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                  ) : (
                    "Generate Voice"
                  )}
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex flex-col items-center justify-center min-h-[400px] bg-black rounded-xl border border-white/5 overflow-hidden">
              {visualizerContent}
            </div>
          </div>
        )}

        {/* 2 SPEAKERS MODE LAYOUT */}
        {speakersMode === 2 && (
          <div className="flex flex-col gap-8 max-w-[1000px] mx-auto">

            {/* Mode Select */}
            <div className="flex justify-center">
              <div className="flex gap-3">
                {[1, 2].map((num) => (
                  <button
                    key={num}
                    onClick={() => setSpeakersMode(num as 1 | 2)}
                    className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors ${
                      speakersMode === num
                        ? 'border-[#D4AF37] text-[#D4AF37]'
                        : 'border-white/10 text-zinc-400 hover:border-white/20'
                    }`}
                  >
                    {num} Speaker{num > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Visualizer */}
            <div className="relative flex flex-col items-center justify-center min-h-[320px] w-full bg-black rounded-xl border border-white/5 overflow-hidden">
              {visualizerContent}
            </div>

            {/* 2 Columns: Voices and Scripts */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 flex flex-col gap-6 w-full md:w-1/2 min-w-0">
                <div>
                  <div className="text-[#D4AF37] text-xs font-bold uppercase mb-3">Speaker A Voice</div>
                  {renderVoiceRow(selectedVoiceA, setSelectedVoiceA)}
                </div>
                <div>
                  <div className="text-sm text-zinc-400 mb-2">Speaker A Script</div>
                  <textarea
                    className="w-full h-32 bg-zinc-900 border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-[#D4AF37] custom-scrollbar"
                    placeholder="Type Speaker A text..."
                    maxLength={300}
                    value={textA}
                    onChange={(e) => setTextA(e.target.value)}
                  />
                  <div className="text-right text-xs text-zinc-500 mt-1">{textA.length} / 300</div>
                </div>
              </div>

              <div className="flex-1 flex flex-col gap-6 w-full md:w-1/2 min-w-0">
                <div>
                  <div className="text-[#D4AF37] text-xs font-bold uppercase mb-3">Speaker B Voice</div>
                  {renderVoiceRow(selectedVoiceB, setSelectedVoiceB)}
                </div>
                <div>
                  <div className="text-sm text-zinc-400 mb-2">Speaker B Script</div>
                  <textarea
                    className="w-full h-32 bg-zinc-900 border border-white/10 rounded-lg p-3 text-white resize-none focus:outline-none focus:border-[#D4AF37] custom-scrollbar"
                    placeholder="Type Speaker B text..."
                    maxLength={300}
                    value={textB}
                    onChange={(e) => setTextB(e.target.value)}
                  />
                  <div className="text-right text-xs text-zinc-500 mt-1">{textB.length} / 300</div>
                </div>
              </div>
            </div>

            {/* Style and Generate */}
            <div className="flex flex-col items-center gap-8 border-t border-white/5 pt-8">
              <div className="w-full">
                <div className="text-sm text-zinc-400 mb-3 text-center">Speaking Style</div>
                <div className="flex flex-wrap justify-center gap-2">
                  {STYLES.map(style => (
                    <button
                      key={style}
                      onClick={() => setSelectedStyle(style)}
                      className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedStyle === style
                          ? 'bg-[#D4AF37] text-black'
                          : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                className={`w-full max-w-lg py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors ${
                  isGenerateDisabled
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                    : 'bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90'
                }`}
              >
                {isGenerating ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Generating...</>
                ) : (
                  "Generate Voice"
                )}
              </button>
            </div>

          </div>
        )}
      </div>

      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        onSuccess={() => setTriesUsed(0)}
      />
    </section>
  );
}
