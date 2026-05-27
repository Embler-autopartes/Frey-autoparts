import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { Ticker } from '@/components/home/ticker';
import { TrustStrip } from '@/components/home/trust-strip';
import { Categories } from '@/components/home/categories';
import { FeaturedPart } from '@/components/home/featured-part';
import { Stats } from '@/components/home/stats';
import { Facility } from '@/components/home/facility';
import { Alliance } from '@/components/home/alliance';
import { FinalCta } from '@/components/home/final-cta';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Ticker />
      <TrustStrip />
      <Categories />
      <FeaturedPart />
      <Stats />
      <Facility />
      <Alliance />
      <FinalCta />
    </>
  );
}
