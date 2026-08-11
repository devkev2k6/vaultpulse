"use client";

import { CheckCircle2, Lock, Mail, ShieldCheck, Sparkles, User } from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

export function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, signup, user, setDemoPreset } =
    useAuth();
  const [tab, setTab] = useState<"preset" | "login" | "signup">("preset");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      login(email);
      setIsLoading(false);
    }, 500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;
    setIsLoading(true);
    setTimeout(() => {
      signup(email, name);
      setIsLoading(false);
    }, 500);
  };

  return (
    <Modal
      isOpen={isAuthModalOpen}
      onClose={closeAuthModal}
      title="User Account & Security Settings"
      maxWidth="md"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-line">
          <button
            onClick={() => setTab("preset")}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
              tab === "preset"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Financial Profile Presets
          </button>
          <button
            onClick={() => setTab("login")}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
              tab === "login"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab("signup")}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider border-b-2 transition-colors ${
              tab === "signup"
                ? "border-accent text-accent font-semibold"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Tab 1: Financial Profile Presets */}
        {tab === "preset" && (
          <div className="space-y-4">
            <div className="p-3 bg-accent/10 border border-accent/30 text-xs font-sans text-ink flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
              <div>
                <span className="font-mono font-semibold text-accent uppercase">
                  Profile Configuration:
                </span>{" "}
                Select a simulation profile to inspect portfolio models and risk scenarios.
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 font-sans">
              {[
                {
                  id: "Balanced Wealth",
                  desc: "Balanced investment allocation with ₹98,500 target emergency fund progress.",
                  badge: "Balanced Strategy",
                },
                {
                  id: "High Subscription Leakage",
                  desc: "Simulates ₹4,248/mo in recurring subscription charges for audit & cancellation testing.",
                  badge: "Subscription Focus",
                },
                {
                  id: "Impulse Saver",
                  desc: "Simulates active shopping shield protection with ₹14,200 saved in impulse barriers.",
                  badge: "Consumer Shield",
                },
              ].map((p) => {
                const isSelected = user.demoPreset === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => {
                      setDemoPreset(p.id as any);
                      closeAuthModal();
                    }}
                    className={`w-full p-4 text-left border transition-all flex items-center justify-between group ${
                      isSelected
                        ? "bg-accent/15 border-accent text-ink"
                        : "bg-surface/60 border-line hover:border-ink-muted text-ink-secondary"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-sm font-bold text-ink">
                          {p.id}
                        </span>
                        <span className="px-2 py-0.5 text-[10px] bg-line text-accent font-mono">
                          {p.badge}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed">{p.desc}</p>
                    </div>
                    {isSelected && (
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Login Form */}
        {tab === "login" && (
          <form onSubmit={handleLoginSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@vibeforge.ai"
                  className="w-full bg-surface border border-line pl-10 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface border border-line pl-10 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="accent"
              isLoading={isLoading}
              className="w-full font-mono text-xs uppercase"
            >
              Sign In to Account
            </Button>
          </form>
        )}

        {/* Tab 3: Signup Form */}
        {tab === "signup" && (
          <form onSubmit={handleSignupSubmit} className="space-y-4 font-sans">
            <div>
              <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Mercer"
                  className="w-full bg-surface border border-line pl-10 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.mercer@vibeforge.ai"
                  className="w-full bg-surface border border-line pl-10 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-ink-muted mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-ink-muted absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-surface border border-line pl-10 pr-3 py-2 text-sm text-ink focus:outline-none focus:border-accent"
                />
              </div>
            </div>
            <Button
              type="submit"
              variant="positive"
              isLoading={isLoading}
              className="w-full font-mono text-xs uppercase"
            >
              Create VaultPulse Profile
            </Button>
          </form>
        )}

        {/* Security & Encryption Footer */}
        <div className="pt-4 border-t border-line flex items-center justify-between text-[11px] font-mono text-ink-muted">
          <span className="flex items-center gap-1 text-positive">
            <ShieldCheck className="w-3.5 h-3.5" /> Web Crypto SHA-256 Protocol
          </span>
          <span>Zero-Knowledge Encryption</span>
        </div>
      </div>
    </Modal>
  );
}
