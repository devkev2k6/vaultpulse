"use client";

import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "accent" | "alert" | "ghost" | "positive";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "default",
      size = "md",
      isLoading = false,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium font-sans rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variants = {
      default:
        "bg-surface text-ink border border-line hover:bg-surface-hover hover:border-ink-muted shadow-sm",
      outline:
        "bg-transparent text-ink border border-line/80 hover:bg-surface/60 hover:border-ink/60",
      accent:
        "bg-accent text-accent-foreground border border-accent/80 hover:brightness-110 font-semibold shadow-md",
      positive:
        "bg-positive text-positive-foreground border border-positive/80 hover:brightness-110 font-semibold shadow-md",
      alert:
        "bg-alert text-alert-foreground border border-alert/80 hover:brightness-110 font-semibold shadow-md",
      ghost:
        "bg-transparent text-ink-secondary hover:text-ink hover:bg-surface/60",
    };

    const sizes = {
      sm: "h-9 px-3.5 text-xs font-sans font-medium tracking-wide",
      md: "h-10 px-4 text-sm font-sans font-medium",
      lg: "h-12 px-6 text-base font-sans font-semibold",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
