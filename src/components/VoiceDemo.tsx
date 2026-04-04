"use client";

import { useState } from "react";
import { Play, Square, Globe, Loader2 } from "lucide-react";

const LANGUAGES = [
  {
    code: "en",
    label: "English",
    flag: "🇺🇸",
    text: "Your customers are speaking — Khemet Voice makes sure you answer in the language they trust.",
    style: "Cinematic narrator. Calm, absolute authority. Deliver like an undeniable fact. Slight downward inflection at the end.",
  },
  {
    code: "ar-eg",
    label: "عربي مصري",
    flag: "🇪🇬",
    text: "عميلك عايزك تكلمه بلغته — وخيمت فويس بيعمل ده بالظبط.",
    style: "صوت مصري شاب وواثق من القاهرة. لهجة عامية أصيلة، في ابتسامة خفية في الكلام.",
  },
  {
    code: "ar-sa",
    label: "عربي سعودي",
    flag: "🇸🇦",
    text: "عميلك يستاهل يُخاطَب بلغته — وخيمت فويس يضمن لك ذا.",
    style: "صوت خليجي سعودي ثقيل وهادئ. كلام موزون ومحسوب. ثقة المؤسس لا حماس المعلن.",
  },
  {
    code: "zh",
    label: "中文",
    flag: "🇨🇳",
    text: "您的客户用心说话——Khemet Voice，用他们的语言回应。",
    style: "沉稳睿智的商业声音。语速适中，每个字清晰有力。结尾像不容置疑的声明。",
  },
  {
    code: "hi",
    label: "हिंदी",
    flag: "🇮🇳",
    text: "हर ग्राहक चाहता है कि कोई उसकी भाषा में बात करे — Khemet Voice के साथ।",
    style: "आत्मविश्वास से भरी गर्मजोशी वाली आवाज़। दिल से बोलना, आखिर में गर्व झलके।",
  },
  {
    code: "es",
    label: "Español",
    flag: "🇪🇸",
    text: "Habla el idioma de tu cliente — con Khemet Voice.",
    style: "Voz cálida y apasionada latinoamericana. Convicción genuina, no slogan. Pausa antes de Khemet Voice.",
  },
  {
    code: "ru",
    label: "Русский",
    flag: "🇷🇺",
    text: "Говорите с клиентом на его языке — с Khemet Voice.",
    style: "Уверенный профессиональный голос. Произносится как неопровержимый факт. Пауза перед Khemet Voice.",
  },
];

export function VoiceDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  const active = LANGUAGES[activeIndex];

  async function handlePlay() {
    if (isPlaying && audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
      setIsPlaying(false);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: active.text,
          style: active.style,
        }),
      });

      if (!res.ok) throw new Error("TTS failed");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);

      const audio = new Audio(url);
      setAudioEl(audio);
      audio.play();
      setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSelect(index: number) {
    if (audioEl) {
      audioEl.pause();
      audioEl.currentTime = 0;
    }
    setIsPlaying(false);
    setAudioUrl(null);
    setActiveIndex(index);
  }

  return (
    <section className="w-full py-24 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-obsidian to-obsidian pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-12">

        {/* Header */}
        <div className="text-center flex flex-col gap-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-xs font-medium uppercase tracking-widest text-secondary mx-auto">
            <Globe className="w-3 h-3" />
            Live Voice Demo
          </div>
          <h2 className="font-display text-3xl lg:text-4xl font-medium text-white">
            Hear Khemet Voice speak your customer&apos;s language.
          </h2>
          <p className="text-text-secondary text-base max-w-xl mx-auto">
            Select a language below and press play. One platform. Every dialect. Every emotion.
          </p>
        </div>

        {/* Language selector */}
        <div className="flex flex-wrap justify-center gap-2">
          {LANGUAGES.map((lang, i) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium transition-all border ${
                i === activeIndex
                  ? "bg-primary/20 border-primary text-white"
                  : "bg-white/5 border-white/10 text-text-secondary hover:text-white hover:border-white/30"
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.label}</span>
            </button>
          ))}
        </div>

        {/* Player card */}
        <div className="w-full max-w-2xl bg-surface-low border border-white/5 rounded-lg p-8 flex flex-col gap-6 relative overflow-hidden">
          {/* Amber accent line */}
          <div className="absolute top-0 left-0 h-[2px] w-8 bg-tertiary" />

          {/* Quote text */}
          <p
            className={`text-white text-xl font-display font-medium leading-relaxed text-center min-h-[80px] flex items-center justify-center ${
              active.code.startsWith("ar") ? "text-right" : "text-center"
            }`}
            dir={active.code.startsWith("ar") ? "rtl" : "ltr"}
          >
            &ldquo;{active.text}&rdquo;
          </p>

          {/* Waveform visual (decorative) */}
          <div className="flex items-center justify-center gap-[3px] h-8">
            {Array.from({ length: 32 }).map((_, i) => (
              <div
                key={i}
                className={`w-[3px] rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-secondary animate-pulse"
                    : "bg-white/20"
                }`}
                style={{
                  height: isPlaying
                    ? `${Math.random() * 24 + 8}px`
                    : `${8 + Math.sin(i * 0.5) * 6}px`,
                  animationDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>

          {/* Play button */}
          <div className="flex justify-center">
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className={`flex items-center gap-3 px-8 py-3 rounded-sm font-medium text-sm transition-all ${
                isPlaying
                  ? "bg-white/10 border border-white/20 text-white hover:bg-white/15"
                  : "bg-primary text-white hover:bg-primary/90"
              } disabled:opacity-50 disabled:pointer-events-none`}
            >
              {isLoading ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Generating voice...</>
              ) : isPlaying ? (
                <><Square className="w-4 h-4 fill-current" /> Stop</>
              ) : (
                <><Play className="w-4 h-4 fill-current" /> Play in {active.label}</>
              )}
            </button>
          </div>

          {/* Language label */}
          <p className="text-center text-xs text-text-secondary uppercase tracking-widest">
            {active.flag} {active.label} · Powered by Khemet Voice AI
          </p>
        </div>

        {/* CTA */}
        <p className="text-text-secondary text-sm text-center">
          Ready to give your business a voice?{" "}
          <a href="/onboarding" className="text-secondary hover:text-white transition-colors underline underline-offset-2">
            Get started free →
          </a>
        </p>
      </div>
    </section>
  );
}
