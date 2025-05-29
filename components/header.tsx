"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu, X, Search, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { locales } from "@/middleware"
import type { Dictionary } from "@/app/[lang]/dictionaries"

interface HeaderProps {
  lang: string
  dict: Dictionary
}

export default function Header({ lang, dict }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  // Remove the language prefix from pathname
  const pathnameWithoutLang = pathname.replace(`/${lang}`, "") || "/"

  // Create paths with the current language
  const createLocalePath = (path: string) => `/${lang}${path === "/" ? "" : path}`

  // Language names for display
  const languageNames: Record<string, string> = {
    en: "English",
    es: "Español",
    ca: "Català",
    de: "Deutsch",
    fr: "Français",
    it: "Italiano",
  }

  const [isScrolled, setIsScrolled] = useState(false)
  const [headerKey, setHeaderKey] = useState(lang) // For re-triggering animation on lang change

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50) // Trigger when scrolled more than 50px
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Change key to re-trigger animation when language changes
    setHeaderKey(lang + Date.now()) // Adding Date.now() ensures key is always unique
  }, [lang])

  const isHomePage = pathnameWithoutLang === "/"

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-background/95 backdrop-blur shadow-lg border-b border-border"
          : "bg-transparent border-b border-transparent"
      } supports-[backdrop-filter]:bg-background/60`}
    >
      <div
        key={headerKey}
        className={`
          ${isHomePage ? "animate-fadeIn" : "animate-slideDownAndFadeIn"}
        `}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <Link href={createLocalePath("/")} className="flex items-center gap-2">
                  <Image src="/pizza-logo.png" alt="La Bella Pizza" width={40} height={40} className="rounded-full" />
                  <span className="font-allura text-3xl font-normal">La bella Italia Menorca</span>
                </Link>
                <nav className="mt-8 flex flex-col gap-4">
                  <Link href={createLocalePath("/")} className="text-lg font-medium hover:text-primary">
                    {dict.navigation.home}
                  </Link>
                  <Link href={createLocalePath("/menu")} className="text-lg font-medium hover:text-primary">
                    {dict.navigation.menu}
                  </Link>
                  <Link href={createLocalePath("/promotions")} className="text-lg font-medium hover:text-primary">
                    {dict.navigation.promotions}
                  </Link>
                  <Link href={createLocalePath("/contact")} className="text-lg font-medium hover:text-primary">
                    {dict.navigation.contact}
                  </Link>
                  <Link href={createLocalePath("/pizza-builder")} className="text-lg font-medium hover:text-primary">
                    {dict.pizzaBuilder.title}
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href={createLocalePath("/")} className="flex items-center gap-2">
              <Image src="/pizza-logo.png" alt="La Bella Pizza" width={40} height={40} className="rounded-full" />
              <span className="font-allura text-2xl md:text-3xl font-normal hidden sm:inline-block tracking-wide">
                La bella Italia Menorca
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href={createLocalePath("/")}
              className={`text-sm font-medium ${pathnameWithoutLang === "/" ? "text-primary" : "hover:text-primary"}`}
            >
              {dict.navigation.home}
            </Link>
            <Link
              href={createLocalePath("/menu")}
              className={`text-sm font-medium ${pathnameWithoutLang === "/menu" ? "text-primary" : "hover:text-primary"}`}
            >
              {dict.navigation.menu}
            </Link>
            <Link
              href={createLocalePath("/promotions")}
              className={`text-sm font-medium ${pathnameWithoutLang === "/promotions" ? "text-primary" : "hover:text-primary"}`}
            >
              {dict.navigation.promotions}
            </Link>
            <Link
              href={createLocalePath("/contact")}
              className={`text-sm font-medium ${pathnameWithoutLang === "/contact" ? "text-primary" : "hover:text-primary"}`}
            >
              {dict.navigation.contact}
            </Link>
            <Link
              href={createLocalePath("/pizza-builder")}
              className={`text-sm font-medium ${pathnameWithoutLang === "/pizza-builder" ? "text-primary" : "hover:text-primary"}`}
            >
              {dict.pizzaBuilder.title}
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {isSearchOpen ? (
              <div className="flex items-center">
                <Input type="search" placeholder={dict.navigation.search} className="w-[200px] mr-2" />
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
                <span className="sr-only">{dict.navigation.search}</span>
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{dict.navigation.language}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {locales.map((locale) => (
                  <DropdownMenuItem key={locale} asChild>
                    <Link href={`/${locale}${pathnameWithoutLang}`} className={locale === lang ? "font-bold" : ""}>
                      {languageNames[locale]}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* Decorative border for non-home pages on scroll */}
      {!isHomePage && (
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 italian-flag-gradient transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </header>
  )
}
