// app/api/product-image/route.ts

import { ImageResponse } from "next/og"
import { getProductBySlug } from "@/lib/products"
import React from "react"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug") || ""
  // 1. Get the new 'variant' parameter from the URL
  const variantName = searchParams.get("variant") || ""

  const product = await getProductBySlug(slug)
  const name = product?.name || "Peptide Vial"

  const fontData = await fetch(
    new URL("../../../assets/Inter-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const imageData = await fetch(
    new URL("../../../assets/Base_logo_research.png", import.meta.url),
  ).then((res) => res.arrayBuffer())

  const base64Image = Buffer.from(imageData).toString("base64")
  const imageSrc = `data:image/png;base64,${base64Image}`

  // Font sizing logic for the main title
  const maxChars = 20
  const baseFontSize = 28
  const shrinkFactor = 1.2
  const labelFontSize =
    name.length > maxChars
      ? Math.max(baseFontSize - (name.length - maxChars) * shrinkFactor, 18)
      : baseFontSize

  return new ImageResponse(
    React.createElement(
      "div",
      {
        style: {
          width: "100%",
          height: "100%",
          backgroundColor: "#f1f5f9",
          display: "flex",
          flexDirection: "column", // Changed to column for stacking text
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Inter",
        },
      },
      [
        // Base image
        React.createElement("img", {
          src: imageSrc,
          alt: "Base Vial",
          style: {
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          },
        }),

        // This container will hold both lines of text
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: "415px",
              left: "305px",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column", // Stack text vertically
              alignItems: "center",
              justifyContent: "center",
              width: "240px",
              height: "80px",
              textAlign: "center",
              zIndex: 2,
            },
          },
          [
            // 2. Main product name
            React.createElement(
              "div",
              {
                style: {
                  color: "#334155",
                  fontSize: labelFontSize,
                  fontWeight: 700,
                  lineHeight: 1.2,
                },
              },
              name,
            ),
            // 3. Variant name (only renders if a variantName was passed)
            variantName &&
              React.createElement(
                "div",
                {
                  style: {
                    color: "#475569",
                    fontSize: 20, // Smaller font for the variant
                    fontWeight: 500,
                    marginTop: "4px", // Space between title and variant
                    lineHeight: 1,
                  },
                },
                variantName,
              ),
          ],
        ),
      ],
    ),
    {
      width: 600,
      height: 600,
      fonts: [
        {
          name: "Inter",
          data: fontData,
          style: "normal",
        },
      ],
    },
  )
}
