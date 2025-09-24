"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus } from "lucide-react"
import Image from "next/image"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/lib/products"

export function BacteriostaticWaterAddon() {
  const { items, addItem } = useCart()

  // Check if cart already contains Bacteriostatic Water
  const hasBacteriostaticWater = items.some(
    (item) =>
      item.productName.toLowerCase().includes("bacteriostatic water") ||
      item.sku.toLowerCase().includes("bac-water"),
  )

  if (hasBacteriostaticWater) {
    return null
  }

  // Find Bacteriostatic Water product (assuming it exists in products array)
  const bacteriostaticWater = products.find(
    (p) => p.slug === "bacteriostatic-water",
  )

  if (!bacteriostaticWater) {
    return null
  }

  const defaultVariant = bacteriostaticWater.variants[0]

  const handleAddToCart = () => {
    addItem({
      productId: bacteriostaticWater.id,
      productSlug: bacteriostaticWater.slug, // <-- This was the missing line
      variantId: defaultVariant.id,
      quantity: 1,
      productName: bacteriostaticWater.name,
      variantName: defaultVariant.name,
      sku: defaultVariant.sku,
      productImage: bacteriostaticWater.image,
    })
  }

  return (
    <Card className="bg-blue-50 border-blue-200 mb-6">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
            {/* Bonus Fix: Updated this image to also use the dynamic overlay */}
            <Image
              src={`/api/product-image?slug=${bacteriostaticWater.slug}`}
              alt={bacteriostaticWater.name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-blue-900 mb-1">
              Don't forget your Bacteriostatic Water!
            </h4>
            <p className="text-sm text-blue-700 mb-2">
              Essential for reconstituting your peptides safely.
            </p>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs bg-white">
                {defaultVariant.name}
              </Badge>
              <span className="text-sm font-medium text-blue-900">
                £{defaultVariant.price}
              </span>
            </div>
          </div>

          <Button
            onClick={handleAddToCart}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
