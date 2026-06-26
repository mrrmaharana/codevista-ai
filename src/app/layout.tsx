import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://codevista.ai"),
  title: {
    default: "CodeVista AI | Premium AI SaaS Automation Platform",
    template: "%s | CodeVista AI",
  },
  description: "CodeVista AI turns fragmented engineering data into governed automations, AI copilots, and executive-ready insight for software teams.",
  keywords: [
    "AI SaaS platform",
    "developer automation",
    "engineering analytics",
    "AI workflow automation",
    "CodeVista AI",
  ],
  openGraph: {
    title: "CodeVista AI | Premium AI SaaS Automation Platform",
    description: "Launch governed AI workflows, analytics, and developer copilots from one premium SaaS workspace.",
    url: "https://codevista.ai",
    siteName: "CodeVista AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeVista AI",
    description: "AI automation for software teams that need speed, governance, and polished insight.",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://codevista.ai",
  },
};

export const viewport: Viewport = {
  themeColor: "#172B36",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth antialiased h-full`}
    >
      <body className="min-h-full flex flex-col bg-background text-light font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "CodeVista AI",
              operatingSystem: "Web",
              applicationCategory: "BusinessApplication",
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: "USD",
                lowPrice: "39",
                highPrice: "349",
                offerCount: "3",
              },
              description: "Premium AI SaaS platform for engineering analytics, automation, and workflow governance.",
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
