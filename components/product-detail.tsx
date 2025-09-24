"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { AlertTriangle, Plus, Check, Minus } from "lucide-react"
import type { Product, ProductVariant, AffiliateProduct } from "@/lib/products"
import { useCart } from "@/contexts/cart-context"
import clsx from "clsx"

const AffiliateProducts = dynamic(
  () =>
    import("@/components/affiliate-products").then(
      (mod) => mod.AffiliateProducts
    ),
  { ssr: false }
)

const RelatedProducts = dynamic(
  () =>
    import("@/components/related-products").then(
      (mod) => mod.RelatedProducts
    ),
  { ssr: false }
)

interface ProductDetailProps {
  product: Product
  affiliateProducts: AffiliateProduct[]
  relatedProducts: Product[]
}

export function ProductDetail({
  product,
  affiliateProducts,
  relatedProducts,
}: ProductDetailProps) {
  const searchParams = useSearchParams()
  const variantParam = searchParams.get("variant")

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(() => {
    if (variantParam) {
      const foundVariant = product.variants.find((v) => v.id === variantParam)
      return foundVariant || product.variants[0]
    }
    return product.variants[0]
  })

  const [quantity, setQuantity] = useState(1)
  const [researchUseAgreed, setResearchUseAgreed] = useState(false)
  const [showError, setShowError] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [justAdded, setJustAdded] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const { addItem } = useCart()

  const handleAddToCart = async () => {
    if (!researchUseAgreed) {
      setShowError(true)
      setIsShaking(true)
      setTimeout(() => setIsShaking(false), 500)
      return
    }
    setShowError(false)
    setIsAdding(true)
    addItem({
      productId: product.id,
      productName: product.name,
      productImage: product.image,
      productSlug: product.slug,
      variantId: selectedVariant.id,
      variantName: selectedVariant.name,
      sku: selectedVariant.sku,
      quantity,
      price: selectedVariant.price,
    })
    setJustAdded(true)
    setTimeout(() => {
      setJustAdded(false)
      setIsAdding(false)
    }, 2000)
  }

  const handleVariantSelect = (variant: ProductVariant) => {
    setSelectedVariant(variant)
    setShowError(false)
  }

  const addToCartButtonClasses = clsx("w-full transition-all duration-200", {
    "bg-muted text-muted-foreground cursor-not-allowed hover:bg-muted":
      !researchUseAgreed,
    "animate-pulse": isShaking,
  })

  const imageUrl = `/api/product-image?slug=${encodeURIComponent(
    product.slug
  )}&variant=${encodeURIComponent(selectedVariant.name || "")}`

  return (
    <main role="main" className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row lg:gap-12 mb-12">
        {/* Left column (Image) */}
        <div className="lg:w-1/2 flex justify-center">
          <div className="rounded-lg overflow-hidden bg-muted max-h-[500px] w-full flex items-center justify-center">
            <Image
              src={imageUrl}
              alt={`Image of ${product.name} - ${selectedVariant.name}`}
              width={500}
              height={500}
              className="object-contain max-h-[500px] w-auto"
              priority
            />
          </div>
        </div>

        {/* Right column (Info) */}
        <div className="lg:w-1/2 space-y-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.name}</h1>
            <p className="text-sm text-muted-foreground font-mono mb-2">
              <b>SKU:</b> {selectedVariant.sku}
            </p>
            <Badge variant="outline" className="mb-4">
              {product.category}
            </Badge>
          </div>

          <div>
            <div className="text-3xl font-bold text-primary mb-2">
              £{selectedVariant.price}
            </div>
            <p className="text-sm text-muted-foreground">
              Price per kit (10 Vials)
            </p>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">
              Select Variant
            </Label>
            <div role="radiogroup" aria-label="Select variant" className="flex flex-wrap gap-3">
              {product.variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => handleVariantSelect(variant)}
                  role="radio"
                  aria-checked={selectedVariant.id === variant.id}
                  aria-label={`Variant ${variant.name}, £${variant.price}`}
                  className={`px-4 py-3 border-2 rounded-lg font-medium transition-colors flex flex-col items-center ${
                    selectedVariant.id === variant.id
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 bg-transparent"
                  }`}
                >
                  <span className="text-sm">{variant.name}</span>
                  <span className="text-xs opacity-75">£{variant.price}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium mb-3 block">Quantity</Label>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="text"
                readOnly
                value={quantity}
                className="w-14 h-9 text-center font-bold border-border"
                aria-label="Selected quantity"
                aria-live="polite"
              />
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => setQuantity((prev) => prev + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-2">
                    Research Use Only
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This product is intended for research purposes only and is
                    not for human consumption. Please consult with a healthcare
                    professional.
                  </p>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="research-use"
                      checked={researchUseAgreed}
                      onCheckedChange={(c) => {
                        setResearchUseAgreed(c as boolean)
                        if (c) setShowError(false)
                      }}
                      aria-label="Agree to research use terms"
                      aria-describedby="research-warning"
                    />
                    <Label
                      htmlFor="research-use"
                      className="text-sm font-medium"
                    >
                      I understand and agree to the research use only terms
                    </Label>
                  </div>
                  {showError && (
                    <p
                      id="research-warning"
                      className="text-destructive text-sm mt-2 font-medium"
                    >
                      Please confirm you understand the research use only terms
                      before adding to cart.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          <Button
            onClick={handleAddToCart}
            disabled={isAdding}
            size="lg"
            className={addToCartButtonClasses}
            aria-label={justAdded ? "Added to cart" : "Add to cart"}
            aria-live="polite"
            style={{
              animation: isShaking ? "shake 0.5s ease-in-out" : undefined,
            }}
          >
            {justAdded ? (
              <>
                <Check className="h-4 w-4 mr-2" /> Added to Cart!
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 mr-2" /> Add to Cart
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Affiliate Products Section */}
      <AffiliateProducts affiliateProducts={affiliateProducts} />

      {/* Product Description */}
      <div className="border-t pt-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Product Description</h2>
          <div className="prose prose-lg max-w-none">
            <p
              className="text-muted-foreground leading-relaxed whitespace-pre-line"
              aria-label="Product long description"
            >
              {product.longDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts products={relatedProducts} />

      {/* Shake animation */}
      <style jsx>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </main>
  )
}

