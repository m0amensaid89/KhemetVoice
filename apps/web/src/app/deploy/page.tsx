'use client';

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Toggle } from "@/components/ui/Toggle";
import { Chip } from "@/components/ui/Chip";
import { Code, Copy, Globe, Terminal, Bot } from "lucide-react";

export default function DeployPage() {
  return (
    <AppShell title="Web Deployment">
      <div className="flex flex-col gap-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Configuration */}
          <div className="flex flex-col gap-6">
            <Card className="p-6 relative">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-display font-medium text-white">Widget Configuration</h3>
                <Badge variant="success">Deployed</Badge>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary block mb-2">Select Agent</label>
                  <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option>Sales Qualification Bot</option>
                    <option>Customer Support L1</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <Toggle
                    label="Test Mode"
                    description="When enabled, the widget only loads for internal IP addresses."
                    defaultChecked={false}
                  />
                </div>

                <div>
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary block mb-2">Domain Allowlist</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Chip onRemove={() => {}}>khemet.ai</Chip>
                    <Chip onRemove={() => {}}>app.khemet.ai</Chip>
                    <Chip onRemove={() => {}}>docs.khemet.ai</Chip>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. yourcompany.com"
                      className="flex-1 bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors"
                    />
                    <Button variant="secondary" size="sm">Add</Button>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary block mb-2">Widget Position</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-sm border border-primary bg-primary/5 cursor-pointer">
                      <input type="radio" name="position" className="text-primary" defaultChecked />
                      <span className="text-sm font-medium text-white">Bottom Right</span>
                    </label>
                    <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-sm border border-white/10 hover:bg-white/5 cursor-pointer">
                      <input type="radio" name="position" className="text-primary" />
                      <span className="text-sm font-medium text-white">Bottom Left</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary block mb-2">Theme Color</label>
                  <div className="flex gap-3">
                    <button className="w-8 h-8 rounded-full bg-primary border-2 border-white focus:outline-none"></button>
                    <button className="w-8 h-8 rounded-full bg-obsidian border-2 border-white/20 focus:outline-none"></button>
                    <button className="w-8 h-8 rounded-full bg-secondary border-2 border-white/20 focus:outline-none"></button>
                    <button className="w-8 h-8 rounded-full bg-tertiary border-2 border-white/20 focus:outline-none"></button>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-display font-medium text-white mb-4">Embed Code</h3>
              <p className="text-sm text-text-secondary mb-4">
                Paste this snippet into the <code className="bg-surface-high px-1 rounded text-primary">&lt;head&gt;</code> of your website to deploy the widget.
              </p>
              <div className="relative">
                <pre className="bg-surface-highest/50 p-4 rounded-sm border border-white/5 text-xs text-text-secondary overflow-x-auto font-mono">
{`<script>
  window.khemetConfig = {
    agentId: "agt_02h9y",
    theme: "dark",
    position: "bottom-right",
    primaryColor: "#2563eb"
  };
</script>
<script src="https://cdn.khemet.ai/widget/v1.js" async></script>`}
                </pre>
                <Button variant="secondary" size="sm" className="absolute top-2 right-2 gap-2 bg-surface-low border-white/10">
                  <Copy className="w-3 h-3" />
                  Copy
                </Button>
              </div>
            </Card>
          </div>

          {/* Live Preview Area */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white">Live Preview</h3>
              <Badge variant="active">Active Simulation</Badge>
            </div>

            <Card className="flex-1 min-h-[500px] relative overflow-hidden p-0 border border-white/10 bg-white">
              {/* Fake Website Content to show widget on top */}
              <div className="absolute inset-0 bg-gray-50 flex flex-col p-8 opacity-50 pointer-events-none">
                <div className="w-full h-12 bg-gray-200 rounded mb-8"></div>
                <div className="w-2/3 h-8 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
                <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
              </div>

              {/* The Widget Preview */}
              <div className="absolute bottom-6 right-6 w-80 shadow-2xl flex flex-col pointer-events-auto">
                {/* Chat Window */}
                <div className="bg-obsidian border border-white/10 rounded-t-lg overflow-hidden flex flex-col h-96">
                  <div className="bg-primary p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                      <span className="font-medium text-white text-sm">Khemet Assistant</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 bg-surface-low flex flex-col gap-4 overflow-y-auto">
                    <div className="bg-surface-high p-3 rounded-lg rounded-tl-none self-start max-w-[80%] border border-white/5">
                      <p className="text-sm text-white">Hello! How can I help you today?</p>
                    </div>
                  </div>
                  <div className="p-4 bg-surface border-t border-white/5">
                    <div className="bg-surface-high border border-white/10 rounded-full px-4 py-2 text-sm text-text-secondary flex items-center justify-between">
                      <span>Type a message...</span>
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
                {/* Launcher Button (Connected to window) */}
              </div>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
