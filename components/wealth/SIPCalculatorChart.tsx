"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import { SIP_PROJECTIONS, INITIAL_SIP_MONTHLY } from "../../lib/mock-data";
import { RiskTolerance } from "../../lib/types";
import { formatINR } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";
import { SegmentedControl } from "../ui/SegmentedControl";

interface SIPCalculatorChartProps {
  selectedRisk: RiskTolerance;
}

export function SIPCalculatorChart({ selectedRisk }: SIPCalculatorChartProps) {
  const [durationYears, setDurationYears] = useState<number>(5);
  const [monthlyDeposit, setMonthlyDeposit] = useState<number>(INITIAL_SIP_MONTHLY);

  const durationOptions = [
    { value: "1", label: "1 Year" },
    { value: "5", label: "5 Years" },
    { value: "10", label: "10 Years" },
  ];

  const chartData = SIP_PROJECTIONS.filter((p) => p.year <= durationYears).map((p) => {
    const scale = monthlyDeposit / INITIAL_SIP_MONTHLY;
    return {
      year: `Yr ${p.year}`,
      conservative: Math.round(p.conservative * scale),
      balanced: Math.round(p.balanced * scale),
      aggressive: Math.round(p.aggressive * scale),
    };
  });

  const finalPoint = chartData[chartData.length - 1];
  const projectedReturn =
    selectedRisk === "conservative"
      ? finalPoint.conservative
      : selectedRisk === "aggressive"
      ? finalPoint.aggressive
      : finalPoint.balanced;

  const totalInvested = monthlyDeposit * 12 * durationYears;
  const netGain = projectedReturn - totalInvested;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-line/80 rounded-xl p-3 shadow-xl font-sans text-xs space-y-1.5">
          <p className="font-semibold text-accent border-b border-line/60 pb-1">{label} Forecast</p>
          {payload.map((entry: any, index: number) => (
            <div key={`item-${index}`} className="flex items-center justify-between gap-4 font-mono">
              <span style={{ color: entry.color }} className="capitalize font-sans text-xs">
                {entry.name}:
              </span>
              <span className="font-bold text-ink">{formatINR(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <GlowingCard className="p-6 sm:p-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-line/60 pb-5 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-sans text-lg font-bold text-ink tracking-tight">
              Wealth Growth Predictor
            </h3>
            <Badge variant="accent">SIP FV Engine</Badge>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-0.5">
            Compound interest growth modeling from ₹{monthlyDeposit}/mo auto-save deposits
          </p>
        </div>

        <SegmentedControl
          options={durationOptions}
          value={String(durationYears)}
          onChange={(val) => setDurationYears(parseInt(val))}
          size="sm"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-xl bg-surface/60 border border-line/60 font-sans">
          <span className="text-xs text-ink-muted block mb-1">
            Monthly Savings Rate
          </span>
          <div className="flex items-center gap-2 font-mono">
            <span className="text-sm font-bold text-ink">₹</span>
            <input
              type="number"
              step="100"
              value={monthlyDeposit}
              onChange={(e) => setMonthlyDeposit(Math.max(100, parseInt(e.target.value) || 0))}
              className="w-full bg-transparent text-base font-bold text-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-surface/60 border border-line/60 font-sans">
          <span className="text-xs text-ink-muted block mb-1">Total Principal Invested</span>
          <span className="text-base font-mono font-bold text-ink">{formatINR(totalInvested)}</span>
        </div>

        <div className="p-4 rounded-xl bg-accent/10 border border-accent/40 font-sans">
          <span className="text-xs text-accent font-medium block mb-1">
            {durationYears}Y Projected Return ({selectedRisk})
          </span>
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-lg font-bold text-positive">
              {formatINR(projectedReturn)}
            </span>
            <span className="text-xs text-positive font-semibold">
              +{formatINR(netGain)} Net Profit
            </span>
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorBalanced" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(var(--accent))" stopOpacity={0.4} />
                <stop offset="95%" stopColor="rgb(var(--accent))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(var(--line), 0.4)" />
            <XAxis dataKey="year" stroke="rgb(var(--ink-muted))" fontSize={12} fontFamily="Inter" />
            <YAxis
              stroke="rgb(var(--ink-muted))"
              fontSize={12}
              fontFamily="JetBrains Mono"
              tickFormatter={(val) => formatINR(val, true)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: "12px", fontFamily: "Inter", paddingTop: "12px" }} />
            <Area
              type="monotone"
              dataKey="conservative"
              name="Conservative (7.5%)"
              stroke="rgb(var(--ink-muted))"
              fill="transparent"
              strokeWidth={selectedRisk === "conservative" ? 3 : 1.5}
              strokeOpacity={selectedRisk === "conservative" ? 1 : 0.4}
            />
            <Area
              type="monotone"
              dataKey="balanced"
              name="Balanced (11%)"
              stroke="rgb(var(--accent))"
              fill="url(#colorBalanced)"
              strokeWidth={selectedRisk === "balanced" ? 3 : 1.5}
              strokeOpacity={selectedRisk === "balanced" ? 1 : 0.4}
            />
            <Area
              type="monotone"
              dataKey="aggressive"
              name="Aggressive (14.5%)"
              stroke="rgb(var(--positive))"
              fill="transparent"
              strokeWidth={selectedRisk === "aggressive" ? 3 : 1.5}
              strokeOpacity={selectedRisk === "aggressive" ? 1 : 0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlowingCard>
  );
}
