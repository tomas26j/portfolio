import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Code, Zap, Building, BarChart2, Clock, X } from "lucide-react"
import { useTranslations } from 'next-intl';

interface Project {
  slug: string
  title: string
  description: string
  overview?: string
  images: string[]
  tech: string[]
  techDetails?: {
    frontend?: string[]
    backend?: string[]
    database?: string[]
    deployment?: string[]
    tools?: string[]
  }
  features?: string[]
  challenges?: string[]
  solutions?: string[]
  results?: string[]
  timeline?: { phase: string; duration: string; description: string }[]
  links: {
    github?: string
    demo?: string
  }
}

interface FullScreenProjectModalProps {
  project: Project
  open: boolean
  onClose: () => void
}

export const FullScreenProjectModal: React.FC<FullScreenProjectModalProps> = ({ project, open, onClose }) => {
  if (!open) return null

  const t = useTranslations('projectDetails');

  const hasTimeline = Array.isArray(project.timeline) && project.timeline.length > 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadein"
      style={{ animation: 'fadein 0.2s' }}
    >
      <div className="relative w-full max-w-5xl max-h-[95vh] overflow-y-auto bg-background rounded-lg shadow-lg p-6">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 bg-white shadow-lg text-primary-foreground hover:bg-primary hover:text-primary-foreground transition-colors p-4 rounded-full focus:outline-none border border-border z-50"
          aria-label="Cerrar"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="space-y-8">
          {/* Header */}
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl text-center">{project.title}</CardTitle>
              <p className="text-center text-muted-foreground text-lg">{project.description}</p>
            </CardHeader>
          </Card>

          {/* Overview */}
          {project.overview && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('overview')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </CardContent>
            </Card>
          )}

          {/* Screenshots */}
          {project.images && project.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('screenshots')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden border">
                    <img
                      src={project.images[0] || "/placeholder.svg"}
                      alt={`${project.title} Screenshot 1`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Si hay más de una imagen, mostrar miniaturas o controles aquí si se desea */}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Features */}
          {project.features && project.features.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('features')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tech Stack */}
          {project.techDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('techStack')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {project.techDetails.frontend && project.techDetails.frontend.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold">{t('frontend')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techDetails.frontend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.techDetails.backend && project.techDetails.backend.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold">{t('backend')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techDetails.backend.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.techDetails.database && project.techDetails.database.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-5 w-5 text-purple-500" />
                        <h3 className="font-semibold">{t('database')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techDetails.database.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.techDetails.deployment && project.techDetails.deployment.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-orange-500" />
                        <h3 className="font-semibold">{t('deployment')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techDetails.deployment.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  {project.techDetails.tools && project.techDetails.tools.length > 0 && (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Code className="h-5 w-5 text-gray-500" />
                        <h3 className="font-semibold">{t('tools')}</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.techDetails.tools.map((tech, index) => (
                          <Badge key={index} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Challenges & Solutions */}
          {(project.challenges && project.challenges.length > 0) || (project.solutions && project.solutions.length > 0) ? (
            <div className="grid md:grid-cols-2 gap-6">
              {project.challenges && project.challenges.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('challenges')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.challenges.map((challenge, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{challenge}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              {project.solutions && project.solutions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{t('solutions')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {project.solutions.map((solution, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{solution}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          ) : null}

          {/* Results */}
          {project.results && project.results.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('results')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                  {project.results.map((result, index) => (
                    <div key={index} className="text-center space-y-2">
                      <BarChart2 className="h-8 w-8 text-primary mx-auto" />
                      <p className="text-muted-foreground">{result}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Timeline */}
          {hasTimeline && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">{t('timeline')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {project.timeline!.map((phase, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-primary rounded-full" />
                        {index < project.timeline!.length - 1 && <div className="w-px h-16 bg-border mt-2" />}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{phase.phase}</h3>
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {phase.duration}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm">{phase.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <style jsx global>{`
        @keyframes fadein {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  )
} 