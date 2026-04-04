/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { Voice } from '@/types/voice';
import { Play, Pause, Activity, ChevronLeft, ChevronRight } from 'lucide-react';
import AudioVisualizer from '@/components/AudioVisualizer';

interface Carousel3DProps {
  voices: Voice[];
  activeIndex: number;
  onChange: (index: number) => void;
  playingVoice: string | null;
  onPlayToggle: (voiceName: string) => void;
  onEnded?: () => void;
  disabled?: boolean;
}

const Carousel3D: React.FC<Carousel3DProps> = ({
  voices,
  activeIndex,
  onChange,
  playingVoice,
  onPlayToggle,
  onEnded,
  disabled = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let isCancelled = false;

    const playAudio = async () => {
      // Stop any current playback
      audio.pause();
      audio.currentTime = 0;

      if (playingVoice) {
        const voice = voices.find(v => v.name === playingVoice);
        if (voice) {
          const getGeminiUrl = (uri: string) => {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) return uri;
            const urlObj = new URL(uri);
            if (!urlObj.searchParams.has('key')) urlObj.searchParams.set('key', apiKey);
            if (!urlObj.searchParams.has('alt')) urlObj.searchParams.set('alt', 'media');
            return urlObj.toString();
          };

          const getDriveUrl = (url: string) => {
            if (url.includes('drive.google.com') && url.includes('/view')) {
              const id = url.split('/d/')[1]?.split('/')[0];
              if (id) return `https://drive.google.com/uc?export=download&id=${id}`;
            }
            return url;
          };

          const sources: string[] = [];

          // Primary source: audioSampleUrl (could be Drive or Gemini)
          let primarySrc = voice.audioSampleUrl;
          if (primarySrc.includes('drive.google.com')) {
            primarySrc = getDriveUrl(primarySrc);
          } else if (primarySrc.includes('generativelanguage.googleapis.com')) {
            primarySrc = getGeminiUrl(primarySrc);
          }
          sources.push(primarySrc);

          // Fallback source: fileUri (Gemini API)
          if (voice.fileUri && !primarySrc.includes(voice.fileUri)) {
            sources.push(getGeminiUrl(voice.fileUri));
          }

          const tryPlay = async (index: number) => {
            if (index >= sources.length || isCancelled) return;

            return new Promise<void>((resolve) => {
              const onAudioError = () => {
                console.warn(`Source ${index + 1} failed to load.`);
                audio.removeEventListener('error', onAudioError);
                audio.removeEventListener('canplay', onCanPlay);
                tryPlay(index + 1).then(resolve);
              };

              const onCanPlay = () => {
                audio.removeEventListener('error', onAudioError);
                audio.removeEventListener('canplay', onCanPlay);
                audio.play().catch(e => {
                  if (e.name !== 'AbortError') {
                    console.warn(`Play failed for source ${index + 1}:`, e.message);
                    tryPlay(index + 1).then(resolve);
                  } else {
                    resolve();
                  }
                });
              };

              audio.addEventListener('error', onAudioError);
              audio.addEventListener('canplay', onCanPlay);
              audio.src = sources[index];
              audio.load();
              console.log(`Trying audio source ${index + 1}:`, sources[index]);
            });
          };

          await tryPlay(0);
        }
      }
    };

    playAudio();

    return () => {
      isCancelled = true;
    };
  }, [playingVoice, voices]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Only trigger if no modal is open
        if (disabled) return;

        if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowLeft') {
            handlePrev();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        } else if (e.key === 'Enter' || e.key === ' ') {
            // Play active
            onPlayToggle(voices[activeIndex].name);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, voices, disabled]);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (disabled) return;
    const threshold = 50;
    if (info.offset.x > threshold && activeIndex > 0) {
      onChange(activeIndex - 1);
    } else if (info.offset.x < -threshold && activeIndex < voices.length - 1) {
      onChange(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) onChange(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < voices.length - 1) onChange(activeIndex + 1);
  };

  const handleAudioEnded = () => {
     if (playingVoice) {
         onPlayToggle(playingVoice);
         if (onEnded) onEnded();
     }
  };

  const visibleRange = 3;

  return (
    <div className="relative w-full h-full flex items-center justify-center">

      <audio ref={audioRef} onEnded={handleAudioEnded} preload="none" />

      {/* Navigation Arrows */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 sm:px-12 z-50 pointer-events-none">
        <button
            onClick={handlePrev}
            disabled={activeIndex === 0 || disabled}
            className={`p-4 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg border border-white/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200 transition-all hover:scale-110 active:scale-95 pointer-events-auto ${activeIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-100 hover:bg-white dark:hover:bg-zinc-700'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Previous voice"
        >
            <ChevronLeft size={24} />
        </button>
        <button
            onClick={handleNext}
            disabled={activeIndex === voices.length - 1 || disabled}
            className={`p-4 rounded-full bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md shadow-lg border border-white/50 dark:border-zinc-700/50 text-zinc-800 dark:text-zinc-200 transition-all hover:scale-110 active:scale-95 pointer-events-auto ${activeIndex === voices.length - 1 ? 'opacity-0 cursor-default' : 'opacity-100 hover:bg-white dark:hover:bg-zinc-700'} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            aria-label="Next voice"
        >
            <ChevronRight size={24} />
        </button>
      </div>

      <div
        ref={containerRef}
        className="relative w-full h-[70vh] flex items-center justify-center"
        style={{ perspective: '1200px' }}
      >
        <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
          <AnimatePresence initial={false}>
            {voices.map((voice, index) => {
              if (Math.abs(index - activeIndex) > visibleRange) return null;

              const isActive = index === activeIndex;
              const offset = index - activeIndex;
              const isPlaying = playingVoice === voice.name;

              const zIndex = 100 - Math.abs(offset);
              const isMobile = windowWidth < 640;

              let x = 0;
              if (isMobile) {
                  const mobileSpacing = windowWidth * 0.75;
                  x = offset * mobileSpacing;
              } else {
                  const baseGap = 280;
                  const stackStep = 45;
                  if (offset !== 0) {
                      x = Math.sign(offset) * (baseGap + (Math.abs(offset) - 1) * stackStep);
                  }
              }

              return (
                <motion.div
                  key={voice.name}
                  className={`absolute w-[300px] sm:w-[360px] aspect-[3/4] rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 group ${isActive ? 'shadow-[0_0_30px_rgba(212,175,55,0.2)]' : 'border-2 border-white/10 shadow-lg'}`}
                  style={{ zIndex, backgroundColor: '#000000' }}
                  initial={{ scale: 0.8, opacity: 0, x: offset * 200 }}
                  animate={{
                    scale: isActive ? 1 : 0.85,
                    opacity: 1,
                    x,
                    z: isActive ? 0 : -100 - (Math.abs(offset) * 30),
                    rotateY: offset * -15,
                    filter: isActive ? 'blur(0px)' : 'blur(0.5px)'
                  }}
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  onClick={() => {
                      if (disabled) return;
                      if (isActive) {
                          onPlayToggle(voice.name);
                      } else {
                          onChange(index);
                      }
                  }}
                  drag={isActive && !disabled ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  whileHover={isActive && !disabled ? { scale: 1.02 } : {}}
                  role="button"
                  tabIndex={isActive && !disabled ? 0 : -1}
                  aria-label={`Voice card for ${voice.name}. ${isActive ? 'Press Enter to play.' : 'Click to select.'}`}
                >
                  {/* Split Frame for Active Card */}
                  {isActive && (
                    <>
                      {/* Base Split Frame */}
                      <div className="absolute inset-0 z-50 pointer-events-none rounded-3xl overflow-hidden">
                        <div className="absolute inset-0 flex flex-col">
                          {/* Upper Frame (Card Color) */}
                          <div
                            className="flex-1 border-t-4 border-l-4 border-r-4 rounded-t-3xl transition-opacity duration-300 group-hover:opacity-0"
                            style={{ borderColor: voice.cardColor }}
                          />
                          {/* Lower Frame (White) */}
                          <div
                            className="h-[40%] border-b-4 border-l-4 border-r-4 rounded-b-3xl border-white transition-opacity duration-300 group-hover:opacity-0"
                          />
                        </div>

                        {/* Hover Glowing Frame Effect */}
                        <div className="absolute inset-0 border-4 border-white rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(255,255,255,0.8),0_0_30px_rgba(255,255,255,0.4)]">
                           {/* Secondary Glowing Layer */}
                           <div className="absolute -inset-1 border-2 border-white/30 rounded-[32px] blur-sm" />
                        </div>
                      </div>
                    </>
                  )}

                  {/* Fader Overlay for Inactive Cards - Split to keep bottom half colored */}
                  <div className="absolute inset-0 z-40 pointer-events-none flex flex-col">
                    <motion.div
                      animate={{ opacity: isActive ? 0 : 0.6 }}
                      className="flex-1 bg-white dark:bg-zinc-900"
                    />
                    <motion.div
                      animate={{ opacity: isActive ? 0 : 0.2 }}
                      className="h-[40%] bg-black/20"
                    />
                  </div>

                  <div className="h-full flex flex-col relative">
                      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                          <div className="absolute inset-0 opacity-[0.25] drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '12px 12px' }}></div>

                          <div className={`absolute inset-0 z-10 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                              <AudioVisualizer isPlaying={isPlaying} color={voice.cardColor || '#D4AF37'} />
                          </div>

                          <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                              <div
                                className="w-20 h-20 rounded-full backdrop-blur-sm shadow-sm border border-white/20 flex items-center justify-center"
                                style={{ backgroundColor: `${voice.cardColor}40` }}
                              >
                                  <Activity size={32} className="text-white/40" />
                              </div>
                          </div>

                          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                               <div className="w-20 h-20 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transform transition-transform active:scale-95">
                                  {isPlaying ? (
                                      <Pause size={32} className="text-zinc-900 fill-current" />
                                  ) : (
                                      <Play size={32} className="text-zinc-900 fill-current ml-1" />
                                  )}
                               </div>
                          </div>

                          {isPlaying && (
                              <div className="absolute top-6 right-6 w-3 h-3 rounded-full animate-google-colors"></div>
                          )}
                      </div>

                      <div className="h-[40%] p-8 flex flex-col justify-between relative z-30" style={{ backgroundColor: voice.cardColor }}>
                          <div>
                              <div className="flex items-center gap-4 mb-2">
                                  <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37]/50 overflow-hidden shrink-0 shadow-inner bg-black/40 p-2 flex items-center justify-center">
                                      <img
                                        src={voice.imageUrl}
                                        alt={voice.imageAltText || ""}
                                        title={voice.tooltip}
                                        className="w-full h-full object-contain brightness-0 invert"
                                        referrerPolicy="no-referrer"
                                      />
                                  </div>
                                  <h2 className="text-4xl font-serif text-white tracking-tight drop-shadow-sm">{voice.name}</h2>
                                  <div className="ml-auto">
                                      <span className="px-2.5 py-1 rounded-full bg-black/30 text-white text-[10px] font-medium border border-white/20 uppercase tracking-wider">
                                          {voice.pitch}
                                      </span>
                                  </div>
                              </div>
                          </div>

                          <div className="space-y-3">
                              <div className="w-full h-px bg-black/20"></div>
                              <p className="text-sm text-black/80 font-medium leading-relaxed line-clamp-2">
                                  {voice.characteristics}
                              </p>
                          </div>
                      </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Carousel3D;