"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "./LayoutUtils";
import { Button } from "../ui/Button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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
          ? "bg-background/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-accent-yellow flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-mono font-bold text-background text-xl leading-none">CV</span>
            </div>
            <span className="font-mono font-bold text-xl tracking-tight hidden sm:block">CodeVista</span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-light/80 hover:text-accent-yellow transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="sm">Log In</Button>
            <Button size="sm">Get Started</Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-light"
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
        className={`fixed inset-0 top-[60px] bg-background border-t border-white/10 p-4 transition-transform duration-300 md:hidden ${
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
            <Button variant="outline" className="w-full justify-center">Log In</Button>
            <Button className="w-full justify-center">Get Started</Button>
          </li>
        </ul>
      </div>
    </header>
  );
}
