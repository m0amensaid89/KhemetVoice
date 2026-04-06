"use client";

import { useRef, useEffect, useCallback } from "react";

export type VisualizerState = "idle" | "generating" | "playing";

export function VoiceVisualizer({ color, state, label, size = 320 }: { color: string; state: VisualizerState; label: string; size?: number }) {
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
