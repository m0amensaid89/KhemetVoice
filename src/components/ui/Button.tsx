import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "icon";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian disabled:opacity-50 disabled:pointer-events-none rounded-sm",
        {
          "bg-primary text-white hover:bg-primary/90": variant === "primary",
          "bg-transparent border border-white/20 text-white hover:bg-white/5": variant === "secondary",
          "bg-transparent text-text-secondary hover:text-white": variant === "tertiary",
          "bg-transparent hover:bg-white/5 p-2 rounded-md text-text-secondary hover:text-white": variant === "icon",
          "h-8 px-3 text-xs": size === "sm" && variant !== "icon",
          "h-10 px-4 py-2 text-sm": size === "md" && variant !== "icon",
          "h-12 px-6 py-3 text-base": size === "lg" && variant !== "icon",
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
