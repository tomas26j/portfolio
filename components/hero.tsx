'use client'
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Code, Download } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from 'react'
import { setupIntersectionObserver } from '@/lib/animations'
import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');
  const [isDownloading, setIsDownloading] = useState(false);
  
  useEffect(() => {
    setupIntersectionObserver();
  }, []);

  const handleDownloadCV = async () => {
    setIsDownloading(true);
    try {
      // Intentar descargar el PDF
      const response = await fetch('/Tomas_Riera_CV.pdf');
      
      if (!response.ok) {
        throw new Error('PDF no encontrado');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Tomas_Riera_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // Mostrar mensaje de éxito (opcional)
      console.log('CV descargado exitosamente');
    } catch (error) {
      console.error('Error al descargar el CV:', error);
      // Mostrar mensaje de error al usuario
      alert('Error al descargar el CV. Por favor, contacta directamente para obtener una copia.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-20">
      <div id="HERO" data-aos="fade-up" className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
            {t('subtitle')}
          </p>
          <div id="Social" className="flex items-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={handleDownloadCV}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black mr-2"></div>
                  Descargando...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  {t('downloadCV')}
                </>
              )}
            </Button>
            <div className="flex gap-4">
              <Link href="https://www.linkedin.com/in/tomasriera/" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://github.com/tomas26j" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="https://leetcode.com/u/tomas26j/" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Code className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[500px]">
          <Image
            src="/New Project-4.png"
            alt="Retrato en arte ASCII"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
