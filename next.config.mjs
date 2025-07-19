import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/portfolio/' : '',
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuración para archivos estáticos
  experimental: {
    appDir: true,
  },
  // Asegurar que los archivos estáticos se copien correctamente
  distDir: 'out',
};

// Exporta la configuración envuelta con el plugin de next-intl
export default createNextIntlPlugin()(nextConfig);
