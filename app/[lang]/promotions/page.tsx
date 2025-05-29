import Image from "next/image"
import { getDictionary } from "../dictionaries"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"

// Promotions data based on the provided JSON
const promotions = [
  {
    id: 1,
    title: "MENÚ FAMILIAR",
    description:
      "1 Pizza de 60 cm (MAX. 3 INGREDIENTES A ELEGIR) + 2 Raciones Patatas + 1 Bebida Grande (COCA-COLA 1 litro)",
    price: "20.90€",
    image: "/placeholder.svg?height=400&width=800&query=family pizza meal",
    dayOfWeek: "Todos los días",
  },
  {
    id: 2,
    title: "MENÚ PAREJA",
    description:
      "2 Pizzas a elegir (CARBONARA, ATÚN, JAMÓN YORK, HUEVO, PESTO Y ATÚN) + 2 Postres a elegir (TIRAMISÚ, PIZZA NUTELLA O CHOCOLATE BLANCO) + 2 Bebidas (COCA-COLA (33cl) O AGUA (50cl))",
    price: "19.90€",
    image: "/placeholder.svg?height=400&width=800&query=couple pizza meal",
    dayOfWeek: "Todos los días",
  },
  {
    id: 3,
    title: "Martes 3x2",
    description: "Compra 3 pizzas y paga solo 2. La promoción se aplica a la pizza de menor precio.",
    price: "",
    image: "/pizza-promotion-3x2.png",
    dayOfWeek: "Martes",
  },
  {
    id: 4,
    title: "Miércoles TODAS LAS PIZZAS",
    description: "Disfruta de cualquier pizza de nuestro menú por solo 8,00€",
    price: "8.00€",
    image: "/pizza-promotion-discount.png",
    dayOfWeek: "Miércoles",
  },
  {
    id: 5,
    title: "Jueves BUFFET LIBRE",
    description: "Buffet libre + bebida por persona",
    price: "12.50€",
    image: "/pizza-buffet.png",
    dayOfWeek: "Jueves",
  },
  {
    id: 6,
    title: "REPARTO EN CASCO URBANO",
    description: "Entrega gratuita en el casco urbano a partir de las 20h",
    price: "GRATIS",
    image: "/placeholder.svg?height=400&width=800&query=pizza delivery",
    dayOfWeek: "Todos los días",
  },
]

// Translations for days of the week
const translateDayOfWeek = (day: string, lang: string) => {
  const translations: Record<string, Record<string, string>> = {
    Martes: {
      en: "Tuesday",
      es: "Martes",
      ca: "Dimarts",
      de: "Dienstag",
      fr: "Mardi",
      it: "Martedì",
    },
    Miércoles: {
      en: "Wednesday",
      es: "Miércoles",
      ca: "Dimecres",
      de: "Mittwoch",
      fr: "Mercredi",
      it: "Mercoledì",
    },
    Jueves: {
      en: "Thursday",
      es: "Jueves",
      ca: "Dijous",
      de: "Donnerstag",
      fr: "Jeudi",
      it: "Giovedì",
    },
    "Todos los días": {
      en: "Every day",
      es: "Todos los días",
      ca: "Tots els dies",
      de: "Jeden Tag",
      fr: "Tous les jours",
      it: "Tutti i giorni",
    },
  }

  return translations[day]?.[lang] || day
}

// Translations for promotion titles and descriptions
const translatePromotion = (promo: any, lang: string) => {
  if (lang === "es") return promo // Return original for Spanish

  const titleTranslations: Record<string, Record<string, string>> = {
    "MENÚ FAMILIAR": {
      en: "FAMILY MENU",
      ca: "MENÚ FAMILIAR",
      de: "FAMILIENMENÜ",
      fr: "MENU FAMILIAL",
      it: "MENU FAMIGLIA",
    },
    "MENÚ PAREJA": {
      en: "COUPLE MENU",
      ca: "MENÚ PARELLA",
      de: "PAARMENÜ",
      fr: "MENU COUPLE",
      it: "MENU COPPIA",
    },
    "Martes 3x2": {
      en: "Tuesday 3x2",
      ca: "Dimarts 3x2",
      de: "Dienstag 3x2",
      fr: "Mardi 3x2",
      it: "Martedì 3x2",
    },
    "Miércoles TODAS LAS PIZZAS": {
      en: "Wednesday ALL PIZZAS",
      ca: "Dimecres TOTES LES PIZZES",
      de: "Mittwoch ALLE PIZZEN",
      fr: "Mercredi TOUTES LES PIZZAS",
      it: "Mercoledì TUTTE LE PIZZE",
    },
    "Jueves BUFFET LIBRE": {
      en: "Thursday ALL-YOU-CAN-EAT BUFFET",
      ca: "Dijous BUFET LLIURE",
      de: "Donnerstag ALL-YOU-CAN-EAT BUFFET",
      fr: "Jeudi BUFFET À VOLONTÉ",
      it: "Giovedì BUFFET A VOLONTÀ",
    },
    "REPARTO EN CASCO URBANO": {
      en: "URBAN AREA DELIVERY",
      ca: "REPARTIMENT AL CASC URBÀ",
      de: "LIEFERUNG IM STADTGEBIET",
      fr: "LIVRAISON EN ZONE URBAINE",
      it: "CONSEGNA IN AREA URBANA",
    },
  }

  const descriptionTranslations: Record<string, Record<string, string>> = {
    "1 Pizza de 60 cm (MAX. 3 INGREDIENTES A ELEGIR) + 2 Raciones Patatas + 1 Bebida Grande (COCA-COLA 1 litro)": {
      en: "1 Pizza (60cm) (MAX. 3 INGREDIENTS OF YOUR CHOICE) + 2 Portions of Fries + 1 Large Drink (COCA-COLA 1 liter)",
      ca: "1 Pizza de 60 cm (MÀX. 3 INGREDIENTS A TRIAR) + 2 Racions Patates + 1 Beguda Gran (COCA-COLA 1 litre)",
      de: "1 Pizza (60cm) (MAX. 3 ZUTATEN IHRER WAHL) + 2 Portionen Pommes + 1 Großes Getränk (COCA-COLA 1 Liter)",
      fr: "1 Pizza de 60 cm (MAX. 3 INGRÉDIENTS AU CHOIX) + 2 Portions de Frites + 1 Grande Boisson (COCA-COLA 1 litre)",
      it: "1 Pizza da 60 cm (MAX. 3 INGREDIENTI A SCELTA) + 2 Porzioni di Patatine + 1 Bevanda Grande (COCA-COLA 1 litro)",
    },
    // Add more translations as needed
  }

  return {
    ...promo,
    title: titleTranslations[promo.title]?.[lang] || promo.title,
    description: descriptionTranslations[promo.description]?.[lang] || promo.description,
  }
}

export default async function PromotionsPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as any)

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{dict.promotions.title}</h1>

      <div className="grid gap-8">
        {promotions.map((promo) => {
          const translatedPromo = translatePromotion(promo, params.lang)
          return (
            <Card key={promo.id} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative aspect-video md:aspect-auto">
                  <Image
                    src={promo.image || "/placeholder.svg"}
                    alt={translatedPromo.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{translatedPromo.title}</h2>
                    <p className="text-muted-foreground mb-4">{translatedPromo.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <CalendarDays className="mr-1 h-4 w-4" />
                        <span>{translateDayOfWeek(promo.dayOfWeek, params.lang)}</span>
                      </div>
                    </div>
                    {promo.price && <div className="mt-2 text-lg font-bold text-primary">{promo.price}</div>}
                  </div>
                </CardContent>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-center font-medium text-yellow-800">
          {params.lang === "es"
            ? "Julio y agosto no hay promoción"
            : params.lang === "ca"
              ? "Juliol i agost no hi ha promoció"
              : params.lang === "de"
                ? "Im Juli und August gibt es keine Promotion"
                : params.lang === "fr"
                  ? "Pas de promotion en juillet et août"
                  : params.lang === "it"
                    ? "Nessuna promozione a luglio e agosto"
                    : "No promotions in July and August"}
        </p>
      </div>
    </div>
  )
}
