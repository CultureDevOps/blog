import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Open_Sans } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider } from '@/components/search/SearchProvider'
import Header from '@/components/navigation/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/navigation/Footer'
import siteMetadata from '@/data/siteMetadata'
import { maintitle, maindescription } from '@/data/localeMetadata'
import { ThemeProvider } from '@/components/theme/ThemeContext'
import { Metadata } from 'next'
import { dir } from 'i18next'
import { LocaleTypes, locales } from './i18n/settings'
import TwSizeIndicator from '@/components/helper/TwSizeIndicator'
import Head from 'next/head'

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const open_sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

export async function generateMetadata({ params: { locale } }): Promise<Metadata> {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: maintitle[locale],
      template: `%s | ${maintitle[locale]}`,
    },
    description: maindescription[locale],
    openGraph: {
      title: maintitle[locale],
      description: maindescription[locale],
      url: './',
      siteName: maintitle[locale],
      images: [siteMetadata.socialBanner],
      locale: locale,
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: maintitle[locale],
      description: maindescription[locale],
      site: siteMetadata.siteUrl,
      creator: siteMetadata.author,
      card: 'summary_large_image',
      images: [siteMetadata.socialBanner],
    },
    icons: {
      icon: '/static/favicons/favicon-32x32.png',
      apple: '/static/favicons/apple-touch-icon.png',
      shortcut: '/static/favicons/android-chrome-192x192.png',
    },
  }
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: LocaleTypes }
}) {
  return (
    <html
      lang={locale}
      dir={dir(locale)}
      className={`${open_sans.variable} scroll-smooth snap-y snap-proximity overflow-scroll`}
      suppressHydrationWarning
    >
        {/* <link rel="apple-touch-icon" sizes="76x76" href="/static/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/static/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/static/favicons/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/static/favicons/android-chrome-192x192.png" /> */}
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <body className="pl-[calc(100vw-100%)] text-black antialiased dark:text-white bg-gradient-to-r from-sky-100 to-stone-100 dark:from-blue-950 dark:to-slate-900">
        {/* <body className="bg-stone-100 pl-[calc(100vw-100%)] text-black antialiased dark:bg-slate-900 dark:text-white"> */}
          <TwSizeIndicator />
          <ThemeProvider>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
            {/* <div className="h-full bg-gradient-to-r from-stone-200 to-stone-300 dark:from-slate-800 dark:to-slate-900"> */}
            <SectionContainer>
              <div className="flex h-screen flex-col justify-between font-sans">
                <SearchProvider>
                  <Header />
                  <main className="mb-auto">{children}</main>
                </SearchProvider>
                <Footer />
              </div>
            </SectionContainer>
            {/* </div> */}
          </ThemeProvider>
        </body>
      </html>
  )
}
