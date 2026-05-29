import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { ManifestoStrip } from '@/components/home/manifesto-strip';
import { Ticker } from '@/components/home/ticker';
import { BrandCards } from '@/components/home/brand-cards';
import { FeaturedPart } from '@/components/home/featured-part';
import { Stats } from '@/components/home/stats';
import { Facility } from '@/components/home/facility';
import { VideoSection } from '@/components/home/video-section';
import { QualityPartners } from '@/components/home/quality-partners';
import { Alliance } from '@/components/home/alliance';
import { WarrantyPromise } from '@/components/home/warranty-promise';
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
      <ManifestoStrip />
      <Ticker />
      <BrandCards />
      <Facility />
      <VideoSection />
      <FeaturedPart />
      <Stats />
      <QualityPartners />
      <Alliance />
      <WarrantyPromise />
      <FinalCta />
    </>
  );
}
