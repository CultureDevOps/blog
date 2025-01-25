import { ReactNode } from 'react'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import Comments from '@/components/comments/Comments'
import Link from '@/components/mdxcomponents/Link'
import PageTitle from '@/components/PageTitle'
import Image from '@/components/mdxcomponents/Image'
import Tag from '@/components/tag'
import siteMetadata from '@/data/siteMetadata'
import ScrollTopAndComment from '@/components/scroll'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { PostSeriesBox } from '@/components/seriescard'
import Share from '@/components/share'
import FancyboxWrapper from '@/components/mdxcomponents/FancyboxWrapper'
import SocialIcon from '@/components/social-icons'

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`
const discussUrl = (path) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(`${siteMetadata.siteUrl}/${path}`)}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: { slug: string; title: string }
  prev?: { slug: string; title: string }
  children: ReactNode
  params: { locale: LocaleTypes }
}

export default async function PostLayout({
  content,
  authorDetails,
  next,
  prev,
  children,
  params: { locale },
}: LayoutProps) {
  const { filePath, path, slug, date, title, tags, language, series, toc } = content
  const basePath = path.split('/')[0]
  const { t } = await createTranslation(locale, 'home')
  // const tableOfContents: Toc = toc as unknown as Toc
  return (
    <>
      <ScrollTopAndComment />
      {/* <Sidetoc toc={tableOfContents} /> */}
      <div className="mb-6
                      bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                      dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30 
                      backdrop-blur-sm rounded-lg p-8 shadow-lg 
                      border border-white/20 dark:border-gray-700/20 h-fit
                      shadow-xl shadow-gray-400 dark:shadow-gray-950">
        <FancyboxWrapper>
          <article>
            <div className="xl:divide-y xl:divide-gray-300 xl:dark:divide-gray-700">
              <header className="pt-6 xl:pb-6">
                <div className="space-y-1 text-center">
                  <dl className="space-y-10">
                    <div>
                      <dt className="sr-only">{t('pub')}</dt>
                      <dd className="text-base font-medium leading-6 text-gray-600 dark:text-gray-400">
                        <time dateTime={date}>
                          {new Date(date).toLocaleDateString(language, postDateTemplate)}
                        </time>
                      </dd>
                    </div>
                  </dl>
                  <div className="font-headings text-shadow text-shadow-gray-400/80 dark:text-shadow-black">
                    <PageTitle>{title}</PageTitle>
                  </div>
                </div>
              </header>
              <div className="grid-rows-[auto_1fr] divide-y divide-gray-300 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
                <dl className="pb-10 pt-6 xl:border-b xl:border-gray-300 xl:pt-11 xl:dark:border-gray-700">
                  <dt className="sr-only">{t('authors')}</dt>
                  <dd>
                    <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                      {authorDetails.map((author) => (
                        <li className="flex flex-col items-center space-x-2 space-y-2" key={author.name}>
                          {author.avatar && (
                            <Link href={`/${locale}/about/${author.slug}`}>
                              <Image
                                src={author.avatar}
                                width={80}
                                height={80}
                                alt="avatar"
                                title="avatar"
                                className="h-16 w-16 rounded-full lg:h-30 lg:w-30"
                                sizes="(max-width: 640px) 64px, 120px"
                              />
                            </Link>
                          )}
                          <dl className="whitespace-nowrap text-sm font-medium leading-5 font-headings
                                        text-shadow text-shadow-gray-400/80 dark:text-shadow-black">
                            <dt className="sr-only">{t('name')}</dt>
                            <dd className="text-gray-900 dark:text-gray-100">{author.name}</dd>
                            <dt className="sr-only">Twitter</dt>
                            <dd>
                              <div className="flex pt-2 space-x-3 justify-center">
                                {/* Social icons */}
                                {author.github && (
                                  <SocialIcon kind="github" href={author.github} size={5} />
                                )}
                                {author.linkedin && (
                                  <SocialIcon kind="linkedin" href={author.linkedin} size={5} />
                                )}
                                {author.twitter && (
                                  <SocialIcon kind="x" href={author.twitter} size={5} />
                                )}
                              </div>
                            </dd>
                          </dl>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <div className="divide-y divide-gray-300 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
                  {series && (
                    <div className="not-prose mt-4">
                      <PostSeriesBox data={series} />
                    </div>
                  )}
                  <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">{children}</div>
                  <Share title={title} slug={slug} />
                  <div className="pb-6 pt-6">
                    <div className="flex items-center justify-center space-x-2 text-sm
                                text-gray-700 dark:text-gray-300">
                      <Link href={discussUrl(path)} rel="nofollow"
                        className="hover:text-primary-600 dark:hover:text-primary-400">
                        {t('twitter')}
                      </Link>
                      <span>{` • `}</span>
                      <Link href={editUrl(filePath)}
                        className="hover:text-primary-600 dark:hover:text-primary-400">
                        {t('github')}
                      </Link>
                    </div>
                    <div className="pt-6 text-center" id="comment">
                      {siteMetadata.comments && siteMetadata.iscomments === true && (
                        <Comments slug={slug} />
                      )}
                    </div>
                  </div>
                </div>
                <footer>
                  <div className="divide-gray-300 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                    {tags && (
                      <div className="py-4 xl:py-8">
                        <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                          Tags
                        </p>
                        <div className="flex flex-wrap">
                          {tags.map((tag) => (
                            <Tag key={tag} text={tag} />
                          ))}
                        </div>
                      </div>
                    )}
                    {(next || prev) && (
                      <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                        {prev && prev.slug && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                              {t('preva')}
                            </p>
                            <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                              <Link href={`/${locale}/blog/${prev.slug}`}>{prev.title}</Link>
                            </div>
                          </div>
                        )}
                        {next && next.slug && (
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-600 dark:text-gray-400">
                              {t('nexta')}
                            </p>
                            <div className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400">
                              <Link href={`/${locale}/blog/${next.slug}`}>{next.title}</Link>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pt-4 xl:pt-8">
                    <Link
                      href={`/${locale}/${basePath}`}
                      className="text-primary-700 hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
                      aria-label="Back to the blog"
                    >
                      &larr;{t('back')}
                    </Link>
                  </div>
                </footer>
              </div>
            </div>
          </article>
        </FancyboxWrapper>
      </div>
    </>
  )
}
