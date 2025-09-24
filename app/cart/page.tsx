import { CartContent } from "@/components/cart-content"

export default function CartPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Shopping Cart</h1>
      </div>

      <CartContent />
    </div>
  )
}
