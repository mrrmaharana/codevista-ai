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
  title: "Next-Gen AI Automation Platform",
  description: "Advanced AI-driven data automation platform.",
  openGraph: {
    title: "Next-Gen AI Automation Platform",
    description: "Advanced AI-driven data automation platform.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://codevista.ai",
  }
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
      <body className="min-h-full flex flex-col bg-background text-light font-sans selection:bg-accent-yellow selection:text-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CodeVista AI",
              "operatingSystem": "Web",
              "applicationCategory": "BusinessApplication",
              "offers": {
                "@type": "AggregateOffer",
                "priceCurrency": "USD",
                "lowPrice": "29",
                "highPrice": "299",
                "offerCount": "3"
              },
              "description": "Advanced AI-driven data automation platform for engineering teams."
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
