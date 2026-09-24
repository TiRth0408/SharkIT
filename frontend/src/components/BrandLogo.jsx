import React from 'react';

export default function BrandLogo({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="sharkGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3BA9EB" />
          <stop offset="100%" stopColor="#9D8CFF" />
        </linearGradient>
        <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#3BA9EB" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Rounded translucent backdrop container */}
      <rect
        width="48"
        height="48"
        rx="14"
        fill="url(#sharkGradient)"
        fillOpacity="0.14"
        stroke="rgba(59, 169, 235, 0.25)"
        strokeWidth="1"
      />

      {/* Modern geometric fin with upward market crest */}
      <path
        d="M12 35C17.5 35 21.5 29.5 24.5 21C26 16.5 29.5 11 36 10C34 16 34 23 37 35H12Z"
        fill="url(#sharkGradient)"
        filter="url(#subtleGlow)"
      />

      {/* Accent beacon node */}
      <circle cx="36" cy="10" r="3" fill="#9D8CFF" />
    </svg>
  );
}