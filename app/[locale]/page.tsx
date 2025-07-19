"use client";
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import Hero from '@/components/hero';
import AboutMe from '@/components/about-me';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import { Navbar } from '@/components/navbar';
import LearningPath from '@/components/learning-path';
import CertificationCarousel from '@/components/CertificationCarousel';

export default function Home() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');

  useEffect(() => {
    setMounted(true);
    setCurrentTheme(resolvedTheme || 'dark');
  }, [resolvedTheme]);

  // Renderizar un placeholder mientras se monta para evitar problemas de hidratación
  if (!mounted) {
    return (
      <main className="min-h-screen bg-background relative">
        <div className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-20 bg-repeat" style={{ backgroundSize: '600px 600px' }} />
        <Navbar />
        <Hero />
        <AboutMe />
        <LearningPath />
        <Projects />
        <CertificationCarousel />
        <Experience />
        <Contact />
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-background relative">
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-20"
        style={{
          backgroundImage: `url(${currentTheme === 'dark' ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-dark-fAGdYquHIrL7yMNe8B9J4ZrYgv3I57.png' : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-light-kvOiCewPaC0mHJVqtHBNpgbXsBMHuT.png'})`,
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
  );
} 