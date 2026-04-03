import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ArrowLeft, Save, Sparkles, BrainCircuit, Globe } from "lucide-react";
import Link from "next/link";

export default function CreateAgentPage() {
  return (
    <AppShell title="Configure Agent">
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link href="/agents" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Agents
          </Link>
          <div className="flex items-center gap-3">
            <Button variant="secondary">Cancel</Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <Card elite className="p-0 overflow-hidden">
          <div className="p-6 md:p-8 flex flex-col gap-8">

            {/* Identity Section */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <BrainCircuit className="w-5 h-5 text-tertiary" />
                <h2 className="text-lg font-display font-medium text-white">Agent Identity</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="Agent Name" placeholder="e.g. Sales Qualification Bot" defaultValue="New Agent" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Primary Language</label>
                  <select className="w-full bg-transparent border-b border-white/20 px-0 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="ar">Arabic (Gulf)</option>
                    <option value="en">English (US)</option>
                    <option value="ar-en">Bilingual (Arabic / English)</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 mt-2">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">System Prompt / Persona</label>
                <textarea
                  className="w-full bg-surface-high/30 border border-white/10 rounded-sm p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none h-32"
                  placeholder="Define the agent's behavior, tone, and constraints..."
                  defaultValue="You are a professional sales assistant for Khemet.ai. Your goal is to qualify leads by asking a series of questions..."
                />
              </div>
            </section>

            {/* Knowledge Section */}
            <section className="flex flex-col gap-4">
              <div className="flex items-center gap-2 pb-2 border-b border-white/5">
                <Sparkles className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-display font-medium text-white">Knowledge Base & Tools</h2>
              </div>
              <div className="p-6 border border-dashed border-white/20 rounded-sm flex flex-col items-center justify-center gap-4 bg-surface-high/10">
                <div className="w-12 h-12 rounded-full bg-surface-high flex items-center justify-center text-text-secondary">
                  <Globe className="w-6 h-6" />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-white mb-1">Attach Knowledge Sources</h3>
                  <p className="text-xs text-text-secondary max-w-md">Upload documents or connect URLs to provide this agent with context. Supported formats: PDF, TXT, DOCX.</p>
                </div>
                <Button variant="secondary" size="sm">Browse Files</Button>
              </div>
            </section>

          </div>
        </Card>
      </div>
    </AppShell>
  );
}
