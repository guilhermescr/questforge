import type { Metadata } from 'next';
import { Inter, Fira_Code } from 'next/font/google';
import './globals.css';
import { Toaster } from '../components/ui/Sonner';
import { UserProvider } from '../context/UserContext';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'QuestForge',
  description:
    'An interactive platform to create and answer questions collaboratively.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${firaCode.variable} antialiased`}
      >
        <UserProvider>
          <Toaster position="top-right" closeButton richColors expand />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
