export const agents = [
  {
    id: "agt_01h9x",
    name: "Customer Support L1",
    language: "Arabic / English",
    status: "active",
    deployments: 3,
    callsToday: 142,
    avgDuration: "3m 42s",
    lastUpdated: "2024-05-12T10:30:00Z",
  },
  {
    id: "agt_02h9y",
    name: "Sales Qualification",
    language: "English",
    status: "active",
    deployments: 1,
    callsToday: 89,
    avgDuration: "5m 12s",
    lastUpdated: "2024-05-10T14:15:00Z",
  },
  {
    id: "agt_03h9z",
    name: "Technical Helpdesk",
    language: "Arabic",
    status: "training",
    deployments: 0,
    callsToday: 0,
    avgDuration: "-",
    lastUpdated: "2024-05-15T09:00:00Z",
  },
  {
    id: "agt_04j1a",
    name: "Billing Inquiries",
    language: "Arabic / English",
    status: "inactive",
    deployments: 0,
    callsToday: 0,
    avgDuration: "-",
    lastUpdated: "2024-04-20T11:20:00Z",
  }
];

export const recentSessions = [
  {
    id: "sess_9x81",
    agentName: "Sales Qualification",
    user: "+971 50 123 4567",
    duration: "4m 12s",
    status: "completed",
    outcome: "Lead Qualified",
    time: "10 mins ago"
  },
  {
    id: "sess_9x82",
    agentName: "Customer Support L1",
    user: "+966 55 987 6543",
    duration: "2m 30s",
    status: "escalated",
    outcome: "Human Handoff",
    time: "25 mins ago"
  },
  {
    id: "sess_9x83",
    agentName: "Customer Support L1",
    user: "+971 52 345 6789",
    duration: "1m 15s",
    status: "in_progress",
    outcome: "-",
    time: "Just now"
  }
];

export const analyticsSummary = {
  totalCalls: 12450,
  totalCallsTrend: "+12.5%",
  avgHandlingTime: "3m 45s",
  avgHandlingTimeTrend: "-5.2%",
  containmentRate: "82%",
  containmentRateTrend: "+2.1%",
  activeAgents: 14,
};

export const leads = [
  { id: "ld_1", name: "Ahmed Al-Maktoum", phone: "+971 50 111 2222", intent: "High", agent: "Sales Qualification", date: "2024-05-15" },
  { id: "ld_2", name: "Sarah Connor", phone: "+44 7700 900077", intent: "Medium", agent: "Sales Qualification", date: "2024-05-14" },
  { id: "ld_3", name: "Mohammed Tariq", phone: "+966 55 333 4444", intent: "High", agent: "Sales Qualification", date: "2024-05-14" },
  { id: "ld_4", name: "Layla Hassan", phone: "+971 52 555 6666", intent: "Low", agent: "Sales Qualification", date: "2024-05-13" }
];
