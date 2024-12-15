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
                <div className="hidden h-6 text-2xl font-semibold sm:block">
                  {siteMetadata.headerTitle}
                </div>
              ) : (
                siteMetadata.headerTitle
              )}
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-4 leading-5 sm:space-x-6 snap-always snap-center">
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
                >
                  <div
                    className={`hidden font-medium ${
                      isSelected
                        ? 'text-heading-500'
                        : 'text-black hover:text-blue-900 dark:text-white dark:hover:text-blue-300'
                    } relative rounded-md px-2 py-1 font-medium transition-colors sm:block`}
                  >
                    <span className="relative z-10">{t(`${link.title.toLowerCase()}`)}</span>
                    {isSelected && (
                      <motion.span
                        layoutId="tab"
                        transition={{ type: 'spring', duration: 0.4 }}
                        className="absolute inset-0 z-0 rounded-md shadow-sm bg-gray-50 dark:bg-slate-800/70 dark:shadow-slate-600/40"
                      ></motion.span>
                    )}
                  </div>
                </Link>
              )
            })}
          {/* <AuthorsMenu className="hidden sm:block" /> */}
          <SearchButton />
          <ThemeSwitch />
          <LangSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header
