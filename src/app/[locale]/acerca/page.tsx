import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function AcercaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Company / Empresa"
      title={locale === 'es' ? 'Soluciones FREY para vehículos europeos.' : 'FREY solutions for European vehicles.'}
      intro={
        locale === 'es'
          ? 'Más de dos décadas suministrando autopartes OEM y aftermarket. Manufactura en Asia, distribución en LATAM y Europa.'
          : 'Over two decades supplying OEM and aftermarket auto parts. Manufacturing in Asia, distribution in LATAM and Europe.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Página en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
