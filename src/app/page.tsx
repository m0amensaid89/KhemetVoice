import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-obsidian">
      {/* Left side - Branding & Imagery */}
      <div className="hidden md:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden bg-surface-low border-r border-white/5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/20 via-obsidian to-obsidian"></div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
            <Image src="/khemet-logo.jpg" alt="Khemet Logo" fill className="object-cover" />
          </div>
          <span className="font-display font-bold text-2xl tracking-wide text-white">
            KHEMET
          </span>
        </div>

        <div className="relative z-10 max-w-lg mt-auto pb-12">
          <Badge variant="neutral" className="mb-6 border-white/10 text-white/70">Enterprise Voice AI</Badge>
          <h1 className="font-display text-4xl lg:text-5xl font-medium text-white leading-tight mb-6">
            The Sovereign Intelligence Command Center.
          </h1>
          <p className="text-text-secondary text-lg">
            Secure, reliable, MENA-native voice agents built for high-stakes enterprise operations.
          </p>
        </div>

        {/* Decorative Grid */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-10"
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
        <div className="w-full max-w-md flex flex-col gap-8">

          <div className="md:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10">
              <Image src="/khemet-logo.jpg" alt="Khemet Logo" fill className="object-cover" />
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white">
              KHEMET
            </span>
          </div>

          <div>
            <h2 className="font-display text-2xl font-medium text-white mb-2">Access Command Center</h2>
            <p className="text-text-secondary text-sm">Enter your credentials to access your workspace.</p>
          </div>

          <Card className="p-8 flex flex-col gap-6 bg-surface-low border-white/5 shadow-2xl">
            <Input label="Work Email" type="email" placeholder="name@company.com" />
            <Input label="Password" type="password" placeholder="••••••••" />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-white/20 bg-surface text-primary focus:ring-primary/50" />
                <span className="text-text-secondary">Remember device</span>
              </label>
              <a href="#" className="text-primary hover:text-primary/80 transition-colors">Forgot password?</a>
            </div>

            <Link href="/dashboard" className="w-full mt-2">
              <Button className="w-full gap-2">
                Initiate Access Session <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </Card>

          <div className="flex items-center justify-center gap-2 text-xs text-text-secondary">
            <ShieldCheck className="w-4 h-4" />
            End-to-end encrypted connection
          </div>
        </div>
      </div>
    </div>
  );
}

// Inline Badge component specifically for this page to keep dependencies clean
function Badge({ children, className, variant = "neutral" }: { children: React.ReactNode, className?: string, variant?: "neutral" }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider bg-white/5 border border-white/10 ${className}`}>
      {children}
    </span>
  );
}
