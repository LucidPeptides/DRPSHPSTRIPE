"use client"

import dynamic from "next/dynamic"

// Above-the-fold essentials
import { HeroSection } from "@/components/hero-section"
import { TrustBanner } from "@/components/trust-banner"

// Lazy-load heavier sections
const WhyDropshipSection = dynamic(
  () => import("@/components/why-dropship-section").then(mod => mod.WhyDropshipSection),
  { ssr: false, loading: () => <div className="h-40" /> }
)

const PeptidesInfoSection = dynamic(
  () => import("@/components/peptides-info-section").then(mod => mod.PeptidesInfoSection),
  { ssr: false, loading: () => <div className="h-40" /> }
)

// Already lazy-loaded modal
const AgeVerificationModal = dynamic(
  () =>
    import("@/components/age-verification-modal").then(
      mod => mod.AgeVerificationModal
    ),
  { ssr: false }
)

export default function HomePage() {
  return (
    <>
      {/* Structured Data for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Dropship Peptides",
          url: "https://dropshippeptides.co.uk",
          potentialAction: {
            "@type": "SearchAction",
            target:
              "https://dropshippeptides.co.uk/products?search={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        })}
      </script>

      {/* Hero first for LCP */}
      <HeroSection />

      {/* Trust signals */}
      <TrustBanner />

      {/* Below-the-fold sections */}
      <WhyDropshipSection />
      <PeptidesInfoSection />

      {/* Lazy-loaded modal */}
      <AgeVerificationModal />
    </>
  )
}
