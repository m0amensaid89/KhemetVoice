import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Button } from "@/components/ui/Button";
import { agents, recentSessions, analyticsSummary } from "@/data/mock";
import { ArrowUpRight, ArrowDownRight, Activity, PhoneCall, Bot, Clock } from "lucide-react";

export default function Dashboard() {
  return (
    <AppShell title="Command Center">
      <div className="flex flex-col gap-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <PhoneCall className="w-4 h-4" />
              Total Calls
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{analyticsSummary.totalCalls.toLocaleString()}</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" /> {analyticsSummary.totalCallsTrend}
              </span>
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <Clock className="w-4 h-4" />
              Avg Handling Time
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{analyticsSummary.avgHandlingTime}</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowDownRight className="w-4 h-4 mr-1" /> {analyticsSummary.avgHandlingTimeTrend}
              </span>
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <Bot className="w-4 h-4" />
              Containment Rate
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{analyticsSummary.containmentRate}</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" /> {analyticsSummary.containmentRateTrend}
              </span>
            </div>
          </Card>

          <Card elite className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <Activity className="w-4 h-4" />
              Active Agents
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{analyticsSummary.activeAgents}</span>
              <StatusIndicator status="active" pulse className="mb-2 mr-1" />
            </div>
          </Card>
        </div>

        {/* Asymmetrical Layout: Main content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - Active Agents */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-medium text-white">Deployed Agents</h2>
              <Button variant="tertiary" size="sm">View All</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {agents.map((agent) => (
                <Card key={agent.id} className="p-5 flex flex-col gap-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-base font-medium text-white">{agent.name}</h3>
                      <span className="text-xs text-text-secondary uppercase tracking-wider">{agent.language}</span>
                    </div>
                    <Badge
                      variant={agent.status === "active" ? "active" : agent.status === "training" ? "warning" : "neutral"}
                    >
                      {agent.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Calls Today</div>
                      <div className="text-lg font-medium text-white">{agent.callsToday}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary mb-1">Avg Duration</div>
                      <div className="text-lg font-medium text-white">{agent.avgDuration}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar Area - Recent Activity */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-medium text-white">Recent Activity</h2>
              <Badge variant="active" className="animate-pulse">Live</Badge>
            </div>

            <Card className="flex-1 p-0 overflow-hidden">
              <div className="flex flex-col">
                {recentSessions.map((session, i) => (
                  <div
                    key={session.id}
                    className={`p-4 flex flex-col gap-2 ${i !== recentSessions.length - 1 ? 'border-b border-white/5' : ''} hover:bg-white/5 transition-colors cursor-pointer`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">{session.user}</span>
                      <span className="text-xs text-text-secondary">{session.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{session.agentName}</span>
                      <Badge
                        variant={session.status === 'completed' ? 'success' : session.status === 'in_progress' ? 'active' : 'warning'}
                      >
                        {session.outcome !== "-" ? session.outcome : session.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
