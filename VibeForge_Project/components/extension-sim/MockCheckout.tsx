"use client";

import { Minus, Plus, ShoppingCart, Tag } from "lucide-react";
import React from "react";
import { formatINR } from "../../lib/utils";
import { Button } from "../ui/Button";
import { GlowingCard } from "../ui/GlowingCard";

interface MockCheckoutProps {
  itemPrice: number;
  quantity: number;
  onQuantityChange: (q: number) => void;
  couponDiscount: number;
  onProceedPay: () => void;
}

export function MockCheckout({
  itemPrice,
  quantity,
  onQuantityChange,
  couponDiscount,
  onProceedPay,
}: MockCheckoutProps) {
  const baseSubtotal = itemPrice * quantity;
  const discountAmount = (baseSubtotal * couponDiscount) / 100;
  const finalTotal = baseSubtotal - discountAmount;

  return (
    <GlowingCard className="p-6">
      <div className="flex items-center justify-between border-b border-line pb-4 mb-5">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-accent" />
          <h3 className="font-mono text-base font-bold text-ink uppercase tracking-wider">
            Online Merchant Checkout
          </h3>
        </div>
        <span className="px-2.5 py-1 text-[11px] font-mono bg-surface border border-line text-ink-secondary">
          Store: TechDeals Direct
        </span>
      </div>

      <div className="flex items-start gap-4 mb-5">
        <div className="w-20 h-20 bg-surface border border-line flex items-center justify-center font-mono text-xs text-accent font-bold shrink-0">
          PRO-KB3
        </div>
        <div className="flex-1 font-sans">
          <span className="text-[10px] font-mono uppercase text-accent font-bold block">
            Hardware Hardware Series
          </span>
          <h4 className="font-mono text-sm font-bold text-ink mt-0.5">
            Wireless Mechanical RGB Keyboard
          </h4>
          <p className="text-xs text-ink-muted mt-1 leading-relaxed">
            Hot-swappable tactile switches, tri-mode connection (Bluetooth 5.0 / 2.4GHz / Type-C).
          </p>
        </div>
      </div>

      {/* Quantity & Summary */}
      <div className="space-y-3 p-4 bg-surface border border-line font-mono text-xs mb-5">
        <div className="flex items-center justify-between">
          <span className="text-ink-muted uppercase">Item Unit Price</span>
          <span className="font-bold text-ink">{formatINR(itemPrice)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-ink-muted uppercase">Quantity</span>
          <div className="flex items-center gap-2 bg-bg px-2.5 py-1 border border-line">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="text-ink-muted hover:text-ink"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-bold text-accent px-1">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="text-ink-muted hover:text-ink"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {couponDiscount > 0 && (
          <div className="flex items-center justify-between text-positive">
            <span className="uppercase flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" /> VaultPulse Auto-Coupon (-{couponDiscount}%)
            </span>
            <span className="font-bold">-{formatINR(discountAmount)}</span>
          </div>
        )}

        <div className="pt-3 border-t border-line flex items-center justify-between text-sm font-bold">
          <span className="text-ink uppercase">Total Checkout Price</span>
          <span className="text-accent text-base">{formatINR(finalTotal)}</span>
        </div>
      </div>

      <Button
        variant="accent"
        onClick={onProceedPay}
        className="w-full font-mono text-xs uppercase tracking-wider py-3"
      >
        Complete Order Simulation ({formatINR(finalTotal)})
      </Button>
    </GlowingCard>
  );
}
