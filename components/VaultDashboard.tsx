"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown, ArrowUp, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useMode } from "../context/ModeContext";
import { MARKET_TICKERS } from "../lib/mock-data";
import { MarketTicker } from "../lib/types";
import { formatINR } from "../lib/utils";
import { ActionCenter } from "./action-center/ActionCenter";
import { AuthModal } from "./auth/AuthModal";
import { CollaborationModule } from "./collaboration/CollaborationModule";
import { ExtensionSimulator } from "./extension-sim/ExtensionSimulator";
import { MobileNav } from "./layout/MobileNav";
import { Navbar } from "./layout/Navbar";
import { QuickTourModal } from "./layout/QuickTourModal";
import { AnimatedBackground } from "./ui/AnimatedBackground";
import { WealthHub } from "./wealth/WealthHub";

export function VaultDashboard() {
  const { mode } = useMode();
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [tickers, setTickers] = useState<MarketTicker[]>(MARKET_TICKERS);

  useEffect(() => {
    const fetchMarket = async () => {
      try {
        const res = await fetch("/api/market");
        if (res.ok) {
          const data = await res.json();
          if (data.tickers) setTickers(data.tickers);
        }
      } catch (e) {
        // fallback
      }
    };
    fetchMarket();
    const interval = setInterval(fetchMarket, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col pb-20 lg:pb-8">
      <AnimatedBackground />

      {/* Sleek Top Navbar */}
      <Navbar onOpenTour={() => setIsTourOpen(true)} />

      {/* Live Market Price Ticker */}
      <div className="w-full bg-surface/40 border-b border-line/60 py-2 px-4 overflow-x-auto whitespace-nowrap scrollbar-none font-sans text-xs z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-accent uppercase font-mono font-semibold flex items-center gap-1.5 shrink-0">
              <TrendingUp className="w-3.5 h-3.5" /> Market Feed:
            </span>
            {tickers.map((t) => (
              <div key={t.symbol} className="inline-flex items-center gap-2 text-ink">
                <span className="text-ink-muted text-xs font-sans">{t.symbol}:</span>
                <span className="font-mono font-semibold">
                  {t.type === "Gold" || t.type === "Index" || t.type === "Crypto"
                    ? formatINR(t.price)
                    : t.price}
                </span>
                <span
                  className={`inline-flex items-center text-[11px] font-sans font-semibold ${
                    t.changePercent >= 0 ? "text-positive" : "text-alert"
                  }`}
                >
                  {t.changePercent >= 0 ? (
                    <ArrowUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDown className="w-3 h-3 mr-0.5" />
                  )}
                  {Math.abs(t.changePercent)}%
                </span>
              </div>
            ))}
          </div>
          <span className="text-[11px] text-ink-muted hidden md:inline shrink-0 font-sans">
            Real-Time Encrypted Stream
          </span>
        </div>
      </div>

      {/* Main Module Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "wealth" && <WealthHub />}
            {mode === "extension" && <ExtensionSimulator />}
            {mode === "action" && <ActionCenter />}
            {mode === "collaboration" && <CollaborationModule />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-line/60 py-5 px-4 text-center font-sans text-xs text-ink-muted z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>VaultPulse AI © 2026</span>
          <span className="text-ink-secondary font-medium">Financial Intelligence Platform</span>
        </div>
      </footer>

      <MobileNav />
      <AuthModal />
      <QuickTourModal isOpen={isTourOpen} onClose={() => setIsTourOpen(false)} />
    </div>
  );
}
