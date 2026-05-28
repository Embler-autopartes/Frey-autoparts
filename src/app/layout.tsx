import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://frey-autoparts.com'),
  title: {
    default: 'FREY · Premium Auto Parts for European Vehicles',
    template: '%s — FREY',
  },
  description:
    '22 years manufacturing OEM and aftermarket spare parts for Mercedes-Benz, BMW and Land Rover. Global B2B distribution in 100+ countries under ISO 9001 standard.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
