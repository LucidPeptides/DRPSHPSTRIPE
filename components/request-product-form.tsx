"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { products } from "@/lib/products"

export function RequestProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    productRequest: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [matchedProduct, setMatchedProduct] = useState<any>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Check for product matches when typing in product request field
    if (name === "productRequest" && value.trim().length > 2) {
      const query = value.toLowerCase()
      const match = products.find(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query),
      )
      setMatchedProduct(match)
    } else if (name === "productRequest" && value.trim().length <= 2) {
      setMatchedProduct(null)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // If there's a matched product, don't submit - user should use the link
    if (matchedProduct) {
      return
    }

    // Simulate form submission
    console.log("Product request submitted:", formData)
    setIsSubmitted(true)

    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", productRequest: "" })
    }, 3000)
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Request Submitted!</h2>
          <p className="text-muted-foreground">
            Thank you for your product request. We'll review it and get back to
            you within 24-48 hours.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Request Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="productRequest">Product Request *</Label>
            <Textarea
              id="productRequest"
              name="productRequest"
              required
              value={formData.productRequest}
              onChange={handleInputChange}
              placeholder="Describe the peptide or research compound you're looking for (include dosage, purity requirements, etc.)"
              rows={4}
            />
          </div>

          {matchedProduct && (
            <Alert className="border-blue-200 bg-blue-50">
              <AlertDescription>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-medium text-blue-900 mb-1">
                      We already have this product!
                    </p>
                    <p className="text-blue-700 text-sm mb-2">
                      <strong>{matchedProduct.name}</strong> -{" "}
                      {matchedProduct.description}
                    </p>
                    <Link
                      href={`/products/${matchedProduct.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      View Product <ExternalLink className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          <div className="bg-muted/50 rounded-lg p-4">
            <h3 className="font-medium mb-2">What happens next?</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• We'll review your request within 24-48 hours</li>
              <li>
                • If we can source the product, we'll contact you with pricing
                and availability
              </li>
              <li>
                • All products come with independent Certificates of Analysis
                (CoA) on request
              </li>
              <li>
                • All products supplied are for research use only - not for
                human consumption
              </li>
            </ul>
          </div>

          <Button type="submit" className="w-full" disabled={!!matchedProduct}>
            {matchedProduct ? "Product Already Available" : "Submit Request"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
