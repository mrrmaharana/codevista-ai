import { Container } from "./LayoutUtils";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group inline-flex">
              <div className="w-8 h-8 rounded-lg bg-accent-yellow flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="font-mono font-bold text-background text-sm leading-none">CV</span>
              </div>
              <span className="font-mono font-bold text-lg tracking-tight">CodeVista</span>
            </Link>
            <p className="text-light/60 text-sm max-w-xs mb-6">
              The premium AI-driven data automation platform for modern engineering teams.
            </p>
            <div className="flex items-center gap-4">
              {/* Social Links placeholder using generic SVGs */}
              {[1, 2, 3].map((i) => (
                <a key={i} href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                  <Image src="/SVGs/link.svg" alt="Social" width={14} height={14} className="invert opacity-70" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-mono font-semibold text-light mb-4">Product</h4>
            <ul className="flex flex-col gap-2">
              {["Features", "Integrations", "Pricing", "Changelog"].map(link => (
                <li key={link}><a href="#" className="text-sm text-light/60 hover:text-accent-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-semibold text-light mb-4">Company</h4>
            <ul className="flex flex-col gap-2">
              {["About Us", "Careers", "Blog", "Contact"].map(link => (
                <li key={link}><a href="#" className="text-sm text-light/60 hover:text-accent-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-mono font-semibold text-light mb-4">Legal</h4>
            <ul className="flex flex-col gap-2">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
                <li key={link}><a href="#" className="text-sm text-light/60 hover:text-accent-yellow transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-light/40">
            © {new Date().getFullYear()} CodeVista Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-light/40">
            <span>Built with precision for performance.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
