"use client"

import {
  Shield,
  MessageCircle,
  Truck,
  AlertTriangle,
  XCircle,
  CheckCircle,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function WhyDropshipSection() {
  const benefits = [
    {
      icon: Shield,
      title: "No Crypto Complexity",
      description:
        "Avoid the risks and complications of cryptocurrency payments. Simple, secure transactions through trusted payment methods.",
    },
    {
      icon: MessageCircle,
      title: "Clear Communication",
      description:
        "Direct communication with our team via WhatsApp. No language barriers, no confusion – just clear, professional service.",
    },
    {
      icon: Truck,
      title: "Reliable Shipping",
      description:
        "Consistent, trackable delivery with established shipping partners. Know exactly when your research materials will arrive.",
    },
    {
      icon: AlertTriangle,
      title: "Avoid Crypto Scams",
      description:
        "Cryptocurrency transactions are irreversible and prone to scams. Our traditional payment methods offer protection and peace of mind.",
    },
  ]

  const comparisonModels = [
    {
      icon: XCircle,
      title: "Traditional Crypto Model",
      points: [
        "Complex wallet setup required",
        "Risk of sending to wrong address",
        "No payment protection",
        "Volatile pricing",
        "Communication barriers",
      ],
      iconClassName: "text-red-500",
    },
    {
      icon: CheckCircle,
      title: "Our Dropship Model",
      points: [
        "Simple Stripe payment links",
        "Secure, reversible transactions",
        "Direct WhatsApp communication",
        "Stable GBP pricing",
        "Professional customer service",
      ],
      iconClassName: "text-green-500",
    },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Dropship?
            </h2>
            <p className="text-lg text-muted-foreground mx-auto max-w-3xl">
              Finding the right supplier isn't easy. We've spent countless hours
              verifying vendors to ensure we've got the perfect supply chain.
              We've eliminated the complexity and risks and can deliver quality
              products at affordable prices without the use of crypto!
            </p>
          </div>

          {/* Comparison Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              Traditional vs. Dropship Model
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {comparisonModels.map((model, index) => (
                <Card
                  key={index}
                  className="text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <CardContent className="p-6">
                    <div
                      className="mb-4 flex justify-center items-center h-12"
                      aria-hidden="true"
                    >
                      <model.icon
                        className={`h-12 w-12 ${model.iconClassName}`}
                      />
                    </div>
                    <h4 className="text-xl font-semibold mb-4">
                      {model.title}
                    </h4>
                    <ul className="text-base text-muted-foreground space-y-2 text-left list-disc list-inside">
                      {model.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow duration-300"
              >
                <CardContent className="p-6">
                  <div
                    className="mb-4 flex justify-center items-center h-12"
                    aria-hidden="true"
                  >
                    <benefit.icon className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
