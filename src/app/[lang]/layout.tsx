import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { HTML_LANG, LOCALES, OG_LOCALE, SITE_URL, hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { href } from "@/i18n/routes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

/* Police des petits libellés : pas critique pour le premier affichage, donc pas préchargée. */
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

/* Une version statique par langue ; toute autre valeur de [lang] renvoie une 404. */
export const dynamicParams = false;
export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

type Props = Readonly<{ children: React.ReactNode; params: Promise<{ lang: string }> }>;

export async function generateMetadata({ params }: Pick<Props, 'params'>): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = getDictionary(lang).meta;

  return {
    // Ce qui apparaît dans l'onglet du navigateur
    title: {
      default: t.title,
      template: '%s | Ny Aina Rommy Ramaromilanto',
    },
    description: t.description,

    // SEO / réseaux sociaux (l'URL canonique et les versions par langue sont définies par chaque page)
    openGraph: {
      type: 'website',
      locale: OG_LOCALE[lang],
      alternateLocale: LOCALES.filter((l) => l !== lang).map((l) => OG_LOCALE[l]),
      url: `${SITE_URL}${href(lang, 'home')}`,
      siteName: t.siteName,
      title: t.title,
      description: t.ogDescription,
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.ogDescription,
      images: ['/og-image.png'],
    },

    // Technique
    metadataBase: new URL(SITE_URL),
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
    },
    manifest: '/site.webmanifest',
  };
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <html lang={HTML_LANG[lang]} className="dark" suppressHydrationWarning data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MotionProvider>
          <CustomCursor />
          <div className="min-h-screen flex flex-col bg-background text-foreground">
            <Header
              lang={lang}
              t={{ nav: t.nav, header: t.header, languageSwitcher: t.languageSwitcher }}
            />
            <main className="flex-1 pt-16">
              {children}
            </main>
            <Footer lang={lang} t={{ nav: t.nav, footer: t.footer }} />
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
