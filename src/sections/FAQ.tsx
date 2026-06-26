"use client";

import { useState } from "react";
import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { useScrollReveal } from "../hooks/useScrollReveal";

const FAQS = [
  {
    id: "faq-1",
    question: "Can CodeVista act on production systems?",
    answer: "Yes, but only through the rules you define. Sensitive workflows can require approvals, scoped permissions, and full audit logs before any action runs.",
  },
  {
    id: "faq-2",
    question: "How fast can a team launch the first workflow?",
    answer: "Most teams connect their first source and publish a guided workflow in the same session. Larger rollouts usually start with one team, then expand by workspace.",
  },
  {
    id: "faq-3",
    question: "Does it replace our existing tools?",
    answer: "No. CodeVista sits above tools like GitHub, Jira, Slack, Datadog, and docs systems so your teams keep working where they already work.",
  },
  {
    id: "faq-4",
    question: "Is enterprise deployment available?",
    answer: "Enterprise customers can use SSO, SCIM, private workspaces, custom retention rules, and dedicated onboarding for regulated environments.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();

  return (
    <Section id="faq" ref={ref} className="relative bg-background" aria-labelledby="faq-title">
      <Container className={`max-w-4xl transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="mb-12 text-center">
          <p className="mb-3 font-mono text-sm font-bold uppercase tracking-[0.28em] text-accent-yellow">FAQ</p>
          <h2 id="faq-title" className="font-mono text-3xl font-black text-light md:text-5xl">
            Questions teams ask before they switch on AI.
          </h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={faq.id}
                className={`rounded-xl border transition-all duration-300 ${
                  isOpen ? "border-accent-cyan/40 bg-white/[0.07]" : "border-white/10 bg-white/[0.025] hover:border-white/[0.22] hover:bg-white/[0.045]"
                }`}
              >
                <button
                  id={`accordion-button-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${faq.id}`}
                  className="group flex w-full items-center justify-between gap-5 rounded-xl p-5 text-left focus:outline-none focus:ring-2 focus:ring-accent-yellow sm:p-6"
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span className="font-mono text-base font-semibold text-light sm:text-lg">{faq.question}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-all ${isOpen ? "bg-accent-yellow" : "bg-white/[0.08] group-hover:bg-white/[0.14]"}`}>
                    <Image
                      src="/SVGs/chevron-down.svg"
                      alt=""
                      width={16}
                      height={16}
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180 brightness-0" : "invert opacity-80"}`}
                    />
                  </span>
                </button>

                <div
                  id={`accordion-panel-${faq.id}`}
                  aria-labelledby={`accordion-button-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-out ${isOpen ? "max-h-52 opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <p className="px-5 pb-6 leading-7 text-light/65 sm:px-6">{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
