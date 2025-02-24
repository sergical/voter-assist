'use client';

import { ModeToggle } from '@repo/design-system/components/mode-toggle';
import { differenceInSeconds } from 'date-fns';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Conversation } from '../conversation';
import { Countdown } from './countdown';
import { GlobeLoading } from './globe-loading';
import { Stats } from './stats';

const DynamicGlobe = dynamic(() => import('./globe').then((mod) => mod.Globe), {
  ssr: false,
  loading: () => <GlobeLoading />,
});

const ELECTION_DATE = new Date('2025-02-27');

export const LandingHero = ({
  initialLanguage,
}: { initialLanguage: string }) => {
  const t = useTranslations('HomePage');
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diffInSeconds = differenceInSeconds(ELECTION_DATE, now);
      setSecondsLeft(diffInSeconds);
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-start py-8 md:py-12">
      <div className="fixed top-4 right-4">
        <ModeToggle />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-8 w-full px-4 text-center"
      >
        <h1 className="mb-3 font-bold text-4xl text-foreground md:text-5xl">
          {t('title')}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-lg text-muted-foreground">
          {t('description')}
        </p>
        <div className="mb-4 flex flex-col items-center gap-2">
          <p className="text-lg text-muted-foreground">{t('electionTitle')}</p>
          <Countdown seconds={secondsLeft} />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mb-16 w-full max-w-3xl px-4"
      >
        <Conversation initialLanguage={initialLanguage} />
      </motion.div>

      <div className="flex w-full max-w-5xl flex-col items-center gap-8 px-4 md:flex-row md:items-start md:gap-12">
        <div className="relative flex w-full flex-col items-center justify-center">
          <Stats />
          <DynamicGlobe />
        </div>
      </div>
    </div>
  );
};
