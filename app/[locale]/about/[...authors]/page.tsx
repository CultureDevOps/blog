import { Metadata } from 'next'
import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/[locale]/seo'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { notFound } from 'next/navigation'
import SectionContainer from '@/components/SectionContainer'

type AboutProps = {
  params: { authors: string[]; locale: LocaleTypes }
}

export async function generateMetadata({
  params: { authors, locale },
}: AboutProps): Promise<Metadata | undefined> {
  const authorSlug = decodeURI(authors.join('/'))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  if (!author) {
    return
  }
  const { t } = await createTranslation(locale, 'about')

  return genPageMetadata({
    title: `${t('about')} ${author.name}`,
    params: { locale: locale },
  })
}

export default async function Page({ params: { authors, locale } }: AboutProps) {
  const authorSlug = decodeURI(authors.join('/'))
  const author = allAuthors.find((a) => a.slug === authorSlug && a.language === locale) as Authors
  const authorIndex = allAuthors.findIndex((p) => p.slug === authorSlug)
  if (authorIndex === -1) {
    return notFound()
  }
  const mainContent = coreContent(author)

  return (
    <SectionContainer>
      <div className="mb-6 flex-grow 
                bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30 
                backdrop-blur-sm rounded-lg p-8 shadow-lg 
                border border-white/20 dark:border-gray-700/20
                shadow-xl shadow-gray-400 dark:shadow-gray-950">
        <AuthorLayout params={{ locale: locale }} content={mainContent}>
          <MDXLayoutRenderer code={author.body.code} />
        </AuthorLayout>
      </div>      
    </SectionContainer>
  )
}
