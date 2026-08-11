"use client";

import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2, ShieldAlert, Sparkles, Tag } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { formatINR } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { GlowingCard } from "../ui/GlowingCard";
import { Modal } from "../ui/Modal";

interface ImpulseShieldProps {
  cartTotal: number;
  onApplyCoupon: (discountPercent: number) => void;
}

export function ImpulseShield({ cartTotal, onApplyCoupon }: ImpulseShieldProps) {
  const { user } = useAuth();
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [isShieldModalOpen, setIsShieldModalOpen] = useState(false);

  const goalDelayWeeks = (cartTotal / 3500).toFixed(1);

  const handleApplyCouponClick = () => {
    setIsCouponApplied(true);
    onApplyCoupon(6);
  };

  return (
    <>
      <GlowingCard className="p-6 border-alert/40 bg-alert/5">
        <div className="flex items-center justify-between border-b border-line/60 pb-4 mb-5">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-alert" />
            <h3 className="font-sans text-base font-bold text-ink tracking-tight">
              AI Impulse Shield & Coupon Solver
            </h3>
          </div>
          <Badge variant="alert">Goal Shield Active</Badge>
        </div>

        <div className="space-y-4">
          {/* Coupon Action */}
          <div className="p-4 rounded-xl bg-surface/80 border border-line/60 flex items-center justify-between font-sans text-xs">
            <div>
              <span className="font-bold text-ink flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-accent" /> Coupon Code: VAULT500
              </span>
              <span className="text-[11px] text-ink-muted block mt-0.5">
                Applies instant 6% price reduction
              </span>
            </div>
            <Button
              variant={isCouponApplied ? "positive" : "accent"}
              size="sm"
              onClick={handleApplyCouponClick}
              disabled={isCouponApplied}
              className="font-sans text-xs"
            >
              {isCouponApplied ? "Applied!" : "Apply (-6%)"}
            </Button>
          </div>

          {/* Impulse Warning Alert Banner */}
          <div className="p-4 rounded-xl bg-alert/10 border border-alert/30 text-xs font-sans text-ink space-y-2">
            <div className="flex items-center gap-2 text-alert font-bold">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>Impulse Shopping Barrier Alert</span>
            </div>
            <p className="text-ink-secondary text-xs leading-relaxed">
              Completing this transaction of <strong className="text-ink">{formatINR(cartTotal)}</strong> will delay your active financial target{" "}
              <strong className="text-accent">{user.savingsGoal}</strong> by approximately{" "}
              <strong className="text-alert">{goalDelayWeeks} weeks</strong>.
            </p>
            <Button
              variant="alert"
              size="sm"
              onClick={() => setIsShieldModalOpen(true)}
              className="w-full text-xs font-sans font-semibold mt-2 py-2.5"
            >
              Evaluate Goal Impact Shield
            </Button>
          </div>
        </div>
      </GlowingCard>

      {/* Impulse Barrier Modal */}
      <Modal
        isOpen={isShieldModalOpen}
        onClose={() => setIsShieldModalOpen(false)}
        title="AI Impulse Purchase Barrier"
        maxWidth="md"
      >
        <div className="space-y-4 font-sans text-xs">
          <div className="p-4 rounded-xl bg-alert/10 border border-alert/30 text-alert flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Financial Nudge Warning:</span>
              <p className="text-ink text-xs mt-1 leading-relaxed">
                Before confirming this ₹{cartTotal} transaction, review the direct impact on your target emergency reserves.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface border border-line/60 space-y-3 font-sans">
            <div className="flex items-center justify-between text-sm">
              <span className="text-ink-muted">Active Target:</span>
              <span className="font-bold text-accent">{user.savingsGoal}</span>
            </div>

            <div className="flex items-center justify-between font-mono">
              <span className="text-ink-muted font-sans text-xs">Current Balance / Goal:</span>
              <span className="font-bold text-ink">
                {formatINR(user.goalCurrentAmount)} / {formatINR(user.goalTargetAmount)}
              </span>
            </div>

            <div className="w-full bg-line/60 h-2 rounded-full overflow-hidden">
              <div
                className="bg-accent h-full rounded-full"
                style={{
                  width: `${(user.goalCurrentAmount / user.goalTargetAmount) * 100}%`,
                }}
              />
            </div>

            <div className="pt-2 border-t border-line/60 flex items-center justify-between text-alert font-bold">
              <span>Goal Completion Delay:</span>
              <span>+{goalDelayWeeks} Weeks</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 font-sans">
            <Button
              variant="outline"
              onClick={() => setIsShieldModalOpen(false)}
              className="w-full text-xs"
            >
              Proceed With Order
            </Button>
            <Button
              variant="positive"
              onClick={() => {
                setIsShieldModalOpen(false);
                alert(`Disciplined decision! Saved ${formatINR(cartTotal)} towards your ${user.savingsGoal}.`);
              }}
              className="w-full text-xs font-semibold"
            >
              Cancel & Save {formatINR(cartTotal)}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
