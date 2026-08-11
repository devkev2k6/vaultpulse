"use client";

import { Chrome, Layers, ShoppingBag, Sparkles } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../ui/Badge";
import { ImpulseShield } from "./ImpulseShield";
import { MockCheckout } from "./MockCheckout";
import { PriceComparer } from "./PriceComparer";
import { SellerTrustMeter } from "./SellerTrustMeter";

export function ExtensionSimulator() {
  const [itemPrice, setItemPrice] = useState<number>(8499);
  const [quantity, setQuantity] = useState<number>(1);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  const cartTotal = (itemPrice * quantity) * (1 - couponDiscount / 100);

  const handleProceedPay = () => {
    alert(`Order simulation completed for ₹${cartTotal}. Impulse alert recorded in audit trail.`);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="p-4 glass-panel border border-accent/30 bg-accent/5 flex items-center justify-between">
        <div className="flex items-center gap-2 font-sans text-xs text-ink">
          <Chrome className="w-4 h-4 text-accent shrink-0" />
          <span>
            <strong className="font-mono text-accent uppercase">Shopping Companion:</strong> Browser extension scanning merchant checkout page for price drops & trust ratings.
          </span>
        </div>
        <Badge variant="accent">Chrome Extension Companion</Badge>
      </div>

      {/* Simulator 2-Column Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Checkout & Impulse Protection */}
        <div className="lg:col-span-6 space-y-6">
          <section className="space-y-4">
            <MockCheckout
              itemPrice={itemPrice}
              quantity={quantity}
              onQuantityChange={setQuantity}
              couponDiscount={couponDiscount}
              onProceedPay={handleProceedPay}
            />
          </section>
          <section className="space-y-4">
            <ImpulseShield
              cartTotal={cartTotal}
              onApplyCoupon={(disc) => setCouponDiscount(disc)}
            />
          </section>
        </div>

        {/* Right Column: Seller Trust & Price Comparison */}
        <div className="lg:col-span-6 space-y-6">
          <section className="space-y-4">
            <SellerTrustMeter />
          </section>
          <section className="space-y-4">
            <PriceComparer currentPrice={itemPrice} />
          </section>
        </div>
      </div>
    </div>
  );
}
