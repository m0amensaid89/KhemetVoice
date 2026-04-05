"use client";

import { useState } from "react";
import { Check, X, Mail } from "lucide-react";
import { RegisterModal } from "./RegisterModal";

const PLANS = [
  {
    name: "FREE",
    price: "$0",
    period: "/month",
    border: "border-white/10",
    highlight: false,
    features: [
      { text: "3 voice generations per day", included: true },
      { text: "7 Khemet hero voices", included: true },
      { text: "Single & dual speaker", included: true },
      { text: "300 characters per generation", included: true },
      { text: "Download creations", included: false },
      { text: "Email support", included: false },
    ],
    cta: "Get Started Free",
    ctaAction: "modal" as const,
  },
  {
    name: "STARTER",
    price: "$9",
    period: "/month",
    border: "border-white/10",
    highlight: false,
    features: [
      { text: "20 voice generations per day", included: true },
      { text: "7 Khemet hero voices", included: true },
      { text: "Single & dual speaker", included: true },
      { text: "500 characters per generation", included: true },
      { text: "Download MP3", included: true },
      { text: "Email support", included: true },
    ],
    cta: "Start Free Trial",
    ctaAction: "modal" as const,
  },
  {
    name: "PRO",
    price: "$29",
    period: "/month",
    border: "border-[#D4AF37]",
    highlight: true,
    badge: "Most Popular",
    features: [
      { text: "100 voice generations per day", included: true },
      { text: "All 7 voices + priority new voices", included: true },
      { text: "Single & dual speaker", included: true },
      { text: "1000 characters per generation", included: true },
      { text: "Download MP3 + WAV", included: true },
      { text: "Custom style presets", included: true },
      { text: "Priority support", included: true },
    ],
    cta: "Go Pro",
    ctaAction: "modal" as const,
  },
  {
    name: "ENTERPRISE",
    price: "Custom",
    period: "",
    border: "border-dashed border-white/20",
    highlight: false,
    features: [
      { text: "Unlimited generations", included: true },
      { text: "Custom voice personas", included: true },
      { text: "Full API access", included: true },
      { text: "White-label option", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantee", included: true },
    ],
    cta: "Contact Us",
    ctaAction: "email" as const,
  },
];

export function PricingSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full py-24 px-6 bg-[#09090b] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4AF37] text-xs font-bold uppercase tracking-[0.3em] mb-3">PRICING</p>
          <h2 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-cinzel)" }}>
            Choose Your Voice.
          </h2>
          <p className="text-zinc-400 text-lg">Start free. Scale when you're ready.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-xl border ${plan.border} bg-zinc-900/50 p-6 ${
                plan.highlight ? "shadow-[0_0_30px_rgba(212,175,55,0.15)]" : ""
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-2">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  {plan.period && <span className="text-zinc-500 text-sm mb-1">{plan.period}</span>}
                </div>
              </div>

              <ul className="flex flex-col gap-2.5 flex-1 mb-8">
                {plan.features.map((f) => (
                  <li key={f.text} className="flex items-start gap-2 text-sm">
                    {f.included ? (
                      <Check size={14} className="text-[#D4AF37] shrink-0 mt-0.5" />
                    ) : (
                      <X size={14} className="text-zinc-600 shrink-0 mt-0.5" />
                    )}
                    <span className={f.included ? "text-zinc-300" : "text-zinc-600"}>{f.text}</span>
                  </li>
                ))}
              </ul>

              {plan.ctaAction === "email" ? (
                <a
                  href="mailto:hello@khemetvoice.com"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-white/20 text-zinc-300 text-sm font-medium hover:border-white/40 hover:text-white transition-all"
                >
                  <Mail size={14} />
                  {plan.cta}
                </a>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className={`w-full py-2.5 rounded-lg text-sm font-bold transition-all hover:scale-[1.02] active:scale-95 ${
                    plan.highlight
                      ? "bg-[#D4AF37] text-black"
                      : "bg-white/5 border border-white/10 text-white hover:bg-white/10"
                  }`}
                >
                  {plan.cta}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <RegisterModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={() => setShowModal(false)} />
    </section>
  );
}
