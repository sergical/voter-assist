import { routing } from '@/i18n/routing';
import { DesignSystemProvider } from '@repo/design-system';
import { fonts } from '@repo/design-system/lib/fonts';
import { cn } from '@repo/design-system/lib/utils';
import '@repo/design-system/styles/globals.css';
import { Toolbar } from '@repo/feature-flags/components/toolbar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type React from 'react';
import '../../styles/web.css';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Ensure that the incoming `locale` is valid
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={cn(fonts, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <DesignSystemProvider>{children}</DesignSystemProvider>
        </NextIntlClientProvider>
        <Toolbar />
      </body>
    </html>
  );
}
