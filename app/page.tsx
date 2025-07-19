import { redirect } from 'next/navigation';
import { getLocale } from 'next-intl/server';

export default async function RootPage() {
  const locale = await getLocale();
  const basePath = process.env.NODE_ENV === 'production' ? '/portfolio' : '';
  redirect(`${basePath}/${locale}`);
}
