"use client"

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { products as allProducts } from "@/lib/products"

// Define the shape of a single item in the cart
interface CartItem {
  id: string // Using a unique ID for each cart item instance
  productId: number
  productName: string
  productImage: string
  productSlug: string // <-- ADDED: To store the slug for dynamic image URLs
  variantId: string
  variantName: string
  sku: string
  quantity: number
  price: number
}

// The Omit type will now correctly expect productSlug to be passed to addItem
interface CartContextType {
  items: CartItem[]
  addItem: (item: Omit<CartItem, "id" | "price">) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem("shoppingCart")
      if (storedItems) {
        setItems(JSON.parse(storedItems))
      }
    } catch (error) {
      console.error("Failed to parse cart items from localStorage", error)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("shoppingCart", JSON.stringify(items))
  }, [items])

  const addItem = (newItem: Omit<CartItem, "id" | "price">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.variantId === newItem.variantId,
      )
      const product = allProducts.find((p) => p.id === newItem.productId)
      const variant = product?.variants.find((v) => v.id === newItem.variantId)
      const price = variant?.price || 0

      if (existingItem) {
        return prevItems.map((item) =>
          item.variantId === newItem.variantId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item,
        )
      } else {
        // No change needed here: {...newItem} automatically includes the new productSlug
        return [
          ...prevItems,
          { ...newItem, id: `${newItem.variantId}-${Date.now()}`, price },
        ]
      }
    })
  }

  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item,
      ),
    )
  }

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
