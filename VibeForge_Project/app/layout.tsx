import type { Metadata } from "next";
import React from "react";
import { AuthProvider } from "../context/AuthContext";
import { ModeProvider } from "../context/ModeContext";
import { ThemeProvider } from "../context/ThemeContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "VaultPulse AI — Next-Gen AI Fintech & E-Commerce Security Platform",
  description:
    "Unified AI financial health predictor, live e-commerce trust/price companion, and automated subscription dispute auditor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('vaultpulse_theme');
                  if (saved) {
                    document.documentElement.setAttribute('data-theme', saved);
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased selection:bg-accent selection:text-accent-foreground">
        <ThemeProvider>
          <AuthProvider>
            <ModeProvider>{children}</ModeProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
