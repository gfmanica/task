import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import Header from '@/component/header';
import Providers from '@/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Atividades',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className}`}>
        <Providers>
          <div className="flex min-h-dvh w-full flex-col">
            <Header />

            <main className="flex flex-1 flex-col gap-6 p-10">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
