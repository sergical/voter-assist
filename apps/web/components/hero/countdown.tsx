'use client';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { useTranslations } from 'next-intl';

type CountdownProps = {
  seconds: number;
};

export const Countdown = ({ seconds }: CountdownProps) => {
  const t = useTranslations('HomePage.timeUnits');
  const dd = Math.floor(seconds / 86400);
  const hh = Math.floor((seconds % 86400) / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  return (
    <NumberFlowGroup>
      <div
        style={{
          fontVariantNumeric: 'tabular-nums',
          ['--number-flow-char-height' as string]: '0.85em',
        }}
        className="flex flex-wrap items-baseline justify-center gap-4 font-semibold"
      >
        <div className="flex flex-col items-center">
          <NumberFlow
            trend={-1}
            value={dd}
            format={{ minimumIntegerDigits: 2 }}
            className="text-4xl text-foreground"
          />
          <span className="text-muted-foreground text-sm">{t('days')}</span>
        </div>
        <div className="flex flex-col items-center">
          <NumberFlow
            trend={-1}
            value={hh}
            format={{ minimumIntegerDigits: 2 }}
            className="text-4xl text-foreground"
          />
          <span className="text-muted-foreground text-sm">{t('hours')}</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <NumberFlow
              trend={-1}
              value={mm}
              format={{ minimumIntegerDigits: 2 }}
              className="text-4xl text-foreground"
            />
            <span className="text-muted-foreground text-sm">
              {t('minutes')}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center">
            <NumberFlow
              trend={-1}
              value={ss}
              format={{ minimumIntegerDigits: 2 }}
              className="text-4xl text-foreground"
            />
            <span className="text-muted-foreground text-sm">
              {t('seconds')}
            </span>
          </div>
        </div>
      </div>
    </NumberFlowGroup>
  );
};
