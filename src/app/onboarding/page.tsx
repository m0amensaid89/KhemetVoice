import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-obsidian flex flex-col">
      {/* Simple Header */}
      <header className="h-16 flex items-center px-8 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10">
            <Image src="/khemet-logo.jpg" alt="Khemet Logo" fill className="object-cover" />
          </div>
          <span className="font-display font-bold text-lg tracking-wide text-white">
            KHEMET
          </span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-2xl">

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-px bg-white/10 -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/3 h-px bg-primary -z-10"></div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-white">Account</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-high border-2 border-primary flex items-center justify-center text-primary font-medium text-sm">
                2
              </div>
              <span className="text-xs font-medium text-primary">Workspace</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-low border border-white/10 flex items-center justify-center text-text-secondary font-medium text-sm">
                3
              </div>
              <span className="text-xs font-medium text-text-secondary">Deploy</span>
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-medium text-white mb-2">Configure Your Workspace</h1>
            <p className="text-text-secondary">Set up your enterprise environment before deploying your first agent.</p>
          </div>

          <Card elite className="p-8 flex flex-col gap-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Company Name" placeholder="e.g. Acme Corp" />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Industry</label>
                <select className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option value="finance">Banking & Finance</option>
                  <option value="telecom">Telecommunications</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="government">Government</option>
                  <option value="other">Other Enterprise</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Primary Region</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className="flex items-center gap-3 p-4 rounded-sm border border-primary bg-primary/5 cursor-pointer">
                  <input type="radio" name="region" className="text-primary focus:ring-primary/50" defaultChecked />
                  <span className="text-sm font-medium text-white">MENA</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-sm border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                  <input type="radio" name="region" className="text-primary focus:ring-primary/50" />
                  <span className="text-sm font-medium text-white">Europe</span>
                </label>
                <label className="flex items-center gap-3 p-4 rounded-sm border border-white/10 hover:bg-white/5 cursor-pointer transition-colors">
                  <input type="radio" name="region" className="text-primary focus:ring-primary/50" />
                  <span className="text-sm font-medium text-white">North America</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center justify-between">
              <Button variant="tertiary">Skip for now</Button>
              <Link href="/dashboard">
                <Button className="gap-2">
                  Complete Setup <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
