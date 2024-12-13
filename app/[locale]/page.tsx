import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import FeaturedLayout from '@/layouts/FeaturedLayout'
import HomeLayout from '@/layouts/HomeLayout'
import { LocaleTypes } from './i18n/settings'
import ListLayout from '@/layouts/ListLayout'
import { createTranslation } from './i18n/server'
import Landing from './landing/page'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  
  return (
    <>
      <Landing params={{ locale: locale }} />
    </>
  )
}
