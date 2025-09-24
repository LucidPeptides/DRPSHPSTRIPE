"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, Beaker } from "lucide-react"

export function ReconstitutionCalculator() {
  const [peptideAmount, setPeptideAmount] = useState("")
  const [diluentVolume, setDiluentVolume] = useState("")
  const [desiredDosage, setDesiredDosage] = useState("")
  const [syringeSize, setSyringeSize] = useState("")
  const [results, setResults] = useState<{
    concentration: number
    injectionVolume: number
    injectionUnits: number
    isValid: boolean
  } | null>(null)

  const syringeOptions = [
    { value: "0.3", label: "0.3ml", units: 30 },
    { value: "0.5", label: "0.5ml", units: 50 },
    { value: "1.0", label: "1.0ml", units: 100 },
  ]

  const calculateDosage = () => {
    const peptideAmountNum = Number.parseFloat(peptideAmount)
    const diluentVolumeNum = Number.parseFloat(diluentVolume)
    const desiredDosageNum = Number.parseFloat(desiredDosage)
    const syringeSizeNum = Number.parseFloat(syringeSize)

    if (
      !peptideAmountNum ||
      !diluentVolumeNum ||
      !desiredDosageNum ||
      !syringeSizeNum
    ) {
      setResults(null)
      return
    }

    const concentration = peptideAmountNum / diluentVolumeNum
    const injectionVolume = desiredDosageNum / concentration
    const selectedSyringe = syringeOptions.find((s) => s.value === syringeSize)
    const maxUnits = selectedSyringe?.units || 100
    const injectionUnits = (injectionVolume / syringeSizeNum) * maxUnits
    const isValid =
      injectionVolume <= syringeSizeNum &&
      injectionUnits >= 1 &&
      injectionUnits <= maxUnits

    setResults({
      concentration,
      injectionVolume,
      injectionUnits,
      isValid,
    })
  }

  useEffect(() => {
    calculateDosage()
  }, [peptideAmount, diluentVolume, desiredDosage, syringeSize])

  const resetCalculator = () => {
    setPeptideAmount("")
    setDiluentVolume("")
    setDesiredDosage("")
    setSyringeSize("")
    setResults(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Dosage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2 border p-4 rounded-lg">
            <Label htmlFor="peptideAmount">Peptide Amount (mg)</Label>
            <Input
              id="peptideAmount"
              type="number"
              step="0.1"
              min="0"
              value={peptideAmount}
              onChange={(e) => setPeptideAmount(e.target.value)}
              placeholder="e.g., 5"
            />
          </div>
          <div className="space-y-2 border p-4 rounded-lg">
            <Label htmlFor="diluentVolume">Diluent Volume (ml)</Label>
            <Input
              id="diluentVolume"
              type="number"
              step="0.1"
              min="0"
              value={diluentVolume}
              onChange={(e) => setDiluentVolume(e.target.value)}
              placeholder="e.g., 2"
            />
          </div>
          <div className="space-y-2 border p-4 rounded-lg">
            <Label htmlFor="desiredDosage">Desired Dosage (mg)</Label>
            <Input
              id="desiredDosage"
              type="number"
              step="0.01"
              min="0"
              value={desiredDosage}
              onChange={(e) => setDesiredDosage(e.target.value)}
              placeholder="e.g., 0.25"
            />
          </div>

          {/* --- Syringe Size Clickable Boxes --- */}
          <div className="space-y-2 border p-4 rounded-lg">
            <Label>Syringe Size</Label>
            <div className="flex gap-3">
              {syringeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSyringeSize(option.value)}
                  className={`flex-1 px-3 py-2 border-2 rounded-lg font-medium transition-colors text-center ${
                    syringeSize === option.value
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border hover:border-primary/50 bg-transparent"
                  }`}
                >
                  <span className="text-sm">{option.label}</span>
                  <span className="text-xs opacity-75 block">{`(${option.units} units)`}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        {results && (
          <div className="space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Beaker className="h-4 w-4" />
                Calculation Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Concentration</p>
                  <p className="font-semibold">
                    {results.concentration.toFixed(2)} mg/ml
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Injection Volume</p>
                  <p className="font-semibold">
                    {results.injectionVolume.toFixed(3)} ml
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Injection Units</p>
                  <p className="font-semibold">
                    {results.injectionUnits.toFixed(1)} units
                  </p>
                </div>
              </div>
            </div>
            {!results.isValid && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  <strong>Invalid dosage calculation:</strong> The calculated
                  injection volume exceeds your syringe capacity or results in
                  impractical units. Consider using a larger syringe, more
                  diluent, or adjusting your dosage.
                </AlertDescription>
              </Alert>
            )}
            {results.isValid && results.injectionUnits < 5 && (
              <Alert className="border-amber-200 bg-amber-50">
                <AlertDescription className="text-amber-800">
                  <strong>Low injection volume:</strong> The calculated volume
                  is very small and may be difficult to measure accurately.
                  Consider using less diluent for a higher concentration.
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}
        <div className="flex flex-col gap-3 pt-4">
          <Button onClick={calculateDosage} className="w-full">
            Calculate Dosage
          </Button>
          <Button
            onClick={resetCalculator}
            variant="outline"
            className="w-full"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
