'use client'

import { SVGProps, useState } from 'react'
import Image from 'next/image'
import Link from '../mdxcomponents/Link'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import { Authors, allAuthors } from 'contentlayer/generated'
import { useParams } from 'next/navigation'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'

export function ChevronDownIcon({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15 15">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M3.135 6.158a.5.5 0 0 1 .707-.023L7.5 9.565l3.658-3.43a.5.5 0 0 1 .684.73l-4 3.75a.5.5 0 0 1-.684 0l-4-3.75a.5.5 0 0 1-.023-.707"
        clipRule="evenodd"
      ></path>
    </svg>
  )
}

const MobileNav = ({ navShow, onToggleNav }: { navShow: boolean, onToggleNav: () => void }) => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const authors = allAuthors
    .filter((a) => a.language === locale)
    .sort((a, b) => (a.default === b.default ? 0 : a.default ? -1 : 1)) as Authors[]

  const mainAuthor = allAuthors.filter((a) => a.default === true && a.language === locale)

  const [accordionOpen, setAccordionOpen] = useState<boolean>(false)


  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen)
  }

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-50 h-full w-full bg-white bg-opacity-90 dark:bg-gray-950 dark:bg-opacity-95 transition-transform duration-300 ease-in-out ${
          navShow ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
        <div className="flex justify-end">
          <button className="mr-8 mt-11 h-8 w-8" aria-label="Toggle Menu" onClick={onToggleNav}>
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-gray-900 dark:text-gray-100"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <nav className="fixed mt-8 h-full">
          {headerNavLinks.map((link) => (
            <div key={link.title} className="px-12 py-4">
              <Link
                href={`/${locale}${link.href}`}
                className="text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={onToggleNav}
              >
                {t(`${link.title.toLowerCase()}`)}
              </Link>
            </div>
          ))}
          {siteMetadata.multiauthors && (
            <>
              <div
                className="flex cursor-pointer items-center justify-between px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                onClick={toggleAccordion}
              >
                <div>{t('about')}:</div>
                <motion.div
                  animate={{ rotate: accordionOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDownIcon
                    className={`h-5 w-5 ${accordionOpen ? 'text-primary-500' : ''}`}
                  />
                </motion.div>
              </div>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: accordionOpen ? 'auto' : 0, opacity: accordionOpen ? 1 : 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                className="overflow-hidden"
              >
                {authors.map((author) => {
                  const { name, avatar, language, slug } = author
                  if (language === locale) {
                    return (
                      <button
                        key={name}
                        className="group flex w-full items-center rounded-md px-12 py-4 text-sm"
                      >
                        <div className="mr-2">
                          <Image
                            className="rounded-full w-auto h-auto"
                            src={avatar ?? ''}
                            title="avatar"
                            alt="avatar"
                            width={25}
                            height={25}
                          />
                        </div>
                        <Link
                          href={`/${locale}/about/${slug}`}
                          onClick={onToggleNav}
                          className="text-xl font-bold tracking-widest text-gray-900 dark:text-gray-100"
                        >
                          {name}
                        </Link>
                      </button>
                    )
                  }
                  return null
                })}
              </motion.div>
            </>
          )}
          {siteMetadata.multiauthors === false && (
            <div className="px-12 py-4 text-2xl font-bold tracking-widest text-gray-900 dark:text-gray-100">
              {mainAuthor.map((author) => {
                const { name, language, slug } = author
                if (language === locale) {
                  return (
                    <Link href={`/${locale}/about/${slug}`} onClick={onToggleNav} key={name}>
                      {t('about')}
                    </Link>
                  )
                }
                return null
              })}
            </div>
          )}
        </nav>
      </div>
    </>
  )
}

export default MobileNav
