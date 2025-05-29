import Image from "next/image"
import Link from "next/link"
import { getDictionary } from "./dictionaries"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Utensils } from "lucide-react"

// Sample pizza data
const featuredPizzas = [
  {
    id: 1,
    name: "Margherita",
    image: "/pizza-margherita.png",
    ingredients: "Tomato, Mozzarella, Basil",
    price: 8.0,
    vegetarian: true,
  },
  {
    id: 2,
    name: "Marinara",
    image: "/pizza-marinara.png",
    ingredients: "Tomato, Garlic, Oregano",
    price: 8.0,
    vegetarian: true,
  },
  {
    id: 3,
    name: "Napoli",
    image: "/pizza-napoli.png",
    ingredients: "Tomato, Mozzarella, Anchovies, Black Olives",
    price: 9.5,
    vegetarian: false,
  },
  {
    id: 4,
    name: "Carbonara",
    image: "/pizza-carbonara.png",
    ingredients: "Tomato, Mozzarella, Bacon, Eggs, Black Pepper, Parmesan",
    price: 10.0,
    vegetarian: false,
  },
]

// Sample promotions data
const promotions = [
  {
    id: 1,
    title: "3x2 Tuesdays",
    description: "Buy 3 pizzas, pay for 2 every Tuesday",
    image: "/pizza-promotion-3x2.png",
    validUntil: "2025-12-31",
  },
  {
    id: 2,
    title: "All Pizzas €8 on Wednesdays",
    description: "Enjoy any pizza from our menu for just €8 every Wednesday",
    image: "/pizza-promotion-discount.png",
    validUntil: "2025-12-31",
  },
  {
    id: 3,
    title: "Free Buffet Thursdays",
    description: "All-you-can-eat buffet + drink for €12.50 per person",
    image: "/pizza-buffet.png",
    validUntil: "2025-12-31",
  },
]

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as any)

  // Create paths with the current language
  const createLocalePath = (path: string) => `/${params.lang}${path}`

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="/restaurant-interior.png"
            alt="La bella Italia Menorca Restaurant Interior"
            fill
            className="object-cover brightness-[0.7]"
            priority
          />
        </div>
        <div className="container relative z-10 py-20 md:py-32 lg:py-40 text-white">
          <div className="max-w-2xl space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">{dict.home.hero.title}</h1>
            <p className="text-xl">{dict.home.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href={createLocalePath("/menu")}>{dict.home.hero.cta}</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/20 hover:bg-background/30" asChild>
                <Link href={createLocalePath("/pizza-builder")}>{dict.pizzaBuilder.title}</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-2 italian-flag-gradient" />
      </section>

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
                  {pizza.vegetarian && <Badge className="absolute top-2 right-2 bg-primary">Vegetarian</Badge>}
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{pizza.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pizza.ingredients}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between items-center">
                  <span className="font-bold">€{pizza.price.toFixed(2)}</span>
                  <Button size="sm">{dict.menu.addToCart}</Button>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden pizza-card">
                <div className="aspect-video relative">
                  <Image src={promo.image || "/placeholder.svg"} alt={promo.title} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-xl font-bold">{promo.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{promo.description}</p>
                  <div className="flex items-center mt-3 text-xs text-muted-foreground">
                    <Clock className="mr-1 h-3 w-3" />
                    <span>
                      {dict.promotions.validUntil}: {new Date(promo.validUntil).toLocaleDateString(params.lang)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
                <li className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  <span>Authentic Italian recipes</span>
                </li>
                <li className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  <span>Fresh, locally-sourced ingredients</span>
                </li>
                <li className="flex items-center">
                  <Utensils className="h-5 w-5 mr-2 text-primary" />
                  <span>Traditional wood-fired oven</span>
                </li>
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

      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{dict.pizzaBuilder.title}</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Create your perfect pizza with our interactive pizza builder. Choose your base, sauce, cheese, and toppings
            to create a masterpiece that's uniquely yours.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href={createLocalePath("/pizza-builder")}>{dict.pizzaBuilder.start}</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
