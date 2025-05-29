import "server-only"

// Define the dictionary type
export type Dictionary = {
  navigation: {
    home: string
    menu: string
    promotions: string
    contact: string
    search: string
    language: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    featured: {
      title: string
      viewAll: string
    }
    promotions: {
      title: string
      viewAll: string
    }
    about: {
      title: string
      content: string
    }
  }
  menu: {
    title: string
    categories: {
      classic: string
      special: string
      vegetarian: string
      calzone: string
    }
    ingredients: string
    price: string
    addToCart: string
  }
  promotions: {
    title: string
    validUntil: string
  }
  contact: {
    title: string
    form: {
      name: string
      email: string
      message: string
      submit: string
      phone: string
    }
    info: {
      address: string
      phone: string
      hours: string
    }
  }
  pizzaBuilder: {
    title: string
    start: string
    base: string
    sauce: string
    cheese: string
    toppings: string
    finish: string
    create: string
  }
  footer: {
    rights: string
    privacy: string
    terms: string
  }
  laBellaItalia: {
    promotions: Array<{
      id: string // Unique ID for the promotion, e.g., "menu-familiar"
      name: string
      description: string
      price: string | null
      dayOfWeek?: string // Translated day or "Every day"
      image: string // Image path like "/pizza-promotion-3x2.png"
    }>
    schedule: string // Full schedule text
    contact: string[] // Array of phone numbers
    additionalInfo: {
      // For the "Información Adicional" section
      productQuality: string
      cuisineType: string
      bananasCollaboration: string
      cardPaymentAtHome: string
    }
    extraIngredientInfo: {
      // For the menu page
      title: string // e.g., "Extra Ingredient"
      details: string // e.g., "(Fish/Meat/Cheese): +€1.00"
    }
    openingHoursTitle: string // e.g., "Opening Hours"
    additionalInfoTitle: string // e.g., "Additional Information"
    noPromotionJulyAugust: string // Message for no promotions in July/August
  }
}

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
  ca: () => import("./dictionaries/ca.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  fr: () => import("./dictionaries/fr.json").then((module) => module.default),
  it: () => import("./dictionaries/it.json").then((module) => module.default),
}

export type Locale = keyof typeof dictionaries

export const getDictionary = async (locale: string) => {
  // Validate locale and provide fallback
  const validLocale = locale in dictionaries ? (locale as Locale) : "en"
  return dictionaries[validLocale]() as Promise<Dictionary>
}
