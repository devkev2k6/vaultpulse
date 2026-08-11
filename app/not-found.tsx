import Link from "next/link";
import { Compass, Home } from "lucide-react";
import { Button } from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center p-4 font-sans">
      <div className="max-w-md w-full p-8 rounded-2xl glass-panel border border-line/60 bg-surface/80 text-center space-y-5 shadow-2xl">
        <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center mx-auto text-accent">
          <Compass className="w-6 h-6" />
        </div>

        <div>
          <span className="font-mono text-3xl font-extrabold text-accent">404</span>
          <h2 className="text-xl font-bold text-ink tracking-tight mt-1">
            Page Route Not Found
          </h2>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            The requested module route does not exist or has been relocated within VaultPulse AI.
          </p>
        </div>

        <Link href="/" passHref>
          <Button variant="accent" className="w-full gap-2 text-xs font-sans font-semibold py-3 mt-2">
            <Home className="w-4 h-4" />
            <span>Return to VaultPulse Dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
