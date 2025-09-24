import { products } from "./products"

export interface CartItem {
  id: string
  productId: number
  productName: string
  productImage: string
  variantId: string
  variantName: string
  sku: string
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
}

export const generateCartItemId = (
  productId: number,
  variantId: string,
): string => {
  return `${productId}-${variantId}`
}

export const calculateTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export const generateWhatsAppMessage = (
  items: CartItem[],
  subtotal?: number,
  total?: number,
): string => {
  const itemsList = items
    .map((item) => {
      const product = products.find((p) => p.id === item.productId)
      const variant = product?.variants.find((v) => v.id === item.variantId)
      const price = variant?.price || 0
      const lineTotal = price * item.quantity

      return `- ${item.productName} (SKU: ${item.sku}) x ${item.quantity} – £${lineTotal}`
    })
    .join("\n")

  let message = `Hi, I'd like to request a Stripe payment link for the following order:\n${itemsList}`

  if (subtotal !== undefined && total !== undefined) {
    message += `\nSubtotal: £${subtotal}\nShipping: £30\nTotal: £${total}`
  }

  return message
}

export const generateWhatsAppUrl = (
  items: CartItem[],
  subtotal?: number,
  total?: number,
): string => {
  const message = generateWhatsAppMessage(items, subtotal, total)
  const encodedMessage = encodeURIComponent(message)
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`
}
