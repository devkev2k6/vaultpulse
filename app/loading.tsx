import { Activity } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center p-4 font-sans">
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center animate-pulse">
          <Activity className="w-6 h-6 text-accent animate-spin" style={{ animationDuration: "3s" }} />
        </div>
        <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
          Initializing VaultPulse AI Engine...
        </span>
      </div>
    </div>
  );
}
