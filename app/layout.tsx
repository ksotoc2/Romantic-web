import type React from "react"
import type { Metadata } from "next"
import { Inter, Dancing_Script, Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import FloatingElements from "@/components/floating-elements"
import FloatingMessages from "@/components/floating-messages"
import PageTransition from "@/components/page-transition"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const dancing = Dancing_Script({ subsets: ["latin"], variable: "--font-dancing" })
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Hasta Siempre",
  description: "Un lugar donde viven los recuerdos",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head>
        {/* Script de seguimiento de Plausible */}
        <Script
          async
          defer
          data-domain="romantic-web.netlify.app"
          src="https://plausible.io/js/plausible.js"
        />
      </head>
      <body
        className={`${inter.variable} ${dancing.variable} ${poppins.variable} font-poppins bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 text-slate-800 min-h-screen`}
      >
        <FloatingElements />
        <FloatingMessages />
        <Navigation />
        <PageTransition>
          <main className="pt-20 relative z-10">{children}</main>
        </PageTransition>
      </body>
    </html>
  )
}
