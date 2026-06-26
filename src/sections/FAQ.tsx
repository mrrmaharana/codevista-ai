"use client";

import { useState } from "react";
import { Container, Section } from "../components/layout/LayoutUtils";
import Image from "next/image";

const FAQS = [
  {
    id: "faq-1",
    question: "How does the pricing scale with my data?",
    answer: "Our pricing is tiered based on query volume and features. You are only billed for what you use above your tier's base allowance. For enterprise needs, we offer custom volumetric discounts."
  },
  {
    id: "faq-2",
    question: "Do you offer SOC2 compliance?",
    answer: "Yes, CodeVista is SOC2 Type II compliant. All data is encrypted at rest using AES-256 and in transit via TLS 1.3. We undergo regular third-party penetration testing."
  },
  {
    id: "faq-3",
    question: "Can I deploy on-premise?",
    answer: "On-premise and VPC deployments are strictly available on our Enterprise tier. This includes dedicated support and specialized infrastructure provisioning."
  },
  {
    id: "faq-4",
    question: "What happens if I exceed my monthly query limit?",
    answer: "You will not be cut off. We provide a soft limit and will notify you when you reach 80% and 100% of your usage. Subsequent queries are billed at a flat overage rate."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id="faq" className="bg-background relative">
      <Container className="max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono font-bold text-accent-yellow mb-2 uppercase tracking-widest">
            FAQ
          </h2>
          <h3 className="text-3xl md:text-5xl font-mono font-bold text-light mb-6">
            Common Questions
          </h3>
        </div>

        <div className="space-y-4" role="tablist">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <div 
                key={faq.id} 
                className={`border rounded-xl transition-colors duration-300 ${isOpen ? "border-white/20 bg-white/5" : "border-white/5 bg-transparent"}`}
              >
                <button
                  id={`accordion-button-${faq.id}`}
                  aria-expanded={isOpen}
                  aria-controls={`accordion-panel-${faq.id}`}
                  role="tab"
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus:ring-2 focus:ring-accent-yellow rounded-xl"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setOpenIndex(isOpen ? null : index);
                    }
                  }}
                >
                  <span className="font-mono font-semibold text-lg text-light pr-8">{faq.question}</span>
                  <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-accent-yellow text-background" : "bg-white/10 text-light"}`}>
                    <Image 
                      src="/SVGs/chevron-down.svg" 
                      alt="Toggle" 
                      width={16} 
                      height={16} 
                      className={`transition-transform duration-300 ${isOpen ? "rotate-180 brightness-0" : "invert"}`} 
                    />
                  </div>
                </button>
                
                <div 
                  id={`accordion-panel-${faq.id}`}
                  role="tabpanel"
                  aria-labelledby={`accordion-button-${faq.id}`}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
                >
                  <div className="p-6 pt-0 text-light/70 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
