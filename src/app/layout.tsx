'use client'

import '@/styles/globals.scss'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from 'next-auth/react'

// You change this configuration value to false so that the Font Awesome core SVG library
// will not try and insert <style> elements into the <head> of the page.
// Next.js blocks this from happening anyway so you might as well not even try.
// See https://fontawesome.com/v6/docs/web/use-with/react/use-with#next-js
config.autoAddCss = false

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </SessionProvider>
  )
}
