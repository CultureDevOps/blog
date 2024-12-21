'use client'

import Image from 'next/image'
import { useParams, usePathname } from 'next/navigation'
import siteMetadata from '@/data/siteMetadata'
import headerNavLinks from '@/data/headerNavLinks'
import Link from '../mdxcomponents/Link'
import MobileNav from './MobileNav'
import ThemeSwitch from '../theme/ThemeSwitch'
import LangSwitch from '../langswitch'
import SearchButton from '../search/SearchButton'
import { useTranslation } from 'app/[locale]/i18n/client'
import type { LocaleTypes } from 'app/[locale]/i18n/settings'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const Header = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const pathname = usePathname()

  const [selectedPath, setSelectedPath] = useState<string | null>(null)

  // Mise à jour de l'état `selectedPath` uniquement côté client
  useEffect(() => {
    if (pathname) {
      setSelectedPath(pathname)
    }
  }, [pathname])
  const [navShow, setNavShow] = useState<boolean>(false)

  const onToggleNav = () => {
    setNavShow((prev) => {
      if (prev) {
        document.body.style.overflow = 'auto'
      } else {
        document.body.style.overflow = 'hidden'
      }
      return !prev
    })
  }

  return (
    <header>
      <div className="flex items-center justify-between py-10">
        <div>
          <Link href={`/${locale}/`} aria-label={siteMetadata.headerTitle}>
            <div className="flex items-center justify-between">
              <div className="mr-3">
                {/* <Logo /> */}
                <Image alt="logo" src={siteMetadata.siteLogo ?? ''} width={180} height={180} priority={true}/>
              </div>
              {typeof siteMetadata.headerTitle === 'string' ? (
                <div className="hidden h-6 text-2xl sm:block font-logo antialiased">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className={`flex items-center space-x-4 leading-5 sm:space-x-6 font-headings antialiased`}>
          {headerNavLinks
            .filter((link) => !!link.href) // Vérifie que `link.href` est défini
            .map((link) => {
              const isSelected =
                (selectedPath === `/${locale}` ||  selectedPath === '/') && link.href === '/landing'
                  ? true
                  : selectedPath?.includes(link.href as string)
              return (
                <Link
                  key={link.title}
                  href={`/${locale}${link.href}`}
                  className="flex transform-gpu items-center space-x-1 transition-transform duration-300"
                  aria-label={link.title}
                >
                  <div
                    className={`hidden font-medium ${
                      isSelected
                        ? 'text-heading-800 dark:text-heading-300'
                        : 'text-black hover:text-blue-900 dark:text-white dark:hover:text-blue-300'
                    } relative rounded-md px-2 py-2 font-medium transition-colors sm:block`}
                  >
                    <span className="relative z-10">{t(`${link.title.toLowerCase()}`)}</span>
                    {isSelected && (
                      <motion.div
                        layoutId="tab"
                        transition={{
                          type: 'spring',
                          duration: 0.4,
                          damping: 25,
                          stiffness: 300,
                        }}
                        className="absolute inset-0 z-0 rounded-md shadow-md border border-white/10  
                        bg-gradient-to-b from-blue-200/60 via-white/40 to-blue-200/30 backdrop-blur-md 
                        dark:bg-gradient-to-b dark:from-slate-900/60 dark:via-blue-900/30 dark:to-slate-900/30 
                        dark:shadow-slate-700/40"
                      ></motion.div>
                    )}
                  </div>
                </Link>

              )
            })}
          {/* <AuthorsMenu className="hidden sm:block" /> */}
          <SearchButton />
          <ThemeSwitch />
          <LangSwitch />
          {/* Mobile menu toggle button */}
          <button
            className="sm:hidden z-50 text-gray-900 dark:text-gray-100"
            onClick={onToggleNav}
            aria-label={t('showmenu')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-8 w-8"
            >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />

            </svg>
          </button>          
        </div>
      </div>
      <MobileNav navShow={navShow} onToggleNav={onToggleNav} />
    </header>
  )
}

export default Header
