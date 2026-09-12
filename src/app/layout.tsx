import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ClinicSettingsProvider } from '@/context/ClinicSettingsContext';

export const metadata: Metadata = {
  title: 'Master Health | عيادة ماستر الطبية',
  description: 'عيادة طبية متخصصة - استشارات طبية متقدمة وحجز مواعيد فوري',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="min-h-screen flex flex-col bg-background text-heading antialiased">
        <ClinicSettingsProvider>
          <Navbar />
          <main className="flex-1 w-full">
            {children}
          </main>
          <Footer />
        </ClinicSettingsProvider>
      </body>
    </html>
  );
}
