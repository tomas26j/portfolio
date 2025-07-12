'use client'
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from 'react'
import { setupIntersectionObserver } from '@/lib/animations'
import IconCarousel from './IconCarousel';

export default function AboutMe() {
  useEffect(() => {
    setupIntersectionObserver();
  }, []);
  
  const skills = [
    "JavaScript (ES6+)", "React", "Node.js", "Express", 
    "Next.js", "VUE", "PostgreSQL", "MongoDB",
    "HTML5", "CSS3", "Styled Components", "Tailwind CSS",
    "Git", "Agile Methodologies", "Scrum", "CI/CD"
  ]
  
  return (
    <section id="about-me" data-aos="fade-up" className="py-20 px-4 sm:px-8 lg:px-16 bg-background/95 dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">01.</span> About Me
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              Hello! I'm Tomás, a passionate fullstack developer with a keen interest in building digital experiences that make a difference. My journey in tech started back in 2020, and since then, I've had the privilege of learning a diverse range of technologies and projects.
            </p>
            <p className="text-muted-foreground">
              My focus is on creating efficient, scalable, and user-friendly solutions. I love diving into complex problems and emerging with elegant solutions. Whether it's crafting responsive front-end interfaces or architecting robust back-end systems, I'm always excited to take on new challenges.
            </p>
          </div>
          <Card className="bg-card border-none dark:bg-card/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
              <div className="grid grid-cols-2 gap-2">
                {skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{skill}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      <IconCarousel />
    </div>
  </section>
  )
}
