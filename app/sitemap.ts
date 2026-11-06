import { MetadataRoute } from "next"
import { allBlogs, allAuthors } from "contentlayer/generated"
import { blogAlternates, blogUrl, localePath, pageAlternates, SITE_URL } from "@/lib/blogUrls"

// Served at /sitemap.xml (not under the locale segment). Only index
// canonical published URLs; alternate references must exist on both sides.
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allBlogs.filter((post) => post.draft !== true)
  const entries: MetadataRoute.Sitemap = []

  for (const path of ["", "blog", "projects", "tags"]) {
    const alternatives = { languages: pageAlternates(path) }
    for (const locale of ["fr", "en"]) {
      entries.push({ url: `${SITE_URL}${localePath(locale, path)}`, alternates: alternatives })
    }
  }

  for (const post of posts) {
    const languages = blogAlternates(post, posts)
    entries.push({
      url: blogUrl(post.language, post.slug),
      lastModified: post.lastmod || post.date,
      ...(Object.keys(languages).length ? { alternates: { languages } } : {}),
    })
  }

  for (const author of allAuthors) {
    const path = `about/${author.slug}`
    entries.push({ url: `${SITE_URL}${localePath(author.language, path)}` })
  }

  return [...new Map(entries.map((entry) => [entry.url, entry])).values()]
}
