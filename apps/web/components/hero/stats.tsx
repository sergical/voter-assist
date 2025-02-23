'use client';
import { motion } from 'framer-motion';

export const Stats = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-20 flex w-full max-w-sm flex-col gap-8 lg:absolute lg:top-1 lg:right-1"
    >
      <div className="rounded-xl border border-border bg-card bg-opacity-70 p-6 backdrop-blur">
        <h3 className="mb-4 font-semibold text-foreground text-xl">
          Why VoterAssist?
        </h3>
        <div className="grid gap-6">
          <div>
            <p className="text-muted-foreground text-sm">
              Average Response Time
            </p>
            <p className="font-bold text-2xl text-foreground">2-3 minutes</p>
            <p className="mt-1 text-muted-foreground text-sm">
              vs. 30+ minutes traditional research
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">
              Information Accuracy
            </p>
            <p className="font-bold text-2xl text-foreground">98%</p>
            <p className="mt-1 text-muted-foreground text-sm">
              verified with official sources
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-sm">Questions Answered</p>
            <p className="font-bold text-2xl text-foreground">1,000+</p>
            <p className="mt-1 text-muted-foreground text-sm">
              from Ontario voters
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
