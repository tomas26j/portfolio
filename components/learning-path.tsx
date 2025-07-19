'use client'
import { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { setupIntersectionObserver } from '@/lib/animations'
import { useTranslations } from 'next-intl';

export default function LearningPath() {
  const t = useTranslations('learningPath');
  useEffect(() => {
    setupIntersectionObserver();
  }, []);

  const learningTimeline = [
    {
      program: t('bachelor'),
      institution: "UNSAM",
      date: "MARCH 2024 - PRESENT",
      description: [
        t('bachelorDesc1'),
        t('bachelorDesc2')
      ]
    },
    {
      program: t('fullstack'),
      institution: "Soy Henry",
      date: "MARCH 2023 - SEPTEMBER 2023",
      description: [
        t('fullstackDesc1'),
        t('fullstackDesc2'),
        t('fullstackDesc3'),
        t('fullstackDesc4')
      ]
    },
    {
      program: t('backend'),
      institution: "CoderHouse",
      date: "MARCH 2022 - APRIL 2023",
      description: [
        t('backendDesc1'),
        t('backendDesc2'),
        t('backendDesc3')
      ]
    },
    {
      program: t('initialWeb'),
      institution: "UTN Buenos Aires",
      date: "OCTOBER 2022 - DECEMBER 2022",
      description: [
        t('initialWebDesc1'),
        t('initialWebDesc2'),
        t('initialWebDesc3')
      ]
    }
  ]

  return (
    <section id="learning-path" className="py-20 px-4 sm:px-8 lg:px-16 bg-background dark:bg-background/95">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">02.</span> {t('heading')}
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border" />
          
          <div className="space-y-12">
            {learningTimeline.map((item, index) => (
              <Card key={index} data-aos="fade-up" className="relative ml-8 bg-card border-none dark:bg-card/20">
                {/* Timeline dot */}
                <div className="absolute -left-[35px] top-6 h-4 w-4 rounded-full bg-primary" />
                
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold mb-1">{item.institution}</h3>
                  <div className="text-primary mb-4">{item.program}</div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
