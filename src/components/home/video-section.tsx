import { getLocale } from 'next-intl/server';

const VIDEO_URL = 'https://www.freychina.com/static/cms/images/video_en.mp4';
const POSTER = '/images/video-poster.webp';

export async function VideoSection() {
  const locale = await getLocale();

  return (
    <section className="relative overflow-hidden border-y border-ink-4 bg-ink-2 py-24 lg:py-32">
      <div className="absolute inset-0 tech-grid-fine opacity-30" />

      <div className="relative mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* Editorial header */}
        <div className="mb-16 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-3 border-l-2 border-acid-2 bg-acid-2/8 px-4 py-2">
              <span className="text-acid-2">◆</span>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.35em] text-acid-2">
                {locale === 'es' ? 'Conoce FREY en movimiento' : 'See FREY in motion'}
              </p>
            </div>
            <h2 className="mt-8 font-serif text-5xl font-light italic leading-[0.95] tracking-tight text-mist-4 sm:text-6xl">
              {locale === 'es'
                ? <>22 años de <span className="text-acid-2">precisión</span><br /><span className="text-chrome-2">en cada componente.</span></>
                : <>22 years of <span className="text-acid-2">precision</span><br /><span className="text-chrome-2">in every component.</span></>}
            </h2>
          </div>
          <p className="max-w-md text-pretty leading-relaxed text-mist-2">
            {locale === 'es'
              ? 'Una mirada al interior de la operación FREY: manufactura, control de calidad y distribución bajo estándar alemán hacia 100+ países.'
              : 'A look inside FREY operations: manufacturing, quality control and distribution under German standard to 100+ countries.'}
          </p>
        </div>

        {/* Video frame with editorial accents */}
        <div className="relative">
          {/* Corner brackets */}
          <span className="pointer-events-none absolute -left-2 -top-2 z-10 h-6 w-6 border-l-2 border-t-2 border-acid-2" />
          <span className="pointer-events-none absolute -right-2 -top-2 z-10 h-6 w-6 border-r-2 border-t-2 border-acid-2" />
          <span className="pointer-events-none absolute -left-2 -bottom-2 z-10 h-6 w-6 border-b-2 border-l-2 border-acid-2" />
          <span className="pointer-events-none absolute -right-2 -bottom-2 z-10 h-6 w-6 border-b-2 border-r-2 border-acid-2" />

          {/* Video */}
          <div className="relative aspect-video w-full overflow-hidden bg-ink-0">
            <video
              src={VIDEO_URL}
              poster={POSTER}
              controls
              preload="metadata"
              playsInline
              className="h-full w-full object-cover"
            >
              {locale === 'es'
                ? 'Tu navegador no soporta el elemento de video.'
                : 'Your browser does not support the video tag.'}
            </video>
          </div>

          {/* Bottom signature strip */}
          <div className="mt-6">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.28em] text-mist-1">
              FREY Auto Parts · Corporate film
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
