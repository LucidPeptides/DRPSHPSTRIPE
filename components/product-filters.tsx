"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Grid2X2, LayoutGrid, Grid3X3 } from "lucide-react" // swapped import order

interface ProductFiltersProps {
  categories: string[]
  gridSize: number
  onGridSizeChange: (size: number) => void
}

export function ProductFilters({
  categories,
  gridSize,
  onGridSizeChange,
}: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  )

  const updateFilters = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (category === "all") {
      params.delete("category")
    } else {
      params.set("category", category)
    }

    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }

    router.push(`/products?${params.toString()}`)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    updateFilters(category)
  }

  const clearFilters = () => {
    setSelectedCategory("all")
    const params = new URLSearchParams()
    const search = searchParams.get("search")
    if (search) {
      params.set("search", search)
    }
    router.push(`/products?${params.toString()}`)
  }

  const hasActiveFilters = selectedCategory !== "all"

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            Clear Filters
          </Button>
        )}

        {/* Active Filter Badges */}
        {hasActiveFilters && (
          <div className="flex gap-2">
            {selectedCategory !== "all" && (
              <Badge variant="secondary">Category: {selectedCategory}</Badge>
            )}
          </div>
        )}
      </div>

      {/* Grid Size Selector */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Grid:</span>
        <div className="flex border rounded-md">
          {/* Fewest columns */}
          <Button
            variant={gridSize === 2 ? "default" : "ghost"}
            size="sm"
            onClick={() => onGridSizeChange(2)}
            className="rounded-r-none"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          {/* Most columns */}
          <Button
            variant={gridSize === 4 ? "default" : "ghost"}
            size="sm"
            onClick={() => onGridSizeChange(4)}
            className="rounded-none border-x"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          {/* Medium columns */}
          <Button
            variant={gridSize === 3 ? "default" : "ghost"}
            size="sm"
            onClick={() => onGridSizeChange(3)}
            className="rounded-l-none"
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
