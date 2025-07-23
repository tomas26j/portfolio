"use client"

import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { setupIntersectionObserver } from '@/lib/animations'
import { useTranslations } from 'next-intl';

export default function Contact() {
  const t = useTranslations('contactSection');
  const form = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    setupIntersectionObserver();
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    // Honeypot protection
    const honeypot = (form.current.elements.namedItem('_honeypot') as HTMLInputElement)?.value;
    if (honeypot) {
      // Si el honeypot está lleno, no enviar
      return;
    }
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_gzajc8d",    // Service ID
        "template_0rdzh9d",   // Template ID
        form.current,
        "Jc7jS1cQPbiVI_Hty"   // Public Key
      )
      .then(
        () => {
          setSent(true);
          setError(false);
          setIsSubmitting(false);
          form.current?.reset();
          setTimeout(() => setSent(false), 5000);
        },
        () => {
          setError(true);
          setIsSubmitting(false);
          setTimeout(() => setError(false), 5000);
        }
      );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));

    setShowSuccess(true);
    setName('');
    setEmail('');
    setMessage('');
    setIsSubmitting(false);

    // Hide success message after 5 seconds
    setTimeout(() => setShowSuccess(false), 5000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 lg:px-16 bg-background/60 dark:bg-background/60">
      <div data-aos="fade-up" className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{t('heading')}</h2>
        <p className="text-muted-foreground mb-8">
          {t('subtitle')}
        </p>
        
        <Card className="dark:bg-card/20">
          <CardHeader>
            <CardTitle>{t('formTitle')}</CardTitle>
            <CardDescription>
              {t('formDesc')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form ref={form} onSubmit={sendEmail} className="space-y-4">
              {/* Honeypot field (hidden from users) */}
              <input
                type="text"
                name="_honeypot"
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    {t('name')}
                  </label>
                  <Input 
                    id="name" 
                    name="user_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t('namePlaceholder')} 
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    {t('email')}
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    name="user_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')} 
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t('messagePlaceholder')}
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? t('sending') : t('send')}
              </Button>
              {sent && (
                <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md text-center">
                  {t('success')}
                </div>
              )}
              {error && (
                <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-md text-center">
                  {t('error')}
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
