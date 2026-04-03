import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-medium tracking-[0.05em] uppercase text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            className={cn(
              "w-full bg-transparent border-b border-white/20 px-0 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary transition-colors",
              error && "border-red-500 focus:border-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {/* Subtle outer glow effect via box shadow or pseudo element can be added if requested, though tailwind border focus is standard */}
        </div>
        {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";
