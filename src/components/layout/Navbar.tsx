"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./LayoutUtils";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Stories", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/82 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.25)]"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-accent-yellow flex items-center justify-center transition-all group-hover:scale-105 group-hover:rotate-3 group-hover:shadow-[0_0_28px_rgba(255,210,63,0.45)]">
              <Image src="/SVGs/cube-16-solid.svg" alt="" width={20} height={20} className="brightness-0" />
            </div>
            <span className="font-mono font-bold text-xl tracking-tight hidden sm:block">CodeVista AI</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-medium text-light/78 transition-colors hover:text-accent-yellow after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-accent-yellow after:transition-all hover:after:w-full"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Sign in</Button>
            <Button size="sm" href="#pricing">Start free</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-light rounded-lg border border-white/10 bg-white/5 transition hover:border-accent-cyan/50 hover:bg-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            <Image 
              src={mobileMenuOpen ? "/SVGs/x-mark.svg" : "/SVGs/chevron-down.svg"} 
              alt="Menu" 
              width={24} 
              height={24} 
              className="invert"
            />
          </button>
        </nav>
      </Container>

      {/* Mobile Nav Overlay */}
      <div 
        className={`fixed inset-0 top-[60px] bg-background/96 backdrop-blur-xl border-t border-white/10 p-4 transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-4 mt-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-2xl font-mono font-medium text-light py-2 border-b border-white/5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-8 flex flex-col gap-4">
            <Button variant="outline" className="w-full justify-center">Sign in</Button>
            <Button href="#pricing" className="w-full justify-center">Start free</Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
