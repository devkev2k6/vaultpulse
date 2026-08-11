"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { Button } from "../components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("VaultPulse Application Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-alert/30 bg-surface/80 text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-alert/10 border border-alert/30 flex items-center justify-center mx-auto text-alert">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-ink tracking-tight">
            Unexpected System Exception
          </h2>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            An isolated runtime error occurred. VaultPulse data protection protocols prevented data corruption.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-bg border border-line/60 font-mono text-[11px] text-ink-secondary truncate">
          {error.message || "Unknown Application Exception"}
        </div>

        <Button
          variant="accent"
          onClick={() => reset()}
          className="w-full gap-2 text-xs font-sans font-semibold py-3"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Application State</span>
        </Button>
      </div>
    </div>
  );
}
