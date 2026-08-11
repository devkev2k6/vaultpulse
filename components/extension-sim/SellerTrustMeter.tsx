"use client";

import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, AlertCircle, CheckCircle2, EyeOff } from "lucide-react";
import React from "react";
import { TRUST_FACTORS } from "../../lib/mock-data";
import { computeTrustScore } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";

export function SellerTrustMeter() {
  const overallTrust = computeTrustScore(TRUST_FACTORS);

  const darkPatternFlags = [
    { label: "Fake Countdown Clocks", status: "Clean", icon: CheckCircle2, detail: "No artificial urgency scripts detected." },
    { label: "Artificial Scarcity Badges", status: "Clean", icon: CheckCircle2, detail: "Stock count verified via inventory API." },
    { label: "Auto-Checked Add-Ons", status: "Flagged", icon: AlertCircle, detail: "Blocked 1 pre-selected warranty checkbox (-₹299)." },
  ];

  return (
    <GlowingCard className="p-6 sm:p-8">
      <div className="flex items-center justify-between border-b border-line/60 pb-5 mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-positive" />
          <h3 className="font-sans text-lg font-bold text-ink tracking-tight">
            AI Seller Trust & Dark Pattern Scanner
          </h3>
        </div>
        <Badge variant={overallTrust >= 80 ? "positive" : "alert"}>
          {overallTrust >= 80 ? "Verified Merchant" : "Caution Risk"}
        </Badge>
      </div>

      {/* Trust Score Banner */}
      <div className="p-4 rounded-xl bg-surface/60 border border-line/60 flex items-center justify-between font-sans mb-6">
        <div>
          <span className="text-xs text-ink-muted block">
            Composite Merchant Trust Score
          </span>
          <span className="text-3xl font-mono font-extrabold text-positive mt-0.5 block">
            {overallTrust}<span className="text-xs text-ink-muted font-sans"> / 100</span>
          </span>
        </div>
        <div className="text-right text-xs text-ink-secondary font-sans">
          <span className="font-medium text-ink">99.4% Security SLA</span>
          <span className="text-[11px] text-ink-muted block mt-0.5">EV SSL Encrypted</span>
        </div>
      </div>

      {/* Dark Pattern Protection Scanner */}
      <div className="mb-6 space-y-2">
        <span className="text-xs font-sans font-semibold text-ink-muted uppercase tracking-wider block mb-2">
          AI Dark Pattern Inspection Stream
        </span>
        <div className="grid grid-cols-1 gap-2">
          {darkPatternFlags.map((flag, idx) => {
            const Icon = flag.icon;
            const isClean = flag.status === "Clean";
            return (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start justify-between gap-3 text-xs font-sans ${
                  isClean
                    ? "bg-surface/40 border-line/60"
                    : "bg-alert/10 border-alert/30 text-ink"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isClean ? "text-positive" : "text-alert"}`} />
                  <div>
                    <span className="font-semibold text-ink block">{flag.label}</span>
                    <span className="text-ink-muted text-[11px]">{flag.detail}</span>
                  </div>
                </div>
                <Badge variant={isClean ? "positive" : "alert"} className="shrink-0">
                  {flag.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trust Factors Breakdown */}
      <div className="space-y-3 font-sans">
        <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider block">
          Individual Safety Pillars
        </span>
        {TRUST_FACTORS.map((f) => (
          <div key={f.id} className="p-3.5 rounded-xl bg-surface/40 border border-line/60">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-ink">{f.name}</span>
              <span className="font-mono font-bold text-positive">{f.score}/100</span>
            </div>
            <p className="text-[11px] text-ink-muted leading-relaxed">
              {f.description}
            </p>
          </div>
        ))}
      </div>
    </GlowingCard>
  );
}
