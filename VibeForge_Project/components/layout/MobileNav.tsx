"use client";

import { CreditCard, ShoppingBag, TrendingUp, Users } from "lucide-react";
import React from "react";
import { useMode } from "../../context/ModeContext";
import { SystemMode } from "../../lib/types";

export function MobileNav() {
  const { mode, setMode } = useMode();

  const options: { id: SystemMode; label: string; icon: React.ElementType }[] = [
    { id: "wealth", label: "Wealth", icon: TrendingUp },
    { id: "extension", label: "Shopping", icon: ShoppingBag },
    { id: "action", label: "Action", icon: CreditCard },
    { id: "collaboration", label: "Teams", icon: Users },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/95 backdrop-blur-md border-t border-line px-2 py-2">
      <div className="grid grid-cols-4 gap-1">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isActive = mode === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => setMode(opt.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 font-mono text-[10px] tracking-wider uppercase transition-colors ${
                isActive
                  ? "text-accent font-semibold border-t-2 border-accent -mt-2 pt-2 bg-accent/10"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
