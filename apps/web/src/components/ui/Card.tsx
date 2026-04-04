import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  elite?: boolean;
}

export function Card({ className, elite, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "relative bg-surface-low rounded-lg overflow-hidden transition-colors duration-200 hover:bg-surface-high border border-white/5",
        className
      )}
      {...props}
    >
      {elite && (
        <div className="absolute top-0 left-0 h-[2px] w-6 bg-tertiary" />
      )}
      {children}
    </div>
  );
}
