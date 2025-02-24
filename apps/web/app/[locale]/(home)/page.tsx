import { LandingHero } from '@/components/hero/index';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import { useLocale } from 'next-intl';

const meta = {
  title: 'Learn about your local elections',
  description:
    "Multi-modal assistant for voter information including: where, when, and how to vote. Available in as many languages as possible to maximize accessibility in multi-lingual and multi-cultural communities. Will eventually also provide neutral information for candidates' views/policies on any topic of interest.",
};

export const metadata: Metadata = createMetadata(meta);

export default function Home() {
  const locale = useLocale();
  return <LandingHero initialLanguage={locale} />;
}
