export type Theme = "dark" | "light" | "cyberpunk" | "emerald" | "midnight";

export type SystemMode = "wealth" | "extension" | "action" | "collaboration";

export type RiskTolerance = "conservative" | "balanced" | "aggressive";

export interface WealthScoreFactor {
  id: string;
  name: string;
  score: number; // 0 - 100
  weight: number; // e.g. 0.20
   advice: string;
  category: "cashflow" | "debt" | "diversification" | "emergency" | "impulse";
}

export interface InvestmentOption {
  id: string;
  title: string;
  category: "Equity Funds" | "Sovereign Gold" | "Index Funds" | "Debt Funds";
  expectedReturn: number; // annual percentage e.g. 14.5
  riskProfile: RiskTolerance;
  minSip: number; // e.g. 500
  matched: boolean;
  tags: string[];
  description: string;
  marketSymbol?: string;
  currentPrice?: number;
}

export interface ProjectionPoint {
  year: number;
  conservative: number;
  balanced: number;
  aggressive: number;
}

export interface CompetitorPrice {
  id: string;
  merchant: string;
  price: number;
  inStock: boolean;
  shippingDays: number;
  couponCode?: string;
  discountPercent?: number;
}

export interface TrustFactor {
  id: string;
  name: string;
  score: number; // 0 - 100
  status: "Good" | "Moderate" | "Risk";
  description: string;
}

export interface Subscription {
  id: string;
  name: string;
  amount: number; // monthly spend in INR
  billingCycle: "Monthly" | "Annual";
  status: "Active" | "Forgotten" | "Suspicious";
  category: "Entertainment" | "Software" | "Utilities" | "Fitness" | "Unknown";
  lastChargedDate: string;
  disputeReason?: string;
  autoFlagged: boolean;
  logoUrl?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: "User" | "Pro" | "VIP";
  demoPreset: "Balanced Wealth" | "High Subscription Leakage" | "Impulse Saver";
  savingsGoal: string;
  goalTargetAmount: number;
  goalCurrentAmount: number;
  createdTime: string;
}

export interface SharedGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  contributors: { name: string; avatar: string; contribution: number }[];
  category: "Emergency Fund" | "Vacation" | "Gadget" | "House Deposit";
  deadline: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  category: "wealth" | "extension" | "action" | "collaboration";
  type: "success" | "warning" | "info";
}

export interface MarketTicker {
  symbol: string;
  name: string;
  price: number;
  changePercent: number;
  type: "Gold" | "Index" | "Stock" | "Crypto";
}
