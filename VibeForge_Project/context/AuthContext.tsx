"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getCurrentUser, saveUserSession, clearUserSession } from "../lib/auth-store";
import { INITIAL_USER } from "../lib/mock-data";
import { User } from "../lib/types";

interface AuthContextType {
  user: User;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  login: (email: string, name?: string) => void;
  signup: (email: string, name: string) => void;
  logout: () => void;
  setDemoPreset: (preset: User["demoPreset"]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(INITIAL_USER);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const loaded = getCurrentUser();
    setUser(loaded);
  }, []);

  const login = (email: string, name?: string) => {
    const updatedUser: User = {
      ...user,
      email,
      name: name || email.split("@")[0],
    };
    setUser(updatedUser);
    setIsAuthenticated(true);
    saveUserSession(updatedUser);
    setIsAuthModalOpen(false);
  };

  const signup = (email: string, name: string) => {
    const newUser: User = {
      id: `usr_${Math.floor(Math.random() * 90000 + 10000)}`,
      email,
      name,
      role: "Pro",
      demoPreset: "Balanced Wealth",
      savingsGoal: "Emergency Fund",
      goalTargetAmount: 100000,
      goalCurrentAmount: 45000,
      createdTime: new Date().toISOString().split("T")[0],
    };
    setUser(newUser);
    setIsAuthenticated(true);
    saveUserSession(newUser);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    clearUserSession();
    setIsAuthenticated(false);
    setUser({
      ...INITIAL_USER,
      name: "Guest User",
      email: "guest@vibeforge.ai",
      role: "User",
    });
  };

  const setDemoPreset = (preset: User["demoPreset"]) => {
    let goalAmount = 150000;
    let currentAmount = 98500;
    if (preset === "High Subscription Leakage") {
      goalAmount = 100000;
      currentAmount = 32000;
    } else if (preset === "Impulse Saver") {
      goalAmount = 200000;
      currentAmount = 145000;
    }

    const updated: User = {
      ...user,
      demoPreset: preset,
      goalTargetAmount: goalAmount,
      goalCurrentAmount: currentAmount,
    };
    setUser(updated);
    saveUserSession(updated);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        signup,
        logout,
        setDemoPreset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
