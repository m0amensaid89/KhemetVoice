import { Button } from "@/components/ui/Button";
import { VoiceHero } from "@/components/VoiceHero";
import { TryItFree } from "@/components/TryItFree";
import { PricingSection } from "@/components/PricingSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-obsidian">

      {/* ── TOP NAV ─────────────────────────────────────────── */}
      <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Khemet Voice"
            className="h-10 w-auto object-contain"
          />
        </div>
        <Link href="/auth">
          <Button size="sm" variant="secondary" className="gap-2 border-white/20">
            Sign In <ArrowRight className="w-3 h-3" />
          </Button>
        </Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="w-full">
        <VoiceHero />
      </section>

      {/* ── TRY IT FREE ─────────────────────────────────────── */}
      <TryItFree />

      {/* ── PRICING ─────────────────────────────────────────── */}
      <PricingSection />

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-6 px-8 flex items-center justify-between text-xs text-text-secondary">
        <span>© 2026 Khemet Voice. All rights reserved.</span>
        <span>Built for the MENA enterprise.</span>
      </footer>
    </div>
  );
}
