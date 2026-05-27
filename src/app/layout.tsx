import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://frey-autoparts.com'),
  title: {
    default: 'FREY · Auto Parts for European Vehicles',
    template: '%s — FREY',
  },
  description:
    'Catálogo OEM y aftermarket para Mercedes-Benz, BMW y MB Sprinter. Distribución global B2B con estándar ISO 9001.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
