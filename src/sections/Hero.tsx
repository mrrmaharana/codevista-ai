"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";
import { Button } from "../components/ui/Button";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const floatingElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 2;
      const yPos = (clientY / innerHeight - 0.5) * 2;

      floatingElementsRef.current.forEach((el, index) => {
        if (!el) return;
        
        // Use WAAPI for performant native animation
        const depth = (index + 1) * 15;
        const xMove = xPos * depth;
        const yMove = yPos * depth;
        
        el.animate(
          {
            transform: `translate(${xMove}px, ${yMove}px)`,
          },
          {
            duration: 1000,
            fill: "forwards",
            easing: "ease-out",
          }
        );
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center pt-24 pb-16 relative bg-background overflow-hidden"
    >
      {/* Animated Background Gradients */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/50 blur-[120px] mix-blend-screen animate-pulse duration-10000" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-accent-yellow/20 blur-[150px] mix-blend-screen animate-pulse duration-7000 delay-1000" />
      </div>

      {/* Floating Elements (Parallax) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          ref={(el) => { floatingElementsRef.current[0] = el; }}
          className="absolute top-[20%] right-[15%] opacity-30"
        >
          <Image src="/SVGs/cube-16-solid.svg" alt="Cube" width={64} height={64} className="invert" />
        </div>
        <div 
          ref={(el) => { floatingElementsRef.current[1] = el; }}
          className="absolute bottom-[30%] left-[10%] opacity-20"
        >
          <Image src="/SVGs/chart-pie.svg" alt="Chart" width={96} height={96} className="invert" />
        </div>
        <div 
          ref={(el) => { floatingElementsRef.current[2] = el; }}
          className="absolute top-[40%] left-[20%] opacity-40"
        >
          <Image src="/SVGs/arrow-trending-up.svg" alt="Trending" width={48} height={48} className="invert" />
        </div>
      </div>

      <Container className="relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          <span className="flex h-2 w-2 rounded-full bg-accent-yellow animate-ping-slow"></span>
          <span className="text-sm font-mono text-light/80">CodeVista Automation Engine 2.0</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold tracking-tighter mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          Accelerate Data <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-yellow to-accent-orange">
            Intelligence
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-light/70 max-w-2xl mx-auto mb-10 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
          The premium AI-driven platform that orchestrates complex workflows, minimizes engineering overhead, and scales infinitely.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          <Button size="lg" className="w-full sm:w-auto shadow-[0_0_20px_rgba(255,200,1,0.3)] hover:shadow-[0_0_30px_rgba(255,200,1,0.5)]">
            Start Free Trial
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Book a Demo
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-white/10 pt-10 mt-10 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
          {[
            { label: "Queries/sec", value: "100k+" },
            { label: "Data Processed", value: "50TB" },
            { label: "Uptime SLA", value: "99.99%" },
            { label: "Engineers Happy", value: "10k+" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold font-mono text-light mb-1">{stat.value}</span>
              <span className="text-sm text-light/60 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </Container>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-70">
        <span className="text-xs font-mono text-light/50 tracking-widest uppercase">Scroll</span>
        <Image src="/SVGs/chevron-down.svg" alt="Scroll Down" width={16} height={16} className="invert" />
      </div>
    </Section>
  );
}
