"use client";

import React, { createContext, useContext, useState } from "react";
import { SystemMode } from "../lib/types";

interface ModeContextType {
  mode: SystemMode;
  setMode: (mode: SystemMode) => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<SystemMode>("wealth");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const ctx = useContext(ModeContext);
  if (!ctx) {
    throw new Error("useMode must be used within ModeProvider");
  }
  return ctx;
}
