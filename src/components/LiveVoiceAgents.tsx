"use client";

import { useState, useEffect, useRef } from "react";
import { Loader2, Mic, MicOff, PhoneOff } from "lucide-react";
import { VOICE_DATA } from "@/data/voiceData";
import type { VisualizerState } from "./VoiceVisualizer";

// Mapping to match the TTS mapping from route.ts
const khemetToGeminiMap: Record<string, { voiceName: string }> = {
  "KAIRO":   { voiceName: "Aoede" },
  "NEFRA":   { voiceName: "Kore" },
  "RAMET":   { voiceName: "Charon" },
  "NEXAR":   { voiceName: "Puck" },
  "LYRA":    { voiceName: "Aoede" },
  "HORUSEN": { voiceName: "Fenrir" },
  "THOREN":  { voiceName: "Iapetus" }
};

interface LiveVoiceAgentsProps {
  activeIndex: number;
  setVizState?: (state: VisualizerState) => void;
}

export function LiveVoiceAgents({ activeIndex, setVizState }: LiveVoiceAgentsProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [sessionState, setSessionState] = useState<"connecting" | "listening" | "speaking" | "idle">("idle");

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextPlayTimeRef = useRef<number>(0);

  const selectedVoice = VOICE_DATA[activeIndex];

  useEffect(() => {
    if (setVizState) {
      if (sessionState === "speaking") {
        setVizState("playing");
      } else if (sessionState === "listening") {
        setVizState("generating");
      } else {
        setVizState("idle");
      }
    }
  }, [sessionState, setVizState]);

  const handleStartSession = async () => {
    try {
      setIsConnecting(true);
      setSessionState("connecting");

      // 1. Get API Key
      const res = await fetch("/api/gemini/live");
      if (!res.ok) throw new Error("Failed to get API key");
      const { token: apiKey } = await res.json();

      // 2. Setup Mic (16kHz PCM)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
        }
      });
      mediaStreamRef.current = stream;

      const AudioContextCtor = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioContextCtor({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;
      nextPlayTimeRef.current = audioCtx.currentTime;

      // 3. Setup WebSocket to Gemini Live
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`;
      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      ws.onopen = () => {
        // Send setup message
        const voiceName = khemetToGeminiMap[selectedVoice.name]?.voiceName || "Aoede";
        const setupMessage = {
          setup: {
            model: "models/gemini-2.0-flash-exp",
            generationConfig: {
              responseModalities: ["AUDIO"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: voiceName
                  }
                }
              }
            }
          }
        };
        ws.send(JSON.stringify(setupMessage));

        setIsConnected(true);
        setIsConnecting(false);
        setSessionState("listening");

        // Start recording and streaming mic audio
        const source = audioCtx.createMediaStreamSource(stream);
        sourceRef.current = source;
        const processor = audioCtx.createScriptProcessor(4096, 1, 1);
        processorRef.current = processor;

        source.connect(processor);
        processor.connect(audioCtx.destination);

        processor.onaudioprocess = (e) => {
          if (!isMuted && ws.readyState === WebSocket.OPEN) {
            const inputData = e.inputBuffer.getChannelData(0);
            const pcm16 = new Int16Array(inputData.length);
            for (let i = 0; i < inputData.length; i++) {
              pcm16[i] = Math.max(-1, Math.min(1, inputData[i])) * 0x7FFF;
            }

            // Base64 encode the PCM data
            const buffer = new ArrayBuffer(pcm16.length * 2);
            const view = new DataView(buffer);
            for (let i = 0; i < pcm16.length; i++) {
              view.setInt16(i * 2, pcm16[i], true);
            }

            const base64Data = btoa(
              new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
            );

            ws.send(JSON.stringify({
              realtimeInput: {
                mediaChunks: [{
                  mimeType: "audio/pcm;rate=16000",
                  data: base64Data
                }]
              }
            }));
          }
        };
      };

      ws.onmessage = (event) => {
        try {
            const response = JSON.parse(event.data);
            if (response.serverContent?.modelTurn?.parts) {
                setSessionState("speaking");
                const parts = response.serverContent.modelTurn.parts;
                for (const part of parts) {
                    if (part.inlineData && part.inlineData.data) {
                        playAudioChunk(part.inlineData.data);
                    }
                }
            }

            if (response.serverContent?.turnComplete) {
                setSessionState("listening");
            }
        } catch (e) {
            console.error("Error parsing Gemini message", e);
        }
      };

      ws.onerror = (e) => {
        console.error("Gemini Live WS Error:", e);
      };

      ws.onclose = () => {
        handleDisconnect();
      };

    } catch (err) {
      console.error("Live Agent Setup Error:", err);
      setIsConnecting(false);
      handleDisconnect();
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!audioContextRef.current) return;
    const ctx = audioContextRef.current;

    try {
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Gemini returns 24kHz PCM for audio. We need to create a buffer.
        const int16Array = new Int16Array(bytes.buffer);
        const float32Array = new Float32Array(int16Array.length);
        for (let i = 0; i < int16Array.length; i++) {
            float32Array[i] = int16Array[i] / 32768.0;
        }

        const audioBuffer = ctx.createBuffer(1, float32Array.length, 24000);
        audioBuffer.getChannelData(0).set(float32Array);

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.connect(ctx.destination);

        const playTime = Math.max(ctx.currentTime, nextPlayTimeRef.current);
        source.start(playTime);
        nextPlayTimeRef.current = playTime + audioBuffer.duration;
    } catch (e) {
        console.error("Error playing chunk", e);
    }
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setSessionState("idle");

    if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
    }

    if (processorRef.current) {
        processorRef.current.disconnect();
        processorRef.current = null;
    }

    if (sourceRef.current) {
        sourceRef.current.disconnect();
        sourceRef.current = null;
    }

    if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
        mediaStreamRef.current = null;
    }

    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="w-full h-full p-4 border border-white/5 bg-[#09090b] rounded-xl flex flex-col gap-4">
      <div className="text-center">
        <h2 className="text-lg font-serif text-white mb-1">Live Voice Agents</h2>
        <p className="text-zinc-400 text-xs">Speak directly in real-time.</p>
      </div>

        {!isConnected ? (
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center gap-6">
            <div
              className="w-24 h-24 rounded-full overflow-hidden border-2 flex items-center justify-center p-4 bg-black/40"
              style={{ borderColor: selectedVoice?.cardColor }}
            >
              <img
                src={selectedVoice?.imageUrl}
                alt={selectedVoice?.name}
                className="w-full h-full object-contain brightness-0 invert opacity-80"
              />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-serif text-white">{selectedVoice?.name}</h3>
              <p className="text-xs text-zinc-500 uppercase tracking-widest mt-1">Ready for call</p>
            </div>

            <button
              onClick={handleStartSession}
              disabled={isConnecting}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 disabled:opacity-50 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {isConnecting ? (
                <><Loader2 className="w-5 h-5 animate-spin" /> CONNECTING...</>
              ) : (
                <><Mic className="w-5 h-5" /> START LIVE SESSION</>
              )}
            </button>
          </div>
        ) : (
          <div className="w-full rounded-2xl overflow-hidden border border-white/10 bg-black/50 shadow-2xl flex flex-col h-[500px]">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center p-2 bg-black/40 border border-white/20"
                    style={{ backgroundColor: `${selectedVoice?.cardColor}30` }}
                  >
                    <img
                      src={selectedVoice?.imageUrl}
                      alt={selectedVoice?.name}
                      className="w-full h-full object-contain brightness-0 invert"
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-medium text-sm">{selectedVoice?.name}</h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="relative flex h-2 w-2">
                        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${sessionState === 'listening' || sessionState === 'speaking' ? 'bg-green-400' : 'bg-yellow-400'}`}></span>
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${sessionState === 'listening' || sessionState === 'speaking' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                      </span>
                      <span className="text-zinc-400 capitalize">{sessionState}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main visualizer area */}
              <div className="flex-1 flex flex-col items-center justify-center relative bg-gradient-to-b from-transparent to-black/40 p-8">
                 <div className="text-zinc-600 text-sm animate-pulse">
                    {sessionState === "speaking" ? "Agent is speaking..." : "Listening..."}
                 </div>
              </div>

              {/* Controls */}
              <div className="p-4 bg-white/5 border-t border-white/10 flex justify-center gap-4 pb-8">
                <button
                  onClick={toggleMute}
                  className={`p-4 rounded-full transition-colors ${isMuted ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30' : 'bg-white/10 text-white hover:bg-white/20'}`}
                >
                  {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                </button>
                <button
                  onClick={handleDisconnect}
                  className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                >
                  <PhoneOff size={24} />
                </button>
              </div>
          </div>
        )}
    </div>
  );
}
