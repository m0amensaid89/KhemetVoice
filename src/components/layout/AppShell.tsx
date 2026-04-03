import React from "react";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

export function AppShell({ children, title }: AppShellProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-obsidian">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <TopHeader title={title} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
          {/* Subtle background glow */}
          <div className="absolute top-0 left-1/4 w-1/2 h-64 bg-primary/5 blur-[120px] pointer-events-none rounded-full" />

          <div className="relative z-0 p-8 max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
