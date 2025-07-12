'use client'
import { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { setupIntersectionObserver } from '@/lib/animations'

export default function Experience() {
  useEffect(() => {
    setupIntersectionObserver();
  }, []);
  
  const timeline = [
    {
      company: "Freelance",
      date: "JUN 2023 - PRESENT",
      role: "Wordpress & React Developer",
      description: [
        "As a freelance developer, I have a proven track record of creating custom websites tailored to my clients' specific needs. I have extensive experience with technologies such as React, WordPress, and Next.js, along with PostgreSQL, enabling me to deliver scalable and user-friendly solutions."
      ]
    },    
    {
      company: "Electro Alvear",
      date: "JAN 2022",
      role: "Retail salesperson"
    },
    {
      company: "Sacabollos Quintana",
      date: "FEB 2021",
      role: "Car Detailer"
    }    
  ]

  return (
    <section id="experience" className="py-20 px-4 sm:px-8 lg:px-16 bg-background dark:bg-background/95">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">04.</span> Where I've Worked
        </h2>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 h-full w-px bg-border" />
          
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <Card key={index} data-aos="fade-up" className="relative ml-8 bg-card border-none dark:bg-card/20">
                {/* Timeline dot */}
                <div className="absolute -left-[35px] top-6 h-4 w-4 rounded-full bg-primary" />
                
                <CardContent className="p-6">
                  <div className="text-sm text-muted-foreground mb-2">{item.date}</div>
                  <h3 className="text-xl font-semibold mb-1">{item.company}</h3>
                  <div className="text-primary mb-4">{item.role}</div>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">{item.description}</ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
