"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [ga4Enabled, setGa4Enabled] = useState(false)
  const [metaPixelEnabled, setMetaPixelEnabled] = useState(false)

  useEffect(() => {
    // Check if user has made a cookie choice
    const cookieChoice = localStorage.getItem("cookie-consent")
    if (!cookieChoice) {
      setIsVisible(true)
    }

    // Load existing preferences
    const ga4Pref = localStorage.getItem("ga4-enabled")
    const metaPref = localStorage.getItem("meta-pixel-enabled")
    setGa4Enabled(ga4Pref === "true")
    setMetaPixelEnabled(metaPref === "true")
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    localStorage.setItem("ga4-enabled", "true")
    localStorage.setItem("meta-pixel-enabled", "true")
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected")
    localStorage.setItem("ga4-enabled", "false")
    localStorage.setItem("meta-pixel-enabled", "false")
    setIsVisible(false)
  }

  const handleManage = () => {
    setShowPreferences(true)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", "managed")
    localStorage.setItem("ga4-enabled", ga4Enabled.toString())
    localStorage.setItem("meta-pixel-enabled", metaPixelEnabled.toString())
    setShowPreferences(false)
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:max-w-md">
        <Card className="p-4 shadow-lg">
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-sm">Cookie Consent</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleReject}
              className="h-6 w-6 p-0"
              aria-label="Reject all cookies"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            We use cookies to enhance your browsing experience and analyze our
            traffic. By clicking "Accept", you consent to our use of cookies.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAccept} size="sm" className="flex-1">
              Accept
            </Button>
            <Button
              onClick={handleReject}
              variant="outline"
              size="sm"
              className="flex-1 bg-transparent"
            >
              Reject
            </Button>
            <Button
              onClick={handleManage}
              variant="ghost"
              size="sm"
              className="flex-1"
            >
              Manage
            </Button>
          </div>
        </Card>
      </div>

      <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cookie Preferences</DialogTitle>
            <DialogDescription>
              Choose which cookies you want to allow. Essential cookies are
              always enabled.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="essential" className="text-sm font-medium">
                    Essential Cookies
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Required for the website to function properly
                  </p>
                </div>
                <Switch id="essential" checked disabled />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="ga4" className="text-sm font-medium">
                    Google Analytics 4
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Helps us understand how visitors use our website
                  </p>
                </div>
                <Switch
                  id="ga4"
                  checked={ga4Enabled}
                  onCheckedChange={setGa4Enabled}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="meta-pixel" className="text-sm font-medium">
                    Meta Pixel
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Used for advertising and marketing purposes
                  </p>
                </div>
                <Switch
                  id="meta-pixel"
                  checked={metaPixelEnabled}
                  onCheckedChange={setMetaPixelEnabled}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPreferences(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePreferences}>Save Preferences</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
