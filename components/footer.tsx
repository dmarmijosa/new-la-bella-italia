import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter } from "lucide-react"
import type { Dictionary } from "@/app/[lang]/dictionaries"

interface FooterProps {
  lang: string
  dict: Dictionary
}

export default function Footer({ lang, dict }: FooterProps) {
  // Create paths with the current language
  const createLocalePath = (path: string) => `/${lang}${path === "/" ? "" : path}`

  return (
    <footer className="bg-muted">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link href={createLocalePath("/")} className="flex items-center gap-2">
              <Image
                src="/pizza-logo.png"
                alt="La Bella Pizza"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="font-playfair text-xl font-bold">La Bella Pizza</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Authentic Italian pizza made with love and tradition since 2003.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={createLocalePath("/")} className="text-muted-foreground hover:text-primary">
                  {dict.navigation.home}
                </Link>
              </li>
              <li>
                <Link href={createLocalePath("/menu")} className="text-muted-foreground hover:text-primary">
                  {dict.navigation.menu}
                </Link>
              </li>
              <li>
                <Link href={createLocalePath("/promotions")} className="text-muted-foreground hover:text-primary">
                  {dict.navigation.promotions}
                </Link>
              </li>
              <li>
                <Link href={createLocalePath("/contact")} className="text-muted-foreground hover:text-primary">
                  {dict.navigation.contact}
                </Link>
              </li>
              <li>
                <Link href={createLocalePath("/pizza-builder")} className="text-muted-foreground hover:text-primary">
                  {dict.pizzaBuilder.title}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{dict.contact.info.hours}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Monday - Friday: 11:00 - 22:00</li>
              <li>Saturday: 12:00 - 23:00</li>
              <li>Sunday: 12:00 - 22:00</li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{dict.contact.info.address}</h3>
            <address className="not-italic text-sm text-muted-foreground">
              123 Pizza Street
              <br />
              Barcelona, 08001
              <br />
              Spain
            </address>
            <p className="mt-4 text-sm text-muted-foreground">
              <strong>{dict.contact.info.phone}:</strong> +34 123 456 789
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} La Bella Pizza. {dict.footer.rights}.
          </p>
          <div className="mt-4 sm:mt-0 flex space-x-4 text-xs text-muted-foreground">
            <Link href="#" className="hover:underline">
              {dict.footer.privacy}
            </Link>
            <Link href="#" className="hover:underline">
              {dict.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
