// The French default locale has no URL prefix. Keep translated slugs in one
// shared module so client navigation and server metadata use identical routes.
export const SITE_URL = "https://culturedevops.com"
export const DEFAULT_LOCALE = "fr"

export const translatedSlugs = {
  gitlabCiPython: {
    fr: "gitlab-ci-python-sans-deploiement",
    en: "gitlab-ci-python-tests-without-deployment",
  },
} as const

export type BlogLanguage = "fr" | "en"
export type BlogReference = { language: string; slug: string; draft?: boolean }

export function localePath(locale: string, path = ""): string {
  const clean = path.replace(/^\/+|\/+$/g, "")
  const prefix = locale === DEFAULT_LOCALE ? "" : `/${locale}`
  return clean ? `${prefix}/${clean}` : prefix || "/"
}

export function blogPath(locale: string, slug: string): string {
  return localePath(locale, `blog/${slug}`)
}

export function blogUrl(locale: string, slug: string): string {
  return `${SITE_URL}${blogPath(locale, slug)}`
}

export function correspondingSlug(slug: string, targetLocale: string): string {
  for (const pair of Object.values(translatedSlugs)) {
    if (slug === pair.fr || slug === pair.en) {
      return targetLocale === "en" ? pair.en : pair.fr
    }
  }
  // Older bilingual articles deliberately share the same slug.
  return slug
}

export function blogAlternates(post: BlogReference, posts: BlogReference[]): Record<string, string> {
  const languages: Record<string, string> = {}
  for (const locale of ["fr", "en"]) {
    const target = correspondingSlug(post.slug, locale)
    if (posts.some((p) => p.language === locale && p.slug === target && p.draft !== true)) {
      languages[locale] = blogUrl(locale, target)
    }
  }
  // Do not advertise a nonexistent translation or a Preview-only draft.
  if (!languages.fr || !languages.en) return {}
  return { fr: languages.fr, en: languages.en, "x-default": languages.fr }
}

export function pageAlternates(path = ""): Record<string, string> {
  return {
    fr: `${SITE_URL}${localePath("fr", path)}`,
    en: `${SITE_URL}${localePath("en", path)}`,
    "x-default": `${SITE_URL}${localePath("fr", path)}`,
  }
}
