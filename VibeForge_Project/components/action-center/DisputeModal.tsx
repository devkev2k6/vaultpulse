"use client";

import { Check, Copy, Mail, Send, Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Subscription } from "../../lib/types";
import { DisputeTone, generateDisputeDraft } from "../../lib/utils";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { SegmentedControl } from "../ui/SegmentedControl";

interface DisputeModalProps {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
  onSendDispute: (subId: string) => void;
}

export function DisputeModal({
  subscription,
  isOpen,
  onClose,
  onSendDispute,
}: DisputeModalProps) {
  const [tone, setTone] = useState<DisputeTone>("Firm");
  const [subject, setSubject] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (subscription) {
      const draft = generateDisputeDraft(subscription, tone);
      setSubject(draft.subject);
      setBodyText(draft.body);
    }
  }, [subscription, tone]);

  if (!subscription) return null;

  const toneOptions = [
    { value: "Formal" as DisputeTone, label: "Formal" },
    { value: "Firm" as DisputeTone, label: "Firm" },
    { value: "Legal" as DisputeTone, label: "Legal Notice", badge: "Aggressive" },
    { value: "Soft" as DisputeTone, label: "Friendly" },
  ];

  const handleCopy = () => {
    const fullEmail = `Subject: ${subject}\n\n${bodyText}`;
    navigator.clipboard.writeText(fullEmail);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      onSendDispute(subscription.id);
      onClose();
      alert(`AI Dispute Notice dispatched successfully for ${subscription.name}!`);
    }, 800);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`AI Dispute Composer: ${subscription.name}`}
      maxWidth="lg"
    >
      <div className="space-y-4 font-mono text-xs">
        {/* Header Info Banner */}
        <div className="p-3 bg-accent/10 border border-accent/30 text-ink flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent shrink-0" />
            <span>
              Target Charge: <strong className="text-accent">₹{subscription.amount}</strong> ({subscription.lastChargedDate})
            </span>
          </div>
          <span className="text-[10px] text-ink-muted">AI Deterministic Model</span>
        </div>

        {/* Tone Selector */}
        <div>
          <label className="block text-[11px] text-ink-muted uppercase mb-1">
            Select Email Communication Tone:
          </label>
          <SegmentedControl
            options={toneOptions}
            value={tone}
            onChange={(val) => setTone(val as DisputeTone)}
            size="sm"
          />
        </div>

        {/* Editable Subject */}
        <div>
          <label className="block text-[11px] text-ink-muted uppercase mb-1">
            Email Subject Line:
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-surface border border-line p-2.5 text-ink font-mono focus:outline-none focus:border-accent"
          />
        </div>

        {/* Editable Body */}
        <div>
          <label className="block text-[11px] text-ink-muted uppercase mb-1">
            Email Body Content:
          </label>
          <textarea
            rows={8}
            value={bodyText}
            onChange={(e) => setBodyText(e.target.value)}
            className="w-full bg-surface border border-line p-3 text-ink font-mono text-xs focus:outline-none focus:border-accent leading-relaxed"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2 border-t border-line">
          <Button variant="outline" onClick={handleCopy} className="gap-1.5">
            {isCopied ? <Check className="w-4 h-4 text-positive" /> : <Copy className="w-4 h-4" />}
            <span>{isCopied ? "Copied Email!" : "Copy to Clipboard"}</span>
          </Button>

          <Button
            variant="alert"
            isLoading={isSending}
            onClick={handleSend}
            className="gap-1.5"
          >
            <Send className="w-4 h-4" />
            <span>Dispatch Dispute Email</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}
