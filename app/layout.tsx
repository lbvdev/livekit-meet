import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
  title: {
    default: 'Jump in meeting with SeniWave',
    template: '%s',
  },
  description:
    'SeniWave Meet — modern video conferencing service by SeniWave web studio, based on LiveKit. High-quality video calls with encryption, screen sharing, and multiple participants.',
  twitter: {
    creator: '@SWave_Partners',
    site: '@SWave_Partners',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://meet.seniwave.com',
    images: [
      {
        url: 'https://meet.seniwave.com/images/livekit-meet-open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'Jump in meeting with SeniWave',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/favicon.ico',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/images/meet-apple-touch.png',
        sizes: '180x180',
      },
      { rel: 'mask-icon', url: '/images/meet-safari-pinned-tab.svg', color: '#5f00ff' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#5f00ff',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
