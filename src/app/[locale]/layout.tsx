import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale, getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { QuoteProvider } from '@/lib/quote-context';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="dark">
      <body className="min-h-screen bg-ink-1 text-mist-4 antialiased">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <QuoteProvider>
            <Navbar />
            <main className="relative">{children}</main>
            <Footer />
          </QuoteProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
