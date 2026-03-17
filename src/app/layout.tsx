import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider"; 
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Ce qui apparaît dans l'onglet du navigateur
  title: {
    default: 'Ny Aina Rommy Ramaromilanto — Développeur Fullstack',
    template: '%s | Ny Aina Rommy Ramaromilanto', 
  },
  description:
    'Développeur web fullstack basé à Antananarivo, Madagascar. Symfony, React, Next.js. Disponible pour missions freelance et opportunités.',
  
  // SEO / réseaux sociaux
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://rommy-dev.github.io',
    siteName: 'Ny Aina Rommy Ramaromilanto — Portfolio',
    title: 'Ny Aina Rommy Ramaromilanto — Développeur Fullstack',
    description: 'Portfolio de Ny Aina Rommy Ramaromilanto, développeur fullstack React & Symfony.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ny Aina Rommy Ramaromilanto — Développeur Fullstack',
    description: 'Portfolio de Ny Aina Rommy Ramaromilanto, développeur fullstack React & Symfony.',
    images: ['/og-image.png'],
  },

  // Technique
  metadataBase: new URL('https://rommy-dev.github.io'),
  robots: { index: true, follow: true },

  // Favicons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
      { rel: 'icon', url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer />
            <ScrollToTopButton />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
