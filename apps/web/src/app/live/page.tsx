"use client";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { PhoneOff, Volume2, User, Bot, AlertTriangle, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function LiveConversationPage() {
  const [waveforms, setWaveforms] = useState<Array<{height: number, delay: number}>>([]);

  useEffect(() => {
    // Slight delay to avoid synchronous state update warning during initial mount phase
    const timer = setTimeout(() => {
      setWaveforms(Array.from({ length: 40 }).map(() => ({
        height: Math.random() * 80 + 10,
        delay: Math.random() * 0.5
      })));
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AppShell title="Live Monitor">
      <div className="flex flex-col gap-6 h-[calc(100vh-8rem)]">

        {/* Active Call Header */}
        <div className="flex items-center justify-between bg-surface-low border border-white/5 p-4 rounded-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-secondary/30 relative">
              <Bot className="w-6 h-6 text-secondary" />
              <StatusIndicator status="active" pulse className="absolute bottom-0 right-0 border-2 border-surface-low rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h2 className="text-lg font-medium text-white">Sales Qualification Bot</h2>
                <Badge variant="active" className="animate-pulse">Live Session</Badge>
              </div>
              <div className="text-sm text-text-secondary">
                Talking to: <span className="text-white">+971 50 123 4567</span> • Duration: <span className="font-mono text-secondary">04:12</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="gap-2 text-white/70 hover:text-white">
              <Volume2 className="w-4 h-4" />
              Listen In
            </Button>
            <Button className="bg-tertiary text-obsidian hover:bg-tertiary/90 gap-2 font-medium">
              <AlertTriangle className="w-4 h-4" />
              Takeover Call
            </Button>
            <Button variant="secondary" className="gap-2 border-red-500/30 text-red-400 hover:bg-red-500/10">
              <PhoneOff className="w-4 h-4" />
              Terminate
            </Button>
          </div>
        </div>

        {/* Split View: Waveform/Transcript & Metadata */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">

          {/* Main Visualizer & Transcript */}
          <Card className="lg:col-span-2 flex flex-col overflow-hidden">
            {/* Waveform Area */}
            <div className="h-48 bg-obsidian flex items-center justify-center relative border-b border-white/5">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-secondary/10 via-obsidian to-obsidian opacity-50"></div>

              {/* Fake Waveform Visuals */}
              <div className="flex items-center gap-1 h-24 z-10 px-8">
                {waveforms.map((wave, i) => (
                  <div
                    key={i}
                    className="w-1.5 bg-secondary rounded-full animate-pulse shadow-[0_0_8px_rgba(76,215,246,0.5)]"
                    style={{
                      height: `${wave.height}%`,
                      animationDelay: `${wave.delay}s`,
                      opacity: i < 20 ? 1 : 0.3 // Simulate speaking vs listening
                    }}
                  />
                ))}
              </div>
              <div className="absolute bottom-4 left-4 text-xs font-mono text-secondary tracking-widest uppercase">
                Analyzing Audio Stream...
              </div>
            </div>

            {/* Live Transcript */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 bg-surface-high/20">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-high flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-secondary" />
                </div>
                <div className="bg-surface-low border border-white/5 p-4 rounded-sm rounded-tl-none max-w-[80%]">
                  <p className="text-sm text-white">Hello, thank you for calling Khemet Enterprises. Am I speaking with Ahmed?</p>
                </div>
              </div>

              <div className="flex gap-4 flex-row-reverse">
                <div className="w-8 h-8 rounded-full bg-surface-high flex-shrink-0 flex items-center justify-center">
                  <User className="w-4 h-4 text-text-secondary" />
                </div>
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-sm rounded-tr-none max-w-[80%]">
                  <p className="text-sm text-white">Yes, speaking. I wanted to inquire about the new enterprise plans.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-surface-high flex-shrink-0 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-secondary" />
                </div>
                <div className="bg-surface-low border border-white/5 p-4 rounded-sm rounded-tl-none max-w-[80%] relative">
                  <p className="text-sm text-white">Excellent. To better assist you, could you confirm how many agent licenses your team currently requires?</p>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-secondary rounded-r-full shadow-[0_0_8px_rgba(76,215,246,0.5)]"></div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-text-secondary py-4">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce" style={{ animationDelay: '300ms' }}></span>
                <span className="ml-2 uppercase tracking-widest text-[10px]">Processing Input</span>
              </div>
            </div>
          </Card>

          {/* Metadata Sidebar */}
          <Card className="flex flex-col overflow-hidden bg-surface-low">
            <div className="p-4 border-b border-white/5 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-text-secondary" />
              <h3 className="text-sm font-medium uppercase tracking-wider text-white">Session Intelligence</h3>
            </div>

            <div className="p-5 flex flex-col gap-6 overflow-y-auto">

              {/* Intent Analysis */}
              <div>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Detected Intent</div>
                <Badge variant="success" className="text-sm px-3 py-1">High Intent - Purchase</Badge>
              </div>

              {/* Extracted Entities */}
              <div>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Extracted Data</div>
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center bg-surface-high/50 p-2 rounded-sm border border-white/5">
                    <span className="text-xs text-text-secondary">Name</span>
                    <span className="text-sm text-white">Ahmed</span>
                  </div>
                  <div className="flex justify-between items-center bg-surface-high/50 p-2 rounded-sm border border-white/5">
                    <span className="text-xs text-text-secondary">Topic</span>
                    <span className="text-sm text-white">Enterprise Plans</span>
                  </div>
                  <div className="flex justify-between items-center border border-dashed border-white/20 p-2 rounded-sm">
                    <span className="text-xs text-text-secondary">Licenses Needed</span>
                    <span className="text-xs text-tertiary animate-pulse">Awaiting Answer...</span>
                  </div>
                </div>
              </div>

              {/* Sentiment */}
              <div>
                <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Customer Sentiment</div>
                <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden flex">
                  <div className="h-full bg-emerald-500 w-[70%]"></div>
                  <div className="h-full bg-tertiary w-[20%]"></div>
                  <div className="h-full bg-red-500 w-[10%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-text-secondary mt-1">
                  <span>Positive</span>
                  <span>Neutral</span>
                  <span>Negative</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </AppShell>
  );
}
