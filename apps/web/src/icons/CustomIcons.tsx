import React from "react";

export function EyeOfHorusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 18c-3 0-6-3-9-6 3-3 6-6 9-6 3 0 6 3 9 6-3 3-6 6-9 6z"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 15v5"/>
      <path d="M12 18c-2 0-4 1-5 3"/>
    </svg>
  );
}

export function PyramidIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 3l9 15H3L12 3z"/>
      <path d="M12 3v15"/>
      <path d="M7 11.5l5-3.5"/>
      <path d="M12 8l5 3.5"/>
    </svg>
  );
}

export function AnkhIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 10v12"/>
      <path d="M8 14h8"/>
      <path d="M12 10c2.5 0 4-2.5 4-4s-1.5-4-4-4-4 2.5-4 4 1.5 4 4 4z"/>
    </svg>
  );
}

export function ScarabIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <ellipse cx="12" cy="12" rx="4" ry="6"/>
      <path d="M8 12h8"/>
      <path d="M12 6v12"/>
      <path d="M8 9c-2 0-3-1-4-2"/>
      <path d="M16 9c2 0 3-1 4-2"/>
      <path d="M8 15c-2 0-3 1-4 2"/>
      <path d="M16 15c2 0 3 1 4 2"/>
    </svg>
  );
}

export function ObeliskIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M10 22V8L12 3l2 5v14"/>
      <path d="M8 22h8"/>
    </svg>
  );
}

export function LotusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22V10"/>
      <path d="M12 10C8 10 5 6 5 2c0 4 3 8 7 8z"/>
      <path d="M12 10c4 0 7-4 7-8 0 4-3 8-7 8z"/>
      <path d="M12 22c-3-2-6-5-6-9"/>
      <path d="M12 22c3-2 6-5 6-9"/>
    </svg>
  );
}
