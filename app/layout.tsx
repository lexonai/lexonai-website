import './globals.css'
import type { Metadata, Viewport } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import SW from '@/components/SW'
import { getLang } from '@/lib/i18n'

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://lexonaicom.vercel.app'
  ),

  title: {
    default: 'LEXON AI — Build Your Future',
    template: '%s | LEXON AI',
  },

  description:
    'Learn AI, explore tools and build with the Lexon ecosystem.',

  openGraph: {
    title: 'LEXON AI',
    description:
      'Learn AI, explore tools and build with the Lexon ecosystem.',
    type: 'website',
    siteName: 'LEXON AI',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LEXON AI',
    description:
      'Learn AI, explore tools and build with the Lexon ecosystem.',
  },

  alternates: {
    canonical: '/',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const lang = getLang()

  return (
    <html lang={lang === 'hi' ? 'hi' : 'en'}>
      <body className="min-h-screen flex flex-col">
        <SW />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}
