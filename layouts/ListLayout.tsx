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
import Image from 'next/image';

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
            className={`inline px-3 py-2 text-sm font-medium uppercase ${
              useTagStore.getState().selectedTag === postTag
                ? 'text-primary-600'
                : 'text-gray-600 hover:text-primary-700 dark:text-gray-300 dark:hover:text-primary-500'
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
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
        <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded 
            bg-gradient-to-tr from-white/60 via-blue-200/30 to-white/30 backdrop-blur-md border border-white/10 
            pt-5 shadow-md dark:bg-gradient-to-tr dark:from-slate-900/60 dark:via-blue-950/40 dark:to-slate-900/30 
            dark:shadow-slate-700/40 sm:flex">
            <div className="px-6 py-4">
                <button
                    onClick={() => setSelectedTag('')}
                    className={`${
                        useTagStore.getState().selectedTag === ''
                            ? 'text-blue-600 dark:text-blue-300'  /* Couleur de texte plus douce */
                            : 'text-gray-900 dark:text-gray-200'
                    } font-bold uppercase transition-colors duration-300`}
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
            <ul>
              {displayPosts.map((post) => {
                const { slug, date, title, summary, tags, language } = post
                if (language === locale) {
                  return (
                    // <motion.li variants={isHydrated ? item : undefined} key={slug} initial="hidden" animate="show" exit="hidden" className="py-5">
                    <li key={slug} className="py-5">
                      <article className="flex flex-col space-y-2 xl:space-y-0">
                        {post.banner && (
                          <Link
                            href={`/${locale}/blog/${slug}`}
                            className="text-gray-900 dark:text-gray-100"
                            aria-labelledby={title}
                          >
                            <Image
                                width={800}
                                height={200}
                                src={post.banner}
                                alt={`${post.title} banner`}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"                                
                                quality={100}
                                className="w-full h-auto rounded-lg border border-gray-200 shadow-md dark:border-gray-700"
                                priority
                            />
                          </Link>
                        )}
                        <dl>
                          <dt className="sr-only">{t('pub')}</dt>
                          <dd className="text-base font-medium leading-6 text-gray-700 dark:text-gray-400">
                            <time dateTime={date}>{formatDate(date, language)}</time>
                          </dd>
                        </dl>
                        <div className="space-y-3">
                          <div>
                            <div className="text-2xl font-bold leading-8 tracking-tight font-headings antialiased">
                              <Link
                                href={`/${locale}/blog/${slug}`}
                                className="text-gray-900 dark:text-gray-100"
                                aria-labelledby={title}
                              >
                                <h2>{title}</h2>
                              </Link>
                            </div>
                            <ul className="flex flex-wrap">
                              {tags.map((t) => (
                                <li key={t} className="my-3">
                                  <button
                                    onClick={() => handleTagClick(t)}
                                    className={`${
                                      useTagStore.getState().selectedTag === t
                                        ? 'text-heading-700 dark:text-heading-400'
                                        : 'text-primary-700 hover:text-primary-800 dark:text-primary-300 dark:hover:text-primary-500'
                                    } mr-3 text-sm font-medium uppercase`}
                                    aria-label={`View posts tagged ${t}`}
                                  >
                                    {`${t}`}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="prose max-w-none text-gray-700 dark:text-gray-400">
                            {summary!.length > 149 ? `${summary!.substring(0, 149)}...` : summary}
                          </div>
                        </div>
                      </article>
                    </li>
                    // </motion.li>
                  )
                }
              })}
            </ul>
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
      </div>
    </>
  )
}
