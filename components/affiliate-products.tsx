"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { AffiliateProduct } from "@/lib/products"

interface AffiliateProductsProps {
  affiliateProducts: AffiliateProduct[]
}

export function AffiliateProducts({ affiliateProducts }: AffiliateProductsProps) {
  if (!affiliateProducts || affiliateProducts.length === 0) return null

  const handleAffiliateClick = (url: string) => {
    if (!url || url === "#") return
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <section aria-labelledby="affiliate-heading" className="mb-12">
      <div className="max-w-7xl mx-auto">
        <h2
          id="affiliate-heading"
          className="text-2xl font-bold mb-6 text-center"
        >
          Recommended Supplies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {affiliateProducts.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className="flex items-center p-3 bg-slate-50/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              {/* Image */}
              <div className="flex-shrink-0 w-16 h-16 bg-white rounded-md flex items-center justify-center p-1 border">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={`Affiliate product: ${product.name}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col flex-grow ml-3 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-slate-800 dark:text-slate-100 text-sm leading-tight">
                    {product.name}
                  </p>
                  {product.platform && (
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {product.platform}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-muted-foreground"></span>
                  <Button
                    onClick={() => handleAffiliateClick(product.affiliateUrl)}
                    size="sm"
                    variant="outline"
                    className="flex-shrink-0 text-xs h-8"
                    aria-label={`View ${product.name} on ${product.platform}`}
                  >
                    View
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-xs text-muted-foreground mt-4 text-center"
          aria-label="Affiliate disclosure"
        >
          * These are affiliate links. We may earn a small commission from
          purchases made through these links at no additional cost to you.
        </p>
      </div>
    </section>
  )
}
