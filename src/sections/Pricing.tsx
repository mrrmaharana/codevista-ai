"use client";

import React, { useCallback, useMemo, useSyncExternalStore } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";

// --- State Isolation Architecture ---
// We use a custom external store and useSyncExternalStore to ensure 
// changing currency or billing cycle DOES NOT trigger a re-render of the parent Layout.
// Only the strictly localized DOM nodes subscribe to this store.

type Currency = "USD" | "EUR" | "INR";

interface PricingState {
  isAnnual: boolean;
  currency: Currency;
}

class PricingStore {
  private state: PricingState = { isAnnual: false, currency: "USD" };
  private listeners = new Set<(state: PricingState) => void>();

  subscribe = (listener: (state: PricingState) => void) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.state;

  setAnnual = (isAnnual: boolean) => {
    this.state = { ...this.state, isAnnual };
    this.emit();
  };

  setCurrency = (currency: Currency) => {
    this.state = { ...this.state, currency };
    this.emit();
  };

  private emit = () => {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  };
}

const pricingStore = new PricingStore();

// --- Data Logic (Multi-dimensional Matrix) ---
const PRICING_MATRIX = {
  currencyConfig: {
    USD: { symbol: "$", multiplier: 1, locale: "en-US" },
    EUR: { symbol: "€", multiplier: 0.92, locale: "de-DE" },
    INR: { symbol: "₹", multiplier: 83.5, locale: "en-IN" },
  },
  annualDiscount: 0.8, // 20% off
  tiers: [
    {
      id: "starter",
      name: "Starter",
      baseRateUSD: 29,
      features: ["Up to 10k queries/mo", "Community Support", "Basic Analytics"],
    },
    {
      id: "pro",
      name: "Professional",
      baseRateUSD: 99,
      isPopular: true,
      features: ["Up to 1M queries/mo", "Priority Support", "Advanced Analytics", "Custom Webhooks"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      baseRateUSD: 299,
      features: ["Unlimited queries", "24/7 SLA Support", "Dedicated Infrastructure", "Custom Models"],
    },
  ],
};

// --- Isolated Components ---

// 1. Controls Component: Updates the store without re-rendering parent
const PricingControls = React.memo(() => {
  const state = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);

  const toggleBilling = useCallback(() => {
    pricingStore.setAnnual(!state.isAnnual);
  }, [state.isAnnual]);

  const changeCurrency = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    pricingStore.setCurrency(e.target.value as Currency);
  }, []);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
      <div className="flex items-center gap-3 bg-white/5 p-1 rounded-full border border-white/10">
        <button
          onClick={toggleBilling}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            !state.isAnnual ? "bg-secondary text-light shadow-md" : "text-light/60 hover:text-light"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={toggleBilling}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            state.isAnnual ? "bg-secondary text-light shadow-md" : "text-light/60 hover:text-light"
          }`}
        >
          Annual <span className="text-accent-yellow ml-1">-20%</span>
        </button>
      </div>

      <div className="relative">
        <select
          value={state.currency}
          onChange={changeCurrency}
          className="appearance-none bg-white/5 border border-white/10 text-light py-2 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary font-mono"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR (€)</option>
          <option value="INR">INR (₹)</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          ▼
        </div>
      </div>
    </div>
  );
});
PricingControls.displayName = "PricingControls";

// 2. Localized Price Display Node (Strictly isolates text re-renders)
const PriceValue = React.memo(({ baseRateUSD }: { baseRateUSD: number }) => {
  const { isAnnual, currency } = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);

  const calculatedPrice = useMemo(() => {
    const config = PRICING_MATRIX.currencyConfig[currency];
    const rate = baseRateUSD * config.multiplier;
    const finalRate = isAnnual ? rate * PRICING_MATRIX.annualDiscount : rate;
    
    // Monthly * 12 * 0.8 is the requirement for annual. 
    // Wait, the prompt says: "Annual Pricing: Monthly * 12 * 0.8" 
    // And "Only price text should update".
    // If it displays annual total, we show Monthly * 12 * 0.8.
    // Let's display the monthly equivalent for annual, or the full annual price?
    // "Annual Pricing: Monthly × 12 × 0.8" implies the price shown is the yearly total.
    
    const displayValue = isAnnual ? finalRate * 12 : finalRate;

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0,
    }).format(displayValue);
  }, [baseRateUSD, isAnnual, currency]);

  return (
    <span className="text-4xl md:text-5xl font-mono font-bold text-light">
      {calculatedPrice}
    </span>
  );
});
PriceValue.displayName = "PriceValue";


const BillingCycleText = React.memo(() => {
  const { isAnnual } = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);
  return <span className="text-light/50 text-sm ml-2">/{isAnnual ? 'yr' : 'mo'}</span>;
});
BillingCycleText.displayName = "BillingCycleText";


// --- Main Section (Parent never re-renders on toggle) ---
export function Pricing() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Section id="pricing" ref={ref} className="bg-background relative">
      <Container className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="text-center mb-10">
          <h2 className="text-sm font-mono font-bold text-accent-yellow mb-2 uppercase tracking-widest">
            Pricing
          </h2>
          <h3 className="text-3xl md:text-5xl font-mono font-bold text-light mb-6">
            Predictable scale.
          </h3>
        </div>

        {/* State Isolated Controls */}
        <PricingControls />

        {/* Pricing Matrix Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {PRICING_MATRIX.tiers.map((tier) => (
            <div
              key={tier.id}
              className={`
                relative p-8 rounded-2xl border flex flex-col
                ${tier.isPopular ? "bg-white/5 border-accent-yellow/50 shadow-[0_0_30px_rgba(255,200,1,0.1)]" : "bg-white/[0.02] border-white/10"}
              `}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent-yellow text-background text-xs font-bold px-3 py-1 rounded-full font-mono uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h4 className="text-xl font-mono font-bold text-light mb-2">{tier.name}</h4>
              
              <div className="mb-6 flex items-baseline">
                {/* State Isolated Price Node */}
                <PriceValue baseRateUSD={tier.baseRateUSD} />
                <BillingCycleText />
              </div>

              <ul className="flex flex-col gap-4 mb-8 flex-1">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="mt-1 w-4 h-4 rounded-full bg-secondary/30 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-accent-yellow" />
                    </div>
                    <span className="text-light/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={tier.isPopular ? "primary" : "outline"} className="w-full">
                {tier.id === 'enterprise' ? 'Contact Sales' : 'Start Trial'}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
