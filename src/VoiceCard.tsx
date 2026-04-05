/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useEffect } from 'react';
import { Play, Pause, Activity } from 'lucide-react';
import { Voice } from '@/types/voice';
import AudioVisualizer from './AudioVisualizer';

interface VoiceCardProps {
  voice: Voice;
  isPlaying: boolean;
  onPlayToggle: (voiceName: string) => void;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ voice, isPlaying, onPlayToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let isCancelled = false;

    const handlePlayback = async () => {
      if (isPlaying) {
        try {
          const playPromise = audio.play();
          if (playPromise !== undefined) {
            await playPromise;
            if (isCancelled) {
              audio.pause();
            }
          }
        } catch (e) {
          if (e instanceof Error && e.name !== 'AbortError') {
            console.error("Playback failed", e);
          }
        }
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    };

    handlePlayback();

    return () => {
      isCancelled = true;
    };
  }, [isPlaying]);

  const handleAudioEnded = () => {
    if (isPlaying) {
      onPlayToggle(voice.name);
    }
  };

  const handleClick = () => {
      onPlayToggle(voice.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
      }
  };

  return (
    <div 
        className={`group relative border transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-28 cursor-pointer rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-600 hover:-translate-y-1 hover:shadow-xl ${isPlaying ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/20 shadow-md' : 'border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-md'}`}
        style={{ backgroundColor: voice.cardColor }}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={`Play sample for ${voice.name}`}
    >
      
      {/* Visualizer / Action Area - Left Side */}
      <div className="relative h-20 sm:h-full w-full sm:w-28 bg-zinc-50/50 dark:bg-transparent shrink-0 border-b sm:border-b-0 sm:border-r border-zinc-100 dark:border-zinc-800 flex items-center justify-center overflow-hidden">
        
        {/* Technical Grid Background */}
        <div className="absolute inset-0 opacity-[0.2] drop-shadow-[0_0_1px_rgba(255,255,255,0.3)]" style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '8px 8px' }}></div>

        {/* Resting State Visual */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
             <div 
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center"
                style={{ backgroundColor: `${voice.cardColor}20` }}
             >
                <Activity size={16} className="text-white/40" strokeWidth={1.5} />
             </div>
        </div>

        {/* Active Visualizer */}
        <div className={`absolute inset-0 z-10 transition-opacity duration-200 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
             <AudioVisualizer isPlaying={isPlaying} color={voice.cardColor} />
        </div>

        {/* Play Button Overlay - Tactile Feel */}
        <div className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-200 ${isPlaying ? 'opacity-0 hover:opacity-100 focus:opacity-100' : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100'}`}>
            <div className="h-9 w-9 bg-zinc-900 dark:bg-zinc-100 rounded-full flex items-center justify-center shadow-lg transform transition-transform active:scale-95">
                {isPlaying ? <Pause size={14} className="text-white dark:text-zinc-900" fill="currentColor" /> : <Play size={14} className="text-white dark:text-zinc-900 ml-0.5" fill="currentColor" />}
            </div>
        </div>
        
        {/* Status Indicator */}
        <div className={`absolute top-2 left-2 w-1.5 h-1.5 rounded-full ${isPlaying ? 'animate-google-colors' : 'bg-zinc-200 dark:bg-zinc-600'}`}></div>
      </div>

      {/* Content Area - Right Side */}
      <div className="flex-1 p-4 flex flex-col justify-center min-w-0 relative z-30 transition-all duration-300 group-hover:brightness-110" style={{ backgroundColor: voice.cardColor }}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full border border-white/20 bg-black/20 flex items-center justify-center p-1.5 overflow-hidden transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <img 
                        src={voice.imageUrl} 
                        alt={voice.imageAltText || ""} 
                        title={voice.tooltip}
                        className="w-full h-full object-contain brightness-0 invert"
                        referrerPolicy="no-referrer"
                    />
                </div>
                <h3 className="text-lg font-medium text-white tracking-tight">{voice.name}</h3>
            </div>
            <div className="flex gap-1">
                <span className="inline-flex items-center px-2 py-0.5 border border-white/10 bg-black/30 text-[10px] font-medium text-white rounded-full">
                    {voice.analysis.gender}
                </span>
            </div>
        </div>
        
        {/* Description */}
        <p className="text-sm text-black/80 leading-relaxed line-clamp-2 font-medium">
            {voice.analysis.characteristics.join(', ')}
        </p>
      </div>

      <audio ref={audioRef} src={voice.audioSampleUrl} onEnded={handleAudioEnded} preload="none" />
    </div>
  );
};

export default VoiceCard;