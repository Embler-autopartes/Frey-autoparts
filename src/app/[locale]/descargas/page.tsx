import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';
import { Download } from 'lucide-react';

const docs = [
  { file: 'BENZ CATALOGUE.pdf', title: 'Mercedes-Benz · Catálogo general', size: '11 MB', year: '2024' },
  { file: 'BMW CATALOGUE 2017-10-12.pdf', title: 'BMW · Catálogo de aplicaciones', size: '22 MB', year: '2024' },
  { file: 'Catalogue for MB Sprinter 901-906 spare parts update on 12th,JAN,2018.pdf', title: 'MB Sprinter 901-906 · Refacciones (Rev. enero)', size: '9.4 MB', year: '2024' },
  { file: 'Catalogue for MB Sprinter 901-906 spare parts update on 12th.pdf', title: 'MB Sprinter 901-906 · Refacciones (Rev. base)', size: '8.5 MB', year: '2024' },
];

export default async function DescargasPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Downloads / Recursos técnicos"
      title={locale === 'es' ? 'Catálogos en PDF' : 'PDF catalogs'}
      intro={
        locale === 'es'
          ? 'Descarga catálogos técnicos vigentes. Contacta al equipo comercial para hojas técnicas específicas o actualizaciones.'
          : 'Download current technical catalogs. Contact our sales team for specific datasheets or updates.'
      }
    >
      <div className="grid gap-px bg-ink-4 sm:grid-cols-2">
        {docs.map((doc, i) => (
          <a
            key={doc.file}
            href={`/catalogos/${encodeURI(doc.file)}`}
            target="_blank"
            rel="noopener"
            className="group flex items-start justify-between gap-6 bg-ink-1 p-8 transition-colors hover:bg-ink-2"
          >
            <div>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-mist-1">
                PDF / {String(i + 1).padStart(2, '0')} · {doc.year} · {doc.size}
              </span>
              <p className="mt-4 font-display text-2xl uppercase tracking-tight text-mist-4">
                {doc.title}
              </p>
            </div>
            <Download className="h-5 w-5 shrink-0 text-mist-2 transition-colors group-hover:text-acid-2" />
          </a>
        ))}
      </div>
    </PageShell>
  );
}
