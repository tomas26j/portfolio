'use client'
import { Button } from "@/components/ui/button"
import { Github, Instagram, Linkedin, Code } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"
import { useEffect } from 'react'
import { setupIntersectionObserver } from '@/lib/animations'

export default function Hero() {
  useEffect(() => {
    setupIntersectionObserver();
  }, []);  
  
  return (
    <section className="relative min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-20">
      <div id="HERO" data-aos="fade-up" className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
            Tomás Riera.
          </h1>
          <p className="text-xl text-muted-foreground max-w-md">
             Fullstack Developer, based in Buenos Aires.
          </p>
          <div id="Social" className="flex items-center gap-4">
            <Button 
              variant="default" 
              size="lg" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/Tomas_Riera_CV.pdf';
                link.download = 'Tomas_Riera_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                }}
            >
              Download CV
            </Button>
            <div className="flex gap-4">
              <Link href="https://leetcode.com/u/tomas26j/" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Code className="h-6 w-6" />
              </Link>
              <Link href="https://www.linkedin.com/in/tomasriera/" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Linkedin className="h-6 w-6" />
              </Link>
              <Link href="https://github.com/tomas26j" rel="noopener noreferrer" target="_blank" className="text-foreground/60 hover:text-foreground">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="relative w-full h-[500px]">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/man-OSBSz61PUl3weZitEy4ul5NalxyyUk.png"
            alt="Mysterious person in hoodie"
            layout="fill"
            objectFit="contain"
            className="rounded-lg"
          />
        </div>
      </div>
    </section>
  )
}
