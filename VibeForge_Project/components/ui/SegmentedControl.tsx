"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface Option<T extends string> {
  value: T;
  label: string;
  badge?: string;
}

interface SegmentedControlProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (val: T) => void;
  className?: string;
  size?: "sm" | "md";
}

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  className,
  size = "md",
}: SegmentedControlProps<T>) {
  return (
    <div
      className={cn(
        "inline-flex p-1 bg-surface/90 border border-line/80 rounded-xl gap-1 shadow-sm",
        className
      )}
    >
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative px-3.5 py-1.5 text-xs font-sans font-medium transition-colors duration-200 focus-visible:outline-none rounded-lg",
              size === "sm" ? "text-xs py-1 px-3" : "text-xs py-1.5 px-4",
              isActive ? "text-ink font-semibold" : "text-ink-secondary hover:text-ink"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="segmented_control_active"
                className="absolute inset-0 bg-bg border border-line rounded-lg z-0 shadow-sm"
                transition={{ type: "spring", stiffness: 450, damping: 35 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-1.5">
              {opt.label}
              {opt.badge && (
                <span className="px-1.5 py-0.5 text-[10px] bg-accent/20 text-accent font-sans font-medium rounded-full">
                  {opt.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
