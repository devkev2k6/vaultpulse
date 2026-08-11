"use client";

import { motion } from "framer-motion";
import { Sliders, Sparkles, TrendingUp } from "lucide-react";
import React, { useState } from "react";
import { WEALTH_SCORE_FACTORS } from "../../lib/mock-data";
import { WealthScoreFactor } from "../../lib/types";
import { computeWealthScore } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";

interface WealthGaugeProps {
  onScoreChange?: (score: number) => void;
}

export function WealthGauge({ onScoreChange }: WealthGaugeProps) {
  const [factors, setFactors] = useState<WealthScoreFactor[]>(WEALTH_SCORE_FACTORS);
  const [activeFactorId, setActiveFactorId] = useState<string>(factors[0].id);

  const currentScore = computeWealthScore(factors);
  const activeFactor = factors.find((f) => f.id === activeFactorId) || factors[0];

  const handleSliderChange = (id: string, newScore: number) => {
    const updated = factors.map((f) => (f.id === id ? { ...f, score: newScore } : f));
    setFactors(updated);
    const newTotal = computeWealthScore(updated);
    if (onScoreChange) onScoreChange(newTotal);
  };

  // Exact Semicircle Path Geometry: Center (120, 115), Radius 85
  // Arc starts at (35, 115) and ends at (205, 115)
  const arcLength = Math.PI * 85; // ~267.03
  const strokeOffset = arcLength * (1 - currentScore / 100);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // Emerald
    if (score >= 60) return "#38BDF8"; // Sky Blue
    return "#F59E0B"; // Amber
  };

  return (
    <GlowingCard className="p-6 sm:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-line/60 pb-5 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-accent" />
            <h2 className="text-lg font-sans font-bold text-ink tracking-tight">
              Financial Health Overview
            </h2>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-1">
            Real-time composite financial rating evaluated across 5 core pillars
          </p>
        </div>
        <Badge variant={currentScore >= 80 ? "positive" : "accent"}>
          {currentScore >= 80 ? "Optimal Health" : "Moderate Profile"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Perfectly Proportioned Semicircle Arc Gauge */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-line/60 pb-8 lg:pb-0 lg:pr-8">
          <div className="relative w-[240px] h-[135px] flex items-center justify-center">
            <svg viewBox="0 0 240 140" className="w-full h-full">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#38BDF8" />
                  <stop offset="100%" stopColor={getScoreColor(currentScore)} />
                </linearGradient>
              </defs>

              {/* Background Arc Track */}
              <path
                d="M 35 115 A 85 85 0 0 1 205 115"
                fill="none"
                stroke="rgba(var(--line), 0.8)"
                strokeWidth="14"
                strokeLinecap="round"
              />

              {/* Dynamic Animated Progress Arc */}
              <motion.path
                d="M 35 115 A 85 85 0 0 1 205 115"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="14"
                strokeDasharray={arcLength}
                initial={{ strokeDashoffset: arcLength }}
                animate={{ strokeDashoffset: strokeOffset }}
                transition={{ duration: 1.0, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>

            {/* Score Center Labels */}
            <div className="absolute bottom-1 text-center flex flex-col items-center">
              <span className="font-mono text-4xl font-extrabold text-ink tracking-tight">
                {currentScore}
              </span>
              <span className="font-sans text-xs font-medium text-ink-muted mt-0.5">
                Out of 100 Score
              </span>
            </div>
          </div>

          <p className="text-xs text-ink-muted font-sans text-center mt-4 max-w-xs leading-relaxed">
            Adjust individual sliders on the right to simulate portfolio score updates.
          </p>
        </div>

        {/* Right: Pillar Breakdown Cards & Sliders */}
        <div className="lg:col-span-7 space-y-4 font-sans">
          <div className="flex items-center justify-between text-xs font-sans font-medium text-ink-muted border-b border-line/60 pb-2 mb-3">
            <span>Pillar Category</span>
            <span>Weight & Rating</span>
          </div>

          <div className="space-y-3">
            {factors.map((f) => {
              const isSelected = f.id === activeFactorId;
              return (
                <div
                  key={f.id}
                  onClick={() => setActiveFactorId(f.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? "bg-surface-hover/80 border-accent/50 shadow-md"
                      : "bg-surface/40 border-line/60 hover:border-ink-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-sans mb-2">
                    <span className="font-semibold text-ink">{f.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-ink-muted font-mono text-[11px]">Weight: {(f.weight * 100)}%</span>
                      <span className="font-mono font-bold text-accent text-xs">{f.score}/100</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${
                          f.score >= 80
                            ? "bg-positive"
                            : f.score >= 60
                            ? "bg-accent"
                            : "bg-alert"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${f.score}%` }}
                        transition={{ duration: 0.6 }}
                      />
                    </div>
                    {isSelected && (
                      <div className="pt-2 flex items-center gap-3">
                        <Sliders className="w-4 h-4 text-accent shrink-0" />
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={f.score}
                          onChange={(e) => handleSliderChange(f.id, parseInt(e.target.value))}
                          className="w-full h-1.5 bg-line rounded-full accent-accent cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Advice Box */}
          <div className="p-4 rounded-xl bg-accent/10 border border-accent/30 text-xs text-ink flex items-start gap-3 mt-4">
            <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
            <div className="leading-relaxed font-sans">
              <span className="font-semibold text-accent">
                Insight ({activeFactor.name}):
              </span>{" "}
              <span className="text-ink-secondary">{activeFactor.advice}</span>
            </div>
          </div>
        </div>
      </div>
    </GlowingCard>
  );
}
