'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card"

const certifications = [
  {
    titulo: "JavaScript Essentials 1",
    descripcion: "Cisco, in collaboration with OpenEDG JS Institute, verifies the earner of this badge successfully completed the JavaScript Essentials 1 course and achieved the student level credentials. Earners know the syntax of the core JavaScript; can work with variables, operators, flow control, and functions; know the basics of data types system; think algorithmically and can analyze problems using a programmatic conceptual apparatus; and can design, develop, and improve simple JavaScript programs.",
    linkInsignia: "https://www.credly.com/badges/f5c111b0-dde6-4a3e-b6cc-bc6b725664b2",
    urlImagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Badge_JSE1-tcP0naN4TjsEEPyGA9iB6x1B83VUsR.png"
  },
  {
    titulo: "JavaScript Essentials 2",
    descripcion: "Cisco, in collaboration with OpenEDG JS Institute, verifies the earner of this badge successfully completed the JavaScript Essentials 2 course and achieved the student level credentials. Earner should know coding techniques while introducing both class-based and classless approaches in object-oriented programming, be familiar with a curated range of built-in objects that extend programming capabilities, manage complex data structures, such as Map and Set, and asynchronous programming.",
    linkInsignia: "https://www.credly.com/badges/6c5928d5-dff3-45ed-93f6-7ea5124f77e1",
    urlImagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Badge_JSE2-QVtPB3GyAzC3Zbll4Mfqzh732iOZhs.png"
  },
  {
    titulo: "Operating Systems Basics",
    descripcion: "Cisco verifies the earner of this badge successfully completed the Operating Systems Basics course and achieved this student level credential. Earner has fundamental knowledge of operating systems by covering the basic concepts and skills needed to explain the purpose and characteristics of operating systems, implement basic operating system security, and explain how to configure mobile device network connectivity and email.",
    linkInsignia: "https://www.credly.com/badges/b45ede93-b62c-4cae-be95-60c2744daf02",
    urlImagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Badge_OSB-ZJcUUPtymBSoaLlJbxzdVP1L5XK1K3.png"
  },
  {
    titulo: "English for IT 2",
    descripcion: "English at CEFR B2 level, Polite Requests, Advanced Modal Verbs, Customer Support Vocabulary, Networking Vocabulary, \"They\" as singular, Cleft Sentences, Cloud Computing Vocabulary, Software Vocabulary, Subjunctive Mood, Logical deductions, Updating Colleagues Vocabulary, Sharing Feedback Vocabulary, Conjunctions, Advanced Tenses",
    linkInsignia: "https://www.credly.com/badges/b45ede93-b62c-4cae-be95-60c2744daf02",
    urlImagen: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Badge_EIT2-jOaM6ioyeP1nQkyxaAcTXGjfGik9ea.png"
  }
];

const CertificationCarousel: React.FC = () => {
  return (
    <section className="w-full bg-background/80 dark:bg-background py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-muted-foreground">03.</span> Certifications
        </h2>
        <div className="md:overflow-hidden">
          <div className="flex flex-col md:flex-row md:animate-carousel">
            {certifications.map((cert, index) => (
              <Link 
                href={cert.linkInsignia}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-none md:mx-8 mb-8 md:mb-0"
              >
                <Card className="w-full md:w-[300px] transition-transform duration-300 group-hover:scale-105 bg-card border-none dark:bg-card/20">
                  <CardContent className="p-6 flex flex-col md:items-center">
                    <div className="relative w-[100px] h-[100px] mb-4 mx-auto">
                      <Image
                        src={cert.urlImagen}
                        alt={cert.titulo}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-center mb-2">{cert.titulo}</h3>
                      <p className="text-sm text-muted-foreground text-left md:text-center md:line-clamp-3">
                        {cert.descripcion}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationCarousel;
