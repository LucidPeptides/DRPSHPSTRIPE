"use client"

import type { Product } from "@/lib/products"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

type Variant = {
  id: string | number
  name?: string
  price: number
  [key: string]: any
}

interface RelatedProductsProps {
  products: Product[]
  dosageFilter?: string
}

function pickDisplayVariant(product: Product, dosageFilter?: string): Variant | null {
  const variants = product.variants || []
  if (!variants.length) return null
  if (dosageFilter && dosageFilter !== "all") {
    const match = variants.find((v) => v.name === dosageFilter)
    if (match) return match as Variant
  }
  return variants.reduce(
    (min: any, v: any) => (min == null || v.price < min.price ? v : min),
    null
  )
}

export function RelatedProducts({ products, dosageFilter = "all" }: RelatedProductsProps) {
  if (!products || products.length === 0) return null

  return (
    <section aria-labelledby="related-heading" className="border-t py-12">
      <div className="max-w-7xl mx-auto">
        <h2 id="related-heading" className="text-3xl font-bold mb-8 text-center">
          Often Researched With
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.slice(0, 3).map((product) => {
            const displayVariant = pickDisplayVariant(product, dosageFilter)
            const imageUrl = `/api/product-image?slug=${encodeURIComponent(
              product.slug || ""
            )}&variant=${encodeURIComponent(displayVariant?.name || "")}`

            const prices = (product.variants || []).map((v) => v.price)
            const minPrice = prices.length ? Math.min(...prices) : undefined

            return (
              <div
                key={product.id}
                className="flex items-center p-3 bg-slate-50/50 border border-slate-200 rounded-lg"
              >
                {/* Image */}
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-md flex items-center justify-center p-1 border">
                  <Image
                    src={imageUrl}
                    alt={`Related product: ${product.name} - ${displayVariant?.name || "default variant"}`}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col flex-grow ml-3 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-semibold text-slate-800 text-sm leading-tight">
                      {product.name}
                    </p>
                    <Badge
                      variant="outline"
                      className="text-xs flex-shrink-0 ml-2"
                    >
                      {product.category}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <span className="text-sm text-muted-foreground">
                      {minPrice !== undefined ? `From £${minPrice}` : "View details"}
                    </span>
                    <Link href={`/products/${product.slug}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-shrink-0 text-xs h-8"
                        aria-label={`View details for ${product.name}`}
                      >
                        View
                        <ExternalLink className="h-3 w-3 ml-1" aria-hidden="true" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
