'use client'

import { Fragment, useEffect, useRef, useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from '@headlessui/react'
import { DarkModeSwitch } from './DarkModeSwitch'
import { Monitor, Moon, Sun } from './icons'
import { useTheme } from './ThemeContext'
import { useOuterClick } from '../util/useOuterClick'
import { useParams } from 'next/navigation'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useTranslation } from 'app/[locale]/i18n/client'

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, 'common')
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(theme === 'dark')
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  useEffect(() => {
    setDarkModeChecked(theme === 'dark')
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  if (!mounted) return null

  return (
    <div ref={menubarRef} className="mr-5">
      <Menu 
        as="div" 
        className="relative mt-1 inline-block text-left"
      >
        <MenuButton aria-label={t('theme')}>
          <DarkModeSwitch
            checked={darkModeChecked}
            onChange={(isChecked) => setDarkModeChecked(isChecked)}
            onClick={() => setMenuOpen(!menuOpen)}
            size={24}
            theme={theme}
          />
        </MenuButton>
        <Transition
          show={menuOpen}
          as={Fragment}
          enter="transition-all ease-out duration-300"
          enterFrom="opacity-0 scale-95 translate-y-[-10px]"
          enterTo="opacity-100 scale-100 translate-y-0"
          leave="transition-all ease-in duration-200"
          leaveFrom="opacity-100 scale-100 translate-y-0"
          leaveTo="opacity-0 scale-95 translate-y-[10px]"
        >
          <MenuItems 
            modal={false}
            className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md 
                      shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <RadioGroup value={theme} onChange={handleThemeChange}>
              <div className="p-1 rounded-md 
                              bg-gradient-to-br from-white/80 via-blue-200/60 to-white/60
                              dark:bg-gradient-to-br dark:from-slate-900/60 dark:via-blue-900/20 dark:to-slate-900/30                                
                              shadow-md shadow-gray-300/80 dark:shadow-slate-700/40">
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange('light')}
                        className={`${
                          focus
                              ? 'bg-blue-200/70 dark:bg-blue-900/30'
                              : 'hover:bg-blue-200/50 dark:hover:bg-gray-600/40'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm 
                        text-gray-700 hover:text-primary-500
                        dark:text-white dark:hover:text-primary-500
                        dark:hover:text-primary-500`}
                      >
                        <Sun className="h-6 w-6" />
                        <span className="ml-2">{t('light')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="dark">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange('dark')}
                        className={`${
                          focus
                              ? 'bg-blue-200/70 dark:bg-blue-900/30'
                              : 'hover:bg-blue-200/50 dark:hover:bg-gray-600/40'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm 
                        text-gray-700 hover:text-primary-500
                        dark:text-white dark:hover:text-primary-500
                        dark:hover:text-primary-500`}
                      >
                        <Moon className="h-6 w-6" />
                        <span className="ml-2">{t('dark')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="system">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange('system')}
                        className={`${
                          focus
                              ? 'bg-blue-200/70 dark:bg-blue-900/30'
                              : 'hover:bg-blue-200/50 dark:hover:bg-gray-600/40'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm 
                        text-gray-700 hover:text-primary-500
                        dark:text-white dark:hover:text-primary-500
                        dark:hover:text-primary-500`}
                      >
                        <Monitor className="h-6 w-6" />
                        <span className="ml-2">{t('system')}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
              </div>
            </RadioGroup>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ThemeSwitch
