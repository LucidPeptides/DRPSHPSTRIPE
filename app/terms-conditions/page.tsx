export const metadata = {
  title: "Terms & Conditions | Dropship Peptides",
  description:
    "Read our Terms & Conditions for using the Dropship Peptides website and purchasing research products.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/terms-conditions"
  },
  openGraph: {
    title: "Terms & Conditions | Dropship Peptides",
    description:
      "Understand the terms for using our website and purchasing research products.",
    url: "https://dropshippeptides.co.uk/terms-conditions",
    type: "article"
  }
}

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function TermsConditionsPage() {
  const lastUpdated = new Date().toLocaleDateString("en-GB")

  return (
    <main role="main" className="container mx-auto px-4 py-8">
      {/* Schema for SEO */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Terms & Conditions | Dropship Peptides",
          description:
            "Read our Terms & Conditions for using the Dropship Peptides website and purchasing research products.",
          datePublished: "2025-09-10",
          dateModified: new Date().toISOString().split("T")[0],
          author: {
            "@type": "Organization",
            name: "Dropship Peptides",
            url: "https://dropshippeptides.co.uk"
          },
          publisher: {
            "@type": "Organization",
            name: "Dropship Peptides",
            logo: {
              "@type": "ImageObject",
              url: "https://dropshippeptides.co.uk/logo.png"
            }
          }
        })}
      </script>

      <div className="max-w-4xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:mb-4 prose-p:leading-relaxed">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms & Conditions</h1>

        <p
          className="text-muted-foreground mb-6"
          aria-label={`Last updated on ${lastUpdated}`}
        >
          Last updated: {lastUpdated}
        </p>

        <Card className="mb-8 border-destructive/20 bg-destructive/5">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-destructive">
              1. Research Use Only Agreement
            </h2>
            <p className="font-semibold text-destructive mt-4">
              IMPORTANT: All products sold by Dropship Peptides are intended
              strictly for in-vitro laboratory research purposes only. They are
              not for human consumption, therapeutic, or diagnostic use, nor for
              any other application involving humans or animals.
            </p>
            <p className="mt-4 font-semibold text-destructive">
              By purchasing our products, you acknowledge and agree that you are
              a qualified researcher or institution and will use these products
              solely for legitimate scientific research in accordance with all
              applicable laws and regulations.
            </p>
          </CardContent>
        </Card>

        {/* ... existing sections unchanged ... */}

        <section className="mb-8">
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms & Conditions, please contact us via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>{" "}
            or email us at{" "}
            <a
              href="mailto:support@dropshippeptides.co.uk"
              className="text-primary hover:underline"
            >
              support@dropshippeptides.co.uk
            </a>.
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-8">
          This page is provided for informational purposes only and does not constitute legal advice. 
          Please consult a qualified legal professional for guidance specific to your situation.
        </p>
      </div>
    </main>
  )
}
