import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Auth Template System',
  description: 'Complete authentication system with role-based access control',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body 
        className={`${inter.className} h-full`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}