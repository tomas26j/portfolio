"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, ExternalLink, ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { setupIntersectionObserver } from "@/lib/animations"
import { useTranslations } from 'next-intl';

// Componente de carrusel de imágenes
const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [fullscreen, setFullscreen] = useState(false)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  // Evitar scroll de fondo cuando está en fullscreen
  useEffect(() => {
    if (fullscreen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [fullscreen])

  return (
    <>
      <div className="relative aspect-video border-2 border-gray-700 rounded-lg overflow-hidden cursor-pointer" onClick={() => setFullscreen(true)}>
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${title} - Image ${currentIndex + 1}`}
          fill
          className="object-cover"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={e => { e.stopPropagation(); prevImage(); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={e => { e.stopPropagation(); nextImage(); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={e => { e.stopPropagation(); setCurrentIndex(index); }}
                  className={`w-2 h-2 rounded-full transition-colors ${index === currentIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90" onClick={() => setFullscreen(false)}>
          <button
            className="absolute top-6 right-6 text-white bg-black/60 rounded-full p-2 hover:bg-black/80 transition-colors z-50"
            onClick={e => { e.stopPropagation(); setFullscreen(false); }}
            aria-label="Cerrar visualizador"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="relative w-full max-w-4xl aspect-video flex items-center justify-center">
            <Image
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`${title} - Image ${currentIndex + 1} fullscreen`}
              fill
              className="object-contain"
              style={{ background: "#111" }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={e => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={e => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default function Projects() {
  const t = useTranslations('projectsSection');
  const tContent = useTranslations('projectsContent');
  const tMini = useTranslations('miniProjects');
  const wordpressProjects = [
    {
      title: tContent('cancunTitle'),
      description: tContent('cancunDesc'),
      images: [
        "/cancun.com.ar/cancun-com-ar_00.png",
        "/cancun.com.ar/cancun-com-ar_0.png",
        "/cancun.com.ar/cancun-com-ar_1.png",
        "/cancun.com.ar/cancun-com-ar_2.png",
        "/cancun.com.ar/cancun-com-ar_3.png",
      ],
      tech: ["WordPress", "JavaScript", "PHP", "Elementor"],
      inspiration: "Inspired by CosmoWP's travel template",
      links: {
        github: "github.com/tomas26j",
        demo: "https://www.cancun.com.ar",
      },
    },
    {
      title: tContent('burbankTitle'),
      description: tContent('burbankDesc'),
      images: [
        "/burbankdetoxcenter/Burbank-Detox-Center_1.png",
        "/burbankdetoxcenter/Burbank-Detox-Center_2.png",
        "/burbankdetoxcenter/Burbank-Detox-Center_3.png",
      ],
      tech: ["WordPress", "PHP", "CSS3", "JavaScript"],
      inspiration: "Custom business template design",
      links: {
        github: "github.com/tomas26j",
        demo: "https://www.burbankdetox.com/",
      },
    },
  ]

  const reactProjects = [
    {
      title: tContent('sacabollosTitle'),
      description: tContent('sacabollosDesc'),
      images: [
        "/sacabolloquintana/sacabollos-quintana_0.png",
        "/sacabolloquintana/sacabollos-quintana_1.png",
        "/sacabolloquintana/sacabollos-quintana_2.png",
      ],
      tech: ["Vue", "React", "Styled Components", "CSS"],
      links: {
        github: "https://github.com/tomas26j/SacabolloQuintana",
        demo: "https://sacabollosquintana.netlify.app/",
      },
    },
    {
      title: tContent('uchronoTitle'),
      description: tContent('uchronoDesc'),
      images: [
        "/uchrono/uchrono_0.png",
        "/uchrono/uchrono_1.png",
        "/uchrono/uchrono_2.png",
        "/uchrono/uchrono_3.png",
        "/uchrono/uchrono_4.png",
      ],
      tech: ["React", "Craco", "Radix UI", "Tailwind CSS", "Chart.js", "Node.js"],
      features: ["Multi APIs Integration", "Investment Calculator", "Timeline Visualization", "Curated Scenarios"],
      links: {
        github: "https://github.com/tomas26j/Uchrono",
        demo: "https://uchronia.netlify.app/",
      },
    },
    {
      title: tContent('trackerhubTitle'),
      description: tContent('trackerhubDesc'),
      images: [
        "/trackerhub/TrackerHub_0.png",
        "/trackerhub/TrackerHub_1.png",
        "/trackerhub/TrackerHub_2.png",
        "/trackerhub/TrackerHub_4.png",
        "/trackerhub/TrackerHub_5.png",
      ],
      tech: ["React", "TailwindCSS", "", "Express.js", "Sequelize", "React", "Redux"],
      features: ["Trip CRUD", "Search by name and filters", "REST Countries API integration"],
      links: {
        github: "https://github.com/tomas26j/TrackerHub",
        demo: "https://tracker-hub-sooty.vercel.app/",
      },
    },
  ]

  const educationalProjects = [
    {
      title: tMini('meliTitle'),
      description: tMini('meliDesc'),
      image: "/miniprojects/Mercado-Libre-Clone_0.png",
      tech: ["React", "TailwindCSS"],
      links: { github: "https://github.com/tomas26j/MELI-UI-CLON", demo: "https://tomas26j-meli-clone.netlify.app/" },
    },
    {
      title: tMini('sushiTitle'),
      description: tMini('sushiDesc'),
      image: "/miniprojects/Sushi-bot_0.png",
      tech: ["JavaScript", "API"],
      links: { github: "https://github.com/tomas26j/Chatbot-code-challenge", demo: "#" },
    },
    {
      title: tMini('todoTitle'),
      description: tMini('todoDesc'),
      image: "/miniprojects/Gestor-De-Tareas_0.png",
      tech: ["TypeScript", "React", "TailwindCSS"],
      links: { github: "https://github.com/tomas26j/ChallengeForIT", demo: "#" },
    },
    {
      title: tMini('videoSpeedTitle'),
      description: tMini('videoSpeedDesc'),
      image: "/miniprojects/Universal-video-speed.png",
      tech: ["React", "CSS3"],
      links: { github: "https://github.com/tomas26j/UniversalVideoSpeed", demo: "#" },
    },
    {
      title: tMini('linkBioTitle'),
      description: tMini('linkBioDesc'),
      image: "/miniprojects/Link-In-Bio_0.png",
      tech: ["JavaScript", "CSS"],
      links: { github: "#", demo: "#" },
    },
    {
      title: tMini('pomodoroTitle'),
      description: tMini('pomodoroDesc'),
      image: "/miniprojects/Pomodoro-Timer_0.png",
      tech: ["React", "Context API"],
      links: { github: "https://github.com/tomas26j/vibrant-pomodoro-timer", demo: "https://vibrant-pomodoro-timer.vercel.app/" },
    },
  ]

  useEffect(() => {
    setupIntersectionObserver()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 lg:px-16 bg-background/95 dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">03.</span> {t('heading')}
        </h2>

        {/* WordPress Sites Section */}
        <div className="mb-16">
          <h3 data-aos="fade-up" className="text-2xl font-semibold mb-8 text-primary">
            {t('wordpress')}
          </h3>
          <div className="grid gap-8">
            {wordpressProjects.map((project, index) => (
              <Card key={index} data-aos="fade-up" className="bg-card border-none dark:bg-card/20">
                <CardContent className="grid lg:grid-cols-2 gap-8 p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Featured Project</div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                    <div className="text-sm text-muted-foreground">{project.inspiration}</div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-sm text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      {/* Elimino el botón de GitHub, dejo solo el de demo */}
                      <Link
                        href={project.links.demo}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <ImageCarousel images={project.images} title={project.title} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* React Framework Sites Section */}
        <div className="mb-16">
          <h3 data-aos="fade-up" className="text-2xl font-semibold mb-8 text-primary">
            {t('react')}
          </h3>
          <div className="grid gap-8">
            {reactProjects.map((project, index) => (
              <Card key={index} data-aos="fade-up" className="bg-card border-none dark:bg-card/20">
                <CardContent className="grid lg:grid-cols-2 gap-8 p-6">
                  <div className="space-y-4">
                    <div className="text-sm text-muted-foreground">Featured Project</div>
                    <CardTitle className="text-2xl">{project.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">{project.description}</CardDescription>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-sm text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <Link
                        href={project.links.github}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href={project.links.demo}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                  <ImageCarousel images={project.images} title={project.title} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Educational/Mini Projects Section */}
        <div>
          {/* Sandbox Badge */}
          <div className="flex justify-center mb-6">
            <a
              href="https://sandbox.tuportfolio.com" // <-- Change this URL to your real sandbox
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/90 hover:bg-yellow-500 text-black font-semibold shadow-lg border-2 border-yellow-600 transition-all text-base animate-bounce-slow"
              style={{ zIndex: 10 }}
            >
              <span role="img" aria-label="sandbox">🧪</span>
              {t('sandboxBadge')}
              <span className="hidden sm:inline">{t('sandboxDesc')}</span>
            </a>
          </div>
          <h3 data-aos="fade-up" className="text-2xl font-semibold mb-8 text-primary">
            {t('educational')}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {educationalProjects.map((project, index) => (
              <Card
                key={index}
                data-aos="fade-up"
                className="bg-card border-none dark:bg-card/20 hover:scale-105 transition-transform duration-300"
              >
                <CardContent className="p-4">
                  <div className="relative aspect-video mb-4 border border-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <CardTitle className="text-lg mb-2">{project.title}</CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mb-3">
                    {project.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map((t, i) => (
                      <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Link href={project.links.github} className="text-foreground/60 hover:text-foreground" target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                    <Link href={project.links.demo} className="text-foreground/60 hover:text-foreground" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
