// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FIEND Coffee Club — Good Coffee. Great Vibes.',
  description: 'Premium coffee shop and matcha lifestyle brand in Davao City.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable}`}>
      <body className="antialiased">
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-cream">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}