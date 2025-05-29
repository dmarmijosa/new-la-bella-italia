import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "./dictionaries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Utensils } from "lucide-react"
import HomeHeroSection from "@/components/home-hero-section" // Import the new client component

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as any)

  // Create paths with the current language
  const createLocalePath = (path: string) => `/${params.lang}${path}`

  // Data definitions (promotions, featured pizzas, etc.)
  const defaultPromotions = [
    {
      id: "menu-familiar",
      name:
        params.lang === "es"
          ? "MENÚ FAMILIAR"
          : params.lang === "ca"
            ? "MENÚ FAMILIAR"
            : params.lang === "de"
              ? "FAMILIENMENÜ"
              : params.lang === "fr"
                ? "MENU FAMILIAL"
                : params.lang === "it"
                  ? "MENU FAMIGLIA"
                  : "FAMILY MENU",
      description:
        params.lang === "es"
          ? "1 Pizza de 60 cm (MAX. 3 INGREDIENTES A ELEGIR) + 2 Raciones Patatas + 1 Bebida Grande (COCA-COLA 1 litro)"
          : params.lang === "ca"
            ? "1 Pizza de 60 cm (MÀX. 3 INGREDIENTS A TRIAR) + 2 Racions Patates + 1 Beguda Gran (COCA-COLA 1 litre)"
            : params.lang === "de"
              ? "1 Pizza (60cm) (MAX. 3 ZUTATEN IHRER WAHL) + 2 Portionen Pommes + 1 Großes Getränk (COCA-COLA 1 Liter)"
              : params.lang === "fr"
                ? "1 Pizza de 60 cm (MAX. 3 INGRÉDIENTS AU CHOIX) + 2 Portions de Frites + 1 Grande Boisson (COCA-COLA 1 litre)"
                : params.lang === "it"
                  ? "1 Pizza da 60 cm (MAX. 3 INGREDIENTI A SCELTA) + 2 Porzioni di Patatine + 1 Bevanda Grande (COCA-COLA 1 litro)"
                  : "1 Pizza (60cm) (MAX. 3 INGREDIENTS OF YOUR CHOICE) + 2 Portions of Fries + 1 Large Drink (COCA-COLA 1 liter)",
      price: "20.90€",
      dayOfWeek:
        params.lang === "es"
          ? "Todos los días"
          : params.lang === "ca"
            ? "Tots els dies"
            : params.lang === "de"
              ? "Jeden Tag"
              : params.lang === "fr"
                ? "Tous les jours"
                : params.lang === "it"
                  ? "Tutti i giorni"
                  : "Every day",
      image: "/family-pizza.png",
    },
    {
      id: "menu-pareja",
      name:
        params.lang === "es"
          ? "MENÚ PAREJA"
          : params.lang === "ca"
            ? "MENÚ PARELLA"
            : params.lang === "de"
              ? "PAARMENÜ"
              : params.lang === "fr"
                ? "MENU COUPLE"
                : params.lang === "it"
                  ? "MENU COPPIA"
                  : "COUPLE MENU",
      description:
        params.lang === "es"
          ? "2 Pizzas a elegir (CARBONARA, ATÚN, JAMÓN YORK, HUEVO, PESTO Y ATÚN) + 2 Postres a elegir (TIRAMISÚ, PIZZA NUTELLA O CHOCOLATE BLANCO) + 2 Bebidas (COCA-COLA (33cl) O AGUA (50cl))"
          : params.lang === "ca"
            ? "2 Pizzes a triar (CARBONARA, TONYINA, PERNIL DOLÇ, OU, PESTO I TONYINA) + 2 Postres a triar (TIRAMISÚ, PIZZA NUTELLA O XOCOLATA BLANC) + 2 Begudes (COCA-COLA (33cl) O AIGUA (50cl))"
            : params.lang === "de"
              ? "2 Pizzen zur Auswahl (CARBONARA, THUNFISCH, SCHINKEN, EI, PESTO UND THUNFISCH) + 2 Desserts zur Auswahl (TIRAMISÚ, PIZZA NUTELLA ODER WEISSE SCHOKOLADE) + 2 Getränke (COCA-COLA (33cl) ODER WASSER (50cl))"
              : params.lang === "fr"
                ? "2 Pizzas au choix (CARBONARA, THON, JAMBON, ŒUF, PESTO ET THON) + 2 Desserts au choix (TIRAMISÚ, PIZZA NUTELLA OU CHOCOLAT BLANC) + 2 Boissons (COCA-COLA (33cl) OU EAU (50cl))"
                : params.lang === "it"
                  ? "2 Pizze a scelta (CARBONARA, TONNO, PROSCIUTTO COTTO, UOVO, PESTO E TONNO) + 2 Dolci a scelta (TIRAMISÚ, PIZZA NUTELLA O CIOCCOLATO BIANCO) + 2 Bevande (COCA-COLA (33cl) O ACQUA (50cl))"
                  : "2 Pizzas to choose (CARBONARA, TUNA, HAM, EGG, PESTO AND TUNA) + 2 Desserts to choose (TIRAMISÚ, PIZZA NUTELLA OR WHITE CHOCOLATE) + 2 Drinks (COCA-COLA (33cl) OR WATER (50cl))",
      price: "19.90€",
      dayOfWeek:
        params.lang === "es"
          ? "Todos los días"
          : params.lang === "ca"
            ? "Tots els dies"
            : params.lang === "de"
              ? "Jeden Tag"
              : params.lang === "fr"
                ? "Tous les jours"
                : params.lang === "it"
                  ? "Tutti i giorni"
                  : "Every day",
      image: "/pizza-promotion-3x2.png",
    },
    {
      id: "martes-3x2",
      name:
        params.lang === "es"
          ? "Martes 3x2"
          : params.lang === "ca"
            ? "Dimarts 3x2"
            : params.lang === "de"
              ? "Dienstag 3x2"
              : params.lang === "fr"
                ? "Mardi 3x2"
                : params.lang === "it"
                  ? "Martedì 3x2"
                  : "Tuesday 3x2",
      description:
        params.lang === "es"
          ? "Compra 3 pizzas y paga solo 2. La promoción se aplica a la pizza de menor precio."
          : params.lang === "ca"
            ? "Compra 3 pizzes i paga només 2. La promoció s'aplica a la pizza de menor preu."
            : params.lang === "de"
              ? "Kaufe 3 Pizzen und zahle nur 2. Die Promotion gilt für die günstigste Pizza."
              : params.lang === "fr"
                ? "Achetez 3 pizzas et payez seulement 2. La promotion s'applique à la pizza la moins chère."
                : params.lang === "it"
                  ? "Compra 3 pizze e paga solo 2. La promozione si applica alla pizza meno costosa."
                  : "Buy 3 pizzas and pay only 2. The promotion applies to the cheapest pizza.",
      price: "",
      dayOfWeek:
        params.lang === "es"
          ? "Martes"
          : params.lang === "ca"
            ? "Dimarts"
            : params.lang === "de"
              ? "Dienstag"
              : params.lang === "fr"
                ? "Mardi"
                : params.lang === "it"
                  ? "Martedì"
                  : "Tuesday",
      image: "/pizza-promotion-discount.png",
    },
  ]

  const promotions =
    dict.laBellaItalia && dict.laBellaItalia.promotions ? dict.laBellaItalia.promotions.slice(0, 3) : defaultPromotions

  const featuredPizzas = [
    {
      id: 1,
      name: "Margherita",
      image: "/pizza-margherita.png",
      ingredients:
        params.lang === "es"
          ? "Tomate, Mozzarella, Albahaca"
          : params.lang === "ca"
            ? "Tomàquet, Mozzarella, Alfàbrega"
            : params.lang === "de"
              ? "Tomate, Mozzarella, Basilikum"
              : params.lang === "fr"
                ? "Tomate, Mozzarella, Basilic"
                : params.lang === "it"
                  ? "Pomodoro, Mozzarella, Basilico"
                  : "Tomato, Mozzarella, Basil",
      price: 8.0,
      vegetarian: true,
    },
    {
      id: 2,
      name: "Marinara",
      image: "/pizza-marinara.png",
      ingredients:
        params.lang === "es"
          ? "Tomate, Ajo, Orégano"
          : params.lang === "ca"
            ? "Tomàquet, All, Orenga"
            : params.lang === "de"
              ? "Tomate, Knoblauch, Oregano"
              : params.lang === "fr"
                ? "Tomate, Ail, Origan"
                : params.lang === "it"
                  ? "Pomodoro, Aglio, Origano"
                  : "Tomato, Garlic, Oregano",
      price: 8.0,
      vegetarian: true,
    },
    {
      id: 3,
      name: "Napoli",
      image: "/pizza-napoli.png",
      ingredients:
        params.lang === "es"
          ? "Tomate, Mozzarella, Anchoas, Aceitunas Negras"
          : params.lang === "ca"
            ? "Tomàquet, Mozzarella, Anxoves, Olives Negres"
            : params.lang === "de"
              ? "Tomate, Mozzarella, Sardellen, Schwarze Oliven"
              : params.lang === "fr"
                ? "Tomate, Mozzarella, Anchois, Olives Noires"
                : params.lang === "it"
                  ? "Pomodoro, Mozzarella, Acciughe, Olive Nere"
                  : "Tomato, Mozzarella, Anchovies, Black Olives",
      price: 9.5,
      vegetarian: false,
    },
    {
      id: 4,
      name: "Carbonara",
      image: "/pizza-carbonara.png",
      ingredients:
        params.lang === "es"
          ? "Tomate, Mozzarella, Bacon, Huevos, Pimienta Negra, Parmesano"
          : params.lang === "ca"
            ? "Tomàquet, Mozzarella, Bacon, Ous, Pebre Negre, Parmesà"
            : params.lang === "de"
              ? "Tomate, Mozzarella, Speck, Eier, Schwarzer Pfeffer, Parmesan"
              : params.lang === "fr"
                ? "Tomate, Mozzarella, Bacon, Œufs, Poivre Noir, Parmesan"
                : params.lang === "it"
                  ? "Pomodoro, Mozzarella, Pancetta, Uova, Pepe Nero, Parmigiano"
                  : "Tomato, Mozzarella, Bacon, Eggs, Black Pepper, Parmesan",
      price: 10.0,
      vegetarian: false,
    },
  ]

  const vegetarianText = {
    en: "Vegetarian",
    es: "Vegetariano",
    ca: "Vegetarià",
    de: "Vegetarisch",
    fr: "Végétarien",
    it: "Vegetariano",
  }

  const aboutFeatures = {
    en: ["Authentic Italian recipes", "Fresh, locally-sourced ingredients", "Traditional wood-fired oven"],
    es: ["Recetas italianas auténticas", "Ingredientes frescos de origen local", "Horno tradicional de leña"],
    ca: ["Receptes italianes autèntiques", "Ingredients frescos d'origen local", "Forn tradicional de llenya"],
    de: ["Authentische italienische Rezepte", "Frische, lokal bezogene Zutaten", "Traditioneller Holzofen"],
    fr: ["Recettes italiennes authentiques", "Ingrédients frais d'origine locale", "Four à bois traditionnel"],
    it: ["Ricette italiane autentiche", "Ingredienti freschi di provenienza locale", "Forno a legna tradizionale"],
  }

  const pizzaBuilderDescription = {
    en: "Create your perfect pizza with our interactive pizza builder. Choose your base, sauce, cheese, and toppings to create a masterpiece that's uniquely yours.",
    es: "Crea tu pizza perfecta con nuestro constructor de pizzas interactivo. Elige tu base, salsa, queso y ingredientes para crear una obra maestra única.",
    ca: "Crea la teva pizza perfecta amb el nostre constructor de pizzes interactiu. Tria la teva base, salsa, formatge i ingredients per crear una obra mestra única.",
    de: "Erstellen Sie Ihre perfekte Pizza mit unserem interaktiven Pizza-Baukasten. Wählen Sie Ihre Basis, Sauce, Käse und Beläge, um ein einzigartiges Meisterwerk zu kreieren.",
    fr: "Créez votre pizza parfaite avec notre constructeur de pizza interactif. Choisissez votre base, sauce, fromage et garnitures pour créer un chef-d'œuvre unique.",
    it: "Crea la tua pizza perfetta con il nostro costruttore di pizza interattivo. Scegli la tua base, salsa, formaggio e condimenti per creare un capolavoro unico.",
  }

  const bananasDescription = {
    en: "Enjoy our special collaboration with Bar-Cafeteria Bananas, offering a unique gastronomic experience in Ciutadella de Menorca.",
    es: "Disfruta de nuestra colaboración especial con Bar-Cafetería Bananas, ofreciendo una experiencia gastronómica única en Ciutadella de Menorca.",
    ca: "Gaudeix de la nostra col·laboració especial amb Bar-Cafeteria Bananas, oferint una experiència gastronòmica única a Ciutadella de Menorca.",
    de: "Genießen Sie unsere besondere Zusammenarbeit mit Bar-Cafeteria Bananas und erleben Sie ein einzigartiges gastronomisches Erlebnis in Ciutadella de Menorca.",
    fr: "Profitez de notre collaboration spéciale avec Bar-Cafétéria Bananas, offrant une expérience gastronomique unique à Ciutadella de Menorca.",
    it: "Goditi la nostra collaborazione speciale con Bar-Caffetteria Bananas, offrendo un'esperienza gastronomica unica a Ciutadella de Menorca.",
  }

  return (
    <div className="flex flex-col">
      <HomeHeroSection
        lang={params.lang}
        heroTitle={dict.home.hero.title}
        heroSubtitle={dict.home.hero.subtitle}
        heroCta={dict.home.hero.cta}
        pizzaBuilderTitle={dict.pizzaBuilder.title}
        heroImageAlt={
          params.lang === "es"
            ? "Interior del restaurante La Bella Italia Menorca"
            : "La Bella Italia Menorca Restaurant Interior"
        }
      />

      {/* Featured Pizzas */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{dict.home.featured.title}</h2>
            <Link
              href={createLocalePath("/menu")}
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              {dict.home.featured.viewAll}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredPizzas.map((pizza) => (
              <Card key={pizza.id} className="overflow-hidden pizza-card">
                <div className="aspect-square relative">
                  <Image
                    src={pizza.image || "/placeholder.svg"}
                    alt={pizza.name}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  {pizza.vegetarian && (
                    <Badge className="absolute top-2 right-2 bg-primary">
                      {vegetarianText[params.lang as keyof typeof vegetarianText]}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{pizza.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pizza.ingredients}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold">€{pizza.price.toFixed(2)}</span>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotions */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold tracking-tight">{dict.home.promotions.title}</h2>
            <Link
              href={createLocalePath("/promotions")}
              className="flex items-center text-sm font-medium text-primary hover:underline"
            >
              {dict.home.promotions.viewAll}
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          {promotions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {promotions.map((promo) => (
                <Card key={promo.id} className="overflow-hidden pizza-card">
                  <div className="aspect-video relative">
                    <Image src={promo.image || "/placeholder.svg"} alt={promo.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="text-xl font-bold">{promo.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                    {promo.dayOfWeek && (
                      <div className="flex items-center mt-3 text-xs text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{promo.dayOfWeek}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              {dict.laBellaItalia?.noPromotionJulyAugust || "No promotions available at the moment."}
            </p>
          )}
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">{dict.home.about.title}</h2>
              <p className="text-muted-foreground mb-6">{dict.home.about.content}</p>
              <ul className="space-y-2">
                {aboutFeatures[params.lang as keyof typeof aboutFeatures].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Utensils className="h-5 w-5 mr-2 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-6" asChild>
                <Link href={createLocalePath("/contact")}>{dict.contact.title}</Link>
              </Button>
            </div>
            <div className="relative aspect-video md:aspect-square">
              <Image src="/chef-pizza-wood-oven.png" alt="Pizza Chef" fill className="object-cover rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video md:aspect-square">
              <Image
                src="/bananas-collaboration.png"
                alt="Bar-Cafeteria Bananas"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                {dict.laBellaItalia?.additionalInfo?.bananasCollaboration || "Our Special Collaboration"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {bananasDescription[params.lang as keyof typeof bananasDescription]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{dict.pizzaBuilder.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">
            {pizzaBuilderDescription[params.lang as keyof typeof pizzaBuilderDescription]}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={createLocalePath("/pizza-builder")}>{dict.pizzaBuilder.start}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
