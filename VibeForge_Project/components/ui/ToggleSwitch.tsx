"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  className,
  disabled = false,
}: ToggleSwitchProps) {
  return (
    <label
      className={cn(
        "inline-flex items-center gap-3 cursor-pointer select-none",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-none border border-line transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
          checked ? "bg-accent/20 border-accent" : "bg-surface"
        )}
      >
        <motion.span
          animate={{ x: checked ? 20 : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-none transition-colors duration-200 mt-0.5",
            checked ? "bg-accent shadow-sm" : "bg-ink-muted"
          )}
        />
      </button>
      {label && (
        <span className="text-sm font-sans text-ink-secondary">{label}</span>
      )}
    </label>
  );
}
