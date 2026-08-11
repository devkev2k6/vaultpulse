"use client";

import { Activity, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import React from "react";
import { INITIAL_ACTIVITIES } from "../../lib/mock-data";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";

export function ActivityFeed() {
  return (
    <GlowingCard className="p-6">
      <div className="flex items-center justify-between border-b border-line pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            <h3 className="font-mono text-base font-bold text-ink uppercase tracking-wider">
              Real-Time Platform Audit Stream
            </h3>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-0.5">
            Encrypted activity trail of disputes, auto-savings, and coupon shields
          </p>
        </div>
        <Badge variant="outline">Live Stream</Badge>
      </div>

      <div className="space-y-3 font-sans text-xs">
        {INITIAL_ACTIVITIES.map((act) => (
          <div
            key={act.id}
            className="p-3.5 bg-surface/50 border border-line flex items-start justify-between gap-4"
          >
            <div className="flex items-start gap-3">
              {act.type === "success" ? (
                <CheckCircle2 className="w-4 h-4 text-positive shrink-0 mt-0.5" />
              ) : act.type === "warning" ? (
                <AlertTriangle className="w-4 h-4 text-alert shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-mono font-bold text-ink text-xs block">{act.title}</span>
                <p className="text-ink-secondary text-xs mt-0.5 leading-relaxed">
                  {act.description}
                </p>
              </div>
            </div>
            <span className="font-mono text-[10px] text-ink-muted shrink-0">{act.timestamp}</span>
          </div>
        ))}
      </div>
    </GlowingCard>
  );
}
