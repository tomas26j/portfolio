'use client'
import { useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { setupIntersectionObserver } from '@/lib/animations'

export default function LearningPath() {
  useEffect(() => {
    setupIntersectionObserver();
  }, []);

  const learningTimeline = [
    {
      program: "Bachelor's degree in Data Science",
      institution: "UNSAM",
      date: "MARCH 2024 - PRESENT",
      description: [
        "Currently pursuing a Bachelor's degree in Data Science at UNSAM.",
        "My goal is to acquire data analysis skills to solve real-world problems and contribute to the development of innovative solutions."
      ]
    },
    {
      program: "Fullstack Development",
      institution: "Soy Henry",
      date: "MARCH 2023 - SEPTEMBER 2023",
      description: [
        "Immersed myself in a rigorous Fullstack web development program focused on the PERN stack.",
        "Gained solid skills in creating interactive interfaces using React and Redux.",
        "Learned to manage databases with PostgreSQL and Sequelize.",
        "Became familiar with agile methodologies like SCRUM and AGILE."
      ]
    },
    {
      program: "Backend Development Career",
      institution: "CoderHouse",
      date: "MARCH 2022 - APRIL 2023",
      description: [
        "Acquired a deep understanding of the logic behind web applications and how to optimize their performance.",
        "Became familiar with ECMAScript 6, MySQL, and MongoDB.",
        "Learned to create and manage REST APIs and perform CRUD operations."
      ]
    },
    {
      program: "Initial Web Development",
      institution: "UTN Buenos Aires",
      date: "OCTOBER 2022 - DECEMBER 2022",
      description: [
        "Learned to build robust structures using HTML5 and bring interfaces to life with CSS, including Responsive Design techniques.",
        "Gained a solid understanding of JavaScript, enabling me to add interactivity and dynamism to web pages.",
        "This training provided me with a fundamental foundation in Front-End development."
      ]
    }
  ]

  return (
    <section id="learning-path" className="py-20 px-4 sm:px-8 lg:px-16 bg-background dark:bg-background/95">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">02.</span> My Learning Path
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
