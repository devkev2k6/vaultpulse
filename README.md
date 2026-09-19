# 🌌 VaultPulse — Autonomous AI Price-Checking, FinTech & Sovereign Wealth Platform

**A state-of-the-art liquid-glass FinTech platform combining AI-powered dynamic pricing surge detection, fair market valuation, actionable counter-purchasing playbooks, merchant fairness surveillance, and autonomous portfolio wealth compounding.**

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js&style=for-the-badge)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&style=for-the-badge)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38BDF8?logo=tailwindcss&style=for-the-badge)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-FF0055?logo=framer&style=for-the-badge)](https://www.framer.com/motion/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio_API-Synthesizer-10B981?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 📖 Overview

**VaultPulse** is an institutional-grade financial intelligence and consumer protection platform designed to solve the challenges of **Dynamic Pricing, Artificial Urgency, and Scarcity Manipulation** in e-commerce and booking platforms.

Built to address the [ProblemStatement.md](file:///c:/Users/Debargha/Downloads/vaultpulse/ProblemStatement.md) specifications, VaultPulse identifies hidden dynamic price gouging, estimates true fair market values using mathematical decomposition, and provides practical counter-purchasing strategies so users never overpay.

---

## 🎯 Core Features & Modules (Problem Statement Specs)

### 1. 🔍 AI Dynamic Price Surge Detection (`/api/price-check`)
- **Repeated Visit & Search Frequency Gouging**: Detects when cookies or IP profiles perform 3+ visits in 30 minutes, triggering incremental base-rate escalation.
- **Artificial Scarcity & Countdown Pressure**: Detects high-pressure DOM countdown timers and fake inventory warnings (*"Only 1 seat left!"*, *"Only 2 rooms left!"*).
- **Time-of-Day Surge Indexing**: Evaluates business-hour vs midnight off-peak rate elasticity.
- **Device & Platform Fingerprinting**: Detects OS and browser profile discrimination.
- **Surge Multiplier & Risk Score (0-100%)**: Computes exact surge markup (e.g. `1.48x`) with transparent technical evidence breakdown.

### 2. 💎 Fair Market Price Estimation
- **Mathematical Decomposition**: Breaks price down into Baseline Operational Cost, Standard Commercial Margin (~18%), and Avoidable Dynamic Surge Surcharge.
- **Listed Price vs Estimated Fair Price vs 30-Day Floor**: Side-by-side comparison with net savings in ₹ and %.
- **1-Click Goal Investment Bridge**: Direct deposit of avoided surge markup into user's wealth goals / SIP portfolio.

### 3. ⚡ Actionable Counter-Purchasing Playbook
- **Off-Peak Timing Arbitrage**: Identifies optimal booking windows (e.g., *Tuesday 11:30 PM - 02:00 AM*) when server traffic drops by 68% and prices fall to baseline.
- **Incognito & Clean-Cookie Simulator**: Interactive 1-click test simulator (`IncognitoSimulatorModal.tsx`) that strips tracking cookies (`_gds_session`, `_tier_escalation_flag`) and restores unpersonalized base fares.
- **Verified Alternative Carrier / Merchant Bridges**: 1-click bridge modal (`AlternativeBridgeModal.tsx`) to verified cheaper competitor listings (e.g., Akasa Air @ ₹4,950 vs Indigo/SkyWing @ ₹7,800).
- **Auto-Applied Counter-Coupons**: Instant voucher injection (`VAULTFLY8`) to bypass checkout price escalation.

### 4. 🧪 Interactive Test Scenario Runner (Official Test Case)
- **Official Problem Statement Test Case**:
  - *Listing:* **Bangalore to Kolkata flight / conference pass — ₹7,800**
  - *Context:* Viewed 4 times in 30 minutes with "Only 1 seat left" countdown timer.
  - *Result:* Flags **88/100 Critical Surge Risk (1.48x Markup)**, estimates lower fair price of **₹5,350 (Save ₹2,450 / 31%)**, explains all 4 manipulation warning signs, and unlocks 1-click verified alternatives (Akasa Air @ ₹4,950).
- **Additional Test Presets**:
  - Goa Beachfront Resort (*Weekend Scarcity: ₹14,500 vs Fair ₹9,200*)
  - Flagship 5G Smartphone (*Flash Sale Timer: ₹79,999 vs Fair ₹68,500*)
  - AI & FinTech Summit Pass (*Tier Fake Sell-Out: ₹12,000 vs Fair ₹7,900*)
  - Airport Rush-Hour Cab (*Location Surge: ₹2,150 vs Fair ₹1,350*)
  - Interactive Custom URL / Parameter Simulator.

### 5. 📊 Bonus 1: Historical Price-Floor Tracker (`/api/price-history`)
- Interactive **Recharts 30/60/90-Day** area/line chart tracking Listed Price spikes, Fair Value targets, and Historical Price Floors.
- **7-Day Machine Learning Surge Forecast** predicting day-by-day rate decay and optimal off-peak floor days.

### 6. 🌉 Bonus 2: 1-Click Bridge to Verified Alternative Listings
- Direct bridge modal featuring verified partner merchants, seller trust scores (0-100), departure/delivery SLA, customer ratings, and pre-loaded discount codes.

### 7. 🏛️ Price Integrity & Fairness Surveillance Portal (Admin) (`/api/admin/fairness-metrics`)
- **Merchant Fairness Leaderboard**: Integrity ratings, surge violation rates, average markup %, and certification statuses (*Certified Fair, Under Review, High Surge Offender*) for major airlines and e-commerce platforms.
- **Cross-Sector Pricing Telemetry**: Comparative surge analytics across Flights, Hospitality, Electronics, Events, and Rideshare sectors.
- **Live Anomaly Incident Feed**: Real-time surveillance stream of dynamic pricing violations with 1-click *Enforce Anti-Surge Lock* capability.
- **AI Algorithm Calibration Panel**: Interactive controls for admins to calibrate Scarcity Penalty Weight, Search Frequency Multipliers, and Alert Thresholds.

### 8. 🔊 Web Audio API Procedural Audio Synthesizer
- **Zero-Latency Sound Engine (`lib/sound-effects.ts`)**: Built with 100% native Web Audio API code (no external sound files required).
- **Interactive Audio Feedback**: Custom synthesized sound cues for gauge risk level ticks, warning alerts, modal popups, button interactions, and light/dark theme toggling.

### 9. 🛡️ Liquid Glass Header & Enclave Security Chrome (`components/layout/WindowChrome.tsx`)
- **Refined Enclave Bar**: Streamlined top bar featuring live *Encrypted Enclave* status indicator, cloud sync state, quick theme mode switcher (Sun/Moon), Genesis intro replay trigger, share link generator, and user profile drawer.

### 10. 📈 Personal Wealth & Compound SIP Hub
- Health Score Gauge (0-100), mathematical Future Value compound SIP growth chart, and collaborative shared savings goals.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) (App Router) | High-performance React framework with server/client components |
| **Language** | [TypeScript](https://www.typescriptlang.org/) (Strict Mode) | Full type safety across market tickers, subscriptions, and financial models |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) + CSS Variables | Ultra-responsive Liquid Glass UI with high-contrast light/dark color tokens |
| **Motion** | [Framer Motion 11](https://www.framer.com/motion/) | Non-blocking spring physics, layout transitions, and gesture animations |
| **Audio** | Native [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) | 100% standalone, zero-latency synthesizer (no audio files needed) |
| **Data Viz** | [Recharts 2.12](https://recharts.org/) | Responsive SVG charts for wealth compounding and category spend |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent modern iconography |
| **Companion** | Chrome Manifest V3 | Browser extension companion for live checkout interception & trust scores |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.17+ or 20+
- npm, yarn, or pnpm

### Installation

```bash
# 1. Clone or navigate to the project directory
cd vaultpulse

# 2. Install dependencies
npm install

# 3. Launch development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience VaultPulse.

### Production Build

```bash
# Compile and optimize production bundle
npm run build

# Start production server
npm run start
```

---

## ⌨️ Keyboard Shortcuts & Controls

| Key | Action |
|---|---|
| <kbd>ESC</kbd> | Instantly skip the Genesis Intro sequence |
| <kbd>Enter</kbd> / <kbd>Space</kbd> | Launch the Vault Enclave from Standby |
| <kbd>Tab</kbd> / Shift+<kbd>Tab</kbd> | Accessible keyboard navigation across all cards and controls |

---

## 🔌 API Endpoints & Security Architecture

VaultPulse includes fully hardened, type-safe Next.js route handlers equipped with strict schema validation, input sanitization, and enterprise security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Cache-Control: no-store`):

| Endpoint | Method | Description | Security & Validation |
|---|---|---|---|
| `/api/price-check` | `GET`, `POST` | AI Dynamic Price Surge evaluation, fair price estimation & counter-purchasing playbooks | Input sanitization, scenario preset evaluation, score bounding (0-100%) |
| `/api/price-history` | `GET` | 30/60/90-day price floor history, floor boundaries & 7-day ML forecast | Timeframe parameter check (`30d`, `60d`, `90d`), numeric bounding |
| `/api/admin/fairness-metrics` | `GET`, `POST` | Merchant fairness rankings, category surge telemetry & algorithm weight calibration | Admin parameter validation (`scarcityWeight`, `viewFrequencyPenalty`) |
| `/api/market` | `GET` | Live Indian market quote stream (11 assets) with micro-tick fallback | 4s TTL Cache, dynamic off-hours tick generation |
| `/api/auth/login` | `POST` | User authentication and session syncing | Email regex verification, password minimum length check |
| `/api/auth/signup` | `POST` | New account onboarding and security parameter setup | Name length validation, email syntax checks |
| `/api/goals` | `GET`, `POST` | Household collaborative goal tracking and contribution ledger | Positive numeric range validation (₹1 - ₹5Cr) |
| `/api/subscriptions` | `GET`, `POST` | Recurring merchant audits, status toggles, and price alerts | Subscription schema validation, positive amount checking |
| `/api/dispute` | `POST` | AI dispute letter generator with customized legal/formal tones | `DisputeTone` enum check (`Formal`, `Firm`, `Legal`, `Soft`) |

---

## 🧩 Chrome Extension Companion

VaultPulse includes a complete Manifest V3 Chrome Extension located in `/extension`.

1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** in the top-right corner.
3. Click **Load unpacked** and select the `/extension` directory from this project.
4. The VaultPulse Trust Shield companion will simulate live checkout interception, inject seller trust scores (94/100), apply auto-coupons, show dynamic surge alerts, and enforce impulse spending barriers.

---

## 📁 Repository Directory Map

```
vaultpulse/
├── app/
│   ├── api/                     # Next.js Route Handlers (price-check, price-history, admin/fairness-metrics, market, auth, goals, subscriptions, dispute)
│   ├── globals.css              # Design tokens, Liquid Glass system, and GPU mesh keyframe animations
│   ├── layout.tsx               # Root HTML wrapper with Atmosphere & Auth providers
│   ├── page.tsx                 # Entry page rendering <VaultDashboard />
│   └── manifest.webmanifest     # Progressive Web App manifest
├── components/
│   ├── VaultDashboard.tsx       # Core orchestrator layout with live market ticker and mode transitions
│   ├── price-check/             # PriceCheckHub, SurgeRiskGauge, FairPriceCard, CounterPurchasingDeck, PriceFloorTracker, AlternativeBridgeModal, IncognitoSimulatorModal, TestScenarioBanner
│   ├── admin/                   # AdminFairnessPortal, MerchantFairnessLeaderboard, CategorySurgeTelemetry, LiveIncidentFeed, AlgorithmTuningPanel
│   ├── intro/                   # Holographic Vault & Quantum Shader intro
│   ├── overview/                # Account snapshot, calendar ledger, unified analytics, PriceGuard Quick Card & AI Copilot bar
│   ├── wealth/                  # Financial health gauge, SIP charts & investment recommender
│   ├── action-center/           # Subscription auditor & dispute modal composer
│   ├── collaboration/           # Shared household goals & live activity feed
│   ├── extension-sim/           # Mock checkout, impulse shield, price comparer & trust meter
│   ├── layout/                  # Liquid Glass Navbar, WindowChrome, QuickTour & MobileNav
│   ├── auth/                    # Multi-tab Authentication & Security Settings modal
│   └── ui/                      # Reusable UI primitives (AtmosphereBackground, CursorFollower, ClickEffects)
├── context/
│   ├── AtmosphereContext.tsx    # Atmospheric gradient mesh & theme management
│   ├── AuthContext.tsx          # Demo user session & financial persona presets
│   └── ModeContext.tsx          # Active dashboard tab routing (overview, price_guard, admin_portal, wealth_goals, safeguards)
├── lib/
│   ├── price-engine.ts          # Pure algorithmic engine for dynamic price surge detection, fair value math & test presets
│   ├── mock-data.ts             # INR financial datasets, Indian funds, and transactions
│   ├── sound-effects.ts         # High-fidelity Web Audio API synthesizer
│   ├── types.ts                 # TypeScript interfaces and union definitions
│   └── utils.ts                 # Currency formatters (₹ INR), math utilities & class mergers
├── extension/                   # Manifest V3 Chrome Extension companion (popup.html, popup.js, content.js, manifest.json)
└── public/                      # Static assets and icons
```

---

## 💎 Liquid Glass High-Contrast Design Tokens

```css
/* Light & Default Canvas (High-Contrast Refined) */
--bg: 250 250 249;              /* #FAFAF9 Warm airy stone */
--surface: 255 255 255;         /* Pure crisp white */
--line: 218 225 233;            /* High-definition crisp border */
--ink: 10 20 38;                /* #0A1426 Ultra-Deep Navy Slate for maximum contrast */
--ink-secondary: 35 50 75;      /* #23324B Refined High-Contrast Slate */
--ink-muted: 71 85 105;         /* Slate-600 for sharp readability */
--accent: 2 132 199;            /* Sky Blue / Royal Navy */
--positive: 5 150 105;          /* Crisp Emerald-600 */
--alert: 225 29 72;             /* Deep Rose */

/* Deep Woods & Dark Canvas (High-Contrast Refined) */
--bg: 8 13 22;                  /* #080D16 Pure Obsidian Night */
--surface: 20 38 58;            /* #14263A Deep Woods Core Slate */
--line: 45 76 110;              /* #2D4C6E Crisp Slate Border */
--ink: 255 255 255;             /* #FFFFFF Pure White for highest contrast */
--ink-secondary: 226 232 240;   /* #E2E8F0 Soft White */
--ink-muted: 160 185 214;       /* #A0B9D6 Soft Slate */
--accent: 56 189 248;           /* Neon Sky */
```

---

## 📜 License

Created for **VaultPulse AI** © 2026. Built with Next.js, Tailwind CSS, Framer Motion, and Web Audio.

