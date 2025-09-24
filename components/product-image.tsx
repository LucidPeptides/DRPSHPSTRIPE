import Image from "next/image"

interface ProductImageProps {
  name: string
  image?: string
  useBaseImage?: boolean
}

export function ProductImage({ name, image, useBaseImage }: ProductImageProps) {
  // If useBaseImage is true, we construct the URL to our API route.
  // Otherwise, we use the provided image path or a final fallback.
  const imageUrl = useBaseImage
    ? `/api/product-image?name=${encodeURIComponent(name)}`
    : image || "/placeholder.svg"

  return (
    <div className="relative w-full h-full">
      <Image
        src={imageUrl}
        alt={name}
        fill
        className="object-contain"
        // Add a placeholder in case the image fails to load
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.onerror = null
          target.src =
            "https://placehold.co/400x400/e2e8f0/64748b?text=Image+Not+Found"
        }}
      />
    </div>
  )
}
