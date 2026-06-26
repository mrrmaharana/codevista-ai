"use client";

import { Container, Section } from "../components/layout/LayoutUtils";
import { useScrollReveal } from "../hooks/useScrollReveal";

const TESTIMONIALS = [
  {
    id: 1,
    quote: "CodeVista completely transformed our data pipeline. What used to take days of engineering time now happens automatically in milliseconds. It's nothing short of magic.",
    author: "Sarah Jenkins",
    role: "VP of Engineering, DataFlow",
    rating: 5,
  },
  {
    id: 2,
    quote: "The state-isolated pricing component alone is a masterclass in frontend engineering. Our infrastructure overhead dropped by 40% in the first month.",
    author: "David Chen",
    role: "CTO, ScaleFast",
    rating: 5,
  },
  {
    id: 3,
    quote: "Finally, a platform that understands both scale and developer experience. The native integrations are flawless and the support team is incredible.",
    author: "Elena Rodriguez",
    role: "Lead Architect, Nexus",
    rating: 5,
  }
];

export function Testimonials() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <Section id="testimonials" ref={ref} className="bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      
      <Container className={`relative z-10 transition-all duration-1000 ease-out delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono font-bold text-accent-yellow mb-2 uppercase tracking-widest">
            Wall of Love
          </h2>
          <h3 className="text-3xl md:text-5xl font-mono font-bold text-light mb-6">
            Trusted by the best.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <div 
              key={t.id} 
              className="group bg-white/[0.02] border border-white/5 p-8 rounded-2xl hover:bg-white/[0.05] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, index) => (
                  <svg key={index} className="w-5 h-5 text-accent-yellow drop-shadow-[0_0_8px_rgba(255,200,1,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              
              <p className="text-light/80 mb-8 text-lg leading-relaxed font-sans">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center font-mono font-bold text-light">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-mono font-semibold text-light group-hover:text-accent-yellow transition-colors">{t.author}</h4>
                  <p className="text-sm text-light/50">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
