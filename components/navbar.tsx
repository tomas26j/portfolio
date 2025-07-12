"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { useEffect, useState } from 'react'
import { smoothScroll } from '@/lib/smoothScroll'

export function Navbar() {
  const [isSticky, setIsSticky] = useState(false)

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSticky ? 'bg-background/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <Link href="#about-me" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            About me
          </Link>
          <Link href="#learning-path" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            Education
          </Link>
          <Link href="#projects" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            Projects
          </Link>
          <Link href="#experience" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            Experience
          </Link>
          <Link href="#contact" onClick={smoothScroll} className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground">
            Contact
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}
