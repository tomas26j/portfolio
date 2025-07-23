'use client'
import React from 'react';
import { 
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiNextdotjs, 
  SiVuedotjs, SiPostgresql, SiMongodb, SiHtml5, SiCss3, 
  SiStyledcomponents, SiTailwindcss, SiGit
} from 'react-icons/si';

const icons = [
  SiJavascript, SiReact, SiNodedotjs, SiExpress, SiNextdotjs,
  SiVuedotjs, SiPostgresql, SiMongodb, SiHtml5, SiCss3,
  SiStyledcomponents, SiTailwindcss, SiGit
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
