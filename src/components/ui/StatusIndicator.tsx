import React from "react";
import { cn } from "@/lib/utils";

interface StatusIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  status: "active" | "inactive" | "error" | "warning";
  pulse?: boolean;
}

export function StatusIndicator({ status, pulse, className, ...props }: StatusIndicatorProps) {
  return (
    <div className={cn("relative flex items-center justify-center w-3 h-3", className)} {...props}>
      {pulse && (
        <span
          className={cn(
            "absolute inset-0 rounded-full animate-ping opacity-75",
            {
              "bg-secondary": status === "active",
              "bg-text-secondary": status === "inactive",
              "bg-red-500": status === "error",
              "bg-tertiary": status === "warning",
            }
          )}
        />
      )}
      <span
        className={cn(
          "relative inline-flex rounded-full w-2 h-2",
          {
            "bg-secondary": status === "active",
            "bg-text-secondary": status === "inactive",
            "bg-red-500": status === "error",
            "bg-tertiary": status === "warning",
          }
        )}
      />
    </div>
  );
}
