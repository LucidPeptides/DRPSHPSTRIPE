"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { ShoppingCart, Menu, X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useCart } from "@/contexts/cart-context"
import { products } from "@/lib/products"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const { totalItems } = useCart()
  const router = useRouter()
  const pathname = usePathname()

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    //{ href: "/reconstitution-dosing", label: "Reconstitution & Dosing" },
    { href: "/faq", label: "FAQ" },
    { href: "/request-product", label: "Request a Product" },
    { href: "/contact", label: "Contact" },
  ]

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase()
      const filtered = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.variants.some((variant) =>
              variant.name.toLowerCase().includes(query),
            ),
        )
        .slice(0, 5)

      setSearchResults(filtered)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearchResults(false)
    }
  }

  const handleSearchResultClick = (productSlug: string) => {
    router.push(`/products/${productSlug}`)
    setSearchQuery("")
    setShowSearchResults(false)
  }

  const handleSearchBlur = () => {
    setTimeout(() => setShowSearchResults(false), 200)
  }

  return (
    <header role="banner" className="sticky top-0 z-50 w-full border-b bg-card supports-[backdrop-filter]:bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-32 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Dropship Peptides Logo"
              width={384}
              height={96}
              className="h-24 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-sm mx-4 relative">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search
                aria-hidden="true"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="search"
                aria-label="Search products"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.length > 1 && setShowSearchResults(true)
                }
                onBlur={handleSearchBlur}
                className="pl-10 pr-4"
              />
            </form>

            {showSearchResults && searchResults.length > 0 && (
              <ul
                role="listbox"
                aria-label="Search results"
                className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50"
              >
                {searchResults.map((product) => (
                  <li
                    key={product.id}
                    role="option"
                    tabIndex={0}
                    onClick={() => handleSearchResultClick(product.slug)}
                    className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 cursor-pointer"
                  >
                    <div className="font-medium text-sm">{product.name}</div>
                    <div className="text-xs text-muted-foreground truncate">
                      {product.description}
                    </div>
                    <div className="text-xs text-primary mt-1">
                      {product.category}
                    </div>
                  </li>
                ))}
                {searchQuery.trim() && (
                  <li
                    role="option"
                    tabIndex={0}
                    onClick={() => {
                      router.push(
                        `/products?search=${encodeURIComponent(searchQuery.trim())}`
                      )
                      setShowSearchResults(false)
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-muted transition-colors border-t cursor-pointer"
                  >
                    View all results for "{searchQuery}"
                  </li>
                )}
              </ul>
            )}
          </div>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="relative"
                aria-label={`View cart${totalItems > 0 ? ` with ${totalItems} items` : ""}`}
              >
                <ShoppingCart aria-hidden="true" className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge
                    variant="secondary"
                    aria-live="polite"
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X aria-hidden="true" className="h-5 w-5" />
              ) : (
                <Menu aria-hidden="true" className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <div className="mb-4 relative">
              <form onSubmit={handleSearch} className="relative">
                <Search
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                />
                <Input
                  type="search"
                  aria-label="Search products"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() =>
                    searchQuery.length > 1 && setShowSearchResults(true)
                  }
                  onBlur={handleSearchBlur}
                  className="pl-10 pr-4"
                />
              </form>

              {showSearchResults && searchResults.length > 0 && (
                <ul
                  role="listbox"
                  aria-label="Search results"
                  className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-50"
                >
                  {searchResults.map((product) => (
                    <li
                      key={product.id}
                      role="option"
                      tabIndex={0}
                      onClick={() => {
                        handleSearchResultClick(product.slug)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors border-b last:border-b-0 cursor-pointer"
                    >
                      <div className="font-medium text-sm">{product.name}</div>
                      <div className="text-xs text-muted-foreground truncate">
                        {product.description}
                      </div>
                      <div className="text-xs text-primary mt-1">
                        {product.category}
                      </div>
                    </li>
                  ))}
                  {searchQuery.trim() && (
                    <li
                      role="option"
                      tabIndex={0}
                      onClick={() => {
                        router.push(
                          `/products?search=${encodeURIComponent(searchQuery.trim())}`
                        )
                        setShowSearchResults(false)
                        setIsMobileMenuOpen(false)
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-primary hover:bg-muted transition-colors border-t cursor-pointer"
                    >
                      View all results for "{searchQuery}"
                    </li>
                  )}
                </ul>
              )}
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
