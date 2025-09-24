export const metadata = {
  title: "Cookie Policy | Dropship Peptides",
  description:
    "Read our Cookie Policy to learn how we use cookies to improve your browsing experience.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/cookie-policy"
  },
  openGraph: {
    title: "Cookie Policy | Dropship Peptides",
    description:
      "Learn how Dropship Peptides uses cookies to improve your browsing experience.",
    url: "https://dropshippeptides.co.uk/cookie-policy",
    type: "article"
  }
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto prose prose-lg">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Cookie Policy</h1>

        <p className="text-muted-foreground mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
          <p>
            Cookies are small text files that are placed on your computer or
            mobile device when you visit our website. They are widely used to
            make websites work more efficiently and provide information to
            website owners.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc pl-6 mt-4">
            <li>
              <strong>Essential Cookies:</strong> These are necessary for the
              website to function properly
            </li>
            <li>
              <strong>Analytics Cookies:</strong> These help us understand how
              visitors interact with our website
            </li>
            <li>
              <strong>Functional Cookies:</strong> These enable enhanced
              functionality and personalization
            </li>
            <li>
              <strong>Marketing Cookies:</strong> These are used to track
              visitors across websites
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p>
            You can control and manage cookies in various ways. Please note that
            removing or blocking cookies can impact your user experience and
            parts of our website may no longer be fully accessible.
          </p>
          <p className="mt-4">
            Most web browsers allow you to manage your cookie preferences. You
            can set your browser to refuse cookies, or delete certain cookies.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p>
            We may use third-party services such as Google Analytics and social
            media platforms that may set their own cookies. We do not control
            these cookies and recommend you check the third-party websites for
            more information about their cookies and how to manage them.
          </p>
        </section>
      </div>
    </div>
  )
}
