import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale || 'es'}.json`)).default,
  locale: locale || 'es'
})); 