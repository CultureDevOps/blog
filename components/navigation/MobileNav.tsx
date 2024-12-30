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
import LangSwitch from '../langswitch'
import SearchButton from '../search/SearchButton'
import ThemeSwitch from '../theme/ThemeSwitch'

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
        </nav>
      </div>
    </>
  )
}

export default MobileNav
