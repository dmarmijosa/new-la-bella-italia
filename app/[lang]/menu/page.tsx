import Image from "next/image"
import { getDictionary } from "../dictionaries"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

// Menu data based on the provided JSON
const menuData = {
  nuestrasPizzas: [
    {
      id: 1,
      name: "MARGARITA",
      price: 8.0,
      ingredients: ["Tomate", "Mozzarella"],
      image: "/pizza-margherita.png",
      vegetarian: true,
    },
    {
      id: 2,
      name: "MARINARA",
      price: 8.0,
      ingredients: ["Tomate", "Mozzarella", "Ajo", "Orégano"],
      image: "/pizza-marinara.png",
      vegetarian: true,
    },
    {
      id: 3,
      name: "MILANO",
      price: 9.2,
      ingredients: ["Tomate", "Mozzarella", "Salami Picante"],
      image: "/milano-pizza.png",
      vegetarian: false,
    },
    {
      id: 4,
      name: "NAPOLI",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Anchoa", "Oliva Negra"],
      image: "/pizza-napoli.png",
      vegetarian: false,
    },
    {
      id: 5,
      name: "PARMA",
      price: 9.0,
      ingredients: ["Tomate", "Mozzarella", "Jamón York"],
      image: "/parma-pizza.png",
      vegetarian: false,
    },
    {
      id: 6,
      name: "TROPICAL",
      price: 9.8,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "Maíz", "Piña"],
      image: "/tropical-pizza.png",
      vegetarian: false,
    },
    {
      id: 7,
      name: "GENOVA",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Pesto", "Atún"],
      image: "/genova-pizza.png",
      vegetarian: false,
    },
    {
      id: 8,
      name: "HORTELANA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Berenjena", "Pimiento", "Calabacín", "Champiñones Frescos"],
      image: "/vegetable-pizza.png",
      vegetarian: true,
    },
    {
      id: 9,
      name: "4 QUESOS",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Gorgonzola", "Emmental", "Queso de Cabra"],
      image: "/four-cheese-pizza.png",
      vegetarian: true,
    },
    {
      id: 10,
      name: "CATANIA",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Atún", "Cebolla"],
      image: "/tuna-pizza.png",
      vegetarian: false,
    },
    {
      id: 11,
      name: "VENEZIA",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "Champiñones", "Frescos"],
      image: "/ham-mushroom-pizza.png",
      vegetarian: false,
    },
    {
      id: 12,
      name: "BARI",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Pollo", "Gorgonzola"],
      image: "/chicken-gorgonzola-pizza.png",
      vegetarian: false,
    },
    {
      id: 13,
      name: "MARE-MARE",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Gambas", "Mejillones"],
      image: "/seafood-pizza.png",
      vegetarian: false,
    },
    {
      id: 14,
      name: "MARE MONTI",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Gambas", "Champiñones Frescos"],
      image: "/shrimp-mushroom-pizza.png",
      vegetarian: false,
    },
    {
      id: 15,
      name: "HUEVO",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Beicon", "Huevo"],
      image: "/bacon-egg-pizza.png",
      vegetarian: false,
    },
    {
      id: 16,
      name: "CAPRICCIOSA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "Oliva Negra", "Alcachofa", "Huevo", "Champiñones Frescos"],
      image: "/capricciosa-pizza.png",
      vegetarian: false,
    },
    {
      id: 17,
      name: "TOSCANA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Jamón Serrano", "Rúcula", "Parmesano", "Aceite de Oliva"],
      image: "/prosciutto-arugula-pizza.png",
      vegetarian: false,
    },
    {
      id: 18,
      name: "BOLOÑESA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Salsa Boloñesa"],
      image: "/bolognese-pizza.png",
      vegetarian: false,
    },
    {
      id: 19,
      name: "CALZONE BÁSICA",
      price: 9.3,
      ingredients: ["Tomate", "Mozzarella", "Jamón York"],
      image: "/basic-calzone.png",
      vegetarian: false,
    },
    {
      id: 20,
      name: "CALZONE CHAMPIÑONES",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "Champiñones Frescos"],
      image: "/mushroom-calzone.png",
      vegetarian: false,
    },
    {
      id: 21,
      name: "CALZONE HUEVO",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "Champiñones Frescos", "Huevo"],
      image: "/egg-calzone.png",
      vegetarian: false,
    },
    {
      id: 22,
      name: "PIZZA FAMILIAR",
      price: 18.0,
      ingredients: ["Margarita 60 CM (Máx. 2 ingredientes A Elegir)"],
      image: "/family-pizza.png",
      vegetarian: false,
    },
  ],
  pizzasEspeciales: [
    {
      id: 23,
      name: "CARBONARA",
      price: 10.0,
      ingredients: ["Tom.", "Mozz.", "Bacon", "Cebolla", "Huevo", "Pimiento Negro", "Parmesano"],
      image: "/pizza-carbonara.png",
      vegetarian: false,
    },
    {
      id: 24,
      name: "MENORQUINA",
      price: 9.6,
      ingredients: ["Tomate", "Mozzarella", "Sobrasada", "Miel"],
      image: "/menorquina-pizza.png",
      vegetarian: false,
    },
    {
      id: 25,
      name: "FOCACCIA (BLANCA)",
      price: 11.0,
      ingredients: ["Mozzarella", "Rúcula", "Ajo", "Berenjena", "Tomate Cherry", "Aceite de Oliva"],
      image: "/focaccia-bianca.png",
      vegetarian: true,
    },
    {
      id: 26,
      name: "PALERMO",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Jamón York", "4 Quesos", "Oliva Negras"],
      image: "/palermo-pizza.png",
      vegetarian: false,
    },
    {
      id: 27,
      name: "MAMMA MIA",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Beicon", "Pimienta Negra", "Champiñones Frescos"],
      image: "/mamma-mia-pizza.png",
      vegetarian: false,
    },
    {
      id: 28,
      name: "KEBAB",
      price: 9.5,
      ingredients: ["Tomate", "Mozzarella", "Carne de Kebab"],
      image: "/kebab-pizza.png",
      vegetarian: false,
    },
    {
      id: 29,
      name: "FRESCA FRESCA",
      price: 11.0,
      ingredients: ["Mozzarella", "Jamón", "Rúcula", "Tomate", "Fresco", "Atún", "Oliva"],
      image: "/fresca-pizza.png",
      vegetarian: false,
    },
    {
      id: 30,
      name: "LA BUENA",
      price: 9.8,
      ingredients: ["Tomate", "Mozzarella", "Pollo", "Champiñones", "Curry"],
      image: "/curry-chicken-pizza.png",
      vegetarian: false,
    },
    {
      id: 31,
      name: "LA BLANCA",
      price: 9.8,
      ingredients: ["Mozzarella", "Beicon", "Huevo", "Champiñones"],
      image: "/white-pizza.png",
      vegetarian: false,
    },
    {
      id: 32,
      name: "LA SUPER",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Queso de Cabra", "Miel", "Nueces"],
      image: "/goat-cheese-honey-pizza.png",
      vegetarian: true,
    },
    {
      id: 33,
      name: "LA PLAYA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Gambas", "Atún"],
      image: "/seafood-tuna-pizza.png",
      vegetarian: false,
    },
    {
      id: 34,
      name: "GUSTOSA (BLANCA)",
      price: 9.5,
      ingredients: ["4 Quesos", "Pesto", "Mozzarella"],
      image: "/white-pesto-pizza.png",
      vegetarian: true,
    },
    {
      id: 35,
      name: "FRANKFURT",
      price: 9.0,
      ingredients: ["Tomate", "Mozzarella", "Frankfurt"],
      image: "/frankfurt-pizza.png",
      vegetarian: false,
    },
    {
      id: 36,
      name: "BARBACOA",
      price: 9.0,
      ingredients: ["Tomate", "Mozzarella", "Beicon", "Salsa Barbacoa"],
      image: "/bbq-pizza.png",
      vegetarian: false,
    },
    {
      id: 37,
      name: "ITALIA",
      price: 10.0,
      ingredients: ["Tomate", "Mozzarella", "Pesto", "Cherry"],
      image: "/italia-pizza.png",
      vegetarian: true,
    },
    {
      id: 38,
      name: "UMBRIA (BLANCA)",
      price: 10.0,
      ingredients: ["Mozzarella", "Champiñones", "Trufa"],
      image: "/truffle-mushroom-pizza.png",
      vegetarian: true,
    },
    {
      id: 39,
      name: "SEPIA (ESTILO BANANAS)",
      price: 10.5,
      ingredients: ["Tomate", "Mozzarella y Sepia en Salsa elaborada por Bananas."],
      image: "/sepia-pizza.png",
      vegetarian: false,
    },
    {
      id: 40,
      name: "NENCY",
      price: 10.0,
      ingredients: ["Tom.", "Mozz.", "Queso de Cabra y Cebolla Caramelizada"],
      image: "/goat-cheese-caramelized-onion-pizza.png",
      vegetarian: true,
    },
    {
      id: 41,
      name: "GOLOSA",
      price: 10.0,
      ingredients: ["Tom.", "Mozz.", "Beicon y Gorgonzola"],
      image: "/bacon-gorgonzola-pizza.png",
      vegetarian: false,
    },
    {
      id: 42,
      name: "MARLON BRANDO",
      price: 10.0,
      ingredients: ["Mozzarella", "Manzana", "Cebolla Caramelizada", "Queso de Cabra"],
      image: "/apple-goat-cheese-pizza.png",
      vegetarian: true,
    },
    {
      id: 43,
      name: "MEDITERRÁNEA",
      price: 10.0,
      ingredients: ["Tom.", "Mozz.", "Calabacín", "Gambas", "Picada de Ajo y Perejil"],
      image: "/mediterranean-pizza.png",
      vegetarian: false,
    },
  ],
  tapas: [
    {
      id: 1,
      name: "PATATAS BRAVAS",
      price: 4.5,
      ingredients: [],
      image: "/patatas-bravas.png",
      vegetarian: true,
    },
    {
      id: 2,
      name: "LASAÑA",
      price: 8.0,
      ingredients: [],
      image: "/lasagna.png",
      vegetarian: false,
    },
    {
      id: 3,
      name: "ANILLOS DE CEBOLLA",
      price: 3.5,
      ingredients: [],
      image: "/onion-rings.png",
      vegetarian: true,
    },
    {
      id: 4,
      name: "CROQUETA DE PATATA (1 UNIDAD)",
      price: 1.5,
      ingredients: ["Mozzarella", "Jamón York", "Patata", "Parmesano"],
      image: "/potato-croquette.png",
      vegetarian: false,
    },
    {
      id: 5,
      name: "CROQUETA DE POLLO (1 UNIDAD)",
      price: 1.5,
      ingredients: [],
      image: "/chicken-croquette.png",
      vegetarian: false,
    },
    {
      id: 6,
      name: "BOMBA (1 UNIDAD)",
      price: 1.5,
      ingredients: ["Patata", "Carne Boloñesa Picante"],
      image: "/potato-bomba.png",
      vegetarian: false,
    },
    {
      id: 7,
      name: "ALITAS DE POLLO PICANTES (6 UNIDADES)",
      price: 5.5,
      ingredients: [],
      image: "/spicy-chicken-wings.png",
      vegetarian: false,
    },
    {
      id: 8,
      name: "ALITAS DE POLLO BARBACOA (6 UNIDADES)",
      price: 5.5,
      ingredients: [],
      image: "/bbq-chicken-wings.png",
      vegetarian: false,
    },
    {
      id: 9,
      name: "NUGGETS DE POLLO (6 UNIDADES)",
      price: 3.5,
      ingredients: [],
      image: "/chicken-nuggets.png",
      vegetarian: false,
    },
    {
      id: 10,
      name: "PATATAS FRITAS",
      price: 3.5,
      ingredients: [],
      image: "/french-fries.png",
      vegetarian: true,
    },
    {
      id: 11,
      name: "ENSALADA CAPRESE",
      price: 8.0,
      ingredients: [],
      image: "/caprese-salad.png",
      vegetarian: true,
    },
  ],
  postresCaseros: [
    {
      id: 1,
      name: "TIRAMISÚ",
      price: 3.5,
      ingredients: [],
      image: "/tiramisu.png",
      vegetarian: true,
    },
    {
      id: 2,
      name: "BOMBA FRITA DE NUTELLA O CHOCOLATE BLANCO",
      price: 1.5,
      ingredients: [],
      image: "/nutella-bomba.png",
      vegetarian: true,
    },
    {
      id: 3,
      name: "PIZZA NUTELLA",
      price: 7.0,
      ingredients: [],
      image: "/nutella-pizza.png",
      vegetarian: true,
    },
    {
      id: 4,
      name: "TARTA DE ZANAHORIA",
      price: 3.0,
      ingredients: [],
      image: "/carrot-cake.png",
      vegetarian: true,
    },
  ],
  bebidas: [
    {
      id: 1,
      name: "CERVEZA ITALIANA (33cl)",
      price: 3.0,
      ingredients: [],
      image: "/italian-beer.png",
      vegetarian: true,
    },
    {
      id: 2,
      name: "CERVEZA ESTRELLA (33cl)",
      price: 1.7,
      ingredients: [],
      image: "/estrella-beer.png",
      vegetarian: true,
    },
    {
      id: 3,
      name: "COLA / LIMÓN / NARANJA (33cl)",
      price: 1.7,
      ingredients: [],
      image: "/soft-drinks.png",
      vegetarian: true,
    },
    {
      id: 4,
      name: "COCA-COLA ZERO (33cl)",
      price: 1.7,
      ingredients: [],
      image: "/cola-zero.png",
      vegetarian: true,
    },
    {
      id: 5,
      name: "NESTEA / AQUARIUS (33cl)",
      price: 1.7,
      ingredients: [],
      image: "/nestea-aquarius.png",
      vegetarian: true,
    },
    {
      id: 6,
      name: "NESTEA MARACUYÁ (33cl)",
      price: 2.0,
      ingredients: [],
      image: "/nestea-maracuya.png",
      vegetarian: true,
    },
    {
      id: 7,
      name: "AGUA SIN GAS (50cl)",
      price: 1.2,
      ingredients: [],
      image: "/water.png",
      vegetarian: true,
    },
    {
      id: 8,
      name: "AGUA SIN GAS (1.5L)",
      price: 2.4,
      ingredients: [],
      image: "/large-water.png",
      vegetarian: true,
    },
    {
      id: 9,
      name: "AGUA CON GAS (50cl)",
      price: 1.5,
      ingredients: [],
      image: "/sparkling-water.png",
      vegetarian: true,
    },
  ],
  vinoItaliano: [
    {
      id: 1,
      name: "PINOT",
      price: 10.0,
      ingredients: [],
      image: "/pinot-wine.png",
      vegetarian: true,
    },
    {
      id: 2,
      name: "MERLOT",
      price: 10.0,
      ingredients: [],
      image: "/merlot-wine.png",
      vegetarian: true,
    },
    {
      id: 3,
      name: "COPA VINO (de la casa)",
      price: 2.5,
      ingredients: [],
      image: "/wine-glass.png",
      vegetarian: true,
    },
  ],
}

export default async function MenuPage({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang as any)

  // Translations for categories
  const getCategoryName = (category: string) => {
    const translations: Record<string, Record<string, string>> = {
      nuestrasPizzas: {
        en: "Our Pizzas",
        es: "Nuestras Pizzas",
        ca: "Les Nostres Pizzes",
        de: "Unsere Pizzen",
        fr: "Nos Pizzas",
        it: "Le Nostre Pizze",
      },
      pizzasEspeciales: {
        en: "Special Pizzas",
        es: "Pizzas Especiales",
        ca: "Pizzes Especials",
        de: "Spezielle Pizzen",
        fr: "Pizzas Spéciales",
        it: "Pizze Speciali",
      },
      tapas: {
        en: "Appetizers",
        es: "Tapas",
        ca: "Tapes",
        de: "Vorspeisen",
        fr: "Entrées",
        it: "Antipasti",
      },
      postresCaseros: {
        en: "Homemade Desserts",
        es: "Postres Caseros",
        ca: "Postres Casolans",
        de: "Hausgemachte Desserts",
        fr: "Desserts Maison",
        it: "Dolci Fatti in Casa",
      },
      bebidas: {
        en: "Drinks",
        es: "Bebidas",
        ca: "Begudes",
        de: "Getränke",
        fr: "Boissons",
        it: "Bevande",
      },
      vinoItaliano: {
        en: "Italian Wine",
        es: "Vino Italiano",
        ca: "Vi Italià",
        de: "Italienischer Wein",
        fr: "Vin Italien",
        it: "Vino Italiano",
      },
    }

    return translations[category]?.[params.lang] || translations[category]?.en
  }

  // Translate ingredients based on language
  const translateIngredient = (ingredient: string) => {
    const translations: Record<string, Record<string, string>> = {
      // Base ingredients
      Tomate: {
        en: "Tomato",
        es: "Tomate",
        ca: "Tomàquet",
        de: "Tomate",
        fr: "Tomate",
        it: "Pomodoro",
      },
      "Tom.": {
        en: "Tomato",
        es: "Tomate",
        ca: "Tomàquet",
        de: "Tomate",
        fr: "Tomate",
        it: "Pomodoro",
      },
      Mozzarella: {
        en: "Mozzarella",
        es: "Mozzarella",
        ca: "Mozzarella",
        de: "Mozzarella",
        fr: "Mozzarella",
        it: "Mozzarella",
      },
      "Mozz.": {
        en: "Mozzarella",
        es: "Mozzarella",
        ca: "Mozzarella",
        de: "Mozzarella",
        fr: "Mozzarella",
        it: "Mozzarella",
      },
      // Herbs and spices
      Ajo: {
        en: "Garlic",
        es: "Ajo",
        ca: "All",
        de: "Knoblauch",
        fr: "Ail",
        it: "Aglio",
      },
      Orégano: {
        en: "Oregano",
        es: "Orégano",
        ca: "Orenga",
        de: "Oregano",
        fr: "Origan",
        it: "Origano",
      },
      Pesto: {
        en: "Pesto",
        es: "Pesto",
        ca: "Pesto",
        de: "Pesto",
        fr: "Pesto",
        it: "Pesto",
      },
      // Meats
      "Salami Picante": {
        en: "Spicy Salami",
        es: "Salami Picante",
        ca: "Salami Picant",
        de: "Scharfe Salami",
        fr: "Salami Épicé",
        it: "Salame Piccante",
      },
      "Jamón York": {
        en: "Ham",
        es: "Jamón York",
        ca: "Pernil Dolç",
        de: "Schinken",
        fr: "Jambon",
        it: "Prosciutto Cotto",
      },
      Jamón: {
        en: "Ham",
        es: "Jamón",
        ca: "Pernil",
        de: "Schinken",
        fr: "Jambon",
        it: "Prosciutto",
      },
      "Jamón Serrano": {
        en: "Serrano Ham",
        es: "Jamón Serrano",
        ca: "Pernil Serrano",
        de: "Serrano-Schinken",
        fr: "Jambon Serrano",
        it: "Prosciutto Serrano",
      },
      Beicon: {
        en: "Bacon",
        es: "Beicon",
        ca: "Bacon",
        de: "Speck",
        fr: "Bacon",
        it: "Pancetta",
      },
      Bacon: {
        en: "Bacon",
        es: "Bacon",
        ca: "Bacon",
        de: "Speck",
        fr: "Bacon",
        it: "Pancetta",
      },
      Pollo: {
        en: "Chicken",
        es: "Pollo",
        ca: "Pollastre",
        de: "Hähnchen",
        fr: "Poulet",
        it: "Pollo",
      },
      "Carne de Kebab": {
        en: "Kebab Meat",
        es: "Carne de Kebab",
        ca: "Carn de Kebab",
        de: "Kebab-Fleisch",
        fr: "Viande de Kebab",
        it: "Carne di Kebab",
      },
      Frankfurt: {
        en: "Frankfurter",
        es: "Frankfurt",
        ca: "Frankfurt",
        de: "Frankfurter",
        fr: "Francfort",
        it: "Würstel",
      },
      Sobrasada: {
        en: "Sobrasada",
        es: "Sobrasada",
        ca: "Sobrassada",
        de: "Sobrasada",
        fr: "Sobrasada",
        it: "Sobrasada",
      },
      // Seafood
      Anchoa: {
        en: "Anchovy",
        es: "Anchoa",
        ca: "Anxova",
        de: "Sardelle",
        fr: "Anchois",
        it: "Acciuga",
      },
      Atún: {
        en: "Tuna",
        es: "Atún",
        ca: "Tonyina",
        de: "Thunfisch",
        fr: "Thon",
        it: "Tonno",
      },
      Gambas: {
        en: "Shrimp",
        es: "Gambas",
        ca: "Gambes",
        de: "Garnelen",
        fr: "Crevettes",
        it: "Gamberi",
      },
      Mejillones: {
        en: "Mussels",
        es: "Mejillones",
        ca: "Musclos",
        de: "Muscheln",
        fr: "Moules",
        it: "Cozze",
      },
      Sepia: {
        en: "Cuttlefish",
        es: "Sepia",
        ca: "Sípia",
        de: "Tintenfisch",
        fr: "Seiche",
        it: "Seppia",
      },
      // Vegetables
      Berenjena: {
        en: "Eggplant",
        es: "Berenjena",
        ca: "Albergínia",
        de: "Aubergine",
        fr: "Aubergine",
        it: "Melanzana",
      },
      Pimiento: {
        en: "Pepper",
        es: "Pimiento",
        ca: "Pebrot",
        de: "Paprika",
        fr: "Poivron",
        it: "Peperone",
      },
      Calabacín: {
        en: "Zucchini",
        es: "Calabacín",
        ca: "Carbassó",
        de: "Zucchini",
        fr: "Courgette",
        it: "Zucchina",
      },
      "Champiñones Frescos": {
        en: "Fresh Mushrooms",
        es: "Champiñones Frescos",
        ca: "Xampinyons Frescos",
        de: "Frische Champignons",
        fr: "Champignons Frais",
        it: "Funghi Freschi",
      },
      Champiñones: {
        en: "Mushrooms",
        es: "Champiñones",
        ca: "Xampinyons",
        de: "Champignons",
        fr: "Champignons",
        it: "Funghi",
      },
      Cebolla: {
        en: "Onion",
        es: "Cebolla",
        ca: "Ceba",
        de: "Zwiebel",
        fr: "Oignon",
        it: "Cipolla",
      },
      "Cebolla Caramelizada": {
        en: "Caramelized Onion",
        es: "Cebolla Caramelizada",
        ca: "Ceba Caramel·litzada",
        de: "Karamellisierte Zwiebel",
        fr: "Oignon Caramélisé",
        it: "Cipolla Caramellata",
      },
      Rúcula: {
        en: "Arugula",
        es: "Rúcula",
        ca: "Ruca",
        de: "Rucola",
        fr: "Roquette",
        it: "Rucola",
      },
      "Tomate Cherry": {
        en: "Cherry Tomato",
        es: "Tomate Cherry",
        ca: "Tomàquet Cherry",
        de: "Kirschtomate",
        fr: "Tomate Cerise",
        it: "Pomodorino",
      },
      Tomate: {
        en: "Tomato",
        es: "Tomate",
        ca: "Tomàquet",
        de: "Tomate",
        fr: "Tomate",
        it: "Pomodoro",
      },
      Fresco: {
        en: "Fresh",
        es: "Fresco",
        ca: "Fresc",
        de: "Frisch",
        fr: "Frais",
        it: "Fresco",
      },
      Alcachofa: {
        en: "Artichoke",
        es: "Alcachofa",
        ca: "Carxofa",
        de: "Artischocke",
        fr: "Artichaut",
        it: "Carciofo",
      },
      Maíz: {
        en: "Corn",
        es: "Maíz",
        ca: "Blat de moro",
        de: "Mais",
        fr: "Maïs",
        it: "Mais",
      },
      Piña: {
        en: "Pineapple",
        es: "Piña",
        ca: "Pinya",
        de: "Ananas",
        fr: "Ananas",
        it: "Ananas",
      },
      Manzana: {
        en: "Apple",
        es: "Manzana",
        ca: "Poma",
        de: "Apfel",
        fr: "Pomme",
        it: "Mela",
      },
      // Cheese
      Gorgonzola: {
        en: "Gorgonzola",
        es: "Gorgonzola",
        ca: "Gorgonzola",
        de: "Gorgonzola",
        fr: "Gorgonzola",
        it: "Gorgonzola",
      },
      Emmental: {
        en: "Emmental",
        es: "Emmental",
        ca: "Emmental",
        de: "Emmentaler",
        fr: "Emmental",
        it: "Emmental",
      },
      "Queso de Cabra": {
        en: "Goat Cheese",
        es: "Queso de Cabra",
        ca: "Formatge de Cabra",
        de: "Ziegenkäse",
        fr: "Fromage de Chèvre",
        it: "Formaggio di Capra",
      },
      "4 Quesos": {
        en: "4 Cheeses",
        es: "4 Quesos",
        ca: "4 Formatges",
        de: "4 Käsesorten",
        fr: "4 Fromages",
        it: "4 Formaggi",
      },
      Parmesano: {
        en: "Parmesan",
        es: "Parmesano",
        ca: "Parmesà",
        de: "Parmesan",
        fr: "Parmesan",
        it: "Parmigiano",
      },
      // Other ingredients
      Huevo: {
        en: "Egg",
        es: "Huevo",
        ca: "Ou",
        de: "Ei",
        fr: "Œuf",
        it: "Uovo",
      },
      "Oliva Negra": {
        en: "Black Olive",
        es: "Oliva Negra",
        ca: "Oliva Negra",
        de: "Schwarze Olive",
        fr: "Olive Noire",
        it: "Oliva Nera",
      },
      "Oliva Negras": {
        en: "Black Olives",
        es: "Oliva Negras",
        ca: "Olives Negres",
        de: "Schwarze Oliven",
        fr: "Olives Noires",
        it: "Olive Nere",
      },
      Oliva: {
        en: "Olive",
        es: "Oliva",
        ca: "Oliva",
        de: "Olive",
        fr: "Olive",
        it: "Oliva",
      },
      "Aceite de Oliva": {
        en: "Olive Oil",
        es: "Aceite de Oliva",
        ca: "Oli d'Oliva",
        de: "Olivenöl",
        fr: "Huile d'Olive",
        it: "Olio d'Oliva",
      },
      Miel: {
        en: "Honey",
        es: "Miel",
        ca: "Mel",
        de: "Honig",
        fr: "Miel",
        it: "Miele",
      },
      Nueces: {
        en: "Walnuts",
        es: "Nueces",
        ca: "Nous",
        de: "Walnüsse",
        fr: "Noix",
        it: "Noci",
      },
      Trufa: {
        en: "Truffle",
        es: "Trufa",
        ca: "Tòfona",
        de: "Trüffel",
        fr: "Truffe",
        it: "Tartufo",
      },
      Cherry: {
        en: "Cherry",
        es: "Cherry",
        ca: "Cirera",
        de: "Kirsche",
        fr: "Cerise",
        it: "Ciliegia",
      },
      Curry: {
        en: "Curry",
        es: "Curry",
        ca: "Curry",
        de: "Curry",
        fr: "Curry",
        it: "Curry",
      },
      // Sauces and seasonings
      "Salsa Boloñesa": {
        en: "Bolognese Sauce",
        es: "Salsa Boloñesa",
        ca: "Salsa Bolonyesa",
        de: "Bolognese-Sauce",
        fr: "Sauce Bolognaise",
        it: "Salsa Bolognese",
      },
      "Salsa Barbacoa": {
        en: "BBQ Sauce",
        es: "Salsa Barbacoa",
        ca: "Salsa Barbacoa",
        de: "BBQ-Sauce",
        fr: "Sauce Barbecue",
        it: "Salsa Barbecue",
      },
      "Pimiento Negro": {
        en: "Black Pepper",
        es: "Pimiento Negro",
        ca: "Pebre Negre",
        de: "Schwarzer Pfeffer",
        fr: "Poivre Noir",
        it: "Pepe Nero",
      },
      "Pimienta Negra": {
        en: "Black Pepper",
        es: "Pimienta Negra",
        ca: "Pebre Negre",
        de: "Schwarzer Pfeffer",
        fr: "Poivre Noir",
        it: "Pepe Nero",
      },
      "Picada de Ajo y Perejil": {
        en: "Garlic and Parsley Mix",
        es: "Picada de Ajo y Perejil",
        ca: "Picada d'All i Julivert",
        de: "Knoblauch-Petersilien-Mix",
        fr: "Mélange Ail et Persil",
        it: "Trito di Aglio e Prezzemolo",
      },
      // Special descriptions
      Frescos: {
        en: "Fresh",
        es: "Frescos",
        ca: "Frescos",
        de: "Frisch",
        fr: "Frais",
        it: "Freschi",
      },
      "Margarita 60 CM (Máx. 2 ingredientes A Elegir)": {
        en: "Margherita 60 CM (Max. 2 toppings to choose)",
        es: "Margarita 60 CM (Máx. 2 ingredientes A Elegir)",
        ca: "Margarita 60 CM (Màx. 2 ingredients A Triar)",
        de: "Margherita 60 CM (Max. 2 Zutaten zur Auswahl)",
        fr: "Margherita 60 CM (Max. 2 ingrédients au choix)",
        it: "Margherita 60 CM (Max. 2 ingredienti a scelta)",
      },
      "Mozzarella y Sepia en Salsa elaborada por Bananas.": {
        en: "Mozzarella and Cuttlefish in sauce made by Bananas.",
        es: "Mozzarella y Sepia en Salsa elaborada por Bananas.",
        ca: "Mozzarella i Sípia en Salsa elaborada per Bananas.",
        de: "Mozzarella und Tintenfisch in Sauce von Bananas.",
        fr: "Mozzarella et Seiche en sauce élaborée par Bananas.",
        it: "Mozzarella e Seppia in salsa elaborata da Bananas.",
      },
      // Compound ingredients
      Mozzarella: {
        en: "Mozzarella",
        es: "Mozzarella",
        ca: "Mozzarella",
        de: "Mozzarella",
        fr: "Mozzarella",
        it: "Mozzarella",
      },
      Patata: {
        en: "Potato",
        es: "Patata",
        ca: "Patata",
        de: "Kartoffel",
        fr: "Pomme de terre",
        it: "Patata",
      },
      "Carne Boloñesa Picante": {
        en: "Spicy Bolognese Meat",
        es: "Carne Boloñesa Picante",
        ca: "Carn Bolonyesa Picant",
        de: "Scharfes Bolognese-Fleisch",
        fr: "Viande Bolognaise Épicée",
        it: "Carne Bolognese Piccante",
      },
    }

    return translations[ingredient]?.[params.lang] || ingredient
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold tracking-tight">{dict.menu.title}</h1>
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder={dict.navigation.search} className="pl-8" />
        </div>
      </div>

      <Tabs defaultValue="nuestrasPizzas" className="w-full">
        <TabsList className="mb-8 flex flex-wrap h-auto">
          <TabsTrigger value="nuestrasPizzas">{getCategoryName("nuestrasPizzas")}</TabsTrigger>
          <TabsTrigger value="pizzasEspeciales">{getCategoryName("pizzasEspeciales")}</TabsTrigger>
          <TabsTrigger value="tapas">{getCategoryName("tapas")}</TabsTrigger>
          <TabsTrigger value="postresCaseros">{getCategoryName("postresCaseros")}</TabsTrigger>
          <TabsTrigger value="bebidas">{getCategoryName("bebidas")}</TabsTrigger>
          <TabsTrigger value="vinoItaliano">{getCategoryName("vinoItaliano")}</TabsTrigger>
        </TabsList>

        {Object.entries(menuData).map(([category, items]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-video relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    {item.vegetarian && (
                      <Badge className="absolute top-2 right-2 bg-primary">
                        {params.lang === "es"
                          ? "Vegetariano"
                          : params.lang === "ca"
                            ? "Vegetarià"
                            : params.lang === "de"
                              ? "Vegetarisch"
                              : params.lang === "fr"
                                ? "Végétarien"
                                : params.lang === "it"
                                  ? "Vegetariano"
                                  : "Vegetarian"}
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <span className="font-bold text-primary">{item.price.toFixed(2)}€</span>
                    </div>
                    {item.ingredients && item.ingredients.length > 0 && (
                      <p className="text-sm text-muted-foreground">
                        {item.ingredients
                          .map((ingredient) => (params.lang === "es" ? ingredient : translateIngredient(ingredient)))
                          .join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="mt-12 p-4 border rounded-lg bg-muted/50">
        <h2 className="text-xl font-bold mb-4">
          {params.lang === "es"
            ? "Información Adicional"
            : params.lang === "ca"
              ? "Informació Addicional"
              : params.lang === "de"
                ? "Zusätzliche Informationen"
                : params.lang === "fr"
                  ? "Informations Supplémentaires"
                  : params.lang === "it"
                    ? "Informazioni Aggiuntive"
                    : "Additional Information"}
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-bold mb-2">
              {params.lang === "es"
                ? "Ingrediente Extra"
                : params.lang === "ca"
                  ? "Ingredient Extra"
                  : params.lang === "de"
                    ? "Extra Zutat"
                    : params.lang === "fr"
                      ? "Ingrédient Supplémentaire"
                      : params.lang === "it"
                        ? "Ingrediente Extra"
                        : "Extra Ingredient"}
            </h3>
            <p className="text-sm">
              {params.lang === "es"
                ? "(Pescado/Carne/Queso)"
                : params.lang === "ca"
                  ? "(Peix/Carn/Formatge)"
                  : params.lang === "de"
                    ? "(Fisch/Fleisch/Käse)"
                    : params.lang === "fr"
                      ? "(Poisson/Viande/Fromage)"
                      : params.lang === "it"
                        ? "(Pesce/Carne/Formaggio)"
                        : "(Fish/Meat/Cheese)"}
              : +1.00€
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">
              {params.lang === "es"
                ? "Horario"
                : params.lang === "ca"
                  ? "Horari"
                  : params.lang === "de"
                    ? "Öffnungszeiten"
                    : params.lang === "fr"
                      ? "Heures d'ouverture"
                      : params.lang === "it"
                        ? "Orari"
                        : "Opening Hours"}
            </h3>
            <p className="text-sm">
              {params.lang === "es"
                ? "Abierto cada día excepto los Lunes de 18:00 a Cierre"
                : params.lang === "ca"
                  ? "Obert cada dia excepte els Dilluns de 18:00 a Tancament"
                  : params.lang === "de"
                    ? "Täglich geöffnet außer Montags von 18:00 bis Ladenschluss"
                    : params.lang === "fr"
                      ? "Ouvert tous les jours sauf le lundi de 18h00 à la fermeture"
                      : params.lang === "it"
                        ? "Aperto tutti i giorni tranne il lunedì dalle 18:00 alla chiusura"
                        : "Open every day except Mondays from 6:00 PM until closing"}
            </p>
            <p className="text-sm mt-1">
              {params.lang === "es"
                ? "Y ABIERTO TODOS LOS DÍAS los meses de Junio, Julio y Agosto."
                : params.lang === "ca"
                  ? "I OBERT TOTS ELS DIES els mesos de Juny, Juliol i Agost."
                  : params.lang === "de"
                    ? "Und TÄGLICH GEÖFFNET in den Monaten Juni, Juli und August."
                    : params.lang === "fr"
                      ? "Et OUVERT TOUS LES JOURS pendant les mois de juin, juillet et août."
                      : params.lang === "it"
                        ? "E APERTO TUTTI I GIORNI nei mesi di giugno, luglio e agosto."
                        : "And OPEN EVERY DAY during June, July, and August."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
