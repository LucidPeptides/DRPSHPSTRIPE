export const metadata = {
  title: "FAQ | Dropship Peptides",
  description:
    "Find answers to common questions about our high‑purity research peptides, shipping, payments, and compliance policies.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/faq",
  },
  openGraph: {
    title: "FAQ | Dropship Peptides",
    description:
      "Answers to common questions about our research peptides, shipping, payments, and compliance.",
    url: "https://dropshippeptides.co.uk/faq",
    type: "article",
  },
}

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      question: "What are peptides and what are they used for?",
      answer:
        "Peptides are short chains of amino acids that serve as building blocks for proteins. Our peptides are intended solely for research purposes and are not for human consumption or therapeutic use.",
    },
    {
      question: "Are your products tested for purity?",
      answer:
        "Yes, all our products are independently tested for purity and come with Certificates of Analysis (CoA) to ensure the highest quality standards for research applications.",
    },
    {
      question: "How do I place an order?",
      answer:
        "Simply add the products you wish to purchase to your basket, proceed to the secure checkout, and complete your payment with Stripe. Your order will be processed and dispatched with a high level of security and efficiency.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept payments through Stripe, which supports major credit cards and other secure payment methods. No cryptocurrency required.",
    },
    {
      question: "What are your shipping timelines?",
      answer:
        "All UK orders are processed and delivered within 48 hours via a tracked delivery service.",
    },
    {
      question: "How much does shipping cost?",
      answer:
        "Standard UK shipping is a flat fee of £5 GBP for all orders. This includes tracked delivery to your address.",
    },
    {
      question: "Do you provide tracking information?",
      answer:
        "Yes, we provide tracking information for all UK deliveries. You will receive a tracking number via email once your order has been dispatched.",
    },
    {
      question: "How are products shipped?",
      answer:
        "We offer discreet, fast shipping directly to your door. All products are properly packaged to maintain stability during transit and shipped via secure UK courier services.",
    },
    {
      question: "How should I store the peptides?",
      answer:
        "Storage instructions are provided with each product. Generally, lyophilized peptides should be stored in a freezer at -20°C or below until reconstitution.",
    },
    {
      question: "Can I return or exchange products?",
      answer:
        "Due to the nature of research chemicals, we have a strict no-return policy. Please ensure you are ordering the correct products and quantities before confirming your order.",
    },
    {
      question: "Are these products legal?",
      answer:
        "Our products are legal for research purposes in most jurisdictions. However, regulations vary by location, and it is your responsibility to ensure compliance with local laws.",
    },
    {
      question: "Do you offer bulk or wholesale pricing?",
      answer:
        "Yes, for larger quantities, we may be able to offer bulk or wholesale pricing. Please contact us through our WhatsApp line with your specific requirements for a quote.",
    },
    {
      question: "What is a Certificate of Analysis (CoA)?",
      answer:
        "A CoA is a document that certifies a product’s quality, purity, and composition. Each of our products is tested by a third-party laboratory, and the CoA is available upon request to verify the peptide's specifications for your research.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can reach our customer support team through WhatsApp using the contact information provided on our website, or through our contact page.",
    },
  ]

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* FAQPage JSON-LD Schema */}
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(faqSchema)}
      </script>

      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about our products and services.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border rounded-lg px-6"
            >
              <AccordionTrigger className="text-left font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}