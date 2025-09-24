import { Shield, Truck, CreditCard } from "lucide-react"

export function TrustBanner() {
  const trustItems = [
    {
      icon: Shield,
      title: "Independently Tested for Purity",
    },
    {
      icon: Truck,
      title: "Discreet Fast Shipping",
    },
    {
      icon: CreditCard,
      title: "Payment via Stripe",
    },
  ]

  return (
    <section className="bg-primary text-primary-foreground py-4">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trustItems.map((item, index) => {
            const IconComponent = item.icon
            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <div
                  className="mb-4 p-3 bg-primary-foreground/10 rounded-full"
                  aria-hidden="true"
                >
                  <IconComponent className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
