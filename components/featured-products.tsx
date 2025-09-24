import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getFeaturedProducts } from "@/lib/products"

export function FeaturedProducts() {
  const featuredProducts = getFeaturedProducts()

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                  <Badge variant="secondary" className="absolute top-2 right-2">
                    Popular
                  </Badge>
                </div>
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>

                <div className="flex gap-2 mb-4">
                  {product.variants.map((variant) => (
                    <Link
                      key={variant.id}
                      href={`/products/${product.id}?variant=${variant.id}`}
                      className="hover:scale-105 transition-transform"
                    >
                      <Badge
                        variant="outline"
                        className="text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        {variant.name} - £{variant.price}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Link href={`/products/${product.id}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                  >
                    View Details
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
