"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Send } from "lucide-react"
import { useParams } from "next/navigation"

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

export default function ContactPage() {
  const params = useParams()
  const lang = params.lang as string
  const dict = dictionaries[lang as keyof typeof dictionaries]

  // Safe access to laBellaItalia data with fallbacks
  const laBellaItalia = dict?.laBellaItalia || {}
  const contactNumbers = laBellaItalia.contact || ["871 020 595", "685 177 889"]
  const openingHoursTitle = laBellaItalia.openingHoursTitle || dict?.contact?.info?.hours || "Opening Hours"
  const noPromotionText = laBellaItalia.noPromotionJulyAugust || "No promotions in July and August"

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get current month to determine opening hours
  const currentMonth = new Date().getMonth() + 1 // JavaScript months are 0-indexed
  const isSummerSeason = currentMonth >= 6 && currentMonth <= 8 // June, July, August

  // Days of the week translations
  const daysOfWeek = {
    en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    es: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
    ca: ["Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"],
    de: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
    fr: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
    it: ["Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
  }

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Create WhatsApp message
    const message = `__________________
nombre: ${formData.name}
__________________
mensaje: ${formData.message}
__________________
telefono: ${formData.phone}
__________________`

    // Open WhatsApp with the message
    const whatsappUrl = `https://wa.me/34685177889?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")

    // Reset form after a delay
    setTimeout(() => {
      setIsSubmitting(false)
      setFormData({ name: "", phone: "", message: "" })
    }, 1500)
  }

  if (!dict) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8">{dict.contact.title}</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
                {dict.contact.form.name}
              </label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-2">
                {dict.contact.form.phone || "Teléfono"}
              </label>
              <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                {dict.contact.form.message}
              </label>
              <Textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <span className="mr-2">Sending...</span>
                  <Send className="h-4 w-4 animate-pulse" />
                </>
              ) : (
                <>
                  {dict.contact.form.submit}
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>

            {isSubmitting && (
              <div className="p-4 bg-primary/10 text-primary rounded-md mt-4">
                {lang === "es"
                  ? "Redirigiendo a WhatsApp..."
                  : lang === "ca"
                    ? "Redirigint a WhatsApp..."
                    : lang === "de"
                      ? "Weiterleitung zu WhatsApp..."
                      : lang === "fr"
                        ? "Redirection vers WhatsApp..."
                        : lang === "it"
                          ? "Reindirizzamento a WhatsApp..."
                          : "Redirecting to WhatsApp..."}
              </div>
            )}
          </form>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">{dict.contact.info.address}</h3>
                  <address className="not-italic text-muted-foreground mt-1">
                    Cami de Maó, 4<br />
                    CIUTADELLA DE MENORCA
                    <br />
                    Spain
                  </address>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">{dict.contact.info.phone}</h3>
                  <div className="text-muted-foreground mt-1 space-y-2">
                    {contactNumbers.map((num) => (
                      <a
                        key={num}
                        href={`tel:+34${num.replace(/\s/g, "")}`}
                        className="block text-primary hover:underline font-semibold text-lg"
                      >
                        +34 {num}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-medium mb-3">{openingHoursTitle}</h3>
                  <div className="space-y-1 text-sm">
                    {daysOfWeek[lang as keyof typeof daysOfWeek].map((day, index) => (
                      <div key={day} className="flex justify-between">
                        <span className="font-medium">{day}:</span>
                        <span className="text-muted-foreground">
                          {isSummerSeason || index !== 0
                            ? openText[lang as keyof typeof openText]
                            : closedText[lang as keyof typeof closedText]}
                        </span>
                      </div>
                    ))}
                  </div>
                  {!isSummerSeason && <p className="text-xs text-muted-foreground mt-3 italic">{noPromotionText}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold tracking-tight mb-4">Find Us</h2>
        <div className="aspect-video w-full rounded-lg overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d593!2d3.8397451!3d40.0028314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12be04098246d5ed%3A0xbcf57b5eae7d7123!2sPIZZER%C3%8DA%20LA%20BELLA%20ITALIA!5e0!3m2!1sen!2sus!4v1653669573070!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}
