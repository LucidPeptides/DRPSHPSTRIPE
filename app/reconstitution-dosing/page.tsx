export const metadata = {
  title: "Reconstitution & Dosing Guide | Dropship Peptides",
  description:
    "Learn how to safely reconstitute and measure research peptides for laboratory use. For research purposes only.",
  alternates: {
    canonical: "https://dropshippeptides.co.uk/reconstitution-dosing"
  },
  openGraph: {
    title: "Reconstitution & Dosing Guide | Dropship Peptides",
    description:
      "Step‑by‑step guide to reconstituting and dosing research peptides for laboratory use.",
    url: "https://dropshippeptides.co.uk/reconstitution-dosing",
    type: "article"
  }
}

import type { Metadata } from "next"
import { ReconstitutionCalculator } from "@/components/reconstitution-calculator"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
// Import the new, relevant icons from lucide-react
import {
  Check,
  Beaker,
  Syringe,
  TestTube,
  RotateCw,
  Refrigerator,
} from "lucide-react"

export default function ReconstitutionDosingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-12">
          {/* 1. Calculator (At the top) */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Dosing Calculator
            </h2>
            <ReconstitutionCalculator />
          </div>

          {/* 2. Visual Step-by-Step Guide */}
          <div>
            <h2 className="text-2xl font-bold mb-8 text-center">
              Step-by-Step Reconstitution Process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="border rounded-lg p-4 bg-white flex flex-col">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <Check size={48} />
                </div>
                <h4 className="font-semibold mb-4 text-center">
                  Step 1: Gather Supplies
                </h4>
                <div className="space-y-3 text-sm text-slate-800 flex-grow text-left">
                  <div className="flex items-center justify-between">
                    <span>Peptide Vial</span>
                    <Badge variant="secondary" className="cursor-default">
                      Included
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Bac Water</span>
                    <Link href="/products/bacteriostatic-water">
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        View
                      </Badge>
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Syringes</span>
                    <a
                      href="https://amzn.to/3VyI69M"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        View
                      </Badge>
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Alcohol Pads</span>
                    <a
                      href="https://amzn.to/3KaPXYw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Badge
                        variant="outline"
                        className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      >
                        View
                      </Badge>
                    </a>
                  </div>
                </div>
              </div>

              {/* Step 2 - Custom Vial Icon */}
              <div className="border rounded-lg p-4 text-center bg-white">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 2h8v2H8z"></path>
                    <path d="M7 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4z"></path>
                    <path d="M5 4h14"></path>
                  </svg>
                </div>
                <h4 className="font-semibold mb-1">Step 2: Prepare Vials</h4>
                <p className="text-sm text-muted-foreground">
                  Wipe both rubber stoppers with an alcohol pad.
                </p>
              </div>

              {/* Step 3 - Corrected Icon */}
              <div className="border rounded-lg p-4 text-center bg-white">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <Syringe size={48} />
                </div>
                <h4 className="font-semibold mb-1">Step 3: Draw Diluent</h4>
                <p className="text-sm text-muted-foreground">
                  Draw calculated amount of bac water.
                </p>
              </div>

              {/* Step 4 - Corrected Icon */}
              <div className="border rounded-lg p-4 text-center bg-white">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <TestTube size={48} />
                </div>
                <h4 className="font-semibold mb-1">Step 4: Reconstitute</h4>
                <p className="text-sm text-muted-foreground">
                  Inject slowly down the inside wall of vial.
                </p>
              </div>

              {/* Step 5 - Corrected Icon */}
              <div className="border rounded-lg p-4 text-center bg-white">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <RotateCw size={48} />
                </div>
                <h4 className="font-semibold mb-1">Step 5: Mix Gently</h4>
                <p className="text-sm text-muted-foreground">
                  Gently swirl the vial. Do not shake vigorously.
                </p>
              </div>

              {/* Step 6 - Corrected Icon */}
              <div className="border rounded-lg p-4 text-center bg-white">
                <div className="flex justify-center items-center h-20 mb-4 text-primary">
                  <Refrigerator size={48} />
                </div>
                <h4 className="font-semibold mb-1">Step 6: Store Correctly</h4>
                <p className="text-sm text-muted-foreground">
                  Store reconstituted peptide in the refrigerator.
                </p>
              </div>
            </div>
          </div>

          {/* 5. Storage Guidelines */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-900 mb-3">
              Storage Guidelines
            </h3>
            <ul className="text-sm text-green-800 space-y-2">
              <li>• Lyophilized: -20°C long-term</li>
              <li>• Reconstituted: 2-8°C (refrigerated)</li>
              <li>• Use within 28 days once reconstituted</li>
              <li>• Protect from light</li>
              <li>• Avoid freeze-thaw cycles</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
