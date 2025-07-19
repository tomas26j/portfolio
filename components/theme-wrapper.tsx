"use client";
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || 'dark';
  
  return (
    <>
      <div 
        className="absolute inset-0 pointer-events-none opacity-70 dark:opacity-20"
        style={{
          backgroundImage: `url(${currentTheme === 'dark' ? 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-dark-fAGdYquHIrL7yMNe8B9J4ZrYgv3I57.png' : 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/public_background-light-kvOiCewPaC0mHJVqtHBNpgbXsBMHuT.png'})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '600px 600px'
        }}
      />
      {children}
    </>
  );
} 