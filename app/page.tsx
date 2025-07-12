'use client'
import { useTheme } from 'next-themes'
import Hero from '@/components/hero'
import AboutMe from '@/components/about-me'
import Projects from '@/components/projects'
import Experience from '@/components/experience'
import Contact from '@/components/contact'
import { ThemeProvider } from '@/components/theme-provider'
import { Navbar } from '@/components/navbar'
import LearningPath from '@/components/learning-path'
import CertificationCarousel from '@/components/CertificationCarousel'

export default function Home() {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
      <main className="min-h-screen bg-background relative">
        <div 
          className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-20"
          style={{
            backgroundImage: `url(${theme === 'dark' ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-dark-fAGdYquHIrL7yMNe8B9J4ZrYgv3I57.png' : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-light-kvOiCewPaC0mHJVqtHBNpgbXsBMHuT.png'})`,
            backgroundRepeat: 'repeat',
            backgroundSize: '600px 600px'
          }}
        />
        <Navbar />
        <Hero />
        <AboutMe />
        <LearningPath />
        <Projects />
        <CertificationCarousel />
        <Experience />
        <Contact />
      </main>
    </ThemeProvider>
  )
}
