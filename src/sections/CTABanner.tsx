"use client";

import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function CTABanner() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Section id="contact" ref={ref} className="bg-background pt-8 pb-24 md:pb-32" aria-labelledby="cta-title">
      <Container className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.055] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:p-12 md:p-16">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(93,226,231,0.18),transparent_32%,rgba(255,210,63,0.16)_58%,rgba(255,122,61,0.16))]" />
          <div className="absolute left-1/2 top-0 h-40 w-2/3 -translate-x-1/2 rounded-full bg-accent-cyan/15 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-3xl">
            <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-xl bg-accent-yellow shadow-[0_0_35px_rgba(255,210,63,0.32)]">
              <Image src="/SVGs/arrow-path.svg" alt="" width={28} height={28} className="brightness-0" />
            </div>
            <h2 id="cta-title" className="font-mono text-3xl font-black leading-tight text-light md:text-6xl">
              Put your next AI workflow in motion.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-light/68">
              Connect a source, invite your team, and see the first governed automation run before your next standup.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" href="#pricing">
                Start free
                <Image src="/SVGs/chevron-right.svg" alt="" width={18} height={18} className="brightness-0 transition group-hover:translate-x-1" />
              </Button>
              <Button variant="outline" size="lg">
                Talk to sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
