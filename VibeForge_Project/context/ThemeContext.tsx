"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { THEME_PRESETS } from "../lib/theme-config";
import { Theme } from "../lib/types";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    // Read theme initialized by script or localStorage
    const rootTheme = document.documentElement.getAttribute("data-theme") as Theme;
    if (rootTheme && THEME_PRESETS.some((t) => t.id === rootTheme)) {
      setThemeState(rootTheme);
    } else {
      const saved = localStorage.getItem("vaultpulse_theme") as Theme;
      if (saved && THEME_PRESETS.some((t) => t.id === saved)) {
        setThemeState(saved);
        document.documentElement.setAttribute("data-theme", saved);
      }
    }

    // Set up BroadcastChannel to sync theme across tabs and Chrome extension
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const channel = new BroadcastChannel("vaultpulse_theme_sync");
      channel.onmessage = (event) => {
        if (event.data && event.data.theme) {
          setThemeState(event.data.theme);
          document.documentElement.setAttribute("data-theme", event.data.theme);
        }
      };
      return () => channel.close();
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("vaultpulse_theme", newTheme);

    // Broadcast theme change to extension / other tabs
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      try {
        const channel = new BroadcastChannel("vaultpulse_theme_sync");
        channel.postMessage({ theme: newTheme });
        channel.close();
      } catch (e) {
        // ignore
      }
    }
  };

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
