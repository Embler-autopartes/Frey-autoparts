import { setRequestLocale, getTranslations } from 'next-intl/server';
import { MessageCircle, Mail, Phone, FileText, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { ContactForm } from '@/components/contact/contact-form';

export default async function ContactoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-ink-4 bg-ink-2 pb-16 pt-40 lg:pt-48">
        <div className="absolute inset-0 -z-10 tech-grid opacity-50" />
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('hero.eyebrow')}
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl uppercase leading-[0.95] tracking-tight text-mist-4 sm:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-mist-2">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Channels strip */}
      <section className="bg-ink-1 py-16 lg:py-20">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <p className="mb-8 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('channels.title')}
          </p>
          <div className="grid grid-cols-1 gap-px bg-ink-4 sm:grid-cols-2 lg:grid-cols-4">
            <ChannelCard
              icon={<MessageCircle className="h-6 w-6" />}
              label={t('channels.whatsapp.label')}
              desc={t('channels.whatsapp.desc')}
              cta={t('channels.whatsapp.cta')}
              href="https://wa.me/525500000000?text=Hola%20FREY%2C%20me%20interesa%20cotizar..."
              external
            />
            <ChannelCard
              icon={<Mail className="h-6 w-6" />}
              label={t('channels.email.label')}
              desc={t('channels.email.desc')}
              cta={t('channels.email.cta')}
              href="mailto:freymarketing@cnfrey.com"
            />
            <ChannelCard
              icon={<Phone className="h-6 w-6" />}
              label={t('channels.phone.label')}
              desc={t('channels.phone.desc')}
              cta={t('channels.phone.cta')}
              href="tel:+864001080878"
            />
            <ChannelCard
              icon={<FileText className="h-6 w-6" />}
              label={t('channels.quote.label')}
              desc={t('channels.quote.desc')}
              cta={t('channels.quote.cta')}
              href="/cotizacion"
              internal
            />
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="border-y border-ink-4 bg-ink-3 py-20 lg:py-28">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
                ◆ {t('form.title')}
              </p>
              <h2 className="mt-4 font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-4xl">
                {t('form.title')}
              </h2>
              <p className="mt-3 max-w-xl text-mist-2">{t('form.subtitle')}</p>
              <div className="mt-10">
                <ContactForm />
              </div>
            </div>

            {/* Side: quick info */}
            <aside className="space-y-4 self-start lg:sticky lg:top-28">
              <div className="border border-ink-4 bg-ink-1 p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-acid-2">
                  Response time
                </p>
                <p className="mt-3 font-display text-4xl uppercase tracking-tight text-mist-4">
                  &lt; 24h
                </p>
                <p className="mt-2 text-sm text-mist-2">
                  {locale === 'es'
                    ? 'Horario hábil. Cotizaciones formales con disponibilidad y lead time.'
                    : 'Business hours. Formal quotes with availability and lead time.'}
                </p>
              </div>
              <div className="border border-ink-4 bg-ink-1 p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-acid-2">
                  Trace level
                </p>
                <p className="mt-3 font-display text-4xl uppercase tracking-tight text-mist-4">
                  Lot
                </p>
                <p className="mt-2 text-sm text-mist-2">
                  {locale === 'es'
                    ? 'Cada caja con etiqueta serializada y auditoría hasta planta.'
                    : 'Each box ships with serialized label and audit trail back to plant.'}
                </p>
              </div>
              <div className="border border-acid-2/40 bg-acid-2/5 p-6">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-acid-2">
                  Coverage
                </p>
                <p className="mt-3 font-display text-4xl uppercase tracking-tight text-mist-4">
                  40+ countries
                </p>
                <p className="mt-2 text-sm text-mist-2">
                  {locale === 'es'
                    ? 'LATAM, EU, Norteamérica vía distribuidores master autorizados.'
                    : 'LATAM, EU, North America through authorized master distributors.'}
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Offices */}
      <section className="bg-ink-1 py-24 lg:py-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
          <p className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-acid-2">
            ◆ {t('offices.title')}
          </p>
          <h2 className="mt-6 max-w-2xl font-display text-4xl uppercase tracking-tight text-mist-4 sm:text-5xl">
            {t('offices.title')}
          </h2>

          <div className="mt-16 grid gap-px bg-ink-4 lg:grid-cols-2">
            <OfficeCard
              variant="frey"
              name={t('offices.frey.name')}
              tagline={t('offices.frey.tagline')}
              address={t('offices.frey.address')}
              phone={t('offices.frey.phone')}
              email={t('offices.frey.email')}
              hours={t('offices.frey.hours')}
              mapSrc="https://maps.google.com/maps?q=Huadu+District+Guangzhou+China&hl=en&z=11&output=embed"
            />
            <OfficeCard
              variant="embler"
              name={t('offices.embler.name')}
              tagline={t('offices.embler.tagline')}
              address={t('offices.embler.address')}
              phone={t('offices.embler.phone')}
              email={t('offices.embler.email')}
              hours={t('offices.embler.hours')}
              mapSrc="https://maps.google.com/maps?q=Av.+Insurgentes+Sur+1457+Mexico+City&hl=en&z=14&output=embed"
            />
          </div>
        </div>
      </section>

      {/* Bottom tagline strip */}
      <section className="border-t border-ink-4 bg-ink-2 py-16">
        <div className="mx-auto max-w-[1100px] px-6 text-center lg:px-10">
          <p className="font-display text-3xl uppercase tracking-tight text-mist-4 sm:text-5xl">
            {t('tagline')}
          </p>
          <Link
            href="/cotizacion"
            className="mt-8 inline-flex items-center gap-3 border border-acid-2 bg-acid-2 px-8 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white transition-all hover:bg-acid-3"
          >
            {locale === 'es' ? 'Empezar cotización' : 'Start a quote'}
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ChannelCard({
  icon,
  label,
  desc,
  cta,
  href,
  external,
  internal,
}: {
  icon: React.ReactNode;
  label: string;
  desc: string;
  cta: string;
  href: string;
  external?: boolean;
  internal?: boolean;
}) {
  const Inner = (
    <div className="group flex h-full flex-col bg-ink-3 p-6 transition-colors hover:bg-ink-1">
      <div className="flex items-center justify-between">
        <span className="text-acid-2 transition-transform group-hover:scale-110">{icon}</span>
        <ArrowUpRight className="h-4 w-4 text-mist-1 transition-colors group-hover:text-acid-2" />
      </div>
      <p className="mt-6 font-display text-2xl uppercase tracking-tight text-mist-4">
        {label}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mist-2">{desc}</p>
      <p className="mt-6 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-acid-2">
        {cta} →
      </p>
    </div>
  );

  if (internal) {
    return (
      <Link href={href as '/cotizacion'} className="block">
        {Inner}
      </Link>
    );
  }
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener' : undefined} className="block">
      {Inner}
    </a>
  );
}

function OfficeCard({
  variant,
  name,
  tagline,
  address,
  phone,
  email,
  hours,
  mapSrc,
}: {
  variant: 'frey' | 'embler';
  name: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  mapSrc: string;
}) {
  return (
    <article className="bg-ink-3">
      {/* Map */}
      <div className="relative aspect-[16/9] overflow-hidden bg-ink-1">
        <iframe
          src={mapSrc}
          width="100%"
          height="100%"
          style={{ border: 0, filter: 'grayscale(0.4) contrast(1.05)' }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          title={name}
        />
        <div className="pointer-events-none absolute inset-0 bg-acid-2/5 mix-blend-multiply" />
      </div>

      {/* Info */}
      <div className="p-8">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-acid-2">
          {variant === 'frey' ? '◆ Frey HQ · Shanghai' : '◆ Embler MX · CDMX'}
        </p>
        <h3 className="mt-3 font-display text-2xl uppercase tracking-tight text-mist-4 sm:text-3xl">
          {name}
        </h3>
        <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-mist-2">
          {tagline}
        </p>

        <dl className="mt-8 space-y-4 text-sm">
          <Row icon={<MapPin className="h-4 w-4" />} value={address} multiline />
          <Row icon={<Phone className="h-4 w-4" />} value={phone} link={`tel:${phone.replace(/\s+/g, '')}`} />
          <Row icon={<Mail className="h-4 w-4" />} value={email} link={`mailto:${email}`} />
          <Row icon={<Clock className="h-4 w-4" />} value={hours} />
        </dl>
      </div>
    </article>
  );
}

function Row({ icon, value, link, multiline }: { icon: React.ReactNode; value: string; link?: string; multiline?: boolean }) {
  const content = (
    <span className={multiline ? 'whitespace-pre-line text-mist-3' : 'text-mist-3'}>
      {value}
    </span>
  );
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-acid-2">{icon}</span>
      {link ? (
        <a href={link} className="text-mist-3 transition-colors hover:text-acid-2">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
