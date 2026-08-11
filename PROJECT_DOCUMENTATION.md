# VaultPulse AI — Project Documentation

## 1. What this project is

VaultPulse AI is a mocked, front-end-only fintech dashboard that combines three products behind one navigation shell:

1. **Personal Wealth & AI Investment Predictor** — a wealth health score, a risk-tolerance-aware investment recommender, and a compound-growth chart for auto-saved shopping round-ups.
2. **Browser Extension Live Simulator** — a mock of what a shopping-companion browser extension would show at checkout: price comparison, seller trust, and an impulse-spending nudge.
3. **Automated Action Center** — a subscription/scam auditor that drafts dispute or cancellation emails for recurring charges.

It is a **single Next.js application** — the three "products" are modes within one dashboard, switched via the navbar, not separate apps. Everything runs client-side against local mock data; there is no backend, database, or API key required to run it.

It was built to spec from a design brief (`instructions.md`) calling for a strict matte design language, dual light/dark themes with specific hex tokens, and four concrete module groups. All of the numbers, prices, and merchant names in the app are illustrative mock data, not live figures.

---

## 2. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) | The brief asked for React/Next.js with exact file paths; App Router is the current standard project shape. |
| Language | TypeScript (strict mode) | Catches prop/shape mistakes across ~20 interdependent components at compile time. |
| Styling | Tailwind CSS 3, driven entirely by CSS custom properties | Lets one set of utility classes (`bg-bg`, `text-ink`, `border-line`, …) automatically repaint for both themes — no `dark:` variant duplication anywhere in the codebase. |
| Animation | Framer Motion | Gauge fill, mode-switch crossfade, coupon/alert reveal, modal transitions. Respects `prefers-reduced-motion` on the main transition. |
| Charting | Recharts | The 1y/5y/10y projected-return line chart. |
| Icons | lucide-react | Outline icon set matching the "matte, no-slop" aesthetic. |
| Class merging | clsx + tailwind-merge | Standard `cn()` helper so conditional/override classNames don't collide. |

No state-management library, backend framework, ORM, or auth system is used — the app's entire state is either local `useState` or two small React Contexts (theme, mode). This is intentional: the app is a self-contained, zero-config demo.

**Verified working build**: `npm install && npm run build` completes with `✓ Compiled successfully`, passes TypeScript's strict type check, and statically prerenders the page — confirming the whole component tree actually renders without runtime errors, not just that the code looks plausible.

---

## 3. How the app is structured

```
app/
  layout.tsx        Root layout: theme-init script, ThemeProvider, ModeProvider
  page.tsx           Server component; renders <VaultDashboard />
  globals.css        CSS variable tokens (light + dark), focus/reduced-motion rules

components/
  VaultDashboard.tsx        Shell: <Navbar /> + AnimatePresence-wrapped mode switch
  layout/Navbar.tsx         Logo, 3-way mode switcher, theme toggle
  ui/                       Reusable primitives — Card, Button, Badge, SegmentedControl, ToggleSwitch
  wealth/                   Module A components
  extension/                Module B components
  action-center/            Module C components

context/
  ThemeContext.tsx   Light/dark state, localStorage persistence
  ModeContext.tsx    Which of the 3 modules is active

lib/
  types.ts           Shared TypeScript interfaces/unions
  mock-data.ts        All mock datasets + pure calculation functions
  utils.ts           cn() classname merger, formatINR(), formatPercent()
```

### Rendering model
- `app/page.tsx` is a **Server Component** — it does no data fetching, just renders the client shell.
- `components/VaultDashboard.tsx` and everything under it are **Client Components** (`"use client"`), because the app is fundamentally interactive (toggles, charts, modals). Every component file that uses hooks, event handlers, Framer Motion, or Recharts declares `"use client"` explicitly and consistently, rather than relying on inherited client-boundary behavior — this keeps each file correct in isolation if it's ever reused elsewhere.
- `lib/*.ts` files contain **zero React code** — pure functions and data, importable from either server or client code safely.

### State flow
- **Theme** (`dark`/`light`) lives in `ThemeContext`. An inline `<script>` in `app/layout.tsx` runs before React hydrates, reads `localStorage`, and sets `data-theme` on `<html>` — this avoids a flash-of-wrong-theme on load. `ThemeProvider` then picks up whatever the script already applied and keeps it in sync with future toggles + `localStorage`.
- **System mode** (`wealth`/`extension`/`action`) lives in `ModeContext`, read by `Navbar` (to highlight the active tab) and `VaultDashboard` (to decide which module to render).
- **Risk tolerance** (`conservative`/`balanced`/`aggressive`) is local state in `WealthHub`, passed down to both `InvestmentRecommender` and `ProjectedReturnChart` — selecting a risk profile in one simultaneously re-sorts the fund list and re-highlights the matching line in the chart, so the two widgets feel connected rather than coincidentally adjacent.
- **Active dispute** (`Subscription | null`) is local state in `ActionCenter`, passed to `SubscriptionAuditor` (which sets it via a callback on each row's button) and `DisputeModal` (which reads it to know whether it's open and what to pre-fill).

---

## 4. Design system

The brief specified exact tokens; the implementation choice was **how to wire them so both themes stay in sync automatically**.

### Token mechanism
`app/globals.css` stores every color as a space-separated **RGB triplet** (not a hex string), scoped to `[data-theme="dark"]` and `[data-theme="light"]`:

```css
[data-theme="dark"]  { --bg: 11 12 14;  --positive: 173 255 47; --alert: 255 107 0; ... }
[data-theme="light"] { --bg: 244 244 240; --positive: 15 81 50; --alert: 180 83 9; ... }
```

`tailwind.config.ts` maps each token to a Tailwind color using the `rgb(var(--x) / <alpha-value>)` pattern:

```ts
positive: { DEFAULT: "rgb(var(--positive) / <alpha-value>)", foreground: "rgb(var(--positive-foreground) / <alpha-value>)" }
```

This is what lets classes like `bg-positive`, `text-alert`, `border-positive/40` (with opacity) all work correctly and automatically flip when `data-theme` changes — no component ever branches on "is it dark mode," it just uses semantic classnames (`bg-bg`, `text-ink`, `border-line`, `text-positive`, `text-alert`). Places that need a raw color outside Tailwind's class system (SVG `stroke`, Recharts `style` props) wrap the same variable as `rgb(var(--line))` etc.

### Token table

| Token | Dark | Light | Used for |
|---|---|---|---|
| `bg` | `#0B0C0E` | `#F4F4F0` | Page background |
| `surface` | `#101216` | `#FFFFFF` | Card backgrounds (subtle elevation without shadows) |
| `line` | `#1F242D` | `#E2E2DC` | All hairline borders |
| `ink` / `ink-secondary` / `ink-muted` | near-white → grey | near-black → grey | Text hierarchy |
| `positive` | `#ADFF2F` (lime) | `#0F5132` (deep emerald) | Savings, gains, matched recommendations |
| `alert` | `#FF6B00` | `#B45309` (deepened for AA contrast on off-white) | Warnings, suspicious charges, impulse alerts |

### Visual rules enforced throughout
- **No rounded corners** — every surface (`Card`, buttons, inputs, badges) is left at Tailwind's default (square) radius; `Card` sets `rounded-none` explicitly to document the choice.
- **No shadows or gradients** — elevation comes only from the `surface`/`bg` contrast plus a 1px `line` border.
- **Tabular monospace numerals** for every money figure and score (`font-mono` class), a deliberate nod to trading-terminal typography rather than a generic dashboard look.
- **Focus rings and reduced motion**: `:focus-visible` gets a visible outline globally; a `prefers-reduced-motion` media query collapses CSS transitions, and the main Framer Motion mode-switch animation checks `useReducedMotion()` directly.

---

## 5. Module-by-module breakdown

### Module A — Personal Wealth & AI Investment Predictor (`components/wealth/`)

| Component | Responsibility |
|---|---|
| `WealthHub.tsx` | Owns `risk` state; lays out the gauge, goal tracker, recommender, and chart in a responsive grid. |
| `WealthHealthGauge.tsx` | Renders a hand-built SVG semicircle gauge (not a chart library) with a custom polar-to-cartesian arc calculation, animated via Framer Motion's `pathLength`. Below it, five weighted factors (savings rate, debt-to-income, diversification, emergency fund, impulse control) are shown as mini progress bars. |
| `InvestmentRecommender.tsx` | Filters/sorts `investmentOptions` mock data by whether they suit the selected risk tolerance, tagging matches with a "Matches you" badge. Covers all three required categories: Equity Funds, Sovereign Gold, Index Funds. |
| `ProjectedReturnChart.tsx` | A Recharts line chart with three lines (conservative/balanced/aggressive), toggled between 1/5/10-year views. The selected risk profile's line is bolded; the others fade to 35% opacity. |

**Wealth score calculation** (`computeWealthScore` in `lib/mock-data.ts`) is a straightforward weighted average of five factors — swap the mock `wealthScoreFactors` array for real account data to make this live.

**Projection math** (`generateProjection` / `sipFutureValue`) uses the standard SIP (systematic investment plan) future-value formula — `FV = P × [((1+i)ⁿ - 1) / i] × (1+i)` — the same formula used by real Indian mutual-fund SIP calculators, applied to a mock ₹1,850/month auto-save rate at three different annual rates (7.5% / 11% / 14.5%).

### Module B — Browser Extension Live Simulator (`components/extension/`)

| Component | Responsibility |
|---|---|
| `ExtensionSimulator.tsx` | Two-column layout composing the four widgets below. |
| `MockCheckout.tsx` | A fake merchant checkout card with quantity stepper and running total. |
| `PriceCrossCheck.tsx` | Compares the checkout price against four mock competitor listings, highlighting the cheapest in-stock option. |
| `SellerTrustMeter.tsx` | A composite 0–100 trust score (`computeTrustScore`) from four factors (review authenticity, delivery reliability, return rate, seller longevity), color-coded using the same positive/alert tokens as the rest of the app rather than introducing a new color. |
| `AutoCouponAlert.tsx` | One button that reveals (a) a mock coupon code + discount, and (b) an impulse-spending warning that references the *same* savings goal shown in Module A (`savingsGoal` in `lib/mock-data.ts`) — a deliberate cross-module link so the "impulse alert" isn't just a generic warning, it ties spending back to a specific goal. |

### Module C — Automated Action Center (`components/action-center/`)

| Component | Responsibility |
|---|---|
| `ActionCenter.tsx` | Owns which subscription (if any) is currently being disputed. |
| `SubscriptionAuditor.tsx` | Lists five mock subscriptions with status (`Active` / `Forgotten` / `Suspicious`), a toggle for "auto-flag inactive 30+ days," and a running total of recoverable monthly spend from non-active items. |
| `DisputeModal.tsx` | Shows an editable subject/body draft (pre-filled by `generateDraft()`), with copy-to-clipboard and a mock "Send" action. |

**Important honesty note**: `generateDraft()` is a **deterministic template function**, not a live call to an LLM — it branches on the subscription's status (`Suspicious` → fraud-dispute language referencing the subscription's own charge and last-charged date; `Forgotten` → cancellation request; `Active` → a neutral "review my plan" request). The app is named "VaultPulse AI," so it's worth being explicit that this specific piece is templated, not generative — the docstring in the code and the README both flag this. To make it genuinely AI-generated, the natural extension point is a Next.js **server action or API route** that calls an LLM with the subscription's fields and returns drafted text; this must happen server-side so any API key stays off the client.

---

## 6. Data layer (`lib/`)

- **`types.ts`** — every shared shape used across modules: `RiskTolerance`, `SystemMode`, `Theme`, `WealthScoreFactor`, `InvestmentOption`, `ProjectionPoint`, `CompetitorPrice`, `TrustFactor`, `Subscription`.
- **`mock-data.ts`** — the single source of truth for all mock content and the pure functions that derive scores/projections/drafts from it. Nothing in here touches React; it's all importable, testable TypeScript.
- **`utils.ts`** — `cn()` (classname merge), `formatINR()` (uses `Intl.NumberFormat("en-IN", …)` so grouping and compact chart labels like "₹1.5L" follow real Indian numbering conventions), `formatPercent()`.

Because every module reads from this one file, turning the demo into a real product is mostly a matter of replacing these exports with data fetched from real APIs — the components themselves don't need to change shape.

---

## 7. Running and building

```bash
npm install       # installs Next.js 14, React 18, Tailwind 3, Framer Motion, Recharts, lucide-react
npm run dev        # http://localhost:3000, hot reload
npm run build       # production build — this was run during development and passes cleanly
npm run start       # serve the production build
```

No environment variables or `.env` file are required for the app to run as-is.

---

## 8. Known limitations / what's intentionally out of scope

- **No persistence beyond theme.** Risk tolerance, coupon-applied state, and dispute drafts reset on refresh — only the light/dark preference survives via `localStorage`.
- **No real backend.** Every "action" (Proceed to Pay, Send dispute, Apply coupon) is a UI-only state change with no network call.
- **No authentication.** There's a single implicit "user" — no login, no multi-account support.
- **Accessibility covers the essentials** (focus-visible rings, `aria-label`s on icon-only buttons, `aria-checked` on the toggle, `aria-current` on the active nav tab, reduced-motion handling on the primary transition) but hasn't been audited with a screen reader.
- **Mobile layout** is responsive (grids collapse to a single column, nav labels hide below `md`), but hasn't been tested on a physical device.

These are reasonable gaps for a spec-driven demo/hackathon-style build, not oversights — each is called out here and in the README so they're a deliberate handoff note rather than a surprise.
