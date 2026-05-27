import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function PoliticasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Policies / Políticas"
      title={locale === 'es' ? 'Envío, devoluciones y garantía.' : 'Shipping, returns & warranty.'}
      intro={
        locale === 'es'
          ? 'Lineamientos para distribuidores y clientes finales sobre envíos internacionales, devoluciones y cobertura de garantía.'
          : 'Guidelines for distributors and end customers on international shipping, returns and warranty coverage.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Contenido en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
