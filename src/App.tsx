/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useCallback } from 'react';
import { VOICE_DATA } from './constants';
import Carousel3D from './components/Carousel3D';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

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

const App: React.FC = () => {
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoMode, setIsAutoMode] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);

  // Force Dark Mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const handleStart = () => {
    setHasStarted(true);
    setPlayingVoice(VOICE_DATA[activeIndex].name);
  };

  const handlePlayToggle = (voiceName: string) => {
    if (!hasStarted) setHasStarted(true);
    setPlayingVoice(current => current === voiceName ? null : voiceName);
  };

  const handleAutoAdvance = useCallback(() => {
    if (!isAutoMode || !hasStarted) return;
    
    const nextIndex = (activeIndex + 1) % VOICE_DATA.length;
    setActiveIndex(nextIndex);
    
    // Small delay to allow the carousel to transition before starting next audio
    setTimeout(() => {
        setPlayingVoice(VOICE_DATA[nextIndex].name);
    }, 500);
  }, [activeIndex, isAutoMode, hasStarted]);

  // When auto mode is turned on, start playing if nothing is playing
  useEffect(() => {
      if (hasStarted && isAutoMode && !playingVoice) {
          setPlayingVoice(VOICE_DATA[activeIndex].name);
      }
  }, [isAutoMode, activeIndex, playingVoice, hasStarted]);

  return (
    <div className="h-screen w-screen bg-[#09090b] text-zinc-100 font-sans overflow-hidden flex flex-col relative transition-colors duration-300 dark">
      
      {/* Start Overlay */}
      {!hasStarted && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 p-12 rounded-3xl border border-white/10 bg-zinc-900/50 shadow-2xl max-w-md mx-4"
            >
                <div className="space-y-4">
                    <h1 className="text-4xl font-serif text-[#D4AF37] tracking-tight uppercase">Khemet Voice</h1>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                        Welcome to the Voice Library. Experience the ancient echoes with automated playback and 3D navigation.
                    </p>
                </div>
                <button 
                    onClick={handleStart}
                    className="group relative px-12 py-4 bg-[#D4AF37] text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(212,175,55,0.3)]"
                >
                    <span className="relative z-10 flex items-center gap-2">
                        <Play size={20} fill="currentColor" />
                        EXPLORE HEROS
                    </span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
                </button>
            </motion.div>
        </div>
      )}

      {/* Background Ambience & Egyptian Symbols */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-900/10 blur-3xl opacity-40"></div>
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/10 blur-3xl opacity-30"></div>
          
          {/* Floating Symbols */}
          {Array.from({ length: 20 }).map((_, i) => {
            const symbol = EGYPTIAN_SYMBOLS[i % EGYPTIAN_SYMBOLS.length];
            return (
              <motion.div
                key={`${symbol}-${i}`}
                className="absolute opacity-[0.08] grayscale invert"
                initial={{ 
                  x: Math.random() * 100 + "%", 
                  y: Math.random() * 100 + "%",
                  rotate: Math.random() * 360,
                  scale: 0.3 + Math.random() * 1.2
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

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="absolute top-8 right-8 z-50 flex justify-end pointer-events-none">
            <button 
                onClick={() => setIsAutoMode(!isAutoMode)}
                className={`pointer-events-auto flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all backdrop-blur-md border shadow-2xl ${isAutoMode ? 'bg-[#D4AF37] text-black border-[#D4AF37]/50 shadow-[0_0_20px_rgba(212,175,55,0.4)]' : 'bg-black/40 text-white/60 border-white/10 hover:bg-black/60'}`}
            >
                {isAutoMode ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                {isAutoMode ? 'Auto Play ON' : 'Auto Play OFF'}
            </button>
        </header>

        <main className="flex-1 relative flex flex-col overflow-hidden">
            <div className="w-full flex-1 flex items-center justify-center pb-8 min-h-0">
                 <Carousel3D 
                    voices={VOICE_DATA}
                    activeIndex={activeIndex}
                    onChange={setActiveIndex}
                    playingVoice={playingVoice}
                    onPlayToggle={handlePlayToggle}
                    onEnded={handleAutoAdvance}
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

export default App;