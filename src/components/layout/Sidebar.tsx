import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Users,
  Globe,
  Activity,
  Calendar,
  BarChart2,
  CheckSquare,
  Link as LinkIcon,
  Settings,
  CreditCard
} from "lucide-react";
import { EyeOfHorusIcon, PyramidIcon, AnkhIcon, ScarabIcon, ObeliskIcon, LotusIcon } from "@/icons/CustomIcons";

const NAV_ITEMS = [
  { name: "Command Center", href: "/dashboard", icon: PyramidIcon },
  { name: "Live Activity", href: "/live", icon: EyeOfHorusIcon, badge: "LIVE" },
  { name: "Agents", href: "/agents", icon: ScarabIcon },
  { name: "Knowledge Base", href: "/knowledge", icon: ObeliskIcon },
  { name: "Leads", href: "/leads", icon: Users },
  { name: "Bookings", href: "/bookings", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
  { name: "Session QA", href: "/qa", icon: CheckSquare },
  { name: "Deploy", href: "/deploy", icon: Globe },
];

const SETTINGS_ITEMS = [
  { name: "Integrations", href: "/integrations", icon: LinkIcon },
  { name: "Team", href: "/team", icon: Users },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Workspace", href: "/settings", icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn("w-64 flex-shrink-0 flex flex-col bg-surface border-r border-white/5", className)}>
      {/* Brand */}
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Khemet Voice"
            className="h-8 w-auto object-contain"
          />
          <span className="font-cinzel font-bold text-lg tracking-wide text-white whitespace-nowrap">
            VOICE OF KHEMET
          </span>
        </Link>
      </div>

      {/* Nav */}
      <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <div className="px-2 mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
            Operations
          </div>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] font-bold px-1.5 py-0.5 rounded bg-secondary/10 text-secondary">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <div className="px-2 mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">
            Configuration
          </div>
          {SETTINGS_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-text-secondary hover:text-white hover:bg-white/5 transition-colors group"
            >
              <item.icon className="w-4 h-4 group-hover:text-primary transition-colors" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* User / Workspace */}
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-surface-high flex items-center justify-center text-xs font-medium">
            AD
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Admin User</span>
            <span className="text-xs text-text-secondary">Enterprise Plan</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
