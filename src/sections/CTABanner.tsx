"use client";

import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";
import { useScrollReveal } from "../hooks/useScrollReveal";

export function CTABanner() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Section ref={ref} className="bg-background pt-8 pb-32">
      <Container className={`transition-all duration-1000 ease-out delay-200 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
        <div className="relative rounded-3xl overflow-hidden bg-secondary border border-secondary p-12 md:p-20 text-center">
          {/* Animated Background Gradients & Glow */}
          <div className="absolute inset-0 z-0 opacity-80 mix-blend-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gradient-to-r from-accent-yellow/40 to-accent-orange/40 blur-[80px] animate-pulse duration-3000" />
            <div className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-light/10 blur-[60px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-mono font-bold text-light mb-6 tracking-tight">
              Ready to automate the impossible?
            </h2>
            <p className="text-xl text-light/80 mb-10">
              Join thousands of engineering teams building the future on CodeVista. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto bg-light text-secondary hover:bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                Start Building Free
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-light/30 text-light hover:bg-light/10 focus:ring-light">
                Talk to Sales
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
