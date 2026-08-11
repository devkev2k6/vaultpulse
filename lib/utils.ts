import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Subscription, TrustFactor, WealthScoreFactor } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format currency to Indian Rupees (INR) with optional compact notation (e.g., ₹1.5L, ₹10K).
 */
export function formatINR(amount: number, compact: boolean = false): string {
  if (isNaN(amount)) return "₹0";

  if (compact) {
    if (Math.abs(amount) >= 10000000) {
      return `₹${(amount / 10000000).toFixed(2)}Cr`;
    }
    if (Math.abs(amount) >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    if (Math.abs(amount) >= 1000) {
      return `₹${(amount / 1000).toFixed(1)}K`;
    }
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

/**
 * SIP Future Value Calculation formula:
 * FV = P * [ ((1+i)^n - 1) / i ] * (1+i)
 * P = monthly investment
 * i = monthly rate (annual rate / 12 / 100)
 * n = total months
 */
export function sipFutureValue(
  monthlyP: number,
  annualRatePercent: number,
  months: number
): number {
  if (monthlyP <= 0 || months <= 0) return 0;
  const i = annualRatePercent / 12 / 100;
  const fv = monthlyP * (((Math.pow(1 + i, months) - 1) / i) * (1 + i));
  return Math.round(fv);
}

/**
 * Calculate overall Wealth Score (0 - 100) based on weighted factors.
 */
export function computeWealthScore(factors: WealthScoreFactor[]): number {
  if (!factors.length) return 70;
  const totalWeight = factors.reduce((sum, f) => sum + f.weight, 0);
  const weightedSum = factors.reduce(
    (sum, f) => sum + f.score * (f.weight / (totalWeight || 1)),
    0
  );
  return Math.round(weightedSum);
}

/**
 * Calculate overall Seller Trust Score (0 - 100).
 */
export function computeTrustScore(factors: TrustFactor[]): number {
  if (!factors.length) return 85;
  const sum = factors.reduce((acc, f) => acc + f.score, 0);
  return Math.round(sum / factors.length);
}

export type DisputeTone = "Formal" | "Firm" | "Legal" | "Soft";

/**
 * AI Dispute Draft Generator with tone selection and fraud/cancellation branching.
 */
export function generateDisputeDraft(
  sub: Subscription,
  tone: DisputeTone = "Firm"
): { subject: string; body: string } {
  const date = sub.lastChargedDate || "recent billing statement";
  const amountStr = formatINR(sub.amount);

  if (sub.status === "Suspicious") {
    let subject = `URGENT: Unauthorized Transaction Notice - ${sub.name} (${amountStr})`;
    let body = "";

    switch (tone) {
      case "Legal":
        subject = `LEGAL NOTICE: Immediate Charge Dispute & Fraud Claim for ${sub.name}`;
        body = `Dear Dispute Resolutions Team,\n\nI am writing to serve formal notice regarding an unauthorized transaction of ${amountStr} billed under "${sub.name}" on ${date}.\n\nUnder applicable financial compliance standards and merchant service agreements, this charge is unverified, lacking explicit customer authorization. I demand an immediate reversal and credit of ${amountStr} to my account within 5 business days.\n\nFailure to process this resolution will result in formal escalation to the Banking Ombudsman and relevant regulatory bodies.\n\nAccount Holder Reference: ${sub.id.toUpperCase()}\nDate: ${new Date().toISOString().split("T")[0]}`;
        break;
      case "Formal":
        body = `Dear Customer Support / Billing Department,\n\nI am writing to formally dispute a charge of ${amountStr} for "${sub.name}" posted to my statement on ${date}.\n\nAfter reviewing my account activity, I have determined that this charge was unauthorized and unrecognised by me. I request a complete refund of ${amountStr} and confirmation that any active recurring subscription linked to this merchant is immediately terminated.\n\nThank you for your prompt assistance in resolving this matter.\n\nSincerely,\nVaultPulse AI Verified User`;
        break;
      case "Soft":
        subject = `Query regarding recent charge for ${sub.name}`;
        body = `Hello Team,\n\nI noticed a charge of ${amountStr} for "${sub.name}" on ${date} that I don't recall authorizing. Could you please check this transaction for me and issue a refund if this was billed in error?\n\nI would also appreciate it if you could confirm that my card won't be charged again.\n\nThanks,\nValued Customer`;
        break;
      case "Firm":
      default:
        body = `To ${sub.name} Billing Team,\n\nI am disputing the charge of ${amountStr} billed on ${date}. This transaction is suspicious and unauthorized.\n\nPlease process an immediate refund of ${amountStr} and cancel all associated service plans attached to my profile without penalty.\n\nI look forward to your written confirmation of the refund.\n\nRegards,\nAccount Holder`;
        break;
    }

    return { subject, body };
  }

  // Forgotten or Active status cancellation request
  let subject = `Cancellation & Refund Request - ${sub.name}`;
  let body = "";

  switch (tone) {
    case "Legal":
      subject = `NOTICE OF TERMINATION: ${sub.name} Subscription`;
      body = `To Customer Support,\n\nEffective immediately, please process the unconditional cancellation of my subscription for ${sub.name} (Ref: ${sub.id}).\n\nI revoke all future auto-debit authorizations associated with this account. Furthermore, I request a pro-rated refund for unrendered service periods following the charge on ${date} (${amountStr}).\n\nKindly confirm termination in writing.`;
      break;
    case "Soft":
      subject = `Request to cancel my ${sub.name} plan`;
      body = `Hi ${sub.name} Team,\n\nI would like to request the cancellation of my subscription. I am no longer actively using this service.\n\nIf possible, please refund the recent charge of ${amountStr} from ${date}.\n\nThank you for your support!\nBest regards`;
      break;
    case "Formal":
    case "Firm":
    default:
      body = `Dear ${sub.name} Support Team,\n\nI am writing to request the immediate cancellation of my recurring subscription for ${sub.name}.\n\nAs of ${date}, I am no longer utilizing this service. Please process the cancellation and refund the recent charge of ${amountStr}.\n\nPlease provide written confirmation of this cancellation.\n\nSincerely,\nAccount Holder`;
      break;
  }

  return { subject, body };
}
