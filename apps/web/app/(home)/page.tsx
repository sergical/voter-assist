import { LandingHero } from '@/components/hero/index';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';

const meta = {
  title: 'Learn about your local elections',
  description:
    "Multi-modal assistant for voter information including: where, when, and how to vote. Available in as many languages as possible to maximize accessibility in multi-lingual and multi-cultural communities. Will eventually also provide neutral information for candidates' views/policies on any topic of interest.",
};

export const metadata: Metadata = createMetadata(meta);

const Home = () => {
  return <LandingHero />;
};

export default Home;
