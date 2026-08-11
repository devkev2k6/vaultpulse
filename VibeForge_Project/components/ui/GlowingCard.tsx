"use client";

import React, { useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface GlowingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export function GlowingCard({
  children,
  className,
  glowColor,
  ...props
}: GlowingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative glow-card rounded-2xl p-6 transition-all duration-300 overflow-hidden group bg-surface/80 border border-line/60 shadow-lg",
        className
      )}
      {...props}
    >
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 rounded-2xl"
          style={{
            background: `radial-gradient(500px circle at ${mousePos.x}px ${
              mousePos.y
            }px, ${glowColor || "rgba(var(--accent), 0.12)"}, transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
