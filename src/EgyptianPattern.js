import React from 'react';

const EgyptianPattern = ({ opacity = 0.05, color = '#F5A623' }) => {
  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: opacity,
        pointerEvents: 'none',
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="egyptian-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          <path
            d="M 20 0 L 30 10 L 20 20 L 10 10 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 60 0 L 70 10 L 60 20 L 50 10 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 20 40 L 30 50 L 20 60 L 10 50 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <path
            d="M 60 40 L 70 50 L 60 60 L 50 50 Z"
            fill="none"
            stroke={color}
            strokeWidth="1"
          />
          <circle cx="40" cy="20" r="3" fill={color} />
          <circle cx="40" cy="60" r="3" fill={color} />
          <line x1="0" y1="30" x2="80" y2="30" stroke={color} strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#egyptian-pattern)" />
    </svg>
  );
};

export default EgyptianPattern;
