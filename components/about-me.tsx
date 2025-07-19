'use client'
import { Card, CardContent } from "@/components/ui/card"
import { useEffect } from 'react'
import { setupIntersectionObserver } from '@/lib/animations'
import IconCarousel from './IconCarousel';
import { useTranslations } from 'next-intl';

export default function AboutMe() {
  const t = useTranslations('aboutMe');
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
          <span className="text-muted-foreground">01.</span> {t('heading')}
        </h2>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <p className="text-muted-foreground">
              {t('intro')}
            </p>
            <p className="text-muted-foreground">
              {t('focus')}
            </p>
          </div>
          <Card className="bg-card border-none dark:bg-card/20">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">{t('skillsTitle')}</h3>
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
