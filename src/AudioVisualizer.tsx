/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isPlaying: boolean;
  color?: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, color = '#18181b' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size for retina displays
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const draw = () => {
      if (!ctx || !canvas) return;
      
      const width = rect.width;
      const height = rect.height;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        // Draw a flat line when not playing
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.strokeStyle = color;
        ctx.globalAlpha = 0.2;
        ctx.lineWidth = 2;
        ctx.stroke();
        return;
      }

      phaseRef.current += 0.15;
      
      const currentColor = color;

      ctx.beginPath();
      ctx.moveTo(0, centerY);

      const points = 100;
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        
        // Combine multiple sine waves for a more complex "voice" look
        // We modulate the amplitude based on x to taper the ends
        const envelope = Math.sin((i / points) * Math.PI); 
        
        const y = centerY + 
          Math.sin(i * 0.2 + phaseRef.current) * 15 * envelope +
          Math.sin(i * 0.5 - phaseRef.current * 2) * 8 * envelope +
          Math.sin(i * 0.1 + phaseRef.current * 0.5) * 5 * envelope;

        ctx.lineTo(x, y);
      }

      ctx.strokeStyle = currentColor;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalAlpha = 0.8;
      ctx.stroke();
      
      // Add a second, fainter line for depth
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      for (let i = 0; i <= points; i++) {
        const x = (i / points) * width;
        const envelope = Math.sin((i / points) * Math.PI); 
        const y = centerY + 
          Math.sin(i * 0.2 + phaseRef.current + 1) * 15 * envelope;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.stroke();

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPlaying, color]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default AudioVisualizer;