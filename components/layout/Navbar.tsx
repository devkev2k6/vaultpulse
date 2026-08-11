"use client";

import {
  Activity,
  ChevronDown,
  Compass,
  CreditCard,
  Palette,
  ShoppingBag,
  TrendingUp,
  User as UserIcon,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useMode } from "../../context/ModeContext";
import { useTheme } from "../../context/ThemeContext";
import { THEME_PRESETS } from "../../lib/theme-config";
import { SystemMode, Theme } from "../../lib/types";
import { Button } from "../ui/Button";

interface NavbarProps {
  onOpenTour: () => void;
}

export function Navbar({ onOpenTour }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const { mode, setMode } = useMode();
  const { user, openAuthModal } = useAuth();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);

  const navItems: { id: SystemMode; label: string; icon: React.ElementType }[] = [
    { id: "wealth", label: "Wealth Predictor", icon: TrendingUp },
    { id: "extension", label: "Shopping Shield", icon: ShoppingBag },
    { id: "action", label: "Subscription Auditor", icon: CreditCard },
    { id: "collaboration", label: "Shared Goals", icon: Users },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-surface/80 border-b border-line/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-accent/15 border border-accent/30 rounded-xl flex items-center justify-center relative">
              <Activity className="w-5 h-5 text-accent" />
            </div>
            <div>
              <span className="font-sans text-lg font-bold tracking-tight text-ink">
                VaultPulse<span className="text-accent"> AI</span>
              </span>
              <p className="text-[11px] font-sans text-ink-muted hidden md:block">
                Financial Intelligence Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-bg/60 p-1 border border-line/60 rounded-xl">
            {navItems.map((opt) => {
              const Icon = opt.icon;
              const isActive = mode === opt.id;
              return (
                <button
                  key={opt.id}
                  onClick={() => setMode(opt.id)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-sans font-medium rounded-lg transition-all ${
                    isActive
                      ? "bg-surface text-accent font-semibold shadow-sm border border-line/80"
                      : "text-ink-secondary hover:text-ink hover:bg-surface/40"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-accent" : "text-ink-muted"}`} />
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Toolbar */}
          <div className="flex items-center gap-2.5">
            {/* Feature Guide */}
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenTour}
              className="hidden sm:flex items-center gap-1.5 text-xs font-sans text-ink hover:text-accent border-line/80"
            >
              <Compass className="w-3.5 h-3.5 text-accent" />
              <span>Platform Tour</span>
            </Button>

            {/* Theme Selector */}
            <div className="relative">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
                className="flex items-center gap-1.5 font-sans text-xs text-ink"
              >
                <Palette className="w-3.5 h-3.5 text-accent" />
                <span className="hidden md:inline capitalize">{theme}</span>
                <ChevronDown className="w-3 h-3 text-ink-muted" />
              </Button>

              {isThemeMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-surface border border-line/80 rounded-xl shadow-2xl p-1.5 z-50">
                  <div className="px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-wider text-ink-muted border-b border-line mb-1">
                    Interface Theme
                  </div>
                  {THEME_PRESETS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => {
                        setTheme(t.id as Theme);
                        setIsThemeMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-sans transition-colors text-left rounded-lg ${
                        theme === t.id
                          ? "bg-accent/15 text-accent font-semibold"
                          : "text-ink-secondary hover:text-ink hover:bg-surface-hover"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-line"
                          style={{ backgroundColor: t.accentHex }}
                        />
                        {t.name}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Profile Avatar Button */}
            <Button
              variant="default"
              size="sm"
              onClick={openAuthModal}
              className="flex items-center gap-2 border-line/80 hover:border-accent"
            >
              <UserIcon className="w-3.5 h-3.5 text-accent" />
              <span className="font-sans text-xs hidden sm:inline font-medium">{user.name}</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
