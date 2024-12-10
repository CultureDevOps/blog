import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'
import HomeLayout from '@/layouts/HomeLayout'
import { LocaleTypes } from './i18n/settings'
import ListLayout from '@/layouts/ListLayout'
import { createTranslation } from './i18n/server'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter((p) => p.language === locale)
  const hasFeaturedPosts = filteredPosts.filter((p) => p.featured === true)
  const { t } = await createTranslation(locale, 'home')
  
  return (
    <>
      {/* {hasFeaturedPosts && <FeaturedLayout posts={hasFeaturedPosts} params={{ locale }} />}
      <HomeLayout posts={filteredPosts} params={{ locale }} /> */}
      <ListLayout params={{ locale: locale }} posts={filteredPosts} title={t('all')} />
    </>
  )
}
