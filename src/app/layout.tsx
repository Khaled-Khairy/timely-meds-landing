import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { template: '%s | Timely Meds', default: 'Timely Meds - وقت الدواء' },
  description: 'وقت الدواء: تطبيق ذكي لتنظيم مواعيد أدويتك والالتزام بخطتك العلاجية. تذكيرات موثوقة تصلك حتى في وضع الصامت. Timely Meds - smart medication reminder app.',
  keywords: ['وقت الدواء', 'تذكير الدواء', 'Timely Meds', 'medicine reminder', 'تطبيق أدوية', 'تنظيم الأدوية'],
  openGraph: {
    title: 'Timely Meds - وقت الدواء',
    description: 'تطبيق ذكي لتنظيم مواعيد أدويتك والالتزام بعلاجك',
    images: ['/logo.png'],
    locale: 'ar_SA',
    type: 'website',
  },
  icons: { icon: '/logo.png', apple: '/logo.png' },
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