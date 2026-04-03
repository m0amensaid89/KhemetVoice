import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Search, Link as LinkIcon, Database, MessageSquare, Phone } from "lucide-react";

export default function IntegrationsPage() {
  const integrations = [
    { id: 1, name: "Salesforce", category: "CRM", status: "connected", icon: Database },
    { id: 2, name: "HubSpot", category: "CRM", status: "available", icon: Database },
    { id: 3, name: "Zendesk", category: "Support", status: "connected", icon: MessageSquare },
    { id: 4, name: "Twilio", category: "Telephony", status: "connected", icon: Phone },
    { id: 5, name: "Slack", category: "Communication", status: "available", icon: MessageSquare },
    { id: 6, name: "WhatsApp Business", category: "Messaging", status: "available", icon: MessageSquare },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      </div>
    </AppShell>
  );
}
