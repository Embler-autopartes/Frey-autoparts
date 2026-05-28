import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://frey-autoparts.com'),
  title: {
    default: 'FREY · Premium Auto Parts for European Vehicles',
    template: '%s — FREY',
  },
  description:
    '22 años fabricando refacciones OEM y aftermarket para Mercedes-Benz, BMW y Land Rover. Distribución global B2B en 100+ países bajo estándar ISO 9001.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
