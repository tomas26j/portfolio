module.exports = {
  locales: ['es', 'en'],
  defaultLocale: 'es',
  localeDetection: true,
  basePath: process.env.NODE_ENV === 'production' ? '/portfolio' : ''
};
