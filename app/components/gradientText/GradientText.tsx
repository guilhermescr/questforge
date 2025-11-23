import React from 'react';

interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
}

export default function GradientText({
  children,
  className = '',
}: GradientTextProps) {
  return (
    <span
      className={`bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent ${className}`}
    >
      {children}
    </span>
  );
}
