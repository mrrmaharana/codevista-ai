"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { useScrollReveal } from "../hooks/useScrollReveal";

const FEATURES = [
  {
    title: "Context Engine",
    eyebrow: "Connect",
    description: "Unifies commits, incidents, tickets, docs, and customer signals into one governed knowledge layer.",
    icon: "/SVGs/link-solid.svg",
    stat: "180+ sources",
    className: "md:col-span-2",
  },
  {
    title: "AI Runbooks",
    eyebrow: "Act",
    description: "Turns recurring engineering work into approval-based automations with audit trails attached.",
    icon: "/SVGs/cog-8-tooth.svg",
    stat: "64% less toil",
    className: "",
  },
  {
    title: "Delivery Radar",
    eyebrow: "Predict",
    description: "Surfaces release risks, blocked work, and trend changes before they become status meetings.",
    icon: "/SVGs/chart-pie.svg",
    stat: "3.4x faster readouts",
    className: "",
  },
  {
    title: "Policy Guardrails",
    eyebrow: "Govern",
    description: "Routes sensitive actions through the right humans, teams, and compliance rules automatically.",
    icon: "/SVGs/cube-16-solid.svg",
    stat: "Zero blind actions",
    className: "md:col-span-2",
  },
];

const INTEGRATIONS = ["GitHub", "Linear", "Jira", "Slack", "Datadog", "Snowflake", "Sentry", "Notion"];

export function Features() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Section id="features" ref={ref} className="bg-background" aria-labelledby="features-title">
      <Container className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div>
            <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-accent-yellow">Platform</p>
            <h2 id="features-title" className="font-mono text-3xl font-black leading-tight text-light sm:text-5xl">
              Built for teams that need AI to be fast and accountable.
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-light/65">
            Every interaction is designed for repeat work: scan quickly, hover for more signal, approve with confidence, and keep the audit trail close.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[260px]">
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;

            return (
              <article
                key={feature.title}
                className={`hover-lift group relative overflow-hidden rounded-xl border p-6 md:p-7 ${feature.className} ${
                  isActive
                    ? "border-accent-cyan/45 bg-white/[0.075]"
                    : "border-white/10 bg-white/[0.035] hover:border-white/25 hover:bg-white/[0.06]"
                }`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                tabIndex={0}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-cyan/80 to-transparent opacity-0 transition group-hover:opacity-100" />
                <div className="flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.07] transition group-hover:bg-accent-yellow">
                      <Image src={feature.icon} alt="" width={24} height={24} className="invert transition group-hover:brightness-0 group-hover:invert-0" />
                    </div>
                    <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-light/55 transition group-hover:border-accent-yellow/40 group-hover:text-accent-yellow">
                      {feature.eyebrow}
                    </span>
                  </div>

                  <div className="mt-auto pt-8">
                    <h3 className="font-mono text-2xl font-bold text-light">{feature.title}</h3>
                    <p className="mt-3 max-w-xl leading-7 text-light/62">{feature.description}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="font-mono text-sm text-accent-mint">{feature.stat}</span>
                      <Image src="/SVGs/chevron-right.svg" alt="" width={18} height={18} className="invert opacity-45 transition group-hover:translate-x-1 group-hover:opacity-100" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="group mt-8 overflow-hidden rounded-xl border border-white/10 bg-white/[0.035] py-4 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] sm:[--marquee-duration:26s] md:[--marquee-duration:30s]">
          <div className="flex w-max animate-marquee gap-3 px-3 transition-transform duration-500 ease-out group-hover:[animation-play-state:paused]">
            {[...INTEGRATIONS, ...INTEGRATIONS].map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex min-w-max items-center gap-2 rounded-lg border border-white/10 bg-background/50 px-4 py-3 text-sm text-light/65 transition-all duration-300 hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.07] hover:text-light"
              >
                <Image src={index % 2 === 0 ? "/SVGs/link.svg" : "/SVGs/arrow-path.svg"} alt="" width={16} height={16} className="invert opacity-60" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
