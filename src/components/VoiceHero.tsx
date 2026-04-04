"use client"
import React, { useState, useEffect, useCallback } from 'react';
import { VOICE_DATA } from '@/data/voiceData';
import Carousel3D from '@/components/VoiceCarousel';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

const EGYPTIAN_SYMBOLS = [
  "ankh",
  "horus",
  "scarab",
  "lotus",
  "feather",
  "pyramids",
  "sphinx",
  "nefertiti",
  "anubis",
  "pharaoh",
  "obelisk",
  "cleopatra",
  "mummy",
  "sarcophagus",
  "eye-of-horus"
];

export const VoiceHero: React.FC = () => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  // Force Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Automatically start playing when active index changes
  const handleVoiceChange = (index: number) => {
    setActiveIndex(index);
    if (!isMuted) {
      setPlayingVoice(VOICE_DATA[index].name);
    }
  };

  const handlePlayToggle = (voiceName: string) => {
    if (isMuted) setIsMuted(false);
    setPlayingVoice(current => current === voiceName ? null : voiceName);
  };

  const handleMuteToggle = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    setIsAutoMode(!newMutedState); // Unmute = AutoPlay ON, Mute = AutoPlay OFF

    // If we just unmuted, ensure the current voice is playing
    if (!newMutedState && !playingVoice) {
      setPlayingVoice(VOICE_DATA[activeIndex].name);
    }
  };

  const handleAutoAdvance = useCallback(() => {
    if (!isAutoMode) return;

    const nextIndex = (activeIndex + 1) % VOICE_DATA.length;
    setActiveIndex(nextIndex);

    // Small delay to allow the carousel to transition before starting next audio
    setTimeout(() => {
        setPlayingVoice(VOICE_DATA[nextIndex].name);
    }, 500);
  }, [activeIndex, isAutoMode]);

  // When auto mode is turned on, start playing if nothing is playing
  useEffect(() => {
      if (isAutoMode && !playingVoice) {
          setPlayingVoice(VOICE_DATA[activeIndex].name);
      }
  }, [isAutoMode, activeIndex, playingVoice]);

  return (
    <div className="h-[800px] w-full bg-[#09090b] text-zinc-100 font-sans overflow-hidden flex flex-col relative transition-colors duration-300 dark">

      {/* Background Ambience & Egyptian Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-900/10 blur-3xl opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-3xl opacity-30"></div>

          {/* Floating Symbols */}
          {Array.from({ length: 20 }).map((_, i) => {
            const symbol = EGYPTIAN_SYMBOLS[i % EGYPTIAN_SYMBOLS.length];

            // Pseudo-random values to prevent Next.js hydration mismatch
            const pseudoX = (i * 137) % 100;
            const pseudoY = (i * 251) % 100;
            const pseudoRot = (i * 73) % 360;
            const pseudoScale = 0.3 + ((i * 17) % 100) / 100 * 1.2;

            return (
              <motion.div
                key={`${symbol}-${i}`}
                className="absolute opacity-[0.08] grayscale invert"
                initial={{
                  x: pseudoX + "%",
                  y: pseudoY + "%",
                  rotate: pseudoRot,
                  scale: pseudoScale
                }}
                animate={{
                  y: ["-20%", "120%"],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 30 + Math.random() * 60,
                  repeat: Infinity,
                  ease: "linear",
                  delay: -Math.random() * 60
                }}
              >
                <img
                  src={`https://img.icons8.com/ios-filled/100/ffffff/${symbol}.png`}
                  alt=""
                  className="w-16 h-16 sm:w-24 sm:h-24"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            );
          })}
      </div>

      <div className="flex flex-col flex-1 overflow-hidden relative">

        <main className="flex-1 relative flex flex-col overflow-hidden">
            {/* Unified Mute/Autoplay Toggle Button */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50">
                <button
                    onClick={handleMuteToggle}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.4)] bg-[#D4AF37] text-black border border-[#D4AF37]/50 hover:scale-105 active:scale-95"
                >
                    {isMuted ? <VolumeX size={16} fill="currentColor" /> : <Volume2 size={16} fill="currentColor" />}
                    {isMuted ? 'MUTE (AUTO PLAY OFF)' : 'UNMUTE (AUTO PLAY ON)'}
                </button>
            </div>

            <div className="w-full flex-1 flex items-center justify-center pb-8 min-h-0 relative">
                 <Carousel3D
                    voices={VOICE_DATA}
                    activeIndex={activeIndex}
                    onChange={handleVoiceChange}
                    playingVoice={playingVoice}
                    onPlayToggle={handlePlayToggle}
                    onEnded={handleAutoAdvance}
                    isMuted={isMuted}
                 />
            </div>

            <div className="absolute bottom-6 left-0 right-0 text-center pointer-events-none">
                <p className="text-xs text-zinc-500 font-medium tracking-widest uppercase bg-zinc-900/50 backdrop-blur-sm inline-block px-3 py-1 rounded-full border border-zinc-800">
                    {activeIndex + 1} / {VOICE_DATA.length}
                </p>
            </div>
        </main>
      </div>
    </div>
  );
};