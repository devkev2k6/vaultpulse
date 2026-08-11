"use client";

import { AlertCircle, AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Trash2, Zap } from "lucide-react";
import React from "react";
import { Subscription } from "../../lib/types";
import { formatINR } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlowingCard } from "../ui/GlowingCard";
import { ToggleSwitch } from "../ui/ToggleSwitch";

interface SubscriptionAuditorProps {
  subscriptions: Subscription[];
  autoFlagEnabled: boolean;
  onToggleAutoFlag: (enabled: boolean) => void;
  onSelectDispute: (sub: Subscription) => void;
}

export function SubscriptionAuditor({
  subscriptions,
  autoFlagEnabled,
  onToggleAutoFlag,
  onSelectDispute,
}: SubscriptionAuditorProps) {
  const nonActiveSubs = subscriptions.filter((s) => s.status !== "Active");
  const monthlyLeakage = nonActiveSubs.reduce((sum, s) => sum + s.amount, 0);
  const annualLeakage = monthlyLeakage * 12;

  const getStatusBadge = (status: Subscription["status"]) => {
    switch (status) {
      case "Suspicious":
        return <Badge variant="alert">Suspicious Charge</Badge>;
      case "Forgotten":
        return <Badge variant="accent">30+ Days Inactive</Badge>;
      case "Active":
      default:
        return <Badge variant="positive">Active Service</Badge>;
    }
  };

  return (
    <GlowingCard className="p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-line pb-4 mb-6 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-alert" />
            <h3 className="font-mono text-base font-bold text-ink uppercase tracking-wider">
              Subscription & Scam Auditor
            </h3>
          </div>
          <p className="text-xs font-sans text-ink-muted mt-0.5">
            Auto-scans recurring merchant debit streams to detect price spikes & forgotten charges
          </p>
        </div>

        <ToggleSwitch
          checked={autoFlagEnabled}
          onChange={onToggleAutoFlag}
          label="Auto-Flag 30+ Days Inactive"
        />
      </div>

      {/* Recoverable Leakage Metric Header */}
      <div className="p-4 bg-alert/10 border border-alert/30 flex flex-col md:flex-row items-start md:items-center justify-between mb-6 font-mono gap-4">
        <div>
          <span className="text-[10px] text-alert uppercase block font-bold">
            Identified Monthly Financial Leakage
          </span>
          <span className="text-2xl font-extrabold text-alert">
            {formatINR(monthlyLeakage)}<span className="text-xs text-ink-muted">/mo</span>
          </span>
        </div>
        <div className="text-left md:text-right">
          <span className="text-[10px] text-ink-muted uppercase block">
            Annual Recoverable Capital
          </span>
          <span className="text-lg font-bold text-positive">
            {formatINR(annualLeakage)}/yr
          </span>
        </div>
      </div>

      {/* Tracked Subscriptions List */}
      <div className="space-y-3 font-sans">
        {subscriptions.map((sub) => (
          <div
            key={sub.id}
            className={`p-4 border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
              sub.status === "Suspicious"
                ? "bg-alert/10 border-alert/50"
                : sub.status === "Forgotten"
                ? "bg-surface-hover/60 border-accent/40"
                : "bg-surface/50 border-line opacity-80"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 bg-surface border border-line flex items-center justify-center font-mono font-bold text-ink text-sm shrink-0">
                {sub.name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="font-mono text-sm font-bold text-ink">{sub.name}</span>
                  {getStatusBadge(sub.status)}
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                  <span>Category: {sub.category}</span>
                  <span>•</span>
                  <span>Last charged: {sub.lastChargedDate}</span>
                </div>
                {sub.disputeReason && (
                  <p className="text-xs text-alert mt-1 font-sans flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {sub.disputeReason}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4 font-mono">
              <div className="text-left md:text-right">
                <span className="text-sm font-bold text-ink block">{formatINR(sub.amount)}</span>
                <span className="text-[10px] text-ink-muted uppercase">{sub.billingCycle}</span>
              </div>

              {sub.status !== "Active" ? (
                <Button
                  variant={sub.status === "Suspicious" ? "alert" : "accent"}
                  size="sm"
                  onClick={() => onSelectDispute(sub)}
                  className="font-mono text-xs uppercase"
                >
                  Draft AI Dispute
                </Button>
              ) : (
                <Button variant="outline" size="sm" className="text-xs font-mono text-ink-muted">
                  Active Plan
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlowingCard>
  );
}
