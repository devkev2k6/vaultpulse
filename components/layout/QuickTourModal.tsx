"use client";

import { motion } from "framer-motion";
import {
  ChevronRight,
  Compass,
  CreditCard,
  Palette,
  ShoppingBag,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useMode } from "../../context/ModeContext";
import { SystemMode } from "../../lib/types";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface QuickTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickTourModal({ isOpen, onClose }: QuickTourModalProps) {
  const [step, setStep] = useState(0);
  const { setMode } = useMode();

  const steps = [
    {
      title: "Welcome to VaultPulse AI",
      subtitle: "Platform Features Overview",
      icon: Sparkles,
      content:
        "VaultPulse AI integrates financial predictive modeling, e-commerce consumer protection, and automated subscription auditing into a single unified platform.",
      actionText: "Start Feature Tour",
    },
    {
      title: "1. AI Wealth & SIP Predictor",
      subtitle: "Predictive Portfolio & Health Index",
      icon: TrendingUp,
      modeTarget: "wealth" as SystemMode,
      content:
        "Evaluates 5 weighted financial pillars to generate a 0–100 Health Score, matches index and equity funds based on risk profile, and projects multi-year compound SIP growth.",
      actionText: "View Wealth Module",
    },
    {
      title: "2. E-Commerce Shopping Shield",
      subtitle: "Seller Security & Price Protection",
      icon: ShoppingBag,
      modeTarget: "extension" as SystemMode,
      content:
        "Analyzes online merchant domain trust, cross-checks prices across rival stores, and applies behavioral impulse barriers to protect personal savings goals.",
      actionText: "View Shopping Shield",
    },
    {
      title: "3. Subscription & Leakage Auditor",
      subtitle: "Automated Dispute & Cancellation Engine",
      icon: CreditCard,
      modeTarget: "action" as SystemMode,
      content:
        "Detects inactive or unauthorized recurring subscriptions, computes annual financial leakage, and generates tone-customized legal dispute email drafts.",
      actionText: "View Subscription Auditor",
    },
    {
      title: "4. Shared Household Wealth",
      subtitle: "Multiplayer Savings & Real-Time Audit Log",
      icon: Users,
      modeTarget: "collaboration" as SystemMode,
      content:
        "Track shared partner and family savings targets, split subscription expenses, and view real-time audit activity logs.",
      actionText: "View Shared Goals",
    },
    {
      title: "5. Custom Interface Aesthetics",
      subtitle: "Multi-Theme Customization Engine",
      icon: Palette,
      content:
        "Switch between 5 custom aesthetic themes (Dark Matte, Light Crisp, Cyber Neon, Emerald Luxe, Midnight Gold) with automatic cross-tab synchronization.",
      actionText: "Complete Tour",
    },
  ];

  const currentStep = steps[step];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (currentStep.modeTarget) {
      setMode(currentStep.modeTarget);
    }
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onClose();
      setStep(0);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Platform Tour & Overview" maxWidth="md">
      <div className="space-y-6 font-sans">
        {/* Progress Bar */}
        <div className="flex items-center gap-1">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 transition-all ${
                i <= step ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>

        {/* Step Card Content */}
        <div className="p-5 bg-surface/80 border border-line space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent/15 border border-accent/40 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-base font-mono font-bold text-ink">{currentStep.title}</h4>
              <p className="text-xs font-mono text-accent">{currentStep.subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-ink-secondary leading-relaxed">
            {currentStep.content}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="text-xs font-mono text-ink-muted hover:text-ink disabled:opacity-30"
          >
            Previous Step
          </button>
          <Button variant="accent" onClick={handleNext} className="gap-2 font-mono text-xs uppercase">
            <span>{currentStep.actionText}</span>
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
