"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";

const METRICS = [
  { label: "Automations shipped", value: "12.8M" },
  { label: "Median setup", value: "9 min" },
  { label: "Governed actions", value: "99.99%" },
];

const WORKFLOW = [
  { label: "Ingest", value: "GitHub, Jira, logs", icon: "/SVGs/search.svg" },
  { label: "Reason", value: "Policy-aware agents", icon: "/SVGs/cog-8-tooth.svg" },
  { label: "Launch", value: "Human-approved fixes", icon: "/SVGs/arrow-trending-up.svg" },
];

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const floatingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;

      floatingRefs.current.forEach((element, index) => {
        if (!element) return;
        const depth = 10 + index * 9;
        element.animate(
          { transform: `translate3d(${x * depth}px, ${y * depth}px, 0)` },
          { duration: 900, easing: "cubic-bezier(0.16, 1, 0.3, 1)", fill: "forwards" }
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <Section
      id="hero"
      ref={heroRef}
      className="min-h-screen pt-28 pb-12 md:pt-36 md:pb-20 flex items-center bg-background overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_50%_20%,black,transparent_72%)]" />
        <div className="absolute left-1/2 top-20 h-80 w-80 -translate-x-1/2 rounded-full bg-accent-cyan/18 blur-[120px]" />
        <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-accent-orange/14 blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          ["top-[17%] right-[8%]", "/SVGs/cube-16-solid.svg", 54, "animate-float"],
          ["bottom-[22%] left-[5%]", "/SVGs/chart-pie.svg", 74, "animate-pulse-glow"],
          ["top-[42%] left-[13%]", "/SVGs/link-solid.svg", 46, "animate-float"],
          ["bottom-[14%] right-[18%]", "/SVGs/arrow-path.svg", 58, "animate-pulse-glow"],
        ].map(([position, src, size, animation], index) => (
          <div
            key={src}
            ref={(element) => {
              floatingRefs.current[index] = element;
            }}
            className={`absolute ${position} ${animation} hidden opacity-40 md:block`}
          >
            <Image src={src as string} alt="" width={Number(size)} height={Number(size)} className="invert" />
          </div>
        ))}
      </div>

      <Container className="relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_0.88fr]">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.06] px-3 py-2 text-sm text-light/78 backdrop-blur animate-fade-in-up">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-mint opacity-70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-mint" />
              </span>
              <span className="font-mono">AI release command center for software teams</span>
            </div>

            <h1
              id="hero-title"
              className="max-w-4xl text-4xl font-black leading-[1.04] text-light sm:text-6xl lg:text-7xl xl:text-8xl font-mono animate-fade-in-up"
              style={{ animationDelay: "100ms" }}
            >
              Ship smarter AI workflows without losing control.
            </h1>

            <p
              className="mt-7 max-w-2xl text-base leading-8 text-light/72 sm:text-lg md:text-xl animate-fade-in-up"
              style={{ animationDelay: "180ms" }}
            >
              CodeVista AI connects your engineering tools, reads the signal, and launches reviewed automations for planning, code quality, incidents, and delivery reporting.
            </p>

            <div
              className="mt-9 flex flex-col gap-4 sm:flex-row animate-fade-in-up"
              style={{ animationDelay: "260ms" }}
            >
              <Button size="lg" href="#pricing">
                Start free
                <Image src="/SVGs/chevron-right.svg" alt="" width={18} height={18} className="brightness-0 transition group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg" href="#features">
                Watch workflow
                <Image src="/SVGs/arrow-trending-up.svg" alt="" width={18} height={18} className="invert opacity-80 transition group-hover:translate-x-1" />
              </Button>
            </div>

            <dl
              className="mt-12 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3 animate-fade-in-up"
              style={{ animationDelay: "340ms" }}
            >
              {METRICS.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4 transition hover:border-accent-cyan/40 hover:bg-white/[0.07]">
                  <dt className="text-xs text-light/50">{metric.label}</dt>
                  <dd className="mt-2 font-mono text-2xl font-bold text-light">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative mx-auto w-full max-w-xl animate-reveal-left" style={{ animationDelay: "220ms" }}>
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-accent-cyan/20 via-accent-yellow/12 to-accent-orange/18 blur-2xl" />
            <div className="glass-panel relative overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-accent-orange" />
                  <span className="h-3 w-3 rounded-full bg-accent-yellow" />
                  <span className="h-3 w-3 rounded-full bg-accent-mint" />
                </div>
                <span className="font-mono text-xs text-light/48">live-agent-run.ts</span>
              </div>

              <div className="relative p-5 sm:p-6">
                <div className="absolute left-0 right-0 top-16 h-px bg-accent-cyan/70 shadow-[0_0_22px_rgba(93,226,231,0.7)] animate-scan" />
                <div className="rounded-xl border border-white/10 bg-background/78 p-4">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent-cyan">Release pulse</p>
                      <p className="mt-1 text-sm text-light/58">Copilot detected 18 tasks ready for automation</p>
                    </div>
                    <div className="rounded-lg bg-accent-mint/12 px-3 py-2 font-mono text-sm text-accent-mint">98%</div>
                  </div>

                  <div className="space-y-3">
                    {WORKFLOW.map((item, index) => (
                      <div
                        key={item.label}
                        className="group flex items-center gap-4 rounded-lg border border-white/[0.08] bg-white/[0.035] p-3 transition hover:border-accent-yellow/40 hover:bg-white/[0.07]"
                        style={{ transitionDelay: `${index * 35}ms` }}
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.08] transition group-hover:bg-accent-yellow">
                          <Image src={item.icon} alt="" width={20} height={20} className="invert transition group-hover:brightness-0 group-hover:invert-0" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-mono text-sm font-semibold text-light">{item.label}</p>
                          <p className="truncate text-sm text-light/55">{item.value}</p>
                        </div>
                        <Image src="/SVGs/chevron-right.svg" alt="" width={16} height={16} className="invert opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-accent-mint/40">
                    <p className="text-xs text-light/45">Risk cleared</p>
                    <p className="mt-2 font-mono text-3xl font-bold text-accent-mint">42</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4 transition hover:border-accent-orange/40">
                    <p className="text-xs text-light/45">Hours returned</p>
                    <p className="mt-2 font-mono text-3xl font-bold text-accent-yellow">316</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <a
        href="#features"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-light/45 transition hover:text-accent-yellow md:flex"
        aria-label="Scroll to features"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.35em]">Scroll</span>
        <Image src="/SVGs/chevron-down.svg" alt="" width={18} height={18} className="invert animate-bounce" />
      </a>
    </Section>
  );
}
