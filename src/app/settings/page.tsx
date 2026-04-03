import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Save, Building, ShieldCheck, Bell } from "lucide-react";

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

          <Card className="p-8 flex flex-col gap-8 border-red-500/20 bg-red-500/5">
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
