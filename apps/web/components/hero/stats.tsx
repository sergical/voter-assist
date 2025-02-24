'use client';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export const Stats = () => {
  const t = useTranslations('HomePage.stats');

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 flex w-full max-w-sm flex-col gap-8 lg:absolute lg:top-1 lg:right-1"
    >
      <div className="rounded-xl border border-border bg-card bg-opacity-70 p-6 backdrop-blur">
        <h3 className="mb-4 font-semibold text-foreground text-xl">
          {t('title')}
        </h3>
        <div className="grid gap-6">
          <div>
            <p className="text-muted-foreground text-sm">
              {t('responseTime.label')}
            </p>
            <p className="font-bold text-2xl text-foreground">
              {t('responseTime.value')}
            </p>
            <p className="mt-1 text-muted-foreground text-sm">
              {t('responseTime.comparison')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              {t('accuracy.label')}
            </p>
            <p className="font-bold text-2xl text-foreground">
              {t('accuracy.value')}
            </p>
            <p className="mt-1 text-muted-foreground text-sm">
              {t('accuracy.description')}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              {t('questions.label')}
            </p>
            <p className="font-bold text-2xl text-foreground">
              {t('questions.value')}
            </p>
            <p className="mt-1 text-muted-foreground text-sm">
              {t('questions.description')}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
