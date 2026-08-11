"use client";

import { CreditCard, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { INITIAL_SUBSCRIPTIONS } from "../../lib/mock-data";
import { Subscription } from "../../lib/types";
import { Badge } from "../ui/Badge";
import { DisputeModal } from "./DisputeModal";
import { SubscriptionAuditor } from "./SubscriptionAuditor";

export function ActionCenter() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(INITIAL_SUBSCRIPTIONS);
  const [autoFlagEnabled, setAutoFlagEnabled] = useState(true);
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);

  const handleSendDispute = (subId: string) => {
    setSubscriptions((prev) =>
      prev.map((s) => (s.id === subId ? { ...s, status: "Active", autoFlagged: false } : s))
    );
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-4 glass-panel border border-alert/30 bg-alert/5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-sans text-xs text-ink">
          <Sparkles className="w-4 h-4 text-alert shrink-0" />
          <span>
            <strong className="font-mono text-alert uppercase font-bold">Subscription Audit:</strong> Scanned recurring authorizations. Found 3 subscriptions flagged for review.
          </span>
        </div>
        <Badge variant="alert">Security Shield Active</Badge>
      </div>

      <section className="space-y-4">
        <SubscriptionAuditor
          subscriptions={subscriptions}
          autoFlagEnabled={autoFlagEnabled}
          onToggleAutoFlag={setAutoFlagEnabled}
          onSelectDispute={(sub) => setSelectedSub(sub)}
        />
      </section>

      <DisputeModal
        subscription={selectedSub}
        isOpen={!!selectedSub}
        onClose={() => setSelectedSub(null)}
        onSendDispute={handleSendDispute}
      />
    </div>
  );
}
