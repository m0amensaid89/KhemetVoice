import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Toggle } from "@/components/ui/Toggle";
import { Badge } from "@/components/ui/Badge";
import {
  ArrowLeft, Save, Play, Globe,
  BrainCircuit, MessageSquare, ShieldAlert, Radio,
  Plus, Trash2, Smartphone, PhoneCall, PhoneForwarded
} from "lucide-react";
import Link from "next/link";

export default function AgentForm({ isEdit = false, agentData = null }: { isEdit?: boolean, agentData?: any }) {
  return (
    <AppShell title={isEdit ? "Edit Agent" : "Configure New Agent"}>
      <div className="flex flex-col gap-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Link href="/agents" className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm w-fit mb-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Agents
            </Link>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-display font-medium text-white">
                {isEdit ? agentData?.name || "Edit Agent" : "New Agent"}
              </h1>
              {isEdit && <Badge variant="active">Deployed</Badge>}
            </div>
            {isEdit && (
              <p className="text-xs text-text-secondary">
                ID: {agentData?.id} • Last updated: {agentData?.lastUpdated}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary">Save Draft</Button>
            <Button variant="secondary" className="gap-2">
              <Play className="w-4 h-4" />
              Test Agent
            </Button>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Deploy Agent
            </Button>
          </div>
        </div>

        {/* Main Form */}
        <div className="flex flex-col gap-6">

          {/* Agent Basics */}
          <Card elite className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <BrainCircuit className="w-5 h-5 text-tertiary" />
              <h2 className="text-lg font-display font-medium text-white">Agent Basics</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Agent Name" placeholder="e.g. Sales Qualification Bot" defaultValue={agentData?.name || ""} />
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Agent Status</label>
                <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue={agentData?.status || "active"}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Internal Description</label>
                <textarea
                  className="w-full bg-surface-high/30 border border-white/10 rounded-sm p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none h-24"
                  placeholder="What is this agent used for?"
                  defaultValue={agentData?.description || ""}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Business Objective</label>
                <textarea
                  className="w-full bg-surface-high/30 border border-white/10 rounded-sm p-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none h-24"
                  placeholder="e.g. Qualify leads and book meetings"
                  defaultValue={agentData?.objective || ""}
                />
              </div>
            </div>
          </Card>

          {/* Language & Voice */}
          <Card className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <MessageSquare className="w-5 h-5 text-secondary" />
              <h2 className="text-lg font-display font-medium text-white">Language & Voice</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Primary Language</label>
                <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue={agentData?.language || "ar-en"}>
                  <option value="ar">Arabic (Gulf)</option>
                  <option value="en">English (US)</option>
                  <option value="ar-en">Bilingual (Arabic / English)</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Tone / Persona</label>
                <select className="w-full bg-surface-high border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue={agentData?.tone || "professional"}>
                  <option value="professional">Professional & Direct</option>
                  <option value="consultative">Consultative & Helpful</option>
                  <option value="friendly">Friendly & Casual</option>
                  <option value="urgent">Urgent & Focused</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5 mt-2">
              <div className="flex justify-between items-end mb-1">
                <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Greeting Configuration</label>
                <div className="flex gap-2">
                  <Badge variant="neutral" className="cursor-pointer hover:bg-white/10">Formal</Badge>
                  <Badge variant="neutral" className="cursor-pointer hover:bg-white/10">Consultative</Badge>
                  <Badge variant="neutral" className="cursor-pointer hover:bg-white/10">Direct</Badge>
                </div>
              </div>
              <textarea
                className="w-full bg-surface-high/30 border border-white/10 rounded-sm p-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors resize-none h-24"
                placeholder="Hello! You have reached Khemet. How can I assist you today?"
                defaultValue={agentData?.greeting || "Hello! You have reached Khemet. How can I assist you today?"}
              />
            </div>
          </Card>

          {/* Qualification Logic */}
          <Card className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-display font-medium text-white">Qualification Logic</h2>
              </div>
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Question
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              {(agentData?.questions || ["What is your current company size?", "Are you currently using any AI solutions?", "What is your timeline for implementation?"]).map((q: string, i: number) => (
                <div key={i} className="flex items-start gap-4 p-4 border border-white/10 bg-surface-high/20 rounded-sm group relative">
                  <div className="w-6 h-6 rounded-full bg-surface-high flex items-center justify-center text-xs font-medium text-text-secondary mt-1 shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <Input defaultValue={q} className="bg-surface-low" />
                    <div className="flex gap-4 mt-2">
                      <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                        <input type="checkbox" className="rounded border-white/20 bg-surface" defaultChecked={i === 0} />
                        Required for qualification
                      </label>
                      <label className="flex items-center gap-2 text-xs text-text-secondary cursor-pointer">
                        <input type="checkbox" className="rounded border-white/20 bg-surface" defaultChecked={i === 2} />
                        Trigger escalation if answered negatively
                      </label>
                    </div>
                  </div>
                  <button className="text-text-secondary hover:text-red-400 transition-colors p-2 absolute right-2 top-2 opacity-0 group-hover:opacity-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          {/* Escalation Rules */}
          <Card className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <PhoneForwarded className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-display font-medium text-white">Escalation Rules</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-4">
                <Toggle label="Failed Intents Threshold" description="Escalate after 3 consecutive misunderstood intents" defaultChecked={agentData?.escalateOnFailedIntents ?? true} />
                <Toggle label="VIP / Urgent Triggers" description="Escalate immediately if 'urgent', 'manager', or 'cancel' are mentioned" defaultChecked={agentData?.escalateOnUrgent ?? true} />
                <Toggle label="Business Hours Only" description="Only allow escalations during specified operational hours" defaultChecked={agentData?.escalateBusinessHours ?? false} />
              </div>
              <div className="flex flex-col gap-4 p-4 border border-dashed border-white/20 rounded-sm bg-surface-high/10">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Fallback Behavior</label>
                  <select className="w-full bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue={agentData?.fallbackBehavior || "transfer"}>
                    <option value="transfer">Transfer to Live Agent</option>
                    <option value="voicemail">Send to Voicemail</option>
                    <option value="disconnect">Polite Disconnect</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">Escalation Destination</label>
                  <select className="w-full bg-surface border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none" defaultValue={agentData?.escalationDestination || "sales_queue"}>
                    <option value="sales_queue">Sales Live Queue</option>
                    <option value="support_l2">Support Level 2</option>
                    <option value="manager">Duty Manager</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Channel Selection */}
          <Card className="p-6 md:p-8 flex flex-col gap-6">
            <div className="flex items-center gap-2 pb-2 border-b border-white/5">
              <Radio className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-display font-medium text-white">Channel Selection</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { id: "web", name: "Website Widget", icon: Globe, active: agentData?.channels?.includes("web") ?? true },
                { id: "inbound", name: "Inbound Voice", icon: PhoneCall, active: agentData?.channels?.includes("inbound") ?? true },
                { id: "outbound", name: "Outbound Voice", icon: PhoneForwarded, active: agentData?.channels?.includes("outbound") ?? false },
                { id: "whatsapp", name: "WhatsApp Voice", icon: Smartphone, active: agentData?.channels?.includes("whatsapp") ?? false },
              ].map((channel) => (
                <label key={channel.id} className={`flex flex-col items-center justify-center gap-3 p-6 rounded-sm border cursor-pointer transition-all ${channel.active ? 'border-primary bg-primary/10 text-white' : 'border-white/10 bg-surface-high hover:bg-white/5 text-text-secondary'}`}>
                  <input type="checkbox" className="sr-only" defaultChecked={channel.active} />
                  <channel.icon className="w-8 h-8" />
                  <span className="text-sm font-medium">{channel.name}</span>
                </label>
              ))}
            </div>
          </Card>

        </div>
      </div>
    </AppShell>
  );
}
