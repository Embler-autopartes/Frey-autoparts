import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function CatalogoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Catalog / 2026"
      title={locale === 'es' ? 'Catálogo técnico FREY' : 'Technical catalog'}
      intro={
        locale === 'es'
          ? 'Más de 27,000 referencias para Mercedes-Benz, BMW y MB Sprinter. Filtra por sistema, marca o número de parte.'
          : 'Over 27,000 references for Mercedes-Benz, BMW and MB Sprinter. Filter by system, brand or part number.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Catálogo en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
