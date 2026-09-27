import type { Metadata } from 'next';
import { APP_CONFIG } from '@/config/app';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.SITE_URL),

  title: {
    template: '%s | Timely Meds - وقت الدواء',
    default: 'Timely Meds - وقت الدواء | تطبيق تذكير الأدوية الذكي',
  },
  description:
    'وقت الدواء — تطبيق أندرويد ذكي لتنظيم مواعيد أدويتك والالتزام بخطتك العلاجية. تذكيرات موثوقة تصلك حتى في وضع الصامت. حمّل التطبيق مجاناً الآن. Timely Meds: smart medication reminder & tracker app for Android.',
  keywords: [
    'وقت الدواء',
    'تذكير الدواء',
    'تطبيق أدوية',
    'تنظيم الأدوية',
    'مواعيد الأدوية',
    'Timely Meds',
    'medication reminder',
    'medicine tracker',
    'pill reminder',
    'Android medication app',
  ],
  authors: [{ name: 'Timely Meds' }],
  creator: 'Timely Meds',
  publisher: 'Timely Meds',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: APP_CONFIG.SITE_URL,
  },
  openGraph: {
    type: 'website',
    url: APP_CONFIG.SITE_URL,
    siteName: 'Timely Meds - وقت الدواء',
    title: 'Timely Meds - وقت الدواء | تطبيق تذكير الأدوية الذكي',
    description:
      'تطبيق ذكي لتنظيم مواعيد أدويتك والالتزام بعلاجك. تذكيرات موثوقة حتى في وضع الصامت. حمّل مجاناً!',
    images: [
      {
        url: '/logo.png',
        width: 1024,
        height: 1024,
        alt: 'Timely Meds - وقت الدواء',
      },
    ],
    locale: 'ar_SA',
  },
  twitter: {
    card: 'summary',
    title: 'Timely Meds - وقت الدواء',
    description: 'تطبيق ذكي لتذكير مواعيد الأدوية. حمّل مجاناً على أندرويد!',
    images: ['/logo.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}