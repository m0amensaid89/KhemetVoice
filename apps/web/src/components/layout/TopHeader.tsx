import React from "react";
import { cn } from "@/lib/utils";
import { Search, Bell, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface TopHeaderProps {
  title?: string;
  className?: string;
}

export function TopHeader({ title, className }: TopHeaderProps) {
  return (
    <header
      className={cn(
        "h-16 flex-shrink-0 flex items-center justify-between px-8 bg-obsidian/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-10",
        className
      )}
    >
      <div className="flex items-center gap-4">
        {title && (
          <h1 className="font-display text-xl font-medium tracking-wide text-white">
            {title}
          </h1>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search commands..."
            className="w-64 bg-surface-low border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm text-white placeholder:text-text-secondary focus:outline-none focus:border-primary/50 transition-colors"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="text-[10px] text-text-secondary border border-white/10 rounded px-1">⌘</span>
            <span className="text-[10px] text-text-secondary border border-white/10 rounded px-1">K</span>
          </div>
        </div>

        <div className="flex items-center gap-2 border-l border-white/10 pl-4">
          <Button variant="icon" size="sm" aria-label="Help">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <div className="relative">
            <Button variant="icon" size="sm" aria-label="Notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full border border-obsidian"></span>
          </div>
        </div>
      </div>
    </header>
  );
}
