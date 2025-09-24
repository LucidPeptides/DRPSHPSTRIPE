// next.config.mjs

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true', // Only runs when you set ANALYZE=true
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/avif", "image/webp"], // ✅ serve next-gen formats
    domains: [], // add external image domains here if needed
  },
}

export default withBundleAnalyzer(nextConfig)
