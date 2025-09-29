import './globals.css';
import type { Metadata } from 'next';
import { JetBrains_Mono, Inter, Fira_Code,  Plus_Jakarta_Sans } from 'next/font/google';

// Configure fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
});


const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: 'MKCode - Browser IDE',
  description: 'A modern, browser-based IDE with terminal-style aesthetics. Code, preview, and execute in your browser.',
  keywords: 'ide, code editor, browser ide, python, javascript, typescript, online editor',
  authors: [{ name: 'MKCode Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'MKCode - Browser IDE',
    description: 'A modern, browser-based IDE with terminal-style aesthetics',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} ${inter.variable} ${firaCode.variable}  ${plusJakarta.variable}`}>
      <body
        className={`${plusJakarta.variable}  antialiased font-orbitron`}
        style={{ fontFamily: "'Orbitron', var(--font-orbitron), 'Plus Jakarta Sans', var(--font-plus-jakarta), sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}