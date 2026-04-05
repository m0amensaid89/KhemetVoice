import { VoiceHero } from "@/components/VoiceHero";
import { TryItFree } from "@/components/TryItFree";
import { PricingSection } from "@/components/PricingSection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#09090b]">

      {/* ── NAV ── */}
      <nav className="w-full flex items-center justify-between px-8 py-5 border-b border-white/5 absolute top-0 left-0 z-50">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Khemet Voice" className="h-10 w-auto object-contain" />
          <span
            className="text-white uppercase hidden sm:block"
            style={{ fontFamily: "var(--font-cinzel)", fontSize: "0.95rem", fontWeight: 700, letterSpacing: "0.12em" }}
          >
            Voice of Khemet
          </span>
        </div>
        <Link href="/auth">
          <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-black font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <ArrowRight className="w-4 h-4" />
            REGISTER NOW
          </button>
        </Link>
      </nav>

      {/* ── 3D CAROUSEL HERO ── */}
      <section className="w-full">
        <VoiceHero />
      </section>

      {/* ── TRY IT FREE ── */}
      <TryItFree />

      {/* ── PRICING ── */}
      <PricingSection />

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-6 px-8 flex items-center justify-between text-xs text-zinc-600">
        <span>© 2026 Khemet Voice. All rights reserved.</span>
        <span>Built for the MENA enterprise.</span>
      </footer>

    </div>
  );
}
