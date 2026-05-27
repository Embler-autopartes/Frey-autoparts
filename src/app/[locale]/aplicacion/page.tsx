import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function AplicacionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Vehicle Fit / Aplicación"
      title={locale === 'es' ? 'Encuentra tu pieza por vehículo' : 'Find parts by vehicle'}
      intro={
        locale === 'es'
          ? 'Selecciona marca, modelo y año para ver las piezas compatibles del catálogo FREY.'
          : 'Select make, model and year to see compatible FREY parts.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Selector en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
