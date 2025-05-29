"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useParams } from "next/navigation"
import { ChevronLeft, ChevronRight, Download, RefreshCw, Phone } from "lucide-react"
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
    { id: "thin", name: "Thin Crust", color: "#D2691E" },
    { id: "regular", name: "Regular", color: "#DEB887" },
    { id: "thick", name: "Thick Crust", color: "#CD853F" },
  ],
  sauces: [
    { id: "tomato", name: "Tomato Sauce", color: "#FF6347" },
    { id: "white", name: "White Sauce", color: "#FFFDD0" },
    { id: "bbq", name: "BBQ Sauce", color: "#8B4513" },
  ],
  cheeses: [
    { id: "mozzarella", name: "Mozzarella", color: "#FFFACD" },
    { id: "cheddar", name: "Cheddar", color: "#FFA500" },
    { id: "goat", name: "Goat Cheese", color: "#FAFAD2" },
    { id: "blue", name: "Blue Cheese", color: "#E0E0E0" },
  ],
  toppings: [
    { id: "pepperoni", name: "Pepperoni", color: "#8B0000" },
    { id: "mushrooms", name: "Mushrooms", color: "#8B7355" },
    { id: "onions", name: "Onions", color: "#DDA0DD" },
    { id: "peppers", name: "Peppers", color: "#228B22" },
    { id: "olives", name: "Olives", color: "#2F4F4F" },
    { id: "ham", name: "Ham", color: "#FFB6C1" },
    { id: "pineapple", name: "Pineapple", color: "#FFD700" },
    { id: "bacon", name: "Bacon", color: "#A0522D" },
  ],
}

const callToOrderText = {
  en: "Call to Order",
  es: "Llamar para Pedir",
  ca: "Trucar per Demanar",
  de: "Anrufen zum Bestellen",
  fr: "Appeler pour Commander",
  it: "Chiama per Ordinare",
}

const ConfettiPiece = ({ id }: { id: number }) => {
  const colors = ["#FFD700", "#FF69B4", "#00CED1", "#32CD32", "#FF4500", "#1E90FF", "#FFC0CB"]
  const style = {
    position: "absolute" as const,
    width: `${Math.random() * 8 + 6}px`,
    height: `${Math.random() * 10 + 10}px`,
    backgroundColor: colors[Math.floor(Math.random() * colors.length)],
    top: `${Math.random() * -60 - 20}%`, // Start further above the screen
    left: `${Math.random() * 100}%`,
    opacity: 1,
    transform: `rotate(${Math.random() * 360}deg)`,
    animation: `fall-${id} ${Math.random() * 2 + 3}s linear ${Math.random() * 1}s forwards`, // Randomized delay up to 1s
  }

  const keyframes = `
  @keyframes fall-${id} {
    0% {
      transform: translateY(0vh) rotate(${Math.random() * 180}deg);
      opacity: 1;
    }
    25% {
      opacity: 1;
    }
    100% {
      transform: translateY(110vh) rotate(${Math.random() * 360 + 360}deg);
      opacity: 0;
    }
  }
`

  return (
    <>
      <style>{keyframes}</style>
      <div style={style} />
    </>
  )
}

const ConfettiExplosion = ({ active }: { active: boolean }) => {
  if (!active) return null
  const confettiCount = 80

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-[100]">
      {Array.from({ length: confettiCount }).map((_, index) => (
        <ConfettiPiece key={index} id={index} />
      ))}
    </div>
  )
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
  const [pizzaName, setPizzaName] = useState(dict.pizzaBuilder.visualizer?.defaultName || "My Custom Pizza")
  const [pizzaPrice, setPizzaPrice] = useState(8)
  const [showConfetti, setShowConfetti] = useState(false)

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
    setPizzaName(dict.pizzaBuilder.visualizer?.defaultName || "My Custom Pizza")
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

  useEffect(() => {
    if (currentStep === steps.length - 1) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 5000) // Confetti will be visible for 5 seconds
      return () => clearTimeout(timer)
    }
  }, [currentStep, steps.length])

  // Draw pizza on canvas using simple shapes and colors
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 180

    // Draw base
    if (selectedBase) {
      const base = ingredients.bases.find((b) => b.id === selectedBase)
      if (base) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
        ctx.fillStyle = base.color
        ctx.fill()
        ctx.strokeStyle = "#8B4513"
        ctx.lineWidth = 3
        ctx.stroke()
      }
    }

    // Draw sauce
    if (selectedSauce) {
      const sauce = ingredients.sauces.find((s) => s.id === selectedSauce)
      if (sauce) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius - 15, 0, 2 * Math.PI)
        ctx.fillStyle = sauce.color
        ctx.fill()
      }
    }

    // Draw cheese
    if (selectedCheese) {
      const cheese = ingredients.cheeses.find((c) => c.id === selectedCheese)
      if (cheese) {
        ctx.globalAlpha = 0.7
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius - 20, 0, 2 * Math.PI)
        ctx.fillStyle = cheese.color
        ctx.fill()
        ctx.globalAlpha = 1
      }
    }

    // Draw toppings
    selectedToppings.forEach((toppingId, index) => {
      const topping = ingredients.toppings.find((t) => t.id === toppingId)
      if (topping) {
        // Distribute toppings randomly on the pizza
        const numItems = 8
        for (let i = 0; i < numItems; i++) {
          const angle = (Math.PI * 2 * i) / numItems + index * 0.5
          const distance = 50 + Math.random() * 80
          const x = centerX + Math.cos(angle) * distance
          const y = centerY + Math.sin(angle) * distance

          ctx.beginPath()
          ctx.arc(x, y, 10, 0, 2 * Math.PI)
          ctx.fillStyle = topping.color
          ctx.fill()
        }
      }
    })
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
    <div className="container py-8 md:py-12 relative">
      <ConfettiExplosion active={showConfetti} />
      <h1 className="text-3xl font-bold tracking-tight mb-8">{dict.pizzaBuilder.title}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden mb-4">
            <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
            {!selectedBase && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground">
                  {dict.pizzaBuilder.visualizer?.placeholder || "Select ingredients to build your pizza"}
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{pizzaName}</h2>
              <p className="text-muted-foreground">
                {selectedBase
                  ? ingredients.bases.find((b) => b.id === selectedBase)?.name
                  : dict.pizzaBuilder.visualizer?.none || "None"}
                {selectedSauce && `, ${ingredients.sauces.find((s) => s.id === selectedSauce)?.name || ""}`}
                {selectedCheese && `, ${ingredients.cheeses.find((c) => c.id === selectedCheese)?.name || ""}`}
                {selectedToppings.length > 0 &&
                  `, ${selectedToppings.length} ${dict.pizzaBuilder.visualizer?.toppingsCountSuffix || "toppings"}`}
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
              {dict.pizzaBuilder.controls?.resetButton || "Reset"}
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
                      <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: base.color }} />
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
                      <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: sauce.color }} />
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
                      <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: cheese.color }} />
                      <span className="text-sm font-medium">{cheese.name}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {dict.pizzaBuilder.controls?.selectedToppingsLabel || "Selected toppings"}:{" "}
                    {selectedToppings.length}/5
                  </span>
                  <Badge variant="outline">
                    +€0.75 {dict.pizzaBuilder.controls?.perToppingPriceSuffix || "per topping"}
                  </Badge>
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
                        <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: topping.color }} />
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
                  <h3 className="font-medium mb-2">{dict.pizzaBuilder.summary?.title || "Your Custom Pizza"}</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>{dict.pizzaBuilder.summary?.baseLabel || "Base"}:</span>
                      <span>
                        {selectedBase
                          ? ingredients.bases.find((b) => b.id === selectedBase)?.name
                          : dict.pizzaBuilder.visualizer?.none || "None"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>{dict.pizzaBuilder.summary?.sauceLabel || "Sauce"}:</span>
                      <span>
                        {selectedSauce
                          ? ingredients.sauces.find((s) => s.id === selectedSauce)?.name
                          : dict.pizzaBuilder.visualizer?.none || "None"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>{dict.pizzaBuilder.summary?.cheeseLabel || "Cheese"}:</span>
                      <span>
                        {selectedCheese
                          ? ingredients.cheeses.find((c) => c.id === selectedCheese)?.name
                          : dict.pizzaBuilder.visualizer?.none || "None"}
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>{dict.pizzaBuilder.summary?.toppingsLabel || "Toppings"}:</span>
                      <span>
                        {selectedToppings.length > 0
                          ? selectedToppings
                              .map((t) => ingredients.toppings.find((item) => item.id === t)?.name)
                              .join(", ")
                          : dict.pizzaBuilder.visualizer?.none || "None"}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="flex justify-between items-center p-4 bg-primary/10 rounded-lg">
                  <span className="font-medium">{dict.pizzaBuilder.summary?.totalPriceLabel || "Total Price"}:</span>
                  <span className="text-2xl font-bold">€{pizzaPrice.toFixed(2)}</span>
                </div>

                <div className="flex gap-4 mt-6">
                  <Button size="lg" className="flex-1" onClick={() => (window.location.href = "tel:+34871020595")}>
                    <Phone className="h-4 w-4 mr-2" />
                    {callToOrderText[lang as keyof typeof callToOrderText]}
                  </Button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handlePrevStep} disabled={currentStep === 0}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              {dict.pizzaBuilder.navigation?.backButton || "Back"}
            </Button>

            {currentStep < steps.length - 1 && (
              <Button
                onClick={handleNextStep}
                disabled={
                  (currentStep === 0 && !selectedBase) ||
                  (currentStep === 1 && !selectedSauce) ||
                  (currentStep === 2 && !selectedCheese)
                }
              >
                {dict.pizzaBuilder.navigation?.nextButton || "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
