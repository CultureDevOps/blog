import { Metadata } from "next"
import siteMetadata from "@/data/siteMetadata"
import { maintitle, maindescription } from "@/data/localeMetadata"
import { localePath, pageAlternates, SITE_URL } from "@/lib/blogUrls"
import { LocaleTypes } from "./i18n/settings"

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  routePath?: string
  params: { locale: LocaleTypes }
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  routePath = "",
  params: { locale },
  ...rest
}: PageSEOProps): Metadata {
  const summary = description || maindescription[locale]
  const canonical = `${SITE_URL}${localePath(locale, routePath)}`
  const ogImage = image || `${SITE_URL}${siteMetadata.socialBanner}`
  return {
    title,
    description: summary,
    alternates: { canonical, languages: pageAlternates(routePath) },
    openGraph: {
      title: `${title} | ${maintitle[locale]}`,
      description: summary,
      url: canonical,
      siteName: maintitle[locale],
      images: [ogImage],
      locale,
      type: "website",
    },
    twitter: {
      title: `${title} | ${maintitle[locale]}`,
      description: summary,
      card: "summary_large_image",
      images: [ogImage],
    },
    ...rest,
  }
}
