import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter, Playfair_Display, Allura } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { locales } from "@/middleware"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { getDictionary } from "./dictionaries"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const allura = Allura({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-allura",
})

export const metadata: Metadata = {
  title: "La Bella Pizza - Authentic Italian Pizza",
  description: "Enjoy authentic Italian pizza with the freshest ingredients and traditional recipes.",
  manifest: "/manifest.json",
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  const dict = await getDictionary(params.lang as any)

  return (
    <html lang={params.lang} className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${allura.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <Header lang={params.lang} dict={dict} />
            <main className="flex-1">{children}</main>
            <Footer lang={params.lang} dict={dict} />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
