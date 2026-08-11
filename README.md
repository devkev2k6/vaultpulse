# VaultPulse AI

**A matte, dual-theme fintech dashboard — wealth tracking, a shopping-checkout companion, and a subscription auditor, unified in one Next.js app.**

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-blue?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38BDF8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-animated-EF008F?logo=framer)
![License](https://img.shields.io/badge/status-demo--ready-lightgrey)

---

## What is this?

VaultPulse AI is a **front-end-only fintech dashboard** that combines three products behind a single navigation shell:

| Module | What it does |
|---|---|
| 🧭 **Personal Wealth & AI Investment Predictor** | A wealth-health gauge, risk-aware investment recommender, and a compound-growth (SIP) projection chart. |
| 🛒 **Browser Extension Live Simulator** | A mock checkout experience showing price comparison, seller trust scoring, and an impulse-spending nudge tied back to your savings goal. |
| 📋 **Automated Action Center** | A subscription/scam auditor that drafts dispute or cancellation emails for recurring charges. |

Everything runs client-side against local mock data — **no backend, database, or API key required** to try it out.

> Built to spec from a strict matte design brief: dual light/dark themes, zero rounded corners, no shadows or gradients, and tabular monospace numerals throughout — a trading-terminal aesthetic rather than a generic dashboard look.

---

## ✨ Highlights

- **One dashboard, three modes** — switch between Wealth, Extension Simulator, and Action Center via the navbar; state and theme persist across the switch.
- **Hand-built SVG gauge** with a custom polar-to-cartesian arc, animated via Framer Motion's `pathLength`.
- **Risk-tolerance-aware recommendations** — picking Conservative / Balanced / Aggressive simultaneously re-sorts the fund list *and* re-highlights the matching line in the projection chart.
- **Real SIP math** — the projected-return chart uses the same future-value formula real Indian mutual-fund SIP calculators use.
- **Cross-module logic** — the impulse-spending alert in the Extension Simulator references your actual savings goal from the Wealth module, not a generic warning.
- **Theme system with zero `dark:` variants** — every color is a CSS custom property (RGB triplet), so `bg-bg`, `text-ink`, `border-line` etc. auto-repaint for both themes.
- **Companion Chrome extension** (`/extension`) — a Manifest V3 unpacked extension that simulates injecting the Trust Shield onto real shopping sites.
- **Honest about what's mocked** — the "AI" dispute-email drafts are a deterministic template function today, with a clearly marked extension point for wiring in a real LLM call server-side.

---

## 🖥️ Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3, driven by CSS custom properties |
| Animation | Framer Motion |
| Charts | Recharts |
| Icons | lucide-react |
| Utilities | clsx + tailwind-merge |

No state-management library, ORM, or auth system — state lives in local `useState` and two small React Contexts (`ThemeContext`, `ModeContext`).

---

## 🚀 Getting Started

```bash
npm install       # installs Next.js 14, React 18, Tailwind 3, Framer Motion, Recharts, lucide-react
npm run dev       # → http://localhost:3000, hot reload
npm run build     # production build
npm run start     # serve the production build
```

No environment variables are required to run the app as-is. `.env.example` documents optional Firebase config if you want to wire up real auth later.

### Chrome extension (optional)

1. Open `chrome://extensions` in Chrome.
2. Enable **Developer mode**.
3. Click **Load unpacked** and select the `extension/` folder.

The extension simulates a Trust Shield injected onto shopping sites and syncs with the local web app at `http://localhost:3000`.

---

## 📁 Project Structure

```
app/
  layout.tsx        Root layout — theme-init script, ThemeProvider, ModeProvider
  page.tsx           Server component; renders <VaultDashboard />
  globals.css         CSS variable tokens (light + dark), focus/reduced-motion rules

components/
  VaultDashboard.tsx        Shell: <Navbar /> + AnimatePresence-wrapped mode switch
  layout/                   Navbar, mobile nav, tour modal
  ui/                       Reusable primitives — Card, Button, Badge, SegmentedControl, ToggleSwitch
  wealth/                   Module A — gauge, recommender, projection chart
  extension-sim/            Module B — checkout, price comparer, trust meter
  action-center/            Module C — subscription auditor, dispute modal
  collaboration/            Shared goals & activity feed
  auth/                     Auth modal

context/
  ThemeContext.tsx   Light/dark state, localStorage persistence
  ModeContext.tsx    Which of the 3 modules is active

lib/
  types.ts           Shared TypeScript interfaces/unions
  mock-data.ts        All mock datasets + pure calculation functions
  utils.ts            cn() classname merger, formatINR(), formatPercent()

extension/            Manifest V3 Chrome extension (companion simulator)
```

For the full architecture write-up — rendering model, state flow, the token system, and a module-by-module component breakdown — see [`PROJECT_DOCUMENTATION.md`](./PROJECT_DOCUMENTATION.md).

---

## 🎨 Design System

| Token | Dark | Light | Used for |
|---|---|---|---|
| `bg` | `#0B0C0E` | `#F4F4F0` | Page background |
| `surface` | `#101216` | `#FFFFFF` | Card backgrounds |
| `line` | `#1F242D` | `#E2E2DC` | All hairline borders |
| `positive` | `#ADFF2F` | `#0F5132` | Savings, gains, matched recommendations |
| `alert` | `#FF6B00` | `#B45309` | Warnings, suspicious charges |

Rules enforced throughout: no rounded corners, no shadows or gradients, tabular monospace numerals for every figure, and full `prefers-reduced-motion` support.

---

## ⚠️ Known Limitations

- **No persistence beyond theme.** Risk tolerance, coupon state, and dispute drafts reset on refresh.
- **No real backend.** Every action (Pay, Send dispute, Apply coupon) is a UI-only state change.
- **No authentication** beyond a mock auth modal — single implicit user.
- **Dispute drafts are templated, not AI-generated.** `generateDraft()` branches on subscription status; the natural extension point is a server action / API route calling an LLM server-side so no key ships to the client.
- Accessibility covers the essentials (focus rings, `aria-label`s, reduced motion) but hasn't had a full screen-reader audit.

These are deliberate, called-out scope boundaries for a spec-driven build — not oversights.

---

## 📄 License

This project was built as a demo/hackathon-style submission. Add a license here if you plan to open-source it.
