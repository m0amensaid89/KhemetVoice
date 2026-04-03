import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "success" | "warning" | "error" | "info" | "neutral" | "active";
}

export function Badge({
  className,
  variant = "neutral",
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium uppercase tracking-wider",
        {
          "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20": variant === "success",
          "bg-tertiary/10 text-tertiary border border-tertiary/20": variant === "warning",
          "bg-red-500/10 text-red-400 border border-red-500/20": variant === "error",
          "bg-primary/10 text-primary border border-primary/20": variant === "info",
          "bg-white/5 text-text-secondary border border-white/10": variant === "neutral",
          "bg-secondary/10 text-secondary border border-secondary/20 shadow-[0_0_10px_rgba(229,195,101,0.2)]": variant === "active",
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
