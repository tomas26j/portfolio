'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { getStaticPath } from '@/lib/utils';

const CertificationCarousel: React.FC = () => {
  const t = useTranslations('certifications');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [modalOpen]);

  // Ordenadas de más reciente a más antigua — reordenar manualmente según fechas
  const certifications = [
    {
      titulo: t('oracleTitle'),
      descripcion: t('oracleDesc'),
      linkInsignia: "#",
      urlImagen: getStaticPath("/certifications/oracle_agentic-ai-badge.webp")
    },
    {
      titulo: t('eit2Title'),
      descripcion: t('eit2Desc'),
      linkInsignia: "https://www.credly.com/badges/b45ede93-b62c-4cae-be95-60c2744daf02",
      urlImagen: getStaticPath("/certifications/Badge_EIT2-b.webp")
    },
    {
      titulo: t('jse2Title'),
      descripcion: t('jse2Desc'),
      linkInsignia: "https://www.credly.com/badges/6c5928d5-dff3-45ed-93f6-7ea5124f77e1",
      urlImagen: getStaticPath("/certifications/Badge_JSE2.png")
    },
    {
      titulo: t('jse1Title'),
      descripcion: t('jse1Desc'),
      linkInsignia: "https://www.credly.com/badges/f5c111b0-dde6-4a3e-b6cc-bc6b725664b2",
      urlImagen: getStaticPath("/certifications/Badge_JSE1.png")
    },
    {
      titulo: t('osbTitle'),
      descripcion: t('osbDesc'),
      linkInsignia: "https://www.credly.com/badges/b45ede93-b62c-4cae-be95-60c2744daf02",
      urlImagen: getStaticPath("/certifications/Badge_OSB.png")
    },
  ];

  return (
    <section className="w-full bg-background/60 dark:bg-background/60 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-16">
        <h2 className="text-3xl font-bold mb-8">
          <span className="text-muted-foreground">05.</span> {t('heading')}
        </h2>

        {/* Vista compacta: grid responsive de badges */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mb-10">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex items-center justify-center cursor-pointer"
              title={cert.titulo}
              onClick={() => setModalOpen(true)}
            >
              <div className="relative w-full aspect-square max-w-[180px] transition-transform duration-200 hover:scale-110">
                <Image
                  src={cert.urlImagen}
                  alt={cert.titulo}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Ver todas las certificaciones ({certifications.length})
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 p-4 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative bg-background rounded-xl w-full max-w-4xl my-8 p-6 sm:p-8"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted rounded-full p-2 transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-2xl font-bold mb-6">{t('heading')}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {certifications.map((cert, index) => (
                <Link
                  key={index}
                  href={cert.linkInsignia}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex gap-4 p-4 rounded-lg bg-card dark:bg-card/20 hover:bg-card/80 dark:hover:bg-card/40 transition-colors group ${cert.linkInsignia === '#' ? 'pointer-events-none' : ''}`}
                  onClick={cert.linkInsignia === '#' ? e => e.preventDefault() : undefined}
                >
                  <div className="relative w-[72px] h-[72px] flex-shrink-0">
                    <Image
                      src={cert.urlImagen}
                      alt={cert.titulo}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-2">
                      {cert.titulo}
                    </h4>
                    <p className="text-xs text-muted-foreground line-clamp-4">
                      {cert.descripcion}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationCarousel;
