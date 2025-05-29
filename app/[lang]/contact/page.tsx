"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Clock, Mail, Send } from "lucide-react"
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", message: "" })
    }, 1500)
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
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                {dict.contact.form.email}
              </label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
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

            {isSubmitted && (
              <div className="p-4 bg-primary/10 text-primary rounded-md mt-4">
                Thank you for your message! We'll get back to you soon.
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
                    123 Pizza Street
                    <br />
                    Barcelona, 08001
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
                  <p className="text-muted-foreground mt-1">
                    +34 123 456 789
                    <br />
                    +34 987 654 321
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-muted-foreground mt-1">
                    info@labellapizza.com
                    <br />
                    orders@labellapizza.com
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium">{dict.contact.info.hours}</h3>
                  <div className="text-muted-foreground mt-1 space-y-1">
                    <p>Monday - Friday: 11:00 - 22:00</p>
                    <p>Saturday: 12:00 - 23:00</p>
                    <p>Sunday: 12:00 - 22:00</p>
                  </div>
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d95780.60782895174!2d2.0701683!3d41.3926467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49816718e30e5%3A0x44b0fb3d4f47660a!2sBarcelona%2C%20Spain!5e0!3m2!1sen!2sus!4v1653669573070!5m2!1sen!2sus"
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
