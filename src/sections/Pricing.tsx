"use client";

import React, { useCallback, useMemo, useSyncExternalStore } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";

type Currency = "USD" | "EUR" | "INR";

interface PricingState {
  isAnnual: boolean;
  currency: Currency;
}

class PricingStore {
  private state: PricingState = { isAnnual: false, currency: "USD" };
  private listeners = new Set<() => void>();

  subscribe = (listener: () => void) => {
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
    this.listeners.forEach((listener) => listener());
  };
}

const pricingStore = new PricingStore();

const PRICING_MATRIX = {
  currencyConfig: {
    USD: { multiplier: 1, locale: "en-US" },
    EUR: { multiplier: 0.92, locale: "de-DE" },
    INR: { multiplier: 83.5, locale: "en-IN" },
  },
  annualDiscount: 0.8,
  tiers: [
    {
      id: "starter",
      name: "Launch",
      baseRateUSD: 39,
      description: "For lean teams proving AI workflow value.",
      features: ["25k agent actions", "5 connected tools", "Team dashboards", "Email support"],
    },
    {
      id: "pro",
      name: "Scale",
      baseRateUSD: 129,
      isPopular: true,
      description: "For engineering orgs standardizing delivery intelligence.",
      features: ["1M agent actions", "Unlimited workflows", "Approval policies", "Priority support"],
    },
    {
      id: "enterprise",
      name: "Enterprise",
      baseRateUSD: 349,
      description: "For regulated teams with custom controls.",
      features: ["Custom action volume", "Private workspace", "SSO and SCIM", "Dedicated success pod"],
    },
  ],
};

const PricingControls = React.memo(() => {
  const state = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);

  const setMonthly = useCallback(() => {
    pricingStore.setAnnual(false);
  }, []);

  const setAnnual = useCallback(() => {
    pricingStore.setAnnual(true);
  }, []);

  const changeCurrency = useCallback((event: React.ChangeEvent<HTMLSelectElement>) => {
    pricingStore.setCurrency(event.target.value as Currency);
  }, []);

  return (
    <div className="mb-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.045] p-1">
        <button
          type="button"
          aria-pressed={!state.isAnnual}
          onClick={setMonthly}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
            !state.isAnnual ? "bg-accent-yellow text-background shadow-md" : "text-light/60 hover:bg-white/[0.08] hover:text-light"
          }`}
        >
          Monthly
        </button>
        <button
          type="button"
          aria-pressed={state.isAnnual}
          onClick={setAnnual}
          className={`rounded-md px-4 py-2 text-sm font-semibold transition-all hover:-translate-y-0.5 ${
            state.isAnnual ? "bg-accent-yellow text-background shadow-md" : "text-light/60 hover:bg-white/[0.08] hover:text-light"
          }`}
        >
          Annual <span className={state.isAnnual ? "text-background/70" : "text-accent-yellow"}>-20%</span>
        </button>
      </div>

      <div className="relative">
        <select
          value={state.currency}
          onChange={changeCurrency}
          className="appearance-none rounded-lg border border-white/10 bg-white/[0.045] py-2 pl-4 pr-10 font-mono text-light transition hover:border-accent-cyan/45 focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          <option value="USD">USD ($)</option>
          <option value="EUR">EUR</option>
          <option value="INR">INR</option>
        </select>
        <Image src="/SVGs/chevron-down.svg" alt="" width={16} height={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 invert opacity-60" />
      </div>
    </div>
  );
});
PricingControls.displayName = "PricingControls";

const PriceValue = React.memo(({ baseRateUSD }: { baseRateUSD: number }) => {
  const { isAnnual, currency } = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);

  const calculatedPrice = useMemo(() => {
    const config = PRICING_MATRIX.currencyConfig[currency];
    const monthlyRate = baseRateUSD * config.multiplier;
    const displayValue = isAnnual ? monthlyRate * 12 * PRICING_MATRIX.annualDiscount : monthlyRate;

    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(displayValue);
  }, [baseRateUSD, isAnnual, currency]);

  return (
    <span key={`${currency}-${isAnnual}-${calculatedPrice}`} className="inline-block animate-price-pop font-mono text-4xl font-black text-light md:text-5xl">
      {calculatedPrice}
    </span>
  );
});
PriceValue.displayName = "PriceValue";

const BillingCycleText = React.memo(() => {
  const { isAnnual } = useSyncExternalStore(pricingStore.subscribe, pricingStore.getSnapshot, pricingStore.getSnapshot);
  return <span className="ml-2 text-sm text-light/50">/{isAnnual ? "yr" : "mo"}</span>;
});
BillingCycleText.displayName = "BillingCycleText";

export function Pricing() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Section id="pricing" ref={ref} className="relative bg-background" aria-labelledby="pricing-title">
      <Container className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-accent-yellow">Pricing</p>
          <h2 id="pricing-title" className="font-mono text-3xl font-black text-light md:text-5xl">
            Simple plans for serious AI operations.
          </h2>
          <p className="mt-5 text-lg leading-8 text-light/62">
            Start small, scale into governed automation, and keep every action visible to the people who own it.
          </p>
        </div>

        <PricingControls />

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
          {PRICING_MATRIX.tiers.map((tier, index) => (
            <article
              key={tier.id}
              style={{ transitionDelay: `${index * 80}ms` }}
              className={`hover-lift relative flex flex-col rounded-xl border p-7 transition-all duration-700 ${
                tier.isPopular
                  ? "border-accent-yellow/55 bg-white/[0.08] shadow-[0_0_36px_rgba(255,210,63,0.12)]"
                  : "border-white/10 bg-white/[0.035] hover:border-accent-cyan/35"
              }`}
            >
              {tier.isPopular && (
                <div className="absolute -top-3 left-6 rounded-full bg-accent-yellow px-3 py-1 font-mono text-xs font-bold uppercase tracking-widest text-background">
                  Recommended
                </div>
              )}

              <h3 className="mb-2 font-mono text-2xl font-bold text-light">{tier.name}</h3>
              <p className="mb-6 min-h-12 text-sm leading-6 text-light/58">{tier.description}</p>

              <div className="mb-6 flex items-baseline">
                <PriceValue baseRateUSD={tier.baseRateUSD} />
                <BillingCycleText />
              </div>

              <ul className="mb-8 flex flex-1 flex-col gap-4">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-mint/12">
                      <Image src="/SVGs/chevron-right.svg" alt="" width={12} height={12} className="invert opacity-80" />
                    </div>
                    <span className="text-sm text-light/78">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                href={tier.id === "enterprise" ? "mailto:sales@codevista.ai?subject=CodeVista%20Enterprise%20Demo" : "#contact"}
                variant={tier.isPopular ? "primary" : "outline"}
                className="w-full"
              >
                {tier.id === "enterprise" ? "Contact sales" : "Start trial"}
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
