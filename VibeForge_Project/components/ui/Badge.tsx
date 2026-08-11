"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "positive" | "alert" | "accent" | "outline";
}

export function Badge({
  children,
  variant = "default",
  className,
  ...props
}: BadgeProps) {
  const variants = {
    default: "bg-surface text-ink-secondary border border-line",
    positive: "bg-positive/10 text-positive border border-positive/30 font-medium",
    alert: "bg-alert/10 text-alert border border-alert/30 font-medium",
    accent: "bg-accent/10 text-accent border border-accent/30 font-medium",
    outline: "bg-transparent text-ink border border-line",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 text-xs font-sans font-medium rounded-full transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
