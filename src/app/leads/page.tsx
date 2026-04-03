import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { leads } from "@/data/mock";
import { Search, Filter, Download, MoreVertical, Phone, Mail, UserCheck } from "lucide-react";

export default function LeadsPage() {
  return (
    <AppShell title="Leads & Contacts">
      <div className="flex flex-col gap-6">

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                placeholder="Search leads by name, phone, or intent..."
                className="w-full bg-surface-low border border-white/10 rounded-sm pl-9 pr-4 py-2 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
            <Button variant="secondary" className="gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
          <Button variant="secondary" className="gap-2 w-full sm:w-auto">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-high/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Lead Name</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Contact Info</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Intent Level</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Source Agent</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Date Captured</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-white">{lead.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-text-secondary">
                        <Phone className="w-3 h-3" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={lead.intent === 'High' ? 'success' : lead.intent === 'Medium' ? 'warning' : 'neutral'}
                      >
                        {lead.intent}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{lead.agent}</td>
                    <td className="px-6 py-4 text-text-secondary">{new Date(lead.date).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="icon" size="sm" title="View Details">
                          <UserCheck className="w-4 h-4" />
                        </Button>
                        <Button variant="icon" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t border-white/5 flex items-center justify-between text-sm text-text-secondary bg-surface-low">
            <span>Showing 1 to {leads.length} of {leads.length} results</span>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm" disabled>Previous</Button>
              <Button variant="secondary" size="sm" disabled>Next</Button>
            </div>
          </div>
        </Card>

      </div>
    </AppShell>
  );
}
