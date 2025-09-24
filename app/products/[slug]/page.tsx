// app/products/[slug]/page.tsx
import { notFound } from "next/navigation"
import {
  getProductBySlug,
  getRelatedProducts,
  getAffiliateProductsForProduct,
} from "@/lib/products"
import { ProductDetail } from "@/components/product-detail"

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // ✅ Await params for Next 15+
  const { slug } = await params

  // Fetch main product
  const product = await getProductBySlug(slug)
  if (!product) return notFound()

  // Fetch related/affiliate products
  const affiliateProducts = getAffiliateProductsForProduct(product.id)
  const relatedProducts = await getRelatedProducts(slug)

  // ✅ Safe to log here
  console.log({ product, affiliateProducts, relatedProducts })

  // Build schema for SEO
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || "",
    image: product.images?.length
      ? product.images.map((img) => `https://dropshippeptides.co.uk${img}`)
      : undefined,
    sku: product.sku || undefined,
    brand: {
      "@type": "Brand",
      name: "Dropship Peptides",
    },
    offers: product.variants?.length
      ? {
          "@type": "Offer",
          url: `https://dropshippeptides.co.uk/products/${product.slug}`,
          priceCurrency: "GBP",
          price: product.variants[0].price,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning>
        {JSON.stringify(schema)}
      </script>

      {/* Full product detail UI */}
      <ProductDetail
        product={product}
        affiliateProducts={affiliateProducts}
        relatedProducts={relatedProducts}
      />
    </>
  )
}