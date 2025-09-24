"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Product } from "@/lib/products"
import clsx from "clsx"

interface ProductGridProps {
  products: Product[]
  variant?: "default" | "featured"
  cardClassName?: string
  gridSize?: 2 | 3 | 4 | 5 | 6 // narrowed type
  activeFilter?: string
}

export function ProductGrid({
  products,
  variant = "default",
  cardClassName,
  gridSize = 4,
  activeFilter,
}: ProductGridProps) {
  const isFeatured = variant === "featured"

  // Filter by category/tag if provided
  let filteredProducts = activeFilter
    ? products.filter(
        (p) => p.category?.toLowerCase() === activeFilter.toLowerCase()
      )
    : products

  // If variant is "featured", only keep featured products
  if (isFeatured) {
    filteredProducts = filteredProducts.filter((p) => p.featured)
  }

  // Map gridSize to Tailwind classes
  const gridColsClass = {
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
  }[gridSize]

  if (!filteredProducts.length) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        No products found matching your selection.
      </div>
    )
  }

  return (
    <div className={clsx("grid w-full gap-6", gridColsClass)}>
      {filteredProducts.map((product, index) => {
        const imageUrl = `/api/product-image?slug=${encodeURIComponent(
          product.slug || ""
        )}&variant=${encodeURIComponent(product.variants?.[0]?.name || "")}`
        const prices = (product.variants || []).map((v) => v.price)
        const minPrice = prices.length ? Math.min(...prices) : undefined

        return (
          <div
            key={product.slug}
            className={clsx(
              cardClassName,
              isFeatured && index === 0 && gridSize > 2 && "col-span-2"
            )}
          >
            <Card className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              <CardContent className="p-6">
                {/* IMAGE */}
                <div className="relative mb-4 flex justify-center items-center rounded-lg bg-muted p-2 h-40 sm:h-48 lg:h-56 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt=""
                    aria-hidden="true"
                    width={300}
                    height={300}
                    className="object-contain max-h-full w-auto"
                    priority={isFeatured}
                    loading={isFeatured ? undefined : "lazy"}
                  />
                  {product.featured && (
                    <Badge
                      variant="secondary"
                      className="absolute top-3 right-3"
                      aria-hidden="true"
                    >
                      Featured
                    </Badge>
                  )}
                </div>

                {/* NAME */}
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                {/* DESCRIPTION */}
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* PRICE */}
                <div className="text-sm text-muted-foreground mb-4">
                  {minPrice !== undefined ? `From £${minPrice}` : "View details"}
                </div>

                {/* CATEGORY */}
                <Badge variant="outline" className="text-xs">
                  {product.category}
                </Badge>
              </CardContent>

              <CardFooter className="p-6 pt-0 mt-auto">
                <Link href={`/products/${product.slug}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        )
      })}
    </div>
  )
}
