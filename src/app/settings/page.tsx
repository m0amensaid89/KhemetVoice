import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Save, Building, ShieldCheck, Bell, MessageSquare, Database, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppShell title="Workspace Settings">
      <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full">

        {/* Settings Navigation Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-1">
          <button className="flex items-center gap-3 px-4 py-3 rounded-sm bg-white/5 text-primary border-l-2 border-primary text-sm font-medium transition-colors text-left">
            <Building className="w-4 h-4" />
            General Information
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-sm text-text-secondary hover:text-white hover:bg-white/5 text-sm font-medium transition-colors text-left">
            <ShieldCheck className="w-4 h-4" />
            Security & Compliance
          </button>
          <button className="flex items-center gap-3 px-4 py-3 rounded-sm text-text-secondary hover:text-white hover:bg-white/5 text-sm font-medium transition-colors text-left">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
        </div>

        {/* Main Settings Area */}
        <div className="flex-1 flex flex-col gap-6">
          <Card className="p-8 flex flex-col gap-8">
            <div>
              <h2 className="text-lg font-display font-medium text-white mb-1">Workspace Profile</h2>
              <p className="text-sm text-text-secondary">Update your company details and primary operational region.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Workspace Name" defaultValue="Khemet Enterprises" />
              <Input label="Workspace Slug" defaultValue="khemet-ent" />
            </div>

            <div>
              <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary block mb-2">Industry Focus</label>
              <select className="w-full md:w-1/2 bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                <option>Telecommunications</option>
                <option>Banking & Finance</option>
                <option>Healthcare</option>
              </select>
            </div>

            <div className="pt-6 border-t border-white/5 flex justify-end">
              <Button className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </Card>

          {/* Language Settings */}
          <Card className="p-8 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-display font-medium text-white">Language Settings</h2>
              </div>
              <p className="text-sm text-text-secondary">Configure default languages and voice synthesis preferences for the workspace.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Default Primary Language</label>
                <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Arabic (Gulf) - Default</option>
                  <option>English (US)</option>
                  <option>Bilingual (Auto-detect)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Default Voice Provider</label>
                <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>Khemet Premium (Arabic Optimized)</option>
                  <option>ElevenLabs (Global)</option>
                  <option>Azure Speech Services</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4 pt-4 border-t border-white/5">
              <Toggle label="Auto-detect Dialect" description="Allow agents to adapt to caller's specific Arabic dialect (e.g. Levantine, Egyptian)." defaultChecked={true} />
            </div>
          </Card>

          {/* Recording & Retention Controls */}
          <Card className="p-8 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-display font-medium text-white">Recording & Retention Controls</h2>
              </div>
              <p className="text-sm text-text-secondary">Manage how call recordings and transcripts are stored.</p>
            </div>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-4">
                <Toggle label="Record Voice Calls" description="Automatically record all inbound and outbound agent conversations." defaultChecked={true} />
                <Toggle label="Generate Transcripts" description="Create text transcripts for all interactions." defaultChecked={true} />
                <Toggle label="PII Redaction" description="Automatically redact Personally Identifiable Information from transcripts." defaultChecked={true} />
              </div>

              <div className="flex flex-col gap-1.5 pt-4 border-t border-white/5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Data Retention Period</label>
                <select className="w-full md:w-1/2 bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                  <option>30 Days</option>
                  <option>90 Days</option>
                  <option>1 Year</option>
                  <option>Indefinite (Custom Enterprise Plan)</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Default Behavior Policies */}
          <Card className="p-8 flex flex-col gap-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-5 h-5 text-tertiary" />
                <h2 className="text-lg font-display font-medium text-white">Default Behavior Policies</h2>
              </div>
              <p className="text-sm text-text-secondary">Set workspace-wide rules for agent operations.</p>
            </div>

            <div className="flex flex-col gap-4">
              <Toggle label="Require Human Review for P1 Escalations" description="Priority 1 escalations must be acknowledged by a human agent within 5 minutes." defaultChecked={true} />
              <Toggle label="Allow Outbound Calls outside Business Hours" description="Permit agents to make automated outbound calls 24/7." defaultChecked={false} />
              <Toggle label="Strict Knowledge Boundaries" description="Agents will never attempt to answer questions outside of provided knowledge bases." defaultChecked={true} />
            </div>
          </Card>

          <Card className="p-8 flex flex-col gap-8 border-red-500/20 bg-red-500/5 mt-8">
            <div>
              <h2 className="text-lg font-display font-medium text-red-400 mb-1">Danger Zone</h2>
              <p className="text-sm text-text-secondary">Destructive actions for this workspace.</p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border border-red-500/20 rounded-sm bg-surface-low">
              <div>
                <h3 className="text-sm font-medium text-white">Delete Workspace</h3>
                <p className="text-xs text-text-secondary">Permanently remove your workspace and all associated data.</p>
              </div>
              <Button variant="secondary" className="border-red-500/50 text-red-400 hover:bg-red-500/10 w-full sm:w-auto">
                Delete Workspace
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </AppShell>
  );
}
