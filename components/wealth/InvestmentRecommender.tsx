"use client";

import { CheckCircle2, ShieldAlert, Sparkles, Zap } from "lucide-react";
import React from "react";
import { INVESTMENT_OPTIONS } from "../../lib/mock-data";
import { InvestmentOption, RiskTolerance } from "../../lib/types";
import { formatINR, formatPercent } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";
import { SegmentedControl } from "../ui/SegmentedControl";

interface InvestmentRecommenderProps {
  selectedRisk: RiskTolerance;
  onRiskChange: (risk: RiskTolerance) => void;
}

export function InvestmentRecommender({
  selectedRisk,
  onRiskChange,
}: InvestmentRecommenderProps) {
  const riskOptions = [
    { value: "conservative" as RiskTolerance, label: "Conservative", badge: "Safe" },
    { value: "balanced" as RiskTolerance, label: "Balanced", badge: "Popular" },
    { value: "aggressive" as RiskTolerance, label: "Aggressive", badge: "High Return" },
  ];

  const options = INVESTMENT_OPTIONS.map((opt) => ({
    ...opt,
    matched: opt.riskProfile === selectedRisk,
  })).sort((a, b) => (b.matched ? 1 : 0) - (a.matched ? 1 : 0));

  return (
    <GlowingCard className="p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-line/60 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-sans text-lg font-bold text-ink tracking-tight">
              Recommended Investment Options
            </h3>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-0.5">
            Equity, Gold, and Index funds matched to your selected risk tolerance
          </p>
        </div>

        <SegmentedControl
          options={riskOptions}
          value={selectedRisk}
          onChange={onRiskChange}
          size="sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 font-sans">
        {options.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl border transition-all flex flex-col justify-between group ${
              item.matched
                ? "bg-surface-hover/80 border-accent/50 shadow-md"
                : "bg-surface/40 border-line/60 opacity-80 hover:opacity-100 hover:border-ink-muted/60"
            }`}
          >
            <div>
              <div className="flex items-start justify-between mb-2.5">
                <div>
                  <span className="text-[11px] font-sans font-medium text-accent block uppercase tracking-wider">
                    {item.category}
                  </span>
                  <h4 className="font-sans text-base font-bold text-ink group-hover:text-accent transition-colors mt-0.5">
                    {item.title}
                  </h4>
                </div>
                {item.matched ? (
                  <Badge variant="accent" className="flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Profile Match
                  </Badge>
                ) : (
                  <Badge variant="outline" className="shrink-0 text-ink-muted capitalize">
                    {item.riskProfile}
                  </Badge>
                )}
              </div>

              <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {item.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 text-[11px] font-sans bg-line/60 text-ink-secondary rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-line/60 flex items-center justify-between font-sans">
              <div>
                <span className="text-[11px] text-ink-muted block">Min Auto-SIP</span>
                <span className="font-mono font-bold text-sm text-ink">{formatINR(item.minSip)}/mo</span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-ink-muted block">Hist 3Y Return</span>
                <span className="font-mono font-bold text-positive text-base">
                  {formatPercent(item.expectedReturn)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlowingCard>
  );
}
