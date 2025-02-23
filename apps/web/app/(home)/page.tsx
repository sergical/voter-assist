import { LandingHero } from '@/components/hero/index';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { headers } from 'next/headers';

const meta = {
  title: 'Learn about your local elections',
  description:
    "Multi-modal assistant for voter information including: where, when, and how to vote. Available in as many languages as possible to maximize accessibility in multi-lingual and multi-cultural communities. Will eventually also provide neutral information for candidates' views/policies on any topic of interest.",
};

export const metadata: Metadata = createMetadata(meta);

// Function to parse Accept-Language header
const parseAcceptLanguage = (acceptLanguage: string | null): string => {
  if (!acceptLanguage) return 'en';

  // Get first language from Accept-Language header
  const firstLang = acceptLanguage.split(',')[0].trim().split('-')[0];
  return firstLang;
};

export default async function Home() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || '';

  const initialLanguage = parseAcceptLanguage(acceptLanguage);

  return <LandingHero initialLanguage={initialLanguage} />;
}
