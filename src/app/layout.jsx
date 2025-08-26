import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Natron Group',
  description: 'Natron is a software agency offering web development, mobile applications, and digital solutions.',
  icons: {
    icon: '/favicon.svg',
  },
  verification: {
    google: 'xKTGGqOi2Y3yij8eOotFpcfaGaBX8RQ5DfoISl9-Zf8',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body className={inter.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
} 