"use client";

import React, { useState } from "react";
import { RegisterModal } from "./RegisterModal";
import { Check, X } from "lucide-react";

export function PricingSection() {
  const [showModal, setShowModal] = useState(false);

  return (
    <section className="w-full py-24 bg-[#09090b]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-4">
            PRICING
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white mb-4">
            Choose your voice.
          </h2>
          <p className="text-xl text-zinc-400">
            Start free. Scale when you're ready.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* FREE */}
          <div className="flex flex-col p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">FREE</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-white">$0</span>
                <span className="text-zinc-400">/ month</span>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>3 voice generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>7 Khemet hero voices</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Single & dual speaker</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>300 characters per generation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-500">
                <X className="w-5 h-5 text-zinc-600 shrink-0" />
                <span>No downloads</span>
              </li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 px-4 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Get Started Free
            </button>
          </div>

          {/* STARTER */}
          <div className="flex flex-col p-8 rounded-2xl bg-zinc-900/50 border border-white/10">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">STARTER</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-white">$9</span>
                <span className="text-zinc-400">/ month</span>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>20 generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>7 Khemet hero voices</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Single & dual speaker</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>500 characters per generation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Download MP3</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Email support</span>
              </li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 px-4 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Start Free Trial
            </button>
          </div>

          {/* PRO */}
          <div className="relative flex flex-col p-8 rounded-2xl bg-zinc-900 border-2 border-[#D4AF37]" style={{ boxShadow: '0 0 30px rgba(212,175,55,0.15)' }}>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
              Most Popular
            </div>

            <div className="mb-8 mt-2">
              <h3 className="text-xl font-bold text-white mb-2">PRO</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-white">$29</span>
                <span className="text-zinc-400">/ month</span>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>100 generations per day</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>All 7 hero voices + priority new voices</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Single & dual speaker</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>1000 characters per generation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Download MP3 + WAV</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Custom style presets</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>

            <button
              onClick={() => setShowModal(true)}
              className="w-full py-3 px-4 rounded-lg bg-[#D4AF37] text-black font-bold hover:bg-[#D4AF37]/90 transition-colors"
            >
              Go Pro
            </button>
          </div>

          {/* ENTERPRISE */}
          <div className="flex flex-col p-8 rounded-2xl bg-zinc-900/50 border border-dashed border-white/20">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-2">ENTERPRISE</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-white">Custom</span>
              </div>
            </div>

            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Unlimited generations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Custom voice personas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Full API access</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>White-label option</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>Dedicated account manager</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-zinc-300">
                <Check className="w-5 h-5 text-[#D4AF37] shrink-0" />
                <span>SLA guarantee</span>
              </li>
            </ul>

            <a
              href="mailto:hello@khemetvoice.com"
              className="w-full block text-center py-3 px-4 rounded-lg border border-white/10 text-white font-medium hover:bg-white/5 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <RegisterModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={() => {}}
      />
    </section>
  );
}
