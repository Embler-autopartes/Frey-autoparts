import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function CotizacionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="B2B Quotation Desk"
      title={locale === 'es' ? 'Construye tu cotización.' : 'Build your quote.'}
      intro={
        locale === 'es'
          ? 'Arma una lista con los números de parte que necesitas. Te respondemos con disponibilidad, lead time y condiciones B2B en menos de 24 horas hábiles.'
          : 'Build a list of part numbers you need. We reply with availability, lead time and B2B terms within 24 business hours.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Cotizador en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
