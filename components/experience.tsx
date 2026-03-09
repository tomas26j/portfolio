'use client'
import { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { setupIntersectionObserver } from '@/lib/animations'
import { useTranslations } from 'next-intl';

export default function Experience() {
  const t = useTranslations('experience');
  useEffect(() => {
    setupIntersectionObserver();
  }, []);
  
  const timeline = [
    {
      company: t('ulpanCompany'),
      date: t('ulpanDate'),
      role: t('ulpanRole'),
      description: [
        t('ulpanDesc1'),
        t('ulpanDesc2'),
        t('ulpanDesc3')
      ]
    },
    {
      company: "ForIT — Banco de Alimentos",
      date: "DEC 2025 - FEB 2026",
      role: "Desarrollador Mobile (React + Capacitor)",
      description: [
        "Desarrollo de app híbrida para donantes y beneficiarios: publicación/aceptación de donaciones y gestión de datos de entrega.",
        "Integración de notificaciones push (Firebase-APN), caching y manejo de offline, y análisis-descarga de historiales.",
        "Trabajo con monorepo (yarn workspaces), Storybook, Tailwind y prácticas TDD."
      ]
    },
    {
      company: "ForIT - BarPoint",
      date: "SEP 2025 - DEC 2025",
      role: "Desarrollador Fullstack",
      description: [
        "Implementación de core features: autenticación (Google + email), RBAC, gestión de promociones y sistema de puntos.",
        "Desarrollo de flujos QR para registro y canje, integración con MercadoPago, y paneles por rol (Owner/Employee/Admin/Consumer).",
        "TDD con Vitest, React SSR + re-hydration, TypeORM (SQLite) y despliegue con Docker Compose."
      ]
    },
    {
      company: "Freelance",
      date: "JUN 2023 - JUL 2025",
      role: t('freelanceRole'),
      description: [t('freelanceDesc')]
    },    
  ]

  return (
    <section
      id="experience"
      className="py-20 px-4 sm:px-8 lg:px-16 bg-background/60 dark:bg-background/60"
    >
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">02.</span> {t("heading")}
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border" />

          <div className="space-y-12">
            {timeline.map((item, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                className="relative ml-8 bg-card border-none dark:bg-card/20"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[35px] top-6 h-4 w-4 rounded-full bg-primary" />

                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">
                    {item.date}
                  </div>
                  <h3 className="text-xl font-semibold mb-1">{item.company}</h3>
                  <div className="text-primary mb-4">{item.role}</div>
                  {item.description && item.description.length > 1 ? (
                    item.description.map((desc, descIndex) => (
                      <ul key={descIndex} className="list-disc list-inside space-y-2 text-muted-foreground">
                        {desc}
                      </ul>
                    ))
                  ) : (
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                      {item.description}
                    </ul>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
