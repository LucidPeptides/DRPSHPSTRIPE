"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
// Import AlertDialog components instead of Dialog
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function AgeVerificationModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasVerified = localStorage.getItem("age-verified")
    if (!hasVerified) {
      setIsOpen(true)
    }
  }, [])

  const handleVerification = () => {
    localStorage.setItem("age-verified", "true")
    setIsOpen(false)
  }

  return (
    // Use AlertDialog instead of Dialog
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl">
            Age Verification Required
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base mt-4">
            You must be 18 years or older to access this website. Our products
            are intended for research purposes only.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center mt-6">
          {/* AlertDialogAction is the primary button for the dialog */}
          <AlertDialogAction
            onClick={handleVerification}
            className="w-full max-w-xs"
            size="lg"
          >
            I confirm I am over 18
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
