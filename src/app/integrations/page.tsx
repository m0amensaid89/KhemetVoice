import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Link as LinkIcon, Database, MessageSquare, Phone, Calendar, Key, Webhook, Copy, Eye, Plus } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { id: 1, name: "Salesforce", category: "CRM", status: "connected", icon: Database },
    { id: 2, name: "HubSpot", category: "CRM", status: "available", icon: Database },
    { id: 3, name: "Zendesk", category: "Support", status: "connected", icon: MessageSquare },
    { id: 4, name: "Twilio", category: "Telephony", status: "connected", icon: Phone },
    { id: 5, name: "Slack", category: "Communication", status: "available", icon: MessageSquare },
    { id: 6, name: "WhatsApp Business", category: "Messaging", status: "available", icon: MessageSquare },
    { id: 7, name: "Google Calendar", category: "Calendar", status: "connected", icon: Calendar },
    { id: 8, name: "Outlook Calendar", category: "Calendar", status: "available", icon: Calendar },
  ];

  return (
    <AppShell title="Integration Hub">
      <div className="flex flex-col gap-6">

        <div className="flex justify-between items-center">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search integrations..."
              className="w-full bg-surface-low border border-white/10 rounded-sm pl-9 pr-4 py-2 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <Button className="gap-2">
            <LinkIcon className="w-4 h-4" />
            Custom Webhook
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {integrations.map((integration) => (
            <Card key={integration.id} className="p-6 flex flex-col gap-6" elite={integration.status === 'connected'}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded bg-surface-high flex items-center justify-center border border-white/10 text-white">
                    <integration.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-white">{integration.name}</h3>
                    <span className="text-xs text-text-secondary uppercase tracking-wider">{integration.category}</span>
                  </div>
                </div>
                {integration.status === 'connected' && (
                  <Badge variant="success">Connected</Badge>
                )}
              </div>

              <div className="mt-auto">
                {integration.status === 'connected' ? (
                  <Button variant="secondary" className="w-full text-red-400 hover:bg-red-500/10 border-white/10">Configure</Button>
                ) : (
                  <Button variant="secondary" className="w-full">Connect</Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* API Keys Section */}
          <Card className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Key className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-display font-medium text-white">API Keys</h2>
              </div>
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Generate Key
              </Button>
            </div>
            <p className="text-sm text-text-secondary">Use these keys to authenticate API requests from your backend.</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 border border-white/10 rounded-sm bg-surface-low">
                <div>
                  <h3 className="text-sm font-medium text-white">Production Key</h3>
                  <p className="text-xs text-text-secondary">Created: May 12, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-text-secondary bg-surface-high px-2 py-1 rounded">sk_prod_...8f92</span>
                  <Button variant="icon" size="sm"><Copy className="w-4 h-4" /></Button>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 border border-white/10 rounded-sm bg-surface-low">
                <div>
                  <h3 className="text-sm font-medium text-white">Staging Key</h3>
                  <p className="text-xs text-text-secondary">Created: Apr 28, 2024</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-text-secondary bg-surface-high px-2 py-1 rounded">sk_test_...3a1c</span>
                  <Button variant="icon" size="sm"><Copy className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Webhooks Section */}
          <Card className="p-6 flex flex-col gap-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Webhook className="w-5 h-5 text-secondary" />
                <h2 className="text-lg font-display font-medium text-white">Webhooks</h2>
              </div>
              <Button variant="secondary" size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> Add Endpoint
              </Button>
            </div>
            <p className="text-sm text-text-secondary">Receive real-time events when calls complete, leads are qualified, etc.</p>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 p-4 border border-white/10 rounded-sm bg-surface-low">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-white">CRM Sync Endpoint</h3>
                  <Badge variant="success">Active</Badge>
                </div>
                <div className="text-sm font-mono text-primary bg-primary/10 px-2 py-1 rounded break-all">
                  https://api.yourcompany.com/webhooks/khemet
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5">
                  <span className="text-xs text-text-secondary">Events: call.completed, lead.qualified</span>
                  <Button variant="secondary" size="sm" className="h-6 text-xs px-2">Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </AppShell>
  );
}
