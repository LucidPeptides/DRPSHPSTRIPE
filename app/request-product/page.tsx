export const metadata = {
  title: "Request a Product | Dropship Peptides",
  description:
    "Looking for a specific research peptide? Submit a request and our team will source it for you.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/request-product"
  },
  openGraph: {
    title: "Request a Product | Dropship Peptides",
    description:
      "Submit a request for a specific research peptide and our team will source it for you.",
    url: "https://dropshippeptides.co.uk/request-product",
    type: "article"
  }
}

import type { Metadata } from "next"
import { RequestProductForm } from "@/components/request-product-form"

export default function RequestProductPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Request a Product</h1>
          <p className="text-muted-foreground">
            Can't find what you're looking for? Let us know what research
            compounds you need and we'll do our best to source them for you.
          </p>
        </div>

        <RequestProductForm />
      </div>
    </div>
  )
}
