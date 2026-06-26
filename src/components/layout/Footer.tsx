import Link from "next/link";
import Image from "next/image";
import { Container } from "./LayoutUtils";

const FOOTER_GROUPS = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Security"] },
  { title: "Company", links: ["About", "Customers", "Careers", "Contact"] },
  { title: "Resources", links: ["Docs", "API", "Playbooks", "Status"] },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.08] bg-background pt-14 pb-8">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="group mb-5 inline-flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-yellow transition-all group-hover:rotate-3 group-hover:shadow-[0_0_26px_rgba(255,210,63,0.35)]">
                <Image src="/SVGs/cube-16-solid.svg" alt="" width={20} height={20} className="brightness-0" />
              </div>
              <span className="font-mono text-xl font-bold tracking-tight">CodeVista AI</span>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-light/58">
              Premium AI automation for engineering teams that want speed, governance, and a calmer way to ship.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {["/SVGs/link.svg", "/SVGs/search.svg", "/SVGs/arrow-trending-up.svg"].map((src) => (
                <a
                  key={src}
                  href="#hero"
                  aria-label="CodeVista social link"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition hover:-translate-y-1 hover:border-accent-cyan/45 hover:bg-white/[0.08]"
                >
                  <Image src={src} alt="" width={15} height={15} className="invert opacity-70" />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 font-mono text-sm font-semibold text-light">{group.title}</h2>
              <ul className="flex flex-col gap-3">
                {group.links.map((link) => (
                  <li key={link}>
                    <a href="#hero" className="text-sm text-light/55 transition hover:text-accent-yellow">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.08] pt-6 text-sm text-light/40 md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} CodeVista AI. All rights reserved.</p>
          <p className="font-mono">Built for accountable automation.</p>
        </div>
      </Container>
    </footer>
  );
}
