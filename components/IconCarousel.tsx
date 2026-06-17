'use client'
import React from 'react';
import {
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiPrisma,
  SiLaravel, SiPhp, SiPostgresql, SiMongodb,
  SiHtml5, SiCss3, SiTailwindcss, SiStyledcomponents,
  SiDocker, SiGit
} from 'react-icons/si';

const icons = [
  SiJavascript, SiTypescript, SiReact, SiNextdotjs,
  SiNodedotjs, SiExpress, SiNestjs, SiPrisma,
  SiLaravel, SiPhp, SiPostgresql, SiMongodb,
  SiHtml5, SiCss3, SiTailwindcss, SiStyledcomponents,
  SiDocker, SiGit
];

const IconCarousel: React.FC = () => {
  return (
    <div className="w-full overflow-hidden bg-background/60 dark:bg-background/60 py-8">
      <div className="flex animate-carousel">
        {[...icons, ...icons].map((Icon, index) => (
          <div key={index} className="flex-none mx-4">
            <Icon className="w-12 h-12 text-primary" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default IconCarousel;
