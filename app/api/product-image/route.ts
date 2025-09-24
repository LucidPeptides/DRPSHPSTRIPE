// app/api/product-image/route.ts

import { ImageResponse } from "next/og"
import { getProductBySlug } from "@/lib/products"
import React from "react"
import { notFound } from "next/navigation"
import { join } from "path"
import { promises as fs } from "fs"

// IMPORTANT: Change the runtime to Node.js to avoid the 1MB Edge Function size limit
export const runtime = "nodejs"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get("slug") || ""
  const variantName = searchParams.get("variant") || ""

  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const name = product.name

  // Load the font and image directly from the file system using the correct path
  const fontPath = join(process.cwd(), "assets/Inter-Bold.ttf")
  const imagePath = join(process.cwd(), "assets/Base_logo_research.png")

  const fontData = await fs.readFile(fontPath)
  const imageData = await fs.readFile(imagePath)

  const base64Image = Buffer.from(imageData).toString("base64")
  const imageSrc = `data:image/png;base64,${base64Image}`

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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          fontFamily: "Inter",
        },
      },
      [
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
        React.createElement(
          "div",
          {
            style: {
              position: "absolute",
              top: "415px",
              left: "305px",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "240px",
              height: "80px",
              textAlign: "center",
              zIndex: 2,
            },
          },
          [
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
            variantName &&
              React.createElement(
                "div",
                {
                  style: {
                    color: "#475569",
                    fontSize: 20,
                    fontWeight: 500,
                    marginTop: "4px",
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
