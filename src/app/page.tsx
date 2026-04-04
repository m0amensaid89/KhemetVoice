import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { VoiceDemo } from "@/components/VoiceDemo";
import { VoiceHero } from "@/components/VoiceHero";
import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
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
          <span className="font-cinzel font-bold text-xl tracking-wide text-white">
            VOICE OF KHEMET
          </span>
        </div>
        <Link href="#login">
          <Button
            className="bg-secondary hover:bg-secondary/90 text-obsidian rounded-full px-8 py-6 font-bold tracking-wide uppercase flex items-center gap-3 transition-colors"
          >
            <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-obsidian border-b-[6px] border-b-transparent"></div>
            REGISTER NOW
          </Button>
        </Link>
      </nav>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="w-full">
        <VoiceHero />
      </section>

      {/* ── VOICE DEMO ──────────────────────────────────────── */}
      <div id="demo" className="border-t border-white/5">
        <VoiceDemo />
      </div>

      {/* ── STATS BAR ───────────────────────────────────────── */}
      <section className="border-t border-b border-white/5 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "82+", label: "Languages" },
            { value: "<300ms", label: "Latency" },
            { value: "24/7", label: "Availability" },
            { value: "100%", label: "MENA-Native" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
              <span className="font-display text-3xl font-bold text-tertiary">
                {stat.value}
              </span>
              <span className="text-text-secondary text-sm uppercase tracking-widest">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── LOGIN FORM ──────────────────────────────────────── */}
      <div id="login" className="flex flex-col md:flex-row flex-1">
        {/* Left branding panel */}
        <div className="hidden md:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-surface-low border-r border-white/5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-obsidian to-obsidian" />

          <div className="relative z-10 flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Khemet Voice"
              className="h-10 w-auto object-contain"
            />
            <span className="font-cinzel font-bold text-xl tracking-wide text-white">
              VOICE OF KHEMET
            </span>
          </div>

          <div className="relative z-10 max-w-lg mt-auto pb-12">
            <Badge className="mb-6 border-white/10 text-white/70">
              Sovereign Intelligence Command Center
            </Badge>
            <h2 className="font-display text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
              Your command center awaits.
            </h2>
            <p className="text-text-secondary text-lg">
              Manage agents, review sessions, capture leads, and monitor
              performance — all from one secure workspace.
            </p>
          </div>

          <div
            className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Right login form */}
        <div className="flex-1 flex flex-col justify-center items-center p-8 py-16 relative">
          <div className="w-full max-w-md flex flex-col gap-8">
            <div className="md:hidden flex items-center gap-3 mb-4 justify-center">
              <img
                src="/logo.png"
                alt="Khemet Voice"
                className="h-10 w-auto object-contain"
              />
              <span className="font-cinzel font-bold text-xl tracking-wide text-white">
                VOICE OF KHEMET
              </span>
            </div>

            <div>
              <h2 className="font-display text-2xl font-medium text-white mb-2">
                Access Command Center
              </h2>
              <p className="text-text-secondary text-sm">
                Enter your credentials to access your workspace.
              </p>
            </div>

            <Card className="p-8 flex flex-col gap-6 bg-surface-low border-white/5 shadow-2xl">
              <div className="flex flex-col gap-4">
                <Input
                  label="Work Email"
                  type="email"
                  placeholder="name@company.com"
                />
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                />

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-white/20 bg-surface text-primary focus:ring-primary/50"
                    />
                    <span className="text-text-secondary">Remember device</span>
                  </label>
                  <a
                    href="#"
                    className="text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full gap-2">
                    Initiate Access Session{" "}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 border-t border-white/10" />
                  <span className="text-xs text-text-secondary uppercase tracking-wider">
                    Or
                  </span>
                  <div className="flex-1 border-t border-white/10" />
                </div>

                <Button
                  variant="secondary"
                  className="w-full gap-2 bg-surface-high hover:bg-surface-highest border-white/10 text-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.64 9.20455C17.64 8.56636 17.5827 7.95273 17.4764 7.36364H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9455 17.64 9.20455Z"
                      fill="#4285F4"
                    />
                    <path
                      d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4205 9 14.4205C6.65591 14.4205 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z"
                      fill="#34A853"
                    />
                    <path
                      d="M3.96409 10.71C3.78409 10.17 3.68182 9.59318 3.68182 9C3.68182 8.40682 3.78409 7.83 3.96409 7.29V4.95818H0.957275C0.347727 6.17318 0 7.54773 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z"
                      fill="#EA4335"
                    />
                  </svg>
                  Continue with Google
                </Button>

                <Button
                  variant="secondary"
                  className="w-full gap-2 bg-surface-high hover:bg-surface-highest border-white/10 text-white"
                >
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Continue with SAML SSO
                </Button>
              </div>
            </Card>

            <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
              <ShieldCheck className="w-4 h-4" />
              End-to-end encrypted connection
            </div>
          </div>
        </div>
      </div>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-white/5 py-6 px-8 flex justify-center text-center text-sm text-secondary">
        <span className="font-cinzel tracking-wide whitespace-nowrap">
          The Rise of the Voice • Intelligence now speaks. © Voice of Khemet — All rights reserved 2026
        </span>
      </footer>
    </div>
  );
}

// Inline Badge component
function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium uppercase tracking-wider bg-white/5 border border-white/10 text-white/70 ${className ?? ""}`}
    >
      {children}
    </span>
  );
}
