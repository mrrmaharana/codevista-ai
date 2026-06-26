"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Container, Section } from "../components/layout/LayoutUtils";

const FEATURES = [
  {
    id: 1,
    title: "Real-time Processing",
    description: "Process massive datasets in real-time with sub-millisecond latency. Our distributed engine scales automatically to handle any volume.",
    icon: "/SVGs/arrow-path.svg",
    colSpan: "md:col-span-2 md:row-span-2",
  },
  {
    id: 2,
    title: "Predictive Analytics",
    description: "Anticipate trends before they happen using our advanced machine learning models trained specifically on enterprise telemetry.",
    icon: "/SVGs/chart-pie.svg",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    id: 3,
    title: "Seamless Integration",
    description: "Connect to any existing database, API, or data warehouse with zero configuration. We support over 100+ native connectors.",
    icon: "/SVGs/link-solid.svg",
    colSpan: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    title: "Advanced Security",
    description: "Enterprise-grade encryption at rest and in transit. SOC2 Type II certified with role-based access control out of the box.",
    icon: "/SVGs/cube-16-solid.svg",
    colSpan: "md:col-span-2 md:row-span-1",
  },
];

export function Features() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [isMobile, setIsMobile] = useState<boolean>(true);
  
  useEffect(() => {
    // Check initial window size and handle resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile(); // Initial check
    
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // For accordion, toggle open/close. For desktop bento, hover sets active.
  const handleInteraction = (index: number) => {
    if (isMobile) {
      setActiveIndex(activeIndex === index ? null : index);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <Section id="features" className="bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <Container>
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-sm font-mono font-bold text-accent-yellow mb-2 uppercase tracking-widest">
            Architecture
          </h2>
          <h3 className="text-3xl md:text-5xl font-mono font-bold text-light mb-6">
            Engineered for scale. <br /> Designed for speed.
          </h3>
          <p className="text-light/60 text-lg">
            A complete ecosystem that gives you the tools to build, deploy, and scale complex AI workflows without the usual infrastructure headaches.
          </p>
        </div>

        {/* Responsive Container: Switches layout based on CSS media queries, but state is shared */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-4 md:gap-6 md:h-[600px]">
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;
            
            return (
              <div 
                key={feature.id}
                className={`
                  relative rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 ease-out
                  ${isMobile ? "flex flex-col" : feature.colSpan}
                  ${isActive ? "bg-white/5 border-white/20 shadow-[0_0_30px_rgba(17,76,90,0.3)]" : "bg-white/[0.02] hover:bg-white/[0.04]"}
                `}
                onMouseEnter={() => !isMobile && handleInteraction(index)}
                onClick={() => isMobile && handleInteraction(index)}
              >
                {/* Mobile Header (Accordion Trigger) */}
                {isMobile && (
                  <div className="flex items-center justify-between p-6 cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${isActive ? "bg-secondary text-light" : "bg-white/5"}`}>
                        <Image src={feature.icon} alt={feature.title} width={24} height={24} className="invert" />
                      </div>
                      <h4 className="font-mono font-bold text-lg text-light">{feature.title}</h4>
                    </div>
                    <Image 
                      src="/SVGs/chevron-down.svg" 
                      alt="Toggle" 
                      width={20} 
                      height={20} 
                      className={`invert transition-transform duration-300 ${isActive ? "rotate-180" : ""}`} 
                    />
                  </div>
                )}

                {/* Content Area (Responsive) */}
                <div 
                  className={`
                    transition-all duration-300 ease-out overflow-hidden
                    ${isMobile 
                      ? (isActive ? "max-h-96 opacity-100" : "max-h-0 opacity-0") 
                      : "h-full flex flex-col p-8 opacity-100"
                    }
                  `}
                >
                  <div className={isMobile ? "px-6 pb-6 pt-0" : "flex-1 flex flex-col"}>
                    {!isMobile && (
                      <div className="flex items-center justify-between mb-6">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${isActive ? "bg-secondary" : "bg-white/5"}`}>
                          <Image src={feature.icon} alt={feature.title} width={28} height={28} className="invert" />
                        </div>
                        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all ${isActive ? "opacity-100 translate-x-0 bg-white/10" : "opacity-0 -translate-x-2"}`}>
                          <Image src="/SVGs/arrow-trending-up.svg" alt="Arrow" width={16} height={16} className="invert" />
                        </div>
                      </div>
                    )}
                    
                    {!isMobile && (
                      <h4 className="font-mono font-bold text-2xl text-light mb-4">{feature.title}</h4>
                    )}
                    
                    <p className={`text-light/60 ${!isMobile && feature.colSpan.includes("col-span-2") ? "text-lg max-w-md" : "text-base"} leading-relaxed`}>
                      {feature.description}
                    </p>
                    
                    {!isMobile && feature.colSpan.includes("col-span-2") && (
                      <div className={`mt-auto pt-8 transition-all duration-500 delay-100 ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
                        <div className="h-32 w-full bg-gradient-to-t from-background to-transparent rounded-lg border border-white/5 relative overflow-hidden flex items-end justify-center">
                          <div className="absolute w-[200%] h-1 bg-accent-yellow top-1/2 left-0 shadow-[0_0_15px_#FFC801] animate-pulse" />
                        </div>
                      </div>
                    )}
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
