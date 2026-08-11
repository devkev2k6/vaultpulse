"use client";

import { motion } from "framer-motion";
import { Plus, ShieldCheck, Users } from "lucide-react";
import React, { useState } from "react";
import { SHARED_GOALS } from "../../lib/mock-data";
import { SharedGoal } from "../../lib/types";
import { formatINR } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlowingCard } from "../ui/GlowingCard";

export function SharedGoalsHub() {
  const [goals, setGoals] = useState<SharedGoal[]>(SHARED_GOALS);

  return (
    <GlowingCard className="p-6">
      <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-accent" />
            <h3 className="font-mono text-base font-bold text-ink uppercase tracking-wider">
              Shared Household & Partner Goals
            </h3>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-0.5">
            Collaborative savings goals managed across family & team accounts
          </p>
        </div>
        <Badge variant="accent">Shared Workspace</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((g) => {
          const progressPercent = Math.round((g.currentAmount / g.targetAmount) * 100);
          return (
            <div key={g.id} className="p-5 bg-surface/50 border border-line space-y-4 font-mono text-xs">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] uppercase text-accent font-bold">{g.category}</span>
                  <h4 className="font-bold text-sm text-ink font-mono mt-0.5">{g.title}</h4>
                </div>
                <Badge variant="positive">{progressPercent}% Achieved</Badge>
              </div>

              <div className="flex items-center justify-between text-ink">
                <span className="text-ink-muted">Current Balance / Target:</span>
                <span className="font-bold">
                  {formatINR(g.currentAmount)} / {formatINR(g.targetAmount)}
                </span>
              </div>

              <div className="w-full bg-line h-2 overflow-hidden">
                <div
                  className="bg-accent h-full transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="pt-3 border-t border-line flex items-center justify-between font-sans">
                <span className="text-[10px] font-mono text-ink-muted uppercase">Contributors:</span>
                <div className="flex items-center gap-2 font-mono">
                  {g.contributors.map((c, i) => (
                    <span key={i} className="px-2 py-0.5 bg-line text-ink text-[11px] font-bold">
                      {c.name.split(" ")[0]} ({formatINR(c.contribution, true)})
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </GlowingCard>
  );
}
