import { products } from "@/lib/products"
import { NextResponse } from "next/server"

export async function GET() {
  const baseUrl = "https://dropshippeptides.co.uk"

  // If products have a lastUpdated field, use it; otherwise fallback to build date
  const buildDate = new Date().toISOString().split("T")[0]
  const mostRecentDate =
    products
      .map((p) => p.lastUpdated || buildDate)
      .sort()
      .reverse()[0] || buildDate

  const staticPages = [
    { path: "", changefreq: "weekly", priority: "1.0", lastmod: mostRecentDate },
    { path: "products", changefreq: "weekly", priority: "0.9", lastmod: mostRecentDate },
    { path: "reconstitution-dosing", changefreq: "monthly", priority: "0.7", lastmod: buildDate },
    { path: "faq", changefreq: "monthly", priority: "0.6", lastmod: buildDate },
    { path: "request-product", changefreq: "monthly", priority: "0.5", lastmod: buildDate },
    { path: "contact", changefreq: "monthly", priority: "0.5", lastmod: buildDate },
    { path: "terms-conditions", changefreq: "yearly", priority: "0.3", lastmod: buildDate },
  ]

  const urls = [
    ...staticPages.map((page) => ({
      loc: `${baseUrl}/${page.path}`,
      changefreq: page.changefreq,
      priority: page.priority,
      lastmod: page.lastmod,
    })),
    ...products.map((product) => ({
      loc: `${baseUrl}/products/${product.slug}`,
      changefreq: "weekly",
      priority: "0.8",
      lastmod: product.lastUpdated || buildDate,
    })),
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `<url>
  <loc>${url.loc}</loc>
  <lastmod>${url.lastmod}</lastmod>
  <changefreq>${url.changefreq}</changefreq>
  <priority>${url.priority}</priority>
</url>`
  )
  .join("\n")}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
