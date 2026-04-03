import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input } from "@/components/ui/Input";
import { Search, Database, FileText, Globe, Upload, MoreVertical } from "lucide-react";

export default function KnowledgeBasePage() {
  const sources = [
    { id: "src_1", name: "Product Catalog Q3", type: "document", status: "synced", size: "2.4 MB", lastSync: "2 hours ago" },
    { id: "src_2", name: "Main Website FAQ", type: "url", status: "synced", size: "-", lastSync: "12 hours ago" },
    { id: "src_3", name: "Sales Playbook 2024", type: "document", status: "processing", size: "5.1 MB", lastSync: "Just now" },
    { id: "src_4", name: "Support API Docs", type: "integration", status: "error", size: "-", lastSync: "1 day ago" },
  ];

  return (
    <AppShell title="Knowledge Base">
      <div className="flex flex-col gap-6">

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search knowledge sources..."
              className="w-full bg-surface-low border border-white/10 rounded-sm pl-9 pr-4 py-2 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="secondary" className="gap-2 w-full sm:w-auto">
              <Globe className="w-4 h-4" />
              Add URL
            </Button>
            <Button className="gap-2 w-full sm:w-auto">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Total Sources</div>
              <div className="text-xl font-display font-medium text-white">24 Active</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center text-secondary">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Documents Indexed</div>
              <div className="text-xl font-display font-medium text-white">1,492 Pages</div>
            </div>
          </Card>
          <Card className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded bg-tertiary/10 flex items-center justify-center text-tertiary">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-text-secondary uppercase tracking-wider mb-1">Web Sources</div>
              <div className="text-xl font-display font-medium text-white">8 Domains</div>
            </div>
          </Card>
        </div>

        {/* Data Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-high/50 border-b border-white/5">
                <tr>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Name</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Type</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Status</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Size</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary">Last Sync</th>
                  <th className="px-6 py-4 font-medium text-xs uppercase tracking-wider text-text-secondary text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sources.map((source) => (
                  <tr key={source.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {source.type === 'document' ? <FileText className="w-4 h-4 text-text-secondary" /> :
                         source.type === 'url' ? <Globe className="w-4 h-4 text-text-secondary" /> :
                         <Database className="w-4 h-4 text-text-secondary" />}
                        <span className="font-medium text-white">{source.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-text-secondary capitalize">{source.type}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        variant={source.status === 'synced' ? 'success' : source.status === 'processing' ? 'active' : 'error'}
                      >
                        {source.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{source.size}</td>
                    <td className="px-6 py-4 text-text-secondary">{source.lastSync}</td>
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
