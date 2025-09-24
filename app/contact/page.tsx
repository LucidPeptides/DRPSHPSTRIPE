export const metadata = {
  title: "Contact Us | Dropship Peptides",
  description:
    "Get in touch with Dropship Peptides for product inquiries, order support, or compliance questions.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/contact"
  },
  openGraph: {
    title: "Contact Us | Dropship Peptides",
    description:
      "Reach out to our team for product inquiries, order support, or compliance questions.",
    url: "https://dropshippeptides.co.uk/contact",
    type: "article"
  }
}

import { Suspense } from "react"
import ContactContent from "./contact-content"

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ContactContent />
    </Suspense>
  )
}
