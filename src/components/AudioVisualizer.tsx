"use client"
import React from 'react';
import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying: boolean;
  color: string;
}

const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, color }) => {
  const bars = Array.from({ length: 20 });

  return (
    <div className="absolute inset-0 flex items-center justify-center gap-[2px] opacity-20 pointer-events-none">
      {bars.map((_, i) => (
        <motion.div
          key={i}
          className="w-1 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ height: 4 }}
          animate={{
            height: isPlaying ? [4, Math.random() * 40 + 10, 4] : 4,
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: isPlaying ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AudioVisualizer;
