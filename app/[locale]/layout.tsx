import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Open_Sans } from 'next/font/google'
import { Merriweather } from 'next/font/google'
import { Libre_Baskerville } from 'next/font/google'
import { Bitter } from 'next/font/google'
import { Roboto_Slab } from 'next/font/google'
import { Audiowide } from 'next/font/google'
import { Russo_One } from 'next/font/google'
import { Alfa_Slab_One} from 'next/font/google'
import { Titan_One} from 'next/font/google'
import { Ultra} from 'next/font/google'
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

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const open_sans = Open_Sans({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans',
})

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
})

const libreBaskerville = Libre_Baskerville({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-libre-baskerville',
})

const bitter = Bitter({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bitter',
})

const robotoSlab = Roboto_Slab({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-slab',
})

const russoOne = Russo_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-russo-one',
})

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-audiowide',
})


const alfaSlabOne = Alfa_Slab_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alfa-slab-one',
})

const titanOne = Titan_One({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-titan-one',
})

const ultra = Ultra({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-ultra',
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
      className={`${open_sans.variable} ${robotoSlab.variable} ${russoOne.variable} ${audiowide.variable} 
      ${alfaSlabOne.variable} ${titanOne.variable} ${ultra.variable} 
      scroll-smooth snap-y snap-proximity`}
      suppressHydrationWarning
    >
        <link rel="manifest" href="/static/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <body className="pl-[calc(100vw-100%)] text-black antialiased dark:text-white bg-gradient-to-r from-blue-300 via-blue-200 via-20% to-stone-100 dark:from-blue-900 dark:via-blue-950 dark:via-40% dark:via-slate-900 dark:via-75% dark:to-slate-900">
          <TwSizeIndicator />
          <ThemeProvider>
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
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
