"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Mail, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

export default function ContactContent() {
  const searchParams = useSearchParams()
  const [isTimeAvailable, setIsTimeAvailable] = useState(false)
  const [isManuallyOffline, setIsManuallyOffline] = useState(false)

  useEffect(() => {
    const overrideParam = searchParams.get("whatsapp")
    if (overrideParam === "offline") {
      sessionStorage.setItem("whatsapp_override", "offline")
      setIsManuallyOffline(true)
    } else if (overrideParam === "online") {
      sessionStorage.removeItem("whatsapp_override")
      setIsManuallyOffline(false)
    } else {
      const storedOverride = sessionStorage.getItem("whatsapp_override")
      if (storedOverride === "offline") {
        setIsManuallyOffline(true)
      }
    }

    const checkTimeAvailability = () => {
      const now = new Date()
      const dayOfWeek = now.getUTCDay()
      const hourOfDay = now.getUTCHours()

      if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        if (hourOfDay >= 9 && hourOfDay < 18) return true
      } else if (dayOfWeek === 6) {
        if (hourOfDay >= 10 && hourOfDay < 16) return true
      }
      return false
    }

    setIsTimeAvailable(checkTimeAvailability())
  }, [searchParams])

  const isWhatsAppAvailable = isTimeAvailable && !isManuallyOffline

  const handleWhatsAppContact = () => {
    if (!isWhatsAppAvailable) return
    const message = encodeURIComponent(
      "Hi, I have a question about your products and services."
    )
    const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
    if (phoneNumber) {
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
    } else {
      console.error("WhatsApp number is not configured in .env.local")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground text-lg">
            Get in touch with our team for product inquiries, support, or
            general questions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* WhatsApp Contact Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                WhatsApp Support
                <Badge
                  variant={isWhatsAppAvailable ? "secondary" : "outline"}
                  className="ml-auto"
                >
                  {isWhatsAppAvailable ? "Online" : "Offline"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Get instant support and product information through our WhatsApp
                business line.
              </p>
              <Button
                onClick={handleWhatsAppContact}
                className="w-full"
                disabled={!isWhatsAppAvailable}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {isWhatsAppAvailable
                  ? "Contact via WhatsApp"
                  : "Currently Offline"}
              </Button>
            </CardContent>
          </Card>

          {/* Email Support */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Send us detailed inquiries or documentation requests via email.
                We reply within 24 hours.
              </p>
              <a
                href="mailto:support@dropshippeptides.co.uk"
                className="font-mono text-sm bg-muted p-2 rounded block text-center hover:bg-primary/10 transition-colors"
              >
                support@dropshippeptides.co.uk
              </a>
            </CardContent>
          </Card>

          {/* Business Hours */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Business Hours
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isWhatsAppAvailable ? (
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 6:00 PM GMT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">10:00 AM - 4:00 PM GMT</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">Closed</span>
                  </div>
                </div>
              ) : (
                <div className="text-center text-muted-foreground font-semibold p-4 bg-muted rounded-md">
                  Currently Offline
                </div>
              )}
            </CardContent>
          </Card>

          {/* Research Inquiries */}
          <Card>
            <CardHeader>
              <CardTitle>Research Inquiries</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                For institutional orders, bulk pricing, or specific research
                requirements, please contact us directly with details about your
                research project and requirements.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
