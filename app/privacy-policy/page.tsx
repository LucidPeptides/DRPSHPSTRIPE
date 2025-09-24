export const metadata = {
  title: "Privacy Policy | Dropship Peptides",
  description:
    "Read our Privacy Policy to understand how we handle your data and protect your privacy.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/privacy-policy"
  },
  openGraph: {
    title: "Privacy Policy | Dropship Peptides",
    description:
      "Learn how Dropship Peptides handles your data and protects your privacy.",
    url: "https://dropshippeptides.co.uk/privacy-policy",
    type: "article"
  }
}

import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Privacy Policy</h1>

        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you
            create an account, make a purchase, or contact us for support. This
            may include your name, email address, phone number, and shipping
            address.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul className="list-disc pl-6 mt-4">
            <li>Process and fulfill your orders</li>
            <li>Communicate with you about your orders and our services</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this policy. We may share your information with trusted
            service providers such as payment processors (e.g., Stripe), hosting
            platforms (e.g., Vercel), and analytics providers, solely for the
            purpose of operating our business.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
          <p>
            We retain your personal information only as long as necessary to
            fulfill the purposes outlined in this policy, unless a longer
            retention period is required by law.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal
            information against unauthorized access, alteration, disclosure, or
            destruction. However, no method of transmission over the internet is
            100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact
            us via our{" "}
            <Link href="/contact" className="text-primary hover:underline">
              contact page
            </Link>{" "}
            or email us at{" "}
            <a
              href="mailto:support@dropshippeptides.co.uk"
              className="text-primary hover:underline"
            >
              support@dropshippeptides.co.uk
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  )
}
