"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from 'react'
import { smoothScroll } from '@/lib/smoothScroll'
import { usePathname, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false)
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('navbar');

  // Obtiene el locale actual de la ruta
  const currentLocale = pathname?.split('/')[1] || 'es';

  // Cambia el idioma manteniendo la sección/hash si es posible
  const handleLocaleChange = (locale: string) => {
    let rest = pathname?.split('/').slice(2).join('/') || '';
    if (rest) rest = '/' + rest;
    // Mantiene el hash si existe
    const hash = window.location.hash || '';
    router.push(`/${locale}${rest}${hash}`);
  };

  useEffect(() => {
    const handleScroll = () => {  
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 sm:flex sm:justify-start sm:mt-0 sm:mb-0 ${isSticky ? 'bg-background/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex flex-wrap sm:flex-row sm:justify-between sm:justify-start sm:items-center sm:text-left">
        <div className="flex gap-6 sm:items-center sm:pt-[10px] sm:pb-[10px]">
          <Link href="#about-me" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            {t('aboutMe')}
          </Link>
          <Link href="#experience" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            {t('experience')}
          </Link>
          <Link href="#projects" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            {t('projects')}
          </Link>
          <Link href="#learning-path" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            {t('education')}
          </Link>
          <Link href="#contact" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            {t('contact')}
          </Link>
        </div>
        {/* Selector de idioma */}
        <div className="ml-0 flex gap-2 sm:gap-5 sm:pl-0 sm:pr-0 sm:mt-[15px] sm:mb-[15px]">
          <ThemeToggle />
          <button
            onClick={() => handleLocaleChange('es')}
            className={`px-2 py-1 rounded text-sm font-semibold border ${currentLocale === 'es' ? 'bg-primary text-black' : 'bg-background text-foreground border-primary/40'}`}
            aria-label="Cambiar a español"
          >
            ES
          </button>
          <button
            onClick={() => handleLocaleChange('en')}
            className={`px-2 py-1 rounded text-sm font-semibold border ${currentLocale === 'en' ? 'bg-primary text-black' : 'bg-background text-foreground border-primary/40'}`}
            aria-label="Cambiar a inglés"
          >
            EN
          </button>
        </div>
      </div>
    </nav>
  )
}
