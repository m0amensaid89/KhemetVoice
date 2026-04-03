import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { BarChart2, TrendingUp, Clock, Users, ArrowUpRight, ArrowDownRight, Filter } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics Dashboard">
      <div className="flex flex-col gap-6">

        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2 bg-white/5">Overview</Button>
            <Button variant="tertiary" className="gap-2">Agents</Button>
            <Button variant="tertiary" className="gap-2">Conversations</Button>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              Last 30 Days
            </Button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col gap-3 border-t-2 border-t-primary">
            <div className="text-xs font-medium uppercase tracking-wider text-text-secondary">Total Conversations</div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">12,450</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" /> 12.5%
              </span>
            </div>
          </Card>
          <Card className="p-5 flex flex-col gap-3">
            <div className="text-xs font-medium uppercase tracking-wider text-text-secondary">Avg Duration</div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">3m 45s</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowDownRight className="w-4 h-4 mr-1" /> 5.2%
              </span>
            </div>
          </Card>
          <Card className="p-5 flex flex-col gap-3">
            <div className="text-xs font-medium uppercase tracking-wider text-text-secondary">Goal Completion</div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">82%</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" /> 2.1%
              </span>
            </div>
          </Card>
          <Card className="p-5 flex flex-col gap-3">
            <div className="text-xs font-medium uppercase tracking-wider text-text-secondary">Human Handoffs</div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">18%</span>
              <span className="flex items-center text-red-400 text-sm font-medium">
                <ArrowUpRight className="w-4 h-4 mr-1" /> 1.5%
              </span>
            </div>
          </Card>
        </div>

        {/* Charts Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Main Chart */}
          <Card className="lg:col-span-2 p-6 flex flex-col min-h-[400px]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white">Conversation Volume</h3>
              <div className="flex gap-4 text-xs text-text-secondary">
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm"></div> Inbound</div>
                <div className="flex items-center gap-2"><div className="w-3 h-3 bg-secondary rounded-sm"></div> Outbound</div>
              </div>
            </div>

            {/* Mock Chart Visualization */}
            <div className="flex-1 w-full flex items-end gap-2 relative">
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-text-secondary py-2">
                <span>1000</span><span>750</span><span>500</span><span>250</span><span>0</span>
              </div>

              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between ml-8 z-0">
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
                <div className="border-t border-white/5 w-full"></div>
              </div>

              {/* Bars */}
              <div className="flex-1 flex items-end justify-between ml-8 z-10 h-full pt-4 pb-1">
                {[40, 60, 45, 80, 55, 70, 90, 65, 85, 50, 75, 95].map((val, i) => (
                  <div key={i} className="w-[6%] flex flex-col justify-end gap-1 group h-full relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-surface-highest text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none">
                      {val * 10}
                    </div>
                    {/* Stacked bars */}
                    <div className="w-full bg-tertiary rounded-t-sm transition-all duration-300 group-hover:brightness-110" style={{ height: `${val * 0.3}%` }}></div>
                    <div className="w-full bg-primary rounded-sm transition-all duration-300 group-hover:brightness-110" style={{ height: `${val * 0.7}%` }}></div>
                  </div>
                ))}
              </div>
            </div>
            {/* X-axis labels */}
            <div className="flex justify-between ml-8 mt-2 text-[10px] text-text-secondary uppercase">
              <span>May 1</span><span>May 5</span><span>May 10</span><span>May 15</span>
            </div>
          </Card>

          {/* Breakdown Sidebar */}
          <div className="flex flex-col gap-6">
            <Card className="p-6">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-6">Call Outcomes</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Goal Reached</span>
                    <span className="text-text-secondary">65%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[65%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Transferred to Human</span>
                    <span className="text-text-secondary">18%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                    <div className="h-full bg-tertiary w-[18%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Dropped / Voicemail</span>
                    <span className="text-text-secondary">12%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[12%]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-white">Other</span>
                    <span className="text-text-secondary">5%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                    <div className="h-full bg-text-secondary w-[5%]"></div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 flex-1 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary/10 to-transparent border-primary/20">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <BarChart2 className="w-5 h-5" />
                <h3 className="text-sm font-medium uppercase tracking-wider">AI Insight</h3>
              </div>
              <p className="text-sm text-white leading-relaxed">
                Call volume spikes significantly between <strong className="text-secondary">10:00 AM and 1:00 PM GST</strong>.
                Deploying an additional agent instance during this window could reduce average queue time by 15%.
              </p>
            </Card>
          </div>

        </div>
      </div>
    </AppShell>
  );
}
