"use client";

import React from "react";
import { ActivityFeed } from "./ActivityFeed";
import { SharedGoalsHub } from "./SharedGoalsHub";

export function CollaborationModule() {
  return (
    <div className="space-y-6">
      <SharedGoalsHub />
      <ActivityFeed />
    </div>
  );
}
