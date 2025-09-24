import "./globals.css"
import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { CartProvider } from "@/contexts/cart-context"

export const metadata: Metadata = {
  title: {
    default: "Dropship Peptides | High‑Purity Research Peptides UK",
    template: "%s | Dropship Peptides"
  },
  description:
    "UK‑based supplier of high‑purity, independently tested research peptides. Discreet shipping, secure Stripe payments, and no crypto hassle.",
  metadataBase: new URL("https://dropshippeptides.co.uk"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://dropshippeptides.co.uk",
    siteName: "Dropship Peptides",
    title: "Dropship Peptides | High‑Purity Research Peptides UK",
    description:
      "UK‑based supplier of high‑purity, independently tested research peptides. Discreet shipping, secure Stripe payments, and no crypto hassle.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dropship Peptides - High Purity Research Peptides"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle",
    title: "Dropship Peptides | High‑Purity Research Peptides UK",
    description:
      "UK‑based supplier of high‑purity, independently tested research peptides. Discreet shipping, secure Stripe payments, and no crypto hassle.",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "https://dropshippeptides.co.uk"
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* Skip link for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black p-2 z-50"
        >
          Skip to main content
        </a>

        <CartProvider>
          <header role="banner">
            <SiteHeader />
          </header>

          <main id="main-content" role="main">
            {children}
          </main>

          <footer role="contentinfo">
            <SiteFooter />
          </footer>
        </CartProvider>
      </body>
    </html>
  )
}
