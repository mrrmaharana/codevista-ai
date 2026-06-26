"use client";

import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { useScrollReveal } from "../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    quote: "CodeVista gave our release reviews a living source of truth. The AI proposes actions, but our owners still make the final call.",
    author: "Maya Rao",
    role: "VP Engineering, Northstar Cloud",
    metric: "41% fewer review loops",
  },
  {
    quote: "We replaced scattered status docs with one workspace that reads the work, summarizes the risk, and keeps approvals traceable.",
    author: "Julian Brooks",
    role: "Head of Platform, AlloyGrid",
    metric: "2.8x faster planning",
  },
  {
    quote: "The polish matters. Our teams actually enjoy using it, and leadership finally gets the same signal engineers see every day.",
    author: "Priya Menon",
    role: "Director of Delivery, StackPilot",
    metric: "18 hrs saved weekly",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Section id="testimonials" ref={ref} className="relative bg-background" aria-labelledby="testimonials-title">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />

      <Container className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-accent-yellow">Customer Signal</p>
            <h2 id="testimonials-title" className="font-mono text-3xl font-black text-light md:text-5xl">
              Trusted where delivery pressure is real.
            </h2>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.045] p-4">
            <p className="font-mono text-3xl font-bold text-accent-mint">4.9/5</p>
            <p className="mt-1 text-sm text-light/55">Average admin rating</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.author}
              className="hover-lift group flex min-h-[330px] flex-col rounded-xl border border-white/10 bg-white/[0.035] p-7 hover:border-accent-cyan/35 hover:bg-white/[0.06]"
            >
              <div className="mb-7 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Image key={index} src="/SVGs/arrow-trending-up.svg" alt="" width={16} height={16} className="invert opacity-80" />
                ))}
              </div>

              <p className="text-lg leading-8 text-light/78">&quot;{testimonial.quote}&quot;</p>

              <div className="mt-auto pt-8">
                <div className="mb-5 rounded-lg border border-accent-mint/20 bg-accent-mint/[0.08] px-4 py-3 font-mono text-sm text-accent-mint">
                  {testimonial.metric}
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-yellow font-mono font-black text-background transition group-hover:rotate-3">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-mono font-semibold text-light transition group-hover:text-accent-yellow">{testimonial.author}</h3>
                    <p className="text-sm text-light/50">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
