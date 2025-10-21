
import React from 'react';

export const AstrolabeBackground: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="0.5">
    <defs>
      <circle id="c" r="1" />
    </defs>
    
    <circle cx="100" cy="100" r="98" />
    <circle cx="100" cy="100" r="80" />
    <circle cx="100" cy="100" r="60" />
    <circle cx="100" cy="100" r="40" />

    {Array.from({ length: 12 }).map((_, i) => (
      <line
        key={`line-${i}`}
        x1="100"
        y1="100"
        x2="100"
        y2="2"
        transform={`rotate(${i * 30}, 100, 100)`}
      />
    ))}
    
    {Array.from({ length: 72 }).map((_, i) => (
       <line
        key={`line-sm-${i}`}
        x1="100"
        y1="10"
        x2="100"
        y2="2"
        strokeWidth="0.25"
        transform={`rotate(${i * 5}, 100, 100)`}
      />
    ))}

    <circle cx="100" cy="100" r="90" strokeDasharray="2 4" strokeWidth="0.25"/>
    <circle cx="100" cy="100" r="70" strokeDasharray="1 5" strokeWidth="0.25"/>
    <circle cx="100" cy="100" r="50" strokeDasharray="3 3" strokeWidth="0.25"/>

  </svg>
);
