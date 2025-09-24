"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Optimised background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/peptide-research-background.webp"
          alt="Peptide Research Background"
          fill
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw" // ✅ responsive sizes
          className="object-cover opacity-60"
        />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/10 z-10" />

     {/* Content */}
<div className="container mx-auto px-4 relative z-20 h-full flex flex-col justify-center items-center text-center">
  <div className="max-w-5xl">
    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
      <span className="block">Strictly for research purposes.</span> 
      <span className="block">High-purity peptides. Hassle-free Stripe payments and fast UK delivery.</span>
    </h1>
    <Link href="/products">
      <Button size="lg" className="h-14 px-8 text-lg">
        Shop All Products
      </Button>
    </Link>
  </div>
</div>
    </section>
  )
}
