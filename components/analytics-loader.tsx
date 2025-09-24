"use client"
import { useEffect, useState } from "react"
import Script from "next/script"

export default function AnalyticsLoader() {
  const [ready, setReady] = useState(false)
  const [ga4, setGa4] = useState(false)
  const [pixel, setPixel] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    const ga = localStorage.getItem("ga4-enabled") === "true"
    const mp = localStorage.getItem("meta-pixel-enabled") === "true"
    setGa4(consent && ga)
    setPixel(consent && mp)
    setReady(true)
  }, [])

  if (!ready) return null

  return (
    <>
      {ga4 && (
        <>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXX');
          `}</Script>
        </>
      )}
      {pixel && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'YOUR_PIXEL_ID'); fbq('track', 'PageView');
        `}</Script>
      )}
    </>
  )
}
