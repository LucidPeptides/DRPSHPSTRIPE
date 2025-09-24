import Link from "next/link"

export function SiteFooter() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "All Products" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
  ]

  const legalLinks = [
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/cookie-policy", label: "Cookie Policy" },
    { href: "/terms-conditions", label: "Terms & Conditions" },
  ]

  return (
    <footer className="bg-card border-t mt-auto">
      <div className="container mx-auto px-4 py-12">
        {/* Top section with 3 balanced columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 id="footer-quick-links" className="font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul
              className="space-y-2"
              aria-labelledby="footer-quick-links"
            >
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 id="footer-legal" className="font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul
              className="space-y-2"
              aria-labelledby="footer-legal"
            >
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Mission */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Our Mission</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To provide the research community with access to high-purity,
              independently tested peptides via a secure and reliable UK-based
              dropshipping service.
            </p>
          </div>
        </div>

        {/* Bottom section for the full-width disclaimer */}
        <div className="border-t mt-8 pt-8">
          <h3 className="font-semibold text-foreground mb-4">
            Important Notice & Disclaimer
          </h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            All products available on this website are intended strictly for
            laboratory and research purposes only. By purchasing any of these
            products, the customer acknowledges and agrees that they are not
            intended for human consumption, veterinary use, or any form of
            in-vivo (in a living organism) research or application. The products
            listed on this site are not intended to diagnose, treat, cure, or
            prevent any disease or medical condition. The information provided
            is for educational and informational purposes only and does not
            constitute medical advice. It is the sole responsibility of the
            purchaser to ensure they are a qualified scientific or medical
            professional and to handle these products in a safe and appropriate
            manner within a properly equipped laboratory setting. You must also
            ensure that your purchase and use of these products are in full
            compliance with all applicable local, state, and federal laws and
            regulations. Dropship Peptides accepts no liability for any damages
            that may arise from the misuse, improper handling, or consumption of
            these products.
          </p>
        </div>

        <div className="border-t mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Dropship Peptides. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
