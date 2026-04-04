'use client';

import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  onRemove?: () => void;
  children: React.ReactNode;
}

export function Chip({ children, onRemove, className, ...props }: ChipProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-high border border-white/10 text-sm text-white", className)} {...props}>
      <span>{children}</span>
      {onRemove && (
        <button type="button" onClick={onRemove} className="text-text-secondary hover:text-white transition-colors focus:outline-none">
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}
