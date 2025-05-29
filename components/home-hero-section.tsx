"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface HomeHeroSectionProps {
  lang: string
  heroTitle: string
  heroSubtitle: string
  heroCta: string
  pizzaBuilderTitle: string
  heroImageAlt: string
}

export default function HomeHeroSection({
  lang,
  heroTitle,
  heroSubtitle,
  heroCta,
  pizzaBuilderTitle,
  heroImageAlt,
}: HomeHeroSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // You can adjust the scroll threshold as needed
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    // Call handler once initially to set the state based on current scroll position
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const createLocalePath = (path: string) => `/${lang}${path === "/" ? "" : path}`

  return (
    <section className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/restaurant-interior.png"
          alt={heroImageAlt}
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
      </div>
      <div className="container relative z-10 py-20 md:py-32 lg:py-40 text-white">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{heroTitle}</h1>
          <p className="text-xl">{heroSubtitle}</p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href={createLocalePath("/menu")}>{heroCta}</Link>
            </Button>
            <Button size="lg" variant="outline" className="bg-background/20 hover:bg-background/30" asChild>
              <Link href={createLocalePath("/pizza-builder")}>{pizzaBuilderTitle}</Link>
            </Button>
          </div>
        </div>
      </div>
      <div
        className={`absolute bottom-0 left-0 right-0 italian-flag-gradient transition-all duration-300 ease-in-out ${
          isScrolled ? "opacity-75 h-1" : "opacity-100 h-2"
        }`}
      />
    </section>
  )
}
