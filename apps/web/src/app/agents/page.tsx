import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { agents } from "@/data/mock";
import { Plus, Search, Filter, MoreVertical, Bot, Settings2 } from "lucide-react";
import Link from "next/link";

export default function AgentsPage() {
  return (
    <AppShell title="Agents Directory">
      <div className="flex flex-col gap-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search agents..."
                className="w-full bg-surface-low border border-white/10 rounded-sm pl-9 pr-4 py-2 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          <Link href="/agents/create">
            <Button className="gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Deploy New Agent
            </Button>
          </Link>
        </div>

        {/* Agents Grid */}
        {agents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agents.map((agent) => (
              <Card key={agent.id} className="flex flex-col" elite={agent.status === 'active'}>
                <div className="p-5 flex-1 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-sm bg-surface-high border border-white/10 flex items-center justify-center text-primary">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-medium text-white">{agent.name}</h3>
                        <span className="text-xs text-text-secondary uppercase tracking-wider">{agent.id}</span>
                      </div>
                    </div>
                    <Button variant="icon" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="neutral">{agent.language}</Badge>
                    <Badge
                      variant={agent.status === "active" ? "active" : agent.status === "training" ? "warning" : "neutral"}
                    >
                      {agent.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 mt-auto">
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Total Deployments</div>
                      <div className="text-sm font-medium text-white">{agent.deployments}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Last Updated</div>
                      <div className="text-sm font-medium text-white">{new Date(agent.lastUpdated).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-high/50 px-5 py-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Ready for deployment</span>
                  <Link href={`/agents/${agent.id}`}>
                    <Button variant="tertiary" size="sm" className="gap-2">
                      <Settings2 className="w-4 h-4" />
                      Configure
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed border-white/20 bg-transparent">
            <div className="w-16 h-16 rounded-full bg-surface-high flex items-center justify-center text-text-secondary mb-4">
              <Bot className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No Agents Deployed</h3>
            <p className="text-sm text-text-secondary max-w-md mb-6">You haven&apos;t deployed any AI agents yet. Create your first agent to start handling operations.</p>
            <Link href="/agents/create">
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Create First Agent
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
