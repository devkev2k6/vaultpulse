"use client";

import { ArrowRight, Check, ExternalLink, RefreshCw, ShoppingCart } from "lucide-react";
import React from "react";
import { COMPETITOR_PRICES } from "../../lib/mock-data";
import { formatINR } from "../../lib/utils";
import { Badge } from "../ui/Badge";
import { GlowingCard } from "../ui/GlowingCard";

interface PriceComparerProps {
  currentPrice: number;
}

export function PriceComparer({ currentPrice }: PriceComparerProps) {
  const lowestOption = [...COMPETITOR_PRICES]
    .filter((c) => c.inStock)
    .sort((a, b) => a.price - b.price)[0];

  return (
    <GlowingCard className="p-5">
      <div className="flex items-center justify-between border-b border-line pb-3 mb-4">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 text-accent" />
          <h3 className="font-mono text-sm font-bold text-ink uppercase tracking-wider">
            AI Price Cross-Check Engine
          </h3>
        </div>
        <Badge variant="positive">4 Stores Scanned</Badge>
      </div>

      <div className="space-y-3">
        {COMPETITOR_PRICES.map((c) => {
          const isCheapest = lowestOption && lowestOption.id === c.id;
          const priceDiff = currentPrice - c.price;

          return (
            <div
              key={c.id}
              className={`p-3 border transition-all flex items-center justify-between font-mono text-xs ${
                isCheapest
                  ? "bg-positive/10 border-positive/50"
                  : "bg-surface/50 border-line"
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-ink">{c.merchant}</span>
                  {isCheapest && (
                    <span className="px-1.5 py-0.2 text-[9px] bg-positive text-positive-foreground font-bold">
                      Cheapest
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-ink-muted mt-0.5">
                  <span>{c.shippingDays} Day Delivery</span>
                  <span>•</span>
                  <span>{c.inStock ? "In Stock" : "Out of Stock"}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="font-bold text-sm text-ink">{formatINR(c.price)}</span>
                {priceDiff > 0 && c.inStock && (
                  <span className="text-[10px] text-positive block font-bold">
                    Save {formatINR(priceDiff)}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlowingCard>
  );
}
