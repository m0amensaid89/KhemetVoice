'use client';

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { PhoneCall, Bot } from "lucide-react";
import { useEffect, useState } from "react";

export default function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/dashboard/data')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  const totalSessions = data?.sessions?.length || 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leadsCaptured = data?.sessions?.reduce((acc: number, s: any) => acc + (s.leads?.length || 0), 0) || 0;

  return (
    <AppShell title="Command Center">
      <div className="flex flex-col gap-6">
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <PhoneCall className="w-4 h-4" />
              Total Sessions
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{totalSessions}</span>
              <span className="flex items-center text-emerald-400 text-sm font-medium">
                Live Data
              </span>
            </div>
          </Card>

          <Card className="p-5 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-text-secondary text-sm font-medium tracking-wide uppercase">
              <Bot className="w-4 h-4" />
              Leads Captured
            </div>
            <div className="flex items-end justify-between">
              <span className="text-3xl font-display font-bold text-white">{leadsCaptured}</span>
            </div>
          </Card>
        </div>

        {/* Asymmetrical Layout: Main content + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area - Recent Sessions */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-medium text-white">Recent Sessions & Leads</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {!data ? (
                 <p className="text-text-secondary">Loading real-time data...</p>
              ) : data.sessions?.length === 0 ? (
                 <p className="text-text-secondary">No sessions recorded yet.</p>
              ) : (
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                data.sessions?.map((session: any) => (
                  <Card key={session.id} className="p-5 flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                           <h3 className="text-base font-medium text-white">Session</h3>
                           <Badge variant={session.status === 'active' ? 'active' : 'neutral'}>
                             {session.status}
                           </Badge>
                        </div>
                        <span className="text-xs text-text-secondary block">{session.id}</span>
                        <div className="flex gap-4 mt-2">
                           <span className="text-xs text-text-secondary">
                             {new Date(session.createdAt).toLocaleString()}
                           </span>
                           {session.duration !== null && (
                             <span className="text-xs text-text-secondary">
                               Duration: {session.duration}s
                             </span>
                           )}
                        </div>
                      </div>
                    </div>

                    {session.leads?.length > 0 && (
                      <div className="pt-4 border-t border-white/5">
                        <div className="text-sm font-medium text-brand-gold mb-2">Captured Lead Data:</div>
                        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {session.leads.map((lead: any) => (
                          <div key={lead.id} className="grid grid-cols-2 gap-y-2 gap-x-4 bg-white/5 p-3 rounded-lg">
                            <div>
                              <span className="text-xs text-text-secondary block">Name</span>
                              <span className="text-sm text-white">{lead.name || '-'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-text-secondary block">Company</span>
                              <span className="text-sm text-white">{lead.company || '-'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-text-secondary block">Email</span>
                              <span className="text-sm text-white">{lead.email || '-'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-text-secondary block">Phone</span>
                              <span className="text-sm text-white">{lead.phone || '-'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-text-secondary block">Language</span>
                              <span className="text-sm text-white">{lead.language || '-'}</span>
                            </div>
                            <div>
                              <span className="text-xs text-text-secondary block">Status</span>
                              <Badge variant={lead.status === 'New' ? 'active' : 'neutral'}>{lead.status}</Badge>
                            </div>
                            <div className="col-span-2 mt-1">
                              <span className="text-xs text-text-secondary block">Intent / Challenge</span>
                              <span className="text-sm text-white">{lead.intent || '-'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
