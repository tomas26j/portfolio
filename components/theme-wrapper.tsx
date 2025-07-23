"use client";
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';
import { getStaticPath } from '@/lib/utils';

interface ThemeWrapperProps {
  children: ReactNode;
}

export function ThemeWrapper({ children }: ThemeWrapperProps) {
  const { resolvedTheme } = useTheme();
  const currentTheme = resolvedTheme || 'dark';
  const backgroundUrl = getStaticPath(currentTheme === 'dark' ? '/public_background-dark.png' : '/public_background-light.png');

  return (
    <>
      <div
        className="fixed inset-0 w-full h-full pointer-events-none opacity-75 dark:opacity-45 z-0"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '400px 400px'
        }}
      />
      {children}
    </>
  );
} 