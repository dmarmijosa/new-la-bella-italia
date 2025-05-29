"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Download, RefreshCw } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// This is a client component, so we need to fetch the dictionary differently
import enDict from "../dictionaries/en.json"
import esDict from "../dictionaries/es.json"
import caDict from "../dictionaries/ca.json"
import deDict from "../dictionaries/de.json"
import frDict from "../dictionaries/fr.json"
import itDict from "../dictionaries/it.json"

const dictionaries = {
  en: enDict,
  es: esDict,
  ca: caDict,
  de: deDict,
  fr: frDict,
  it: itDict,
}

// Pizza builder ingredients
const ingredients = {
  bases: [
    { id: "thin", name: "Thin Crust", image: "/placeholder.svg?height=100&width=100&query=thin pizza base" },
    { id: "regular", name: "Regular", image: "/placeholder.svg?height=100&width=100&query=regular pizza base" },
    { id: "thick", name: "Thick Crust", image: "/placeholder.svg?height=100&width=100&query=thick pizza base" },
  ],
  sauces: [
    { id: "tomato", name: "Tomato Sauce", image: "/placeholder.svg?height=100&width=100&query=tomato sauce" },
    { id: "white", name: "White Sauce", image: "/placeholder.svg?height=100&width=100&query=white sauce" },
    { id: "bbq", name: "BBQ Sauce", image: "/placeholder.svg?height=100&width=100&query=bbq sauce" },
  ],
  cheeses: [
    { id: "mozzarella", name: "Mozzarella", image: "/placeholder.svg?height=100&width=100&query=mozzarella cheese" },
    { id: "cheddar", name: "Cheddar", image: "/placeholder.svg?height=100&width=100&query=cheddar cheese" },
    { id: "goat", name: "Goat Cheese", image: "/placeholder.svg?height=100&width=100&query=goat cheese" },
    { id: "blue", name: "Blue Cheese", image: "/placeholder.svg?height=100&width=100&query=blue cheese" },
  ],
  toppings: [
    { id: "pepperoni", name: "Pepperoni", image: "/placeholder.svg?height=100&width=100&query=pepperoni" },
    { id: "mushrooms", name: "Mushrooms", image: "/placeholder.svg?height=100&width=100&query=mushrooms" },
    { id: "onions", name: "Onions", image: "/placeholder.svg?height=100&width=100&query=onions" },
    { id: "peppers", name: "Peppers", image: "/placeholder.svg?height=100&width=100&query=peppers" },
    { id: "olives", name: "Olives", image: "/placeholder.svg?height=100&width=100&query=olives" },
    { id: "ham", name: "Ham", image: "/placeholder.svg?height=100&width=100&query=ham" },
    { id: "pineapple", name: "Pineapple", image: "/placeholder.svg?height=100&width=100&query=pineapple" },
    { id: "bacon", name: "Bacon", image: "/placeholder.svg?height=100&width=100&query=bacon" },
  ],
}

export default function PizzaBuilderPage() {
  const params = useParams()
  const lang = params.lang as string
  const dict = dictionaries[lang as keyof typeof dictionaries]

  const [currentStep, setCurrentStep] = useState(0)
  const [selectedBase, setSelectedBase] = useState<string | null>(null)
  const [selectedSauce, setSelectedSauce] = useState<string | null>(null)
  const [selectedCheese, setSelectedCheese] = useState<string | null>(null)
  const [selectedToppings, setSelectedToppings] = useState<string[]>([])
  const [pizzaName, setPizzaName] = useState("My Custom Pizza")
  const [pizzaPrice, setPizzaPrice] = useState(8)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const steps = [
    { id: "base", title: dict.pizzaBuilder.base },
    { id: "sauce", title: dict.pizzaBuilder.sauce },
    { id: "cheese", title: dict.pizzaBuilder.cheese },
    { id: "toppings", title: dict.pizzaBuilder.toppings },
    { id: "finish", title: dict.pizzaBuilder.finish },
  ]

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSelectBase = (baseId: string) => {
    setSelectedBase(baseId)
  }

  const handleSelectSauce = (sauceId: string) => {
    setSelectedSauce(sauceId)
  }

  const handleSelectCheese = (cheeseId: string) => {
    setSelectedCheese(cheeseId)
  }

  const handleSelectTopping = (toppingId: string) => {
    setSelectedToppings((prev) => {
      if (prev.includes(toppingId)) {
        return prev.filter((id) => id !== toppingId)
      } else {
        return [...prev, toppingId]
      }
    })
  }

  const handleReset = () => {
    setCurrentStep(0)
    setSelectedBase(null)
    setSelectedSauce(null)
    setSelectedCheese(null)
    setSelectedToppings([])
    setPizzaName("My Custom Pizza")
    setPizzaPrice(8)
  }

  // Calculate price based on selections
  useEffect(() => {
    let price = 8 // Base price

    if (selectedBase === "thick") price += 1
    if (selectedSauce === "bbq") price += 0.5
    if (selectedCheese === "blue" || selectedCheese === "goat") price += 1

    // Add €0.75 for each topping
    price += selectedToppings.length * 0.75

    setPizzaPrice(price)
  }, [selectedBase, selectedSauce, selectedCheese, selectedToppings])

  // Draw pizza on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw pizza base
    const drawPizza = async () => {
      // Draw base
      if (selectedBase) {
        const baseImg = new Image()
        baseImg.crossOrigin = "anonymous"
        baseImg.src = `/placeholder.svg?height=400&width=400&query=${selectedBase} pizza base`
        await new Promise((resolve) => (baseImg.onload = resolve))
        ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height)
      }

      // Draw sauce
      if (selectedSauce) {
        const sauceImg = new Image()
        sauceImg.crossOrigin = "anonymous"
        sauceImg.src = `/placeholder.svg?height=400&width=400&query=${selectedSauce} on pizza`
        await new Promise((resolve) => (sauceImg.onload = resolve))
        ctx.drawImage(sauceImg, 0, 0, canvas.width, canvas.height)
      }

      // Draw cheese
      if (selectedCheese) {
        const cheeseImg = new Image()
        cheeseImg.crossOrigin = "anonymous"
        cheeseImg.src = `/placeholder.svg?height=400&width=400&query=${selectedCheese} on pizza`
        await new Promise((resolve) => (cheeseImg.onload = resolve))
        ctx.drawImage(cheeseImg, 0, 0, canvas.width, canvas.height)
      }

      // Draw toppings
      for (const topping of selectedToppings) {
        const toppingImg = new Image()
        toppingImg.crossOrigin = "anonymous"
        toppingImg.src = `/placeholder.svg?height=400&width=400&query=${topping} on pizza`
        await new Promise((resolve) => (toppingImg.onload = resolve))
        ctx.drawImage(toppingImg, 0, 0, canvas.width, canvas.height)
      }
    }

    drawPizza()
  }, [selectedBase, selectedSauce, selectedCheese, selectedToppings])

  const downloadPizza = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "my-custom-pizza.png"
    link.href = dataUrl
    link.click()
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{dict.pizzaBuilder.title}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
            {!selectedBase && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">Select ingredients to build your pizza</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{pizzaName}</h2>
              <p className="text-muted-foreground">
                {selectedBase && ingredients.bases.find((b) => b.id === selectedBase)?.name}
                {selectedSauce && `, ${ingredients.sauces.find((s) => s.id === selectedSauce)?.name}`}
                {selectedCheese && `, ${ingredients.cheeses.find((c) => c.id === selectedCheese)?.name}`}
                {selectedToppings.length > 0 && `, ${selectedToppings.length} toppings`}
              </p>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold">€{pizzaPrice.toFixed(2)}</span>
              <Button variant="outline" size="icon" className="ml-2" onClick={downloadPizza} disabled={!selectedBase}>
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">{steps[currentStep].title}</h2>
            <Button variant="outline" size="sm" onClick={handleReset}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>

          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center ${index <= currentStep ? "text-primary" : "text-muted-foreground"}`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                      index < currentStep
                        ? "bg-primary text-primary-foreground"
                        : index === currentStep
                          ? "border-2 border-primary text-primary"
                          : "border border-muted-foreground"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs hidden sm:inline">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-primary h-full transition-all"
                style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              />
            </div>
          </div>

          <div className="min-h-[300px]">
            {currentStep === 0 && (
              <div className="grid grid-cols-3 gap-4">
                {ingredients.bases.map((base) => (
                  <Card
                    key={base.id}
                    className={`cursor-pointer transition-all ${selectedBase === base.id ? "ring-2 ring-primary" : ""}`}
                    onClick={() => handleSelectBase(base.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 relative mb-2">
                        <Image src={base.image || "/placeholder.svg"} alt={base.name} fill className="object-contain" />
                      </div>
                      <span className="text-sm font-medium">{base.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 1 && (
              <div className="grid grid-cols-3 gap-4">
                {ingredients.sauces.map((sauce) => (
                  <Card
                    key={sauce.id}
                    className={`cursor-pointer transition-all ${
                      selectedSauce === sauce.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectSauce(sauce.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 relative mb-2">
                        <Image
                          src={sauce.image || "/placeholder.svg"}
                          alt={sauce.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">{sauce.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 2 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {ingredients.cheeses.map((cheese) => (
                  <Card
                    key={cheese.id}
                    className={`cursor-pointer transition-all ${
                      selectedCheese === cheese.id ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleSelectCheese(cheese.id)}
                  >
                    <CardContent className="p-4 flex flex-col items-center text-center">
                      <div className="w-16 h-16 relative mb-2">
                        <Image
                          src={cheese.image || "/placeholder.svg"}
                          alt={cheese.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium">{cheese.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Selected toppings: {selectedToppings.length}/5</span>
                  <Badge variant="outline">+€0.75 per topping</Badge>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {ingredients.toppings.map((topping) => (
                    <Card
                      key={topping.id}
                      className={`cursor-pointer transition-all ${
                        selectedToppings.includes(topping.id) ? "ring-2 ring-primary" : ""
                      } ${selectedToppings.length >= 5 && !selectedToppings.includes(topping.id) ? "opacity-50" : ""}`}
                      onClick={() => {
                        if (selectedToppings.length < 5 || selectedToppings.includes(topping.id)) {
                          handleSelectTopping(topping.id)
                        }
                      }}
                    >
                      <CardContent className="p-4 flex flex-col items-center text-center">
                        <div className="w-16 h-16 relative mb-2">
                          <Image
                            src={topping.image || "/placeholder.svg"}
                            alt={topping.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium">{topping.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Your Custom Pizza</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Base:</span>
                      <span>{selectedBase ? ingredients.bases.find((b) => b.id === selectedBase)?.name : "None"}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sauce:</span>
                      <span>
                        {selectedSauce ? ingredients.sauces.find((s) => s.id === selectedSauce)?.name : "None"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Cheese:</span>
                      <span>
                        {selectedCheese ? ingredients.cheeses.find((c) => c.id === selectedCheese)?.name : "None"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Toppings:</span>
                      <span>
                        {selectedToppings.length > 0
                          ? selectedToppings
                              .map((t) => ingredients.toppings.find((item) => item.id === t)?.name)
                              .join(", ")
                          : "None"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <span className="font-medium">Total Price:</span>
                  <span className="text-2xl font-bold">€{pizzaPrice.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg">
                  {dict.menu.addToCart}
                </Button>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Button
              onClick={handleNextStep}
              disabled={
                (currentStep === 0 && !selectedBase) ||
                (currentStep === 1 && !selectedSauce) ||
                (currentStep === 2 && !selectedCheese) ||
                currentStep === steps.length - 1
              }
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
