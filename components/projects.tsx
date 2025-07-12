"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card"
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { setupIntersectionObserver } from "@/lib/animations"

// Componente de carrusel de imágenes
const ImageCarousel = ({ images, title }: { images: string[]; title: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="relative aspect-video border-2 border-gray-700 rounded-lg overflow-hidden">
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${title} - Image ${currentIndex + 1}`}
        fill
        className="object-cover"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Projects() {
  const wordpressProjects = [
    {
      title: "Cancun.com.ar",
      description:
        "Travel website created with WordPress and JavaScript. Inspired by CosmoWP's travel template, it offers an intuitive user experience for exploring destinations and booking trips.",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Projects_Preview_CANCUN-1wpspb6MjNWhDQFYblqdVtD3WFTrnc.png",
        "/placeholder.svg?height=400&width=600",
      ],
      tech: ["WordPress", "JavaScript", "PHP", "MySQL"],
      inspiration: "Inspired by CosmoWP's travel template",
      links: {
        github: "github.com/tomas26j",
        demo: "cancun.com.ar",
      },
    },
    {
      title: "Business Portfolio Site",
      description:
        "Professional business website built with WordPress, featuring custom themes, responsive design, and integrated contact forms. Optimized for SEO and performance.",
      images: ["/placeholder.svg?height=400&width=600", "/placeholder.svg?height=400&width=600"],
      tech: ["WordPress", "PHP", "CSS3", "JavaScript"],
      inspiration: "Custom business template design",
      links: {
        github: "github.com/tomas26j",
        demo: "#",
      },
    },
  ]

  const reactProjects = [
    {
      title: "Mercado Libre Frontend Clone",
      description:
        "Clones Mercado Libre's frontend using modern technologies like Vue, React, Styled Components, and CSS. Replicates the user interface and functionality of Mercado Libre's product pages.",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project_Preview_MLclone.jpg-cNEoHbzEKvJYQQqYRtivnpElqhXtay.jpeg",
        "/placeholder.svg?height=400&width=600",
      ],
      tech: ["Vue", "React", "Styled Components", "CSS"],
      inspiration: "Inspired by Mercado Libre's product pages",
      links: {
        github: "github.com/tomas26j",
        demo: "#",
      },
    },
    {
      title: "Countries APP",
      description:
        "Web application that consumes the REST Countries API to obtain country information and stores it in a PostgreSQL database. Allows users to create and manage a record of their trips, including destinations, activities, and other details.",
      images: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Project_Preview_CountriesAPP.jpg-06ao35PUHXU4crWlAJGJiR8H8GMppc.jpeg",
        "/placeholder.svg?height=400&width=600",
      ],
      tech: ["JavaScript", "PostgreSQL", "Node.js", "Express.js", "Sequelize", "React", "Redux"],
      features: ["Trip CRUD", "Search by name and filters", "REST Countries API integration"],
      links: {
        github: "github.com/tomas26j",
        demo: "#",
      },
    },
  ]

  const educationalProjects = [
    {
      title: "Todo List App",
      description: "Simple task management app with CRUD operations",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "LocalStorage"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Weather App",
      description: "Weather forecast app using OpenWeather API",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["JavaScript", "API"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Calculator",
      description: "Scientific calculator with advanced operations",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["HTML", "CSS", "JavaScript"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Memory Game",
      description: "Card matching memory game with scoring",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "CSS3"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Color Palette Generator",
      description: "Generate and save custom color palettes",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["JavaScript", "CSS"],
      links: { github: "#", demo: "#" },
    },
    {
      title: "Pomodoro Timer",
      description: "Productivity timer with customizable intervals",
      image: "/placeholder.svg?height=200&width=300",
      tech: ["React", "Context API"],
      links: { github: "#", demo: "#" },
    },
  ]

  useEffect(() => {
    setupIntersectionObserver()
  }, [])

  return (
    <section id="projects" className="py-20 px-4 sm:px-8 lg:px-16 bg-background/95 dark:bg-background">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="fade-up" className="text-3xl font-bold mb-12">
          <span className="text-muted-foreground">03.</span> Some Things I've Built
        </h2>

        {/* WordPress Sites Section */}
        <div className="mb-16">
          <h3 data-aos="fade-up" className="text-2xl font-semibold mb-8 text-primary">
            Sitios de WordPress
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
                      <Link
                        href={project.links.github}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href={project.links.demo}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
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
            Sitios con Frameworks de React
          </h3>
          <div className="grid gap-8">
            {reactProjects.map((project, index) => (
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
                      <Link
                        href={project.links.github}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
                      >
                        <Github className="h-5 w-5" />
                      </Link>
                      <Link
                        href={project.links.demo}
                        className="text-foreground/60 hover:text-foreground dark:text-foreground/80 dark:hover:text-foreground"
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
          <h3 data-aos="fade-up" className="text-2xl font-semibold mb-8 text-primary">
            Proyectos Educativos / Mini-Proyectos
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
                    <Link href={project.links.github} className="text-foreground/60 hover:text-foreground">
                      <Github className="h-4 w-4" />
                    </Link>
                    <Link href={project.links.demo} className="text-foreground/60 hover:text-foreground">
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
