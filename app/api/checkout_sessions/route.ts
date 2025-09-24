import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

// This is your Stripe secret key, securely loaded from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

// Define the shape of the items you expect to receive from the frontend
interface CartItem {
  productName: string
  variantName: string
  price: number
  quantity: number
  productImage: string
}

export async function POST(req: NextRequest) {
  try {
    // Parse the cart items from the request body
    const { items } = (await req.json()) as { items: CartItem[] }

    // Ensure there are items in the cart
    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 })
    }

    // Create a checkout session with Stripe
    const session = await stripe.checkout.sessions.create({
      // Define the payment methods you accept
      payment_method_types: ["card"],
      // Map your cart items to the format Stripe expects
      line_items: items.map((item) => ({
        price_data: {
          currency: "gbp", // Set your currency
          product_data: {
            name: `${item.productName} - ${item.variantName}`,
            images: [`${req.nextUrl.origin}${item.productImage}`], // Use absolute URL for images
          },
          unit_amount: Math.round(item.price * 100), // Stripe expects the price in the smallest currency unit (e.g., pence)
        },
        quantity: item.quantity,
      })),
      mode: "payment", // This is a one-time payment
      // Define the URLs to redirect to on success or cancellation
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/cart`,
    })

    // Return the session ID to the frontend
    return NextResponse.json({ sessionId: session.id })
  } catch (err: any) {
    console.error("Error creating Stripe session:", err)
    return NextResponse.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    )
  }
}
