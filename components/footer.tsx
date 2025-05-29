import Link from "next/link"
import Image from "next/image"
import type { Dictionary } from "@/app/[lang]/dictionaries"

interface FooterProps {
  lang: string
  dict: Dictionary
}

export default function Footer({ lang, dict }: FooterProps) {
  // Create paths with the current language
  const createLocalePath = (path: string) => `/${lang}${path === "/" ? "" : path}`

  // Safe access to laBellaItalia data with fallbacks
  const laBellaItalia = dict.laBellaItalia || {}
  const contactNumbers = Array.isArray(laBellaItalia.contact) ? laBellaItalia.contact : ["871 020 595", "685 177 889"]
  const openingHoursTitle = laBellaItalia.openingHoursTitle || dict.contact?.info?.hours || "Opening Hours"
  const noPromotionText = laBellaItalia.noPromotionJulyAugust || "No promotions in July and August"

  // Get current month to determine opening hours
  const currentMonth = new Date().getMonth() + 1 // JavaScript months are 0-indexed
  const isSummerSeason = currentMonth >= 6 && currentMonth <= 8 // June, July, August

  // Days of the week translations with fallback
  const daysOfWeek = {
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    ca: ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"],
    de: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    fr: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    it: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
  }

  // Get days with fallback to English
  const currentDaysOfWeek = daysOfWeek[lang as keyof typeof daysOfWeek] || daysOfWeek.en

  const openText = {
    en: "Open from 6:00 PM to Closing",
    es: "Abierto de 18:00 a Cierre",
    ca: "Obert de 18:00 a Tancament",
    de: "Geöffnet von 18:00 bis Schließung",
    fr: "Ouvert de 18h00 à la fermeture",
    it: "Aperto dalle 18:00 alla chiusura",
  }

  const closedText = {
    en: "Closed",
    es: "Cerrado",
    ca: "Tancat",
    de: "Geschlossen",
    fr: "Fermé",
    it: "Chiuso",
  }

  return (
    <footer className="bg-muted">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div className="flex flex-col">
            <Link href={createLocalePath("/")} className="flex items-center gap-2">
              <Image src="/pizza-logo.png" alt="La Bella Pizza" width={40} height={40} className="rounded-full" />
              <span className="font-playfair text-xl font-bold">La Bella Pizza</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {lang === "es"
                ? "Pizza italiana auténtica hecha con amor y tradición desde 2003."
                : lang === "ca"
                  ? "Pizza italiana autèntica feta amb amor i tradició des de 2003."
                  : lang === "de"
                    ? "Authentische italienische Pizza mit Liebe und Tradition seit 2003."
                    : lang === "fr"
                      ? "Pizza italienne authentique faite avec amour et tradition depuis 2003."
                      : lang === "it"
                        ? "Pizza italiana autentica fatta con amore e tradizione dal 2003."
                        : "Authentic Italian pizza made with love and tradition since 2003."}
            </p>
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
            <h3 className="mb-4 text-lg font-medium">{openingHoursTitle}</h3>
            <div className="space-y-1 text-sm text-muted-foreground">
              {currentDaysOfWeek.map((day, index) => (
                <div key={day} className="flex justify-between">
                  <span>{day}:</span>
                  <span>
                    {isSummerSeason || index !== 0
                      ? openText[lang as keyof typeof openText] || "Open from 6:00 PM to Closing"
                      : closedText[lang as keyof typeof closedText] || "Closed"}
                  </span>
                </div>
              ))}
            </div>
            {!isSummerSeason && <p className="text-xs text-muted-foreground mt-3 italic">{noPromotionText}</p>}
          </div>

          <div>
            <h3 className="mb-4 text-lg font-medium">{dict.contact?.info?.address || "Address"}</h3>
            <address className="not-italic text-sm text-muted-foreground">
              Cami de Maó, 4
              <br />
              CIUTADELLA DE MENORCA
              <br />
              Spain
            </address>
            <div className="mt-4 text-sm text-muted-foreground">
              <strong>{dict.contact?.info?.phone || "Phone"}:</strong>
              {contactNumbers.map((num) => (
                <a
                  key={num}
                  href={`tel:+34${num.replace(/\s/g, "")}`}
                  className="block hover:text-primary hover:underline"
                >
                  +34 {num}
                </a>
              ))}
            </div>
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
