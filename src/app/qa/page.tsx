import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Play, Filter, Download, Star, StarHalf, MessageSquare, Clock } from "lucide-react";
import { recentSessions } from "@/data/mock";

export default function SessionQAPage() {
  return (
    <AppShell title="Session QA Hub">
      <div className="flex flex-col gap-6">

        {/* Top Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter Sessions
            </Button>
            <select className="bg-surface-low border border-white/10 rounded-sm px-3 py-2 text-sm text-white focus:outline-none focus:border-primary transition-colors appearance-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>This Month</option>
            </select>
          </div>
          <Button variant="secondary" className="gap-2 w-full sm:w-auto">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        {/* QA Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* List of Sessions */}
          <Card className="lg:col-span-1 flex flex-col h-[70vh] overflow-hidden">
            <div className="p-4 border-b border-white/5 bg-surface-high/30">
              <h3 className="text-sm font-medium uppercase tracking-wider text-white">Review Queue</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
              {recentSessions.map((session, i) => (
                <div
                  key={session.id}
                  className={`p-4 border-b border-white/5 cursor-pointer transition-colors ${i === 0 ? 'bg-primary/5 border-l-2 border-l-primary' : 'hover:bg-white/5 border-l-2 border-l-transparent'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-white">{session.user}</span>
                    <span className="text-xs text-text-secondary">{session.time}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={session.status === 'completed' ? 'success' : 'warning'} className="text-[10px]">
                      {session.outcome !== "-" ? session.outcome : session.status}
                    </Badge>
                  </div>
                  <div className="text-xs text-text-secondary flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.duration}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Detailed Review View */}
          <Card className="lg:col-span-3 flex flex-col h-[70vh] overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-surface-high/10">
              <div>
                <h2 className="text-xl font-display font-medium text-white mb-1">+971 50 123 4567</h2>
                <div className="flex items-center gap-4 text-sm text-text-secondary">
                  <span>Agent: <strong className="text-white">Sales Qualification</strong></span>
                  <span>Duration: <strong className="text-white">4m 12s</strong></span>
                  <span>Date: <strong className="text-white">May 15, 2024</strong></span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Leave Note
                </Button>
              </div>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Transcript */}
              <div className="flex-1 overflow-y-auto p-6 border-r border-white/5 flex flex-col gap-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium uppercase tracking-wider text-white">Full Transcript</h3>
                  <Button variant="secondary" size="sm" className="gap-2 rounded-full px-4 border-primary/50 text-primary hover:bg-primary/10">
                    <Play className="w-3 h-3 fill-current" />
                    Play Audio
                  </Button>
                </div>

                {/* Mock Transcript Lines */}
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-surface-high flex-shrink-0 flex items-center justify-center text-xs text-secondary font-bold">A</div>
                  <div>
                    <div className="text-xs text-text-secondary mb-1">00:00</div>
                    <p className="text-sm text-white bg-surface-low p-3 rounded-sm border border-white/5">Hello, thank you for calling. How can I help you today?</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-xs text-primary font-bold">U</div>
                  <div>
                    <div className="text-xs text-text-secondary mb-1">00:05</div>
                    <p className="text-sm text-white bg-surface-low p-3 rounded-sm border border-white/5">I need to know the pricing for the enterprise tier.</p>
                  </div>
                </div>
              </div>

              {/* Evaluation Panel */}
              <div className="w-80 overflow-y-auto p-6 bg-surface-low/50">
                <h3 className="text-sm font-medium uppercase tracking-wider text-white mb-6">AI Evaluation</h3>

                <div className="flex flex-col gap-6">
                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-2 flex justify-between">
                      <span>Goal Completion</span>
                      <span className="text-emerald-400">100%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-high rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-2 flex justify-between">
                      <span>Adherence to Script</span>
                      <span className="text-tertiary">85%</span>
                    </div>
                    <div className="w-full h-1.5 bg-surface-high rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary w-[85%]"></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Overall Rating</div>
                    <div className="flex items-center gap-1 text-tertiary">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <StarHalf className="w-5 h-5 fill-current" />
                      <span className="ml-2 text-white font-medium text-lg">4.5</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    <div className="text-xs text-text-secondary uppercase tracking-wider mb-3">Key Insights</div>
                    <ul className="text-sm text-white space-y-2 list-disc pl-4 marker:text-primary">
                      <li>Agent successfully identified enterprise intent.</li>
                      <li>Agent struggled slightly with pricing specifics before retrieving data.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

      </div>
    </AppShell>
  );
}
