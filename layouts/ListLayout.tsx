'use client'

import { useEffect, useMemo, useState } from 'react'
import { useTagStore } from '@/components/util/useTagStore'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/mdxcomponents/Link'
import { sortByDate } from '@/components/util/sortByDate'
import Pagination from './Pagination'
import tagData from 'app/[locale]/tag-data.json'
import { POSTS_PER_PAGE } from '@/data/postsPerPage'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import Image from '@/components/mdxcomponents/Image'

interface PaginationProps {
  totalPages: number
  currentPage: number
  params: { locale: LocaleTypes }
}

interface ListLayoutProps {
  params: { locale: LocaleTypes }
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const item = {
  hidden: { opacity: 0, x: -25, y: 0 },
  show: { opacity: 1, x: 0, y: 0 },
}

export default function ListLayoutWithTags({ params: { locale }, posts, title }: ListLayoutProps) {
  const { t } = useTranslation(locale, 'home')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = POSTS_PER_PAGE
  const sortedPosts = sortByDate(posts)
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isHydrated, setIsHydrated] = useState(false);
  const selectedTag = useTagStore((state) => state.selectedTag);

  useEffect(() => {
    const unsubscribe = useTagStore.subscribe(
      (state) => state.selectedTag,
      (newSelectedTag) => {
        // Synchronise uniquement si l'état local est différent
        if (newSelectedTag !== selectedTag) {
          setSelectedTag(newSelectedTag); // Mettre à jour l'état local
        }
      }
    );

    return () => unsubscribe(); // Nettoie l'abonnement
  }, [selectedTag]); // Dépendance sur `selectedTag`

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Réinitialiser la pagination sur un changement de tag
  }, [selectedTag]);

  const filteredPosts = selectedTag
    ? sortedPosts.filter((post) => post.tags.includes(selectedTag))
    : sortedPosts;

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage

  const displayPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    return filteredPosts.slice(startIndex, endIndex);
  }, [filteredPosts, currentPage, postsPerPage]);

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag);
    setCurrentPage(1);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Ajoute un effet décalé
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -25, y: 0 }, // Initialement masqué
    show: { opacity: 1, x: 0, y: 0 },     // Devient visible
    exit: { opacity: 0, x: 25 },         // Pour les éléments retirés
  };


  const tagCountMap = tagData[locale]

  const filteredTags = Object.keys(tagCountMap).map((postTag) => {
    return (
      <li key={postTag} className="my-3">
        <button
          onClick={() => handleTagClick(postTag)}
          aria-labelledby={`${t('poststagged')} ${postTag}`}
        >
          <h3
            className={`inline px-3 py-2 text-sm font-medium uppercase ${useTagStore.getState().selectedTag === postTag
                ? 'text-heading-800 dark:text-heading-300'
                : 'text-gray-600 hover:text-heading-800 dark:text-gray-300 dark:hover:text-heading-300'
              }`}
          >
            {' '}
            {postTag} ({tagCountMap[postTag]})
          </h3>
        </button>
      </li>
    )
  })

  return (
    <>
      <div>
        <div className="flex space-x-6 lg:space-x-8">
          <div
            className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded-2xl
                      pt-5 sm:flex
                      backdrop-blur-sm border border-white/20 dark:border-gray-700/20                          
                      bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                      dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30 
                      shadow-xl shadow-gray-400 dark:shadow-gray-950 "
          // style={{ position: 'fixed', top: '5rem', left: '1rem', maxHeight: 'calc(100vh - 5rem)' }}
          >
            <div className="px-6 py-4">
              <button
                onClick={() => setSelectedTag('')}
                className={`${useTagStore.getState().selectedTag === ''
                    ? 'text-primary-600 dark:text-primary-300'  /* Couleur de texte plus douce */
                    : 'text-gray-900 dark:text-gray-200'
                  } font-bold uppercase transition-colors duration-300
                      font-headings antialiased text-shadow text-shadow-gray-400/80 dark:text-shadow-black`}
              >
                {t('all')}
              </button>
              <ul className="mt-4 space-y-2">
                {filteredTags}
              </ul>
            </div>
          </div>

          <div>
            {/* <motion.ul
              variants={isHydrated ? container : undefined}
              initial={isHydrated ? "hidden" : false} // Désactive l'animation si pas hydraté
              animate={isHydrated ? "show" : false}
            > */}
            <div className="flex-grow relative">
              <ul>
                {displayPosts.map((post) => {
                  const { slug, date, title, summary, tags, language } = post;
                  if (language === locale) {
                    return (

                      <li
                        key={slug}
                        className="backdrop-blur-sm
                          bg-gradient-to-tr from-white/40 via-primary-200/30 to-white/30 
                          dark:bg-gradient-to-tr dark:from-gray-900/30 dark:via-primary-950/30 dark:to-gray-900/30"
                      >
                        <div
                          className="p-5 mb-6 rounded-2xl shadow-md  w-full
                          shadow-xl shadow-gray-400 dark:shadow-gray-950
                          border border-white/20 dark:border-gray-700/20                        
                          hover:bg-gradient-to-tr hover:from-white/20 hover:via-primary-300/30 hover:to-white/20
                          dark:hover:bg-gradient-to-tr dark:hover:from-gray-900/20 dark:hover:via-primary-900/30 
                          dark:hover:via-primary-800/30 dark:hover:to-gray-800/20 
                          hover:border hover:border-white/20 dark:hover:border-gray-600/40 group
                          hover:shadow-xl hover:shadow-gray-400 dark:hover:shadow-gray-950">
                          <article className="flex flex-col space-y-2 xl:space-y-0">
                            <Link
                              href={`/${locale}/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                              aria-labelledby={title}
                            >
                              {post.banner && (
                                <div
                                  className="relative w-full h-auto overflow-hidden rounded-lg 
                                  border border-gray-200 dark:border-gray-700"
                                >
                                  {/* Version desktop par défaut */}
                                  <Image
                                    width={1600}
                                    height={400}
                                    src={post.banner}
                                    alt={`${post.title} banner`}
                                    sizes="100vw"
                                    quality={90}
                                    placeholder="blur"
                                    blurDataURL={post.banner}
                                    className="rounded-lg object-cover"
                                    priority
                                  />
                                </div>
                              )}
                              <dl>
                                <dt className="sr-only">{t('pub')}</dt>
                                <dd className="text-base font-medium leading-6 text-gray-700 dark:text-gray-400">
                                  <time dateTime={date}>{formatDate(date, language)}</time>
                                </dd>
                              </dl>

                              <div className="space-y-3">
                                <h2
                                  className="text-2xl font-bold leading-8 tracking-tight font-headings antialiased
                                            text-gray-900 dark:text-gray-100 group-hover:text-primary-600 
                                            dark:group-hover:text-primary-400 text-shadow text-shadow-gray-400/80 dark:text-shadow-black"
                                >
                                  {title}
                                </h2>
                              </div>

                              <ul
                                className="flex flex-wrap cursor-default group-hover:cursor-default"
                                onClick={(e) => e.preventDefault()}>
                                {tags.map((t) => (
                                  <li key={t} className="my-3">
                                    <button
                                      onClick={(e) => {
                                        // e.preventDefault(); // Empêche la propagation vers le Link
                                        handleTagClick(t);
                                      }}
                                      className={`${useTagStore.getState().selectedTag === t
                                          ? 'text-heading-700 dark:text-heading-400'
                                          : 'text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-500'
                                        } mr-3 py-0.5 text-sm font-medium uppercase cursor-pointer`}
                                      aria-label={`View posts tagged ${t}`}
                                    >
                                      {`${t}`}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                              <div className="prose max-w-none text-gray-700 dark:text-gray-400">
                                {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                              </div>
                            </Link>
                          </article>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>

            </div>
          </div>
          {/* </motion.ul> */}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={onPageChange}
              params={{ locale: locale }}
            />
          )}
        </div>
      </div>
    </>
  )
}
