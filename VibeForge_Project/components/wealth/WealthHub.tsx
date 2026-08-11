"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Send, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { RiskTolerance } from "../../lib/types";
import { Button } from "../ui/Button";
import { GlowingCard } from "../ui/GlowingCard";
import { InvestmentRecommender } from "./InvestmentRecommender";
import { SIPCalculatorChart } from "./SIPCalculatorChart";
import { WealthGauge } from "./WealthGauge";

export function WealthHub() {
  const { user } = useAuth();
  const [risk, setRisk] = useState<RiskTolerance>("balanced");
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "ai" | "user"; text: string; time: string }[]
  >([
    {
      sender: "ai",
      text: `Hello ${user.name.split(" ")[0]}! I am your VaultPulse AI Advisor. Your current Wealth Health Index is 84/100. How can I assist with your portfolio today?`,
      time: "Just now",
    },
  ]);
  const [inputQuery, setInputQuery] = useState("");

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = inputQuery;
    setInputQuery("");
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMsg, time: "Just now" },
    ]);

    setTimeout(() => {
      let reply = `Based on your ${risk} risk profile and active ₹1,850/mo auto-roundup savings, allocating 60% into Nifty 50 Index Funds and 40% into Sovereign Gold Bonds offers optimal stability.`;
      if (userMsg.toLowerCase().includes("tax")) {
        reply = "For tax savings under Section 80C, consider ELSS Equity Funds with a 3-year lock-in yielding historical 14.2% annual returns.";
      } else if (userMsg.toLowerCase().includes("emergency")) {
        reply = `You currently have ₹98,500 in your ${user.savingsGoal}. Increasing monthly deposits by ₹500 achieves your target 2.4 months faster.`;
      }

      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: reply, time: "Just now" },
      ]);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-4 rounded-2xl glass-panel border border-accent/30 bg-accent/5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-sans text-xs text-ink">
          <Sparkles className="w-4 h-4 text-accent shrink-0" />
          <span className="leading-relaxed">
            <strong className="font-sans font-semibold text-accent">Financial Advisory:</strong> Auto-roundup deposits have increased your projected 5-year wealth growth by +₹18,400.
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsCopilotOpen(!isCopilotOpen)}
          className="text-xs font-sans text-accent border-accent/40 hover:border-accent hidden sm:flex items-center gap-1.5 shrink-0"
        >
          <Bot className="w-3.5 h-3.5" />
          <span>{isCopilotOpen ? "Close Advisor" : "AI Advisor"}</span>
        </Button>
      </div>

      {/* Section 1: Financial Health Overview */}
      <section>
        <WealthGauge />
      </section>

      {/* Section 2: Wealth Growth Projection */}
      <section>
        <SIPCalculatorChart selectedRisk={risk} />
      </section>

      {/* Section 3: Recommended Investment Options */}
      <section>
        <InvestmentRecommender selectedRisk={risk} onRiskChange={setRisk} />
      </section>

      {/* Embedded AI Advisor Drawer */}
      {isCopilotOpen && (
        <GlowingCard className="p-5 border-accent/50">
          <div className="flex items-center justify-between border-b border-line/60 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-accent" />
              <span className="font-sans text-sm font-bold text-ink">
                VaultPulse AI Advisor
              </span>
            </div>
            <button
              onClick={() => setIsCopilotOpen(false)}
              className="text-xs font-sans text-ink-muted hover:text-ink"
            >
              Close Advisor
            </button>
          </div>

          <div className="h-52 overflow-y-auto space-y-3 mb-4 p-3.5 bg-bg/90 rounded-xl border border-line/60 font-sans text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl max-w-[85%] leading-relaxed ${
                  m.sender === "user"
                    ? "ml-auto bg-accent text-accent-foreground font-medium"
                    : "mr-auto bg-surface border border-line/60 text-ink"
                }`}
              >
                <p>{m.text}</p>
                <span className="text-[10px] opacity-60 block mt-1 font-mono">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendQuery} className="flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask AI Advisor (e.g. How to save tax or speed up goal?)..."
              className="flex-1 bg-surface border border-line/60 rounded-xl px-3.5 py-2 text-xs text-ink focus:outline-none focus:border-accent font-sans"
            />
            <Button type="submit" variant="accent" size="sm">
              <Send className="w-3.5 h-3.5" />
            </Button>
          </form>
        </GlowingCard>
      )}
    </div>
  );
}
