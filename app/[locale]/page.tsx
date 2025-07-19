import Hero from '@/components/hero';
import AboutMe from '@/components/about-me';
import Projects from '@/components/projects';
import Experience from '@/components/experience';
import Contact from '@/components/contact';
import { Navbar } from '@/components/navbar';
import LearningPath from '@/components/learning-path';
import CertificationCarousel from '@/components/CertificationCarousel';
import { ThemeWrapper } from '@/components/theme-wrapper';

// Función necesaria para generar páginas estáticas
export async function generateStaticParams() {
  return [
    { locale: 'es' },
    { locale: 'en' }
  ];
}

export default function Home() {
  return (
    <ThemeWrapper>
      <main className="min-h-screen bg-background relative">
        <Navbar />
        <Hero />
        <AboutMe />
        <LearningPath />
        <Projects />
        <CertificationCarousel />
        <Experience />
        <Contact />
      </main>
    </ThemeWrapper>
  );
} 