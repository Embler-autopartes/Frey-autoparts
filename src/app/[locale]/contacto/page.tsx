import { setRequestLocale } from 'next-intl/server';
import { PageShell } from '@/components/shared/page-shell';

export default async function ContactoPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageShell
      eyebrow="Contact / Contacto"
      title={locale === 'es' ? 'Hablemos de tu próxima orden.' : "Let's talk about your next order."}
      intro={
        locale === 'es'
          ? 'Distribuidores, talleres y flotas: nuestro equipo comercial responde en menos de 24 horas hábiles.'
          : 'Distributors, workshops and fleets: our sales team replies within 24 business hours.'
      }
    >
      <p className="font-mono text-sm uppercase tracking-[0.2em] text-mist-2">
        ▼ Formulario en construcción — siguiente entrega.
      </p>
    </PageShell>
  );
}
