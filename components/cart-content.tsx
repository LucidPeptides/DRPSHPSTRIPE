"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Trash2, ShoppingBag, CreditCard } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/contexts/cart-context"
import { BacteriostaticWaterAddon } from "@/components/bacteriostatic-water-addon"
import { loadStripe } from "@stripe/stripe-js"
import { useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export function CartContent() {
  const { items, totalItems, removeItem, updateQuantity, totalPrice } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  const shippingCost = 30
  const total = totalPrice + shippingCost

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const stripe = await stripePromise
      if (!stripe) throw new Error("Stripe.js has not loaded yet.")

      const itemsWithShipping = items.map((item) => ({
        productName: item.productName,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        productImage: item.productImage,
      }))

      itemsWithShipping.push({
        productName: "Shipping",
        variantName: "Tracked Delivery",
        price: shippingCost,
        quantity: 1,
        productImage: "",
      })

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: itemsWithShipping }),
      })

      const session = await response.json()
      if (!response.ok) throw new Error(session.error || "Something went wrong.")

      const result = await stripe.redirectToCheckout({ sessionId: session.sessionId })
      if (result.error) alert(result.error.message)
    } catch (error) {
      console.error("Checkout error:", error)
      alert("An unexpected error occurred.")
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">
          Add some products to get started with your research.
        </p>
        <Link href="/products">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <BacteriostaticWaterAddon />

      <div className="space-y-4 mb-8">
        {items.map((item) => {
          const lineTotal = item.price * item.quantity

          return (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={`/api/product-image?slug=${item.productSlug}&variant=${item.variantName}`}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-grow min-w-0">
                    <h3 className="font-semibold text-lg break-words">
                      {item.productName}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Variant: {item.variantName}
                    </p>
                    <p className="text-sm font-medium">£{item.price} per kit</p>
                  </div>

                  {/* Quantity + Price + Remove */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-4 sm:gap-2 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <label htmlFor={`quantity-${item.id}`} className="text-sm font-medium">
                        Qty:
                      </label>
                      <Input
                        id={`quantity-${item.id}`}
                        type="number"
                        min="1"
                        max="10"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, Number.parseInt(e.target.value) || 1)
                        }
                        className="w-16 text-center"
                      />
                    </div>
                    <p className="font-semibold text-right">£{lineTotal.toFixed(2)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-muted/30">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
              <span>£{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>£{shippingCost.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>£{total.toFixed(2)}</span>
            </div>
          </div>
          <Button
            onClick={handleCheckout}
            size="lg"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Proceed to Checkout
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
