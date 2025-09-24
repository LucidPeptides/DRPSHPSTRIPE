"use client"

import { useState, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"
import { products } from "@/lib/products"

// Groups products so each slug/name appears only once, merging variants
function groupProductsByName(items) {
  const map = new Map()

  for (const p of items) {
    const key = p.slug || p.name
    if (!map.has(key)) {
      map.set(key, { ...p, variants: [...p.variants] })
    } else {
      const existing = map.get(key)
      const merged = [
        ...existing.variants,
        ...p.variants.filter(
          v => !existing.variants.some(ev => ev.name === v.name)
        ),
      ]
      existing.variants = merged
      map.set(key, existing)
    }
  }

  return Array.from(map.values())
}

// Picks which variant to show for overlay/image
function selectVariantForDisplay(product, dosageFilter) {
  if (dosageFilter && dosageFilter !== "all") {
    const match = product.variants?.find(v => v.name === dosageFilter)
    if (match) return match
  }
  // fallback: cheapest
  return (product.variants || []).reduce((min, v) => {
    if (!min) return v
    return v.price < min.price ? v : min
  }, null)
}

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const [gridSize, setGridSize] = useState(3)

  const searchQuery = searchParams.get("search") || ""
  const categoryFilter = searchParams.get("category") || "all"
  const dosageFilter = searchParams.get("dosage") || "all"

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory =
        categoryFilter === "all" || product.category === categoryFilter
      const matchesDosage =
        dosageFilter === "all" ||
        product.variants.some((variant) => variant.name === dosageFilter)
      return matchesSearch && matchesCategory && matchesDosage
    })
  }, [searchQuery, categoryFilter, dosageFilter])

  // Group variants into single product entries
  const groupedProducts = useMemo(() => {
    return groupProductsByName(filteredProducts)
  }, [filteredProducts])

  const featuredProducts = useMemo(() => {
    return groupedProducts.filter((p) => p.featured)
  }, [groupedProducts])

  const regularProducts = useMemo(() => {
    const nonFeatured = groupedProducts.filter((p) => !p.featured)

    nonFeatured.sort((a, b) => {
      if (
        a.category === "Weight Management" &&
        b.category !== "Weight Management"
      ) {
        return -1
      }
      if (
        b.category === "Weight Management" &&
        a.category !== "Weight Management"
      ) {
        return 1
      }
      return 0
    })

    return nonFeatured
  }, [groupedProducts])

  const categories = useMemo(() => {
    return Array.from(new Set(products.map((product) => product.category)))
  }, [])

  const dosages = useMemo(() => {
    const allDosages = products.flatMap((product) =>
      product.variants.map((variant) => variant.name),
    )
    return Array.from(new Set(allDosages))
  }, [])

  const cardSizeClass = "max-w-[400px]"

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
        <p className="text-muted-foreground text-lg">
          Browse our complete catalogue of research peptides. All products are
          intended for research purposes only.
        </p>
        {searchQuery && (
          <p className="text-sm text-muted-foreground mt-2">
            Showing results for:{" "}
            <span className="font-medium">"{searchQuery}"</span>
          </p>
        )}
      </div>

      <ProductFilters
        categories={categories}
        dosages={dosages}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
      />

      {groupedProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No products found matching your criteria.
          </p>
        </div>
      ) : (
        <>
          {/* Featured Products Section */}
          {featuredProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 border-b pb-2">
                Featured Products
              </h2>
              <div className="flex justify-center">
                <div className="inline-block">
                  <ProductGrid
                    products={featuredProducts}
                    gridSize={Math.min(featuredProducts.length, 3)}
                    cardClassName={cardSizeClass}
                    dosageFilter={dosageFilter} // NEW
                    selectVariantForDisplay={selectVariantForDisplay} // NEW
                  />
                </div>
              </div>
            </div>
          )}

          {/* Regular Products Section */}
          {regularProducts.length > 0 && (
            <div>
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing {regularProducts.length} of {groupedProducts.length} products
                </p>
              </div>
              <ProductGrid
                products={regularProducts}
                gridSize={gridSize}
                dosageFilter={dosageFilter} // NEW
                selectVariantForDisplay={selectVariantForDisplay} // NEW
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
