import { Metadata } from "next"
import ListLayout from "@/layouts/ListLayout"
import { allCoreContent, sortPosts } from "pliny/utils/contentlayer.js"
import { allBlogs } from "contentlayer/generated"
import { genPageMetadata } from "app/[locale]/seo"
import { createTranslation } from "../i18n/server"
import { LocaleTypes } from "../i18n/settings"
import SectionContainer from "@/components/SectionContainer"
import Link from "next/link"
import { isPostVisible } from "@/lib/postVisibility"

interface PageProps {
  params: Promise<{
    locale: LocaleTypes
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = (await params).locale
  return genPageMetadata({
    title: "Blog",
    routePath: "blog",
    params: { locale },
  })
}

export default async function BlogPage({ params }: PageProps) {
  const locale = (await params).locale
  const { t } = await createTranslation(locale, "home")
  const visibleBlogs = allBlogs.filter((post) => post.language === locale && isPostVisible(post))
  const posts = allCoreContent(sortPosts(visibleBlogs))
  const previewDrafts = visibleBlogs.filter((post) => post.draft === true)
  const filteredPosts = posts

  return (
    <SectionContainer>
      {previewDrafts.length > 0 && (
        <aside aria-label="Preview drafts" className="mb-6 rounded-lg border border-amber-400 p-4">
          <p className="mb-2 font-semibold">Preview — articles en cours de relecture</p>
          <ul className="list-disc pl-5">
            {previewDrafts.map((post) => (
              <li key={post.slug}>
                <Link href={`${locale === "fr" ? "" : `/${locale}`}/blog/${post.slug}`} className="underline">
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      )}
      <ListLayout params={{ locale }} posts={filteredPosts} title={t("all")} />
    </SectionContainer>
  )
}
