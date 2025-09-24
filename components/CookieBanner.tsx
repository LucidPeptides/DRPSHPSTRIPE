"use client"

import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem("cookieConsent")
    if (!consent) {
      setVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setVisible(false)
    // 🚀 here you could also call a function to load GA/Meta Pixel
  }

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm text-gray-700 mb-2 md:mb-0">
        We use cookies to improve your experience, personalize content, and
        analyze traffic. You can choose to accept or decline.
      </p>
      <div className="flex space-x-2">
        <button
          onClick={handleDecline}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-4 py-2 text-sm rounded-md bg-[#1a535c] text-white hover:bg-[#144349]"
        >
          Accept
        </button>
      </div>
    </div>
  )
}
