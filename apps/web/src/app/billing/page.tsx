import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CreditCard, Download, Zap } from "lucide-react";

export default function BillingPage() {
  return (
    <AppShell title="Billing & Usage">
      <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full">

        {/* Current Plan Overview */}
        <Card elite className="p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2"></div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <Badge variant="warning" className="mb-3 border-tertiary/30 text-tertiary bg-tertiary/10">Enterprise Tier</Badge>
              <h2 className="text-3xl font-display font-medium text-white mb-2">$999 <span className="text-lg text-text-secondary">/ month</span></h2>
              <p className="text-sm text-text-secondary">Next billing date: June 1, 2024</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <Button variant="secondary" className="w-full md:w-auto">Update Payment Method</Button>
              <Button className="w-full md:w-auto gap-2">
                <Zap className="w-4 h-4" />
                Change Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/5">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Agent Minutes</span>
                <span className="text-white font-medium">8,450 / 10,000</span>
              </div>
              <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[84.5%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Deployed Agents</span>
                <span className="text-white font-medium">14 / 20</span>
              </div>
              <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                <div className="h-full bg-secondary w-[70%]"></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-text-secondary">Knowledge Storage</span>
                <span className="text-white font-medium">4.2 GB / 10 GB</span>
              </div>
              <div className="w-full h-2 bg-surface-high rounded-full overflow-hidden">
                <div className="h-full bg-tertiary w-[42%]"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Invoice History */}
        <Card className="flex flex-col">
          <div className="p-6 border-b border-white/5 flex justify-between items-center">
            <h3 className="text-lg font-display font-medium text-white">Invoice History</h3>
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="w-4 h-4" />
              Download All
            </Button>
          </div>
          <div className="p-0">
            <table className="w-full text-left text-sm">
              <thead className="bg-surface-high/30 border-b border-white/5">
                <tr>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-text-secondary">Date</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-text-secondary">Amount</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-text-secondary">Status</th>
                  <th className="px-6 py-3 font-medium text-xs uppercase tracking-wider text-text-secondary text-right">Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {['May 1, 2024', 'Apr 1, 2024', 'Mar 1, 2024'].map((date, i) => (
                  <tr key={i} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 text-white">{date}</td>
                    <td className="px-6 py-4 text-white">$999.00</td>
                    <td className="px-6 py-4">
                      <Badge variant="success">Paid</Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="tertiary" size="sm">Download</Button>
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
