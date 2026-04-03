import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Users, Shield, Plus, MoreVertical } from "lucide-react";

export default function TeamPage() {
  const team = [
    { id: 1, name: "Admin User", email: "admin@company.com", role: "Owner", status: "Active" },
    { id: 2, name: "Sarah Connor", email: "sarah@company.com", role: "Manager", status: "Active" },
    { id: 3, name: "Ahmed Ali", email: "ahmed@company.com", role: "Agent", status: "Invited" },
  ];

  return (
    <AppShell title="Team Management">
      <div className="flex flex-col gap-6">

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-display font-medium text-white">Members (3/10)</h2>
            <Badge variant="neutral">Enterprise Plan</Badge>
          </div>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Invite Member
          </Button>
        </div>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-high/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">User</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Role</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Status</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {team.map((member) => (
                  <tr key={member.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-xs font-medium text-white">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-medium text-white">{member.name}</div>
                          <div className="text-xs text-text-secondary">{member.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {member.role === 'Owner' && <Shield className="w-3 h-3 text-tertiary" />}
                        <span className="text-white">{member.role}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={member.status === 'Active' ? 'success' : 'warning'}>{member.status}</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="icon" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
