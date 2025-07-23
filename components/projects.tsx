"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, ExternalLink, ChevronLeft, ChevronRight, X, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { setupIntersectionObserver } from "@/lib/animations"
import { useTranslations } from 'next-intl';
import { getStaticPath } from '@/lib/utils';
import { FullScreenProjectModal } from "@/components/ui/FullScreenProjectModal"

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
  const tDetails = useTranslations('common'); // Asume que tienes una key para 'moreDetails' o 'masDetalles'

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const wordpressProjects = [
    {
      slug: "cancun-com-ar",
      title: tContent('cancunTitle'),
      description: tContent('cancunDesc'),
      overview: tContent('cancunOverview'),
      images: [
        getStaticPath("/cancun.com.ar/cancun-com-ar_00.png"),
        getStaticPath("/cancun.com.ar/cancun-com-ar_0.png"),
        getStaticPath("/cancun.com.ar/cancun-com-ar_1.png"),
        getStaticPath("/cancun.com.ar/cancun-com-ar_2.png"),
        getStaticPath("/cancun.com.ar/cancun-com-ar_3.png"),
      ],
      tech: ["WordPress", "JavaScript", "PHP", "Elementor"],
      techDetails: {
        frontend: ["WordPress", "Elementor"],
        backend: ["PHP"],
        database: ["MySQL"],
        deployment: ["Shared Hosting"],
        tools: ["Google Analytics"]
      },
      features: [tContent('cancunFeature1'), tContent('cancunFeature2')],
      challenges: [tContent('cancunChallenge1')],
      solutions: [tContent('cancunSolution1')],
      results: [tContent('cancunResult1')],
      timeline: [
        { phase: tContent('cancunPhase1'), duration: tContent('cancunDuration1'), description: tContent('cancunPhaseDesc1') },
      ],
      links: {
        github: "github.com/tomas26j",
        demo: "https://www.cancun.com.ar",
      },
    },
    {
      slug: "burbank-detox-center",
      title: tContent('burbankTitle'),
      description: tContent('burbankDesc'),
      overview: tContent('burbankOverview'),
      images: [
        getStaticPath("/burbankdetoxcenter/Burbank-Detox-Center_1.png"),
        getStaticPath("/burbankdetoxcenter/Burbank-Detox-Center_2.png"),
        getStaticPath("/burbankdetoxcenter/Burbank-Detox-Center_3.png"),
      ],
      tech: ["WordPress", "PHP", "CSS3", "JavaScript"],
      techDetails: {
        frontend: ["WordPress", "Custom CSS"],
        backend: ["PHP"],
        database: ["MySQL"],
        deployment: ["Shared Hosting"],
        tools: ["Contact Form 7"]
      },
      features: [tContent('burbankFeature1'), tContent('burbankFeature2')],
      challenges: [tContent('burbankChallenge1')],
      solutions: [tContent('burbankSolution1')],
      results: [tContent('burbankResult1')],
      timeline: [
        { phase: tContent('burbankPhase1'), duration: tContent('burbankDuration1'), description: tContent('burbankPhaseDesc1') },
      ],
      links: {
        github: "github.com/tomas26j",
        demo: "https://www.burbankdetox.com/",
      },
    },
  ]

  const reactProjects = [
    {
      slug: "sacabollos-quintana",
      title: tContent('sacabollosTitle'),
      description: tContent('sacabollosDesc'),
      overview: tContent('sacabollosOverview'),
      images: [
        getStaticPath("/sacabolloquintana/sacabollos-quintana_0.png"),
        getStaticPath("/sacabolloquintana/sacabollos-quintana_1.png"),
        getStaticPath("/sacabolloquintana/sacabollos-quintana_2.png"),
      ],
      tech: ["Vue", "React", "Styled Components", "CSS"],
      techDetails: {
        frontend: ["React", "Styled Components"],
        backend: [],
        database: [],
        deployment: ["Netlify"],
        tools: ["Figma"]
      },
      features: [tContent('sacabollosFeature1'), tContent('sacabollosFeature2')],
      challenges: [tContent('sacabollosChallenge1')],
      solutions: [tContent('sacabollosSolution1')],
      results: [tContent('sacabollosResult1')],
      timeline: [
        { phase: tContent('sacabollosPhase1'), duration: tContent('sacabollosDuration1'), description: tContent('sacabollosPhaseDesc1') },
      ],
      links: {
        github: "https://github.com/tomas26j/SacabolloQuintana",
        demo: "https://sacabollosquintana.netlify.app/",
      },
    },
    {
      slug: "uchrono",
      title: tContent('uchronoTitle'),
      description: tContent('uchronoDesc'),
      overview: tContent('uchronoOverview'),
      images: [
        getStaticPath("/uchrono/uchrono_0.png"),
        getStaticPath("/uchrono/uchrono_1.png"),
        getStaticPath("/uchrono/uchrono_2.png"),
        getStaticPath("/uchrono/uchrono_3.png"),
        getStaticPath("/uchrono/uchrono_4.png"),
      ],
      tech: ["React", "Craco", "Radix UI", "Tailwind CSS", "Chart.js", "Node.js"],
      techDetails: {
        frontend: ["React", "Radix UI", "Tailwind CSS", "Chart.js"],
        backend: ["Node.js"],
        database: ["PostgreSQL"],
        deployment: ["Vercel"],
        tools: ["Figma"]
      },
      features: [tContent('uchronoFeature1'), tContent('uchronoFeature2')],
      challenges: [tContent('uchronoChallenge1')],
      solutions: [tContent('uchronoSolution1')],
      results: [tContent('uchronoResult1')],
      timeline: [
        { phase: tContent('uchronoPhase1'), duration: tContent('uchronoDuration1'), description: tContent('uchronoPhaseDesc1') },
      ],
      links: {
        github: "https://github.com/tomas26j/Uchrono",
        demo: "https://uchronia.netlify.app/",
      },
    },
    {
      slug: "trackerhub",
      title: tContent('trackerhubTitle'),
      description: tContent('trackerhubDesc'),
      overview: tContent('trackerhubOverview'),
      images: [
        getStaticPath("/trackerhub/TrackerHub_0.png"),
        getStaticPath("/trackerhub/TrackerHub_1.png"),
        getStaticPath("/trackerhub/TrackerHub_2.png"),
        getStaticPath("/trackerhub/TrackerHub_4.png"),
        getStaticPath("/trackerhub/TrackerHub_5.png"),
      ],
      tech: ["React.js", "Redux Toolkit", "TailwindCSS", "GSAP", "D3.js", "IndexedDB"],
      techDetails: {
        frontend: ["React.js", "Redux Toolkit", "TailwindCSS (tema Energetic Zen)", "GSAP", "D3.js"],
        backend: ["Motor de Juego Personalizado", "Service Worker"],
        database: ["IndexedDB (~250MB+)", "LocalStorage (5-10MB)"],
        deployment: ["Vercel"],
        tools: ["Redux DevTools", "CSS Transforms", "PWA"]
      },
      features: [
        tContent('trackerhubFeature1'),
        tContent('trackerhubFeature2'),
        tContent('trackerhubFeature3'),
        tContent('trackerhubFeature4'),
        tContent('trackerhubFeature5'),
        tContent('trackerhubFeature6'),
      ],
      challenges: [
        tContent('trackerhubChallenge1'),
        tContent('trackerhubChallenge2'),
        tContent('trackerhubChallenge3'),
      ],
      solutions: [
        tContent('trackerhubSolution1'),
        tContent('trackerhubSolution2'),
        tContent('trackerhubSolution3'),
      ],
      results: [
        tContent('trackerhubResult1'),
        tContent('trackerhubResult2'),
        tContent('trackerhubResult3'),
        tContent('trackerhubResult4'),
      ],
      timeline: [
        { phase: tContent('trackerhubPhase1'), duration: tContent('trackerhubDuration1'), description: tContent('trackerhubPhaseDesc1') },
        { phase: tContent('trackerhubPhase2'), duration: tContent('trackerhubDuration2'), description: tContent('trackerhubPhaseDesc2') },
        { phase: tContent('trackerhubPhase3'), duration: tContent('trackerhubDuration3'), description: tContent('trackerhubPhaseDesc3') },
        { phase: tContent('trackerhubPhase4'), duration: tContent('trackerhubDuration4'), description: tContent('trackerhubPhaseDesc4') },
      ],
      links: {
        github: "https://github.com/example/trackerhub",
        demo: "https://trackerhub.vercel.app"
      },
    },
  ]

  const educationalProjects = [
    {
      title: tMini('meliTitle'),
      description: tMini('meliDesc'),
      image: getStaticPath("/miniprojects/Mercado-Libre-Clone_0.png"),
      tech: ["React", "TailwindCSS"],
      links: { github: "https://github.com/tomas26j/MELI-UI-CLON", demo: "https://tomas26j-meli-clone.netlify.app/" },
    },
    {
      title: tMini('sushiTitle'),
      description: tMini('sushiDesc'),
      image: getStaticPath("/miniprojects/Sushi-bot_0.png"),
      tech: ["JavaScript", "API"],
      links: { github: "https://github.com/tomas26j/Chatbot-code-challenge", demo: "#" },
    },
    {
      title: tMini('todoTitle'),
      description: tMini('todoDesc'),
      image: getStaticPath("/miniprojects/Gestor-De-Tareas_0.png"),
      tech: ["TypeScript", "React", "TailwindCSS"],
      links: { github: "https://github.com/tomas26j/ChallengeForIT", demo: "#" },
    },
    {
      title: tMini('videoSpeedTitle'),
      description: tMini('videoSpeedDesc'),
      image: getStaticPath("/miniprojects/Universal-video-speed.png"),
      tech: ["React", "CSS3"],
      links: { github: "https://github.com/tomas26j/UniversalVideoSpeed", demo: null }, // demo a null para desactivar
    },
    {
      title: tMini('linkBioTitle'),
      description: tMini('linkBioDesc'),
      image: getStaticPath("/miniprojects/Link-In-Bio_0.png"),
      tech: ["JavaScript", "CSS"],
      links: { github: "#", demo: "#" },
    },
    {
      title: tMini('pomodoroTitle'),
      description: tMini('pomodoroDesc'),
      image: getStaticPath("/miniprojects/Pomodoro-Timer_0.png"),
      tech: ["React", "Context API"],
      links: { github: "https://github.com/tomas26j/vibrant-pomodoro-timer", demo: "https://vibrant-pomodoro-timer.vercel.app/" },
    },
  ]

  useEffect(() => {
    setupIntersectionObserver()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 lg:px-16 bg-background/60 dark:bg-background/60">
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
                    <div className="text-sm text-muted-foreground">{project.overview}</div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-sm text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 items-center mt-2">
                      {/* Elimino el botón de GitHub, dejo solo el de demo */}
                      <Link
                        href={project.links.demo}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-5 w-5" />
                      </Link>
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                        onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                      >
                        <Eye className="w-4 h-4" />
                        {tDetails('moreDetails')}
                      </button>
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
                    <div className="text-sm text-muted-foreground">{project.overview}</div>
                    <div className="flex flex-wrap gap-3">
                      {project.tech.map((t, i) => (
                        <span key={i} className="text-sm text-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-4 items-center mt-2">
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
                      <button
                        className="inline-flex items-center gap-2 px-4 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
                        onClick={() => { setSelectedProject(project); setModalOpen(true); }}
                      >
                        <Eye className="w-4 h-4" />
                        {tDetails('moreDetails')}
                      </button>
                    </div>
                  </div>
                  <ImageCarousel images={project.images} title={project.title} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Modal de detalles de proyecto */}
        <FullScreenProjectModal
          project={selectedProject}
          open={modalOpen && !!selectedProject}
          onClose={() => { setModalOpen(false); setSelectedProject(null); }}
        />

        {/* Educational/Mini Projects Section */}
        <div>
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
                    {/* Botón de demo/deshabilitado según corresponda */}
                    {typeof project.links.demo === 'string' && project.links.demo && project.links.demo !== "#" ? (
                      <Link href={project.links.demo} className="text-foreground/60 hover:text-foreground" target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : project.title === tMini('todoTitle') || project.title === tMini('sushiTitle') ? (
                      <span className="text-foreground/30 cursor-not-allowed">
                        <ExternalLink className="h-4 w-4" />
                      </span>
                    ) : null}
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
