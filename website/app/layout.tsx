import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';

export const metadata: Metadata = {
  title: 'MobileHealth Malawi - Community Health Worker Platform',
  description: 'Empowering Community Health Workers in Malawi with digital tools for better healthcare delivery.',
  keywords: 'MobileHealth, Malawi, Community Health, Healthcare, CHW, Digital Health',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
