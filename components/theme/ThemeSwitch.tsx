"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Radio,
  RadioGroup,
  Transition,
} from "@headlessui/react"
import { DarkModeSwitch } from "./DarkModeSwitch"
import { Monitor, Moon, Sun } from "./icons"
import { useTheme } from "./ThemeContext"
import { useOuterClick } from "../util/useOuterClick"
import { useParams } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"

const ThemeSwitch = () => {
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "common")
  const { theme, setTheme, mounted } = useTheme()
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const [darkModeChecked, setDarkModeChecked] = useState<boolean>(theme === "dark")
  const menubarRef = useRef<HTMLDivElement>(null)

  useOuterClick(menubarRef, () => setMenuOpen(false))

  useEffect(() => {
    setDarkModeChecked(theme === "dark")
  }, [theme])

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    setMenuOpen(false)
  }

  useEffect(() => {
    const backgroundElement = document.getElementById("background-image")
    if (backgroundElement) {
      backgroundElement.style.overflow = menuOpen ? "hidden" : ""
    }
  }, [menuOpen])

  if (!mounted) return null

  return (
    <div ref={menubarRef} className="mr-5">
      <Menu as="div" className="relative mt-1 inline-block text-left" data-open={menuOpen}>
        <MenuButton aria-label={t("theme")}>
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
            modal={true}
            className="absolute right-0 z-60 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg
              ring-1 ring-black/5 focus:outline-none backdrop-blur-sm"
          >
            <RadioGroup value={theme} onChange={handleThemeChange}>
              <div
                className="p-1 rounded-md bg-gradient-to-br from-gray-200/95 via-primary-200/95 to-gray-200/95
                  dark:bg-gradient-to-br dark:from-gray-900/95 dark:via-primary-900/95 dark:to-gray-900/95 shadow-xl
                  shadow-gray-400 dark:shadow-gray-950"
              >
                <Radio value="light">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange("light")}
                        className={`${
                        focus
                            ? "bg-primary-400/50 dark:bg-primary-500/30"
                            : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                        } group flex w-full items-center rounded-md p-2 text-sm hover:backdrop-blur-sm text-gray-700
                        hover:text-primary-500 dark:text-white dark:hover:text-primary-500 dark:hover:text-primary-500
                        text-shadow text-shadow-gray-400/80 dark:text-shadow-black`}
                      >
                        <Sun className="size-6" />
                        <span className="ml-2">{t("light")}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="dark">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange("dark")}
                        className={`${
                        focus
                            ? "bg-primary-400/50 dark:bg-primary-500/30"
                            : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                        } group flex w-full items-center rounded-md p-2 text-sm hover:backdrop-blur-sm text-gray-700
                        hover:text-primary-500 dark:text-white dark:hover:text-primary-500 dark:hover:text-primary-500
                        text-shadow text-shadow-gray-400/80 dark:text-shadow-black`}
                      >
                        <Moon className="size-6" />
                        <span className="ml-2">{t("dark")}</span>
                      </button>
                    )}
                  </MenuItem>
                </Radio>
                <Radio value="system">
                  <MenuItem>
                    {({ focus }) => (
                      <button
                        onClick={() => handleThemeChange("system")}
                        className={`${
                        focus
                            ? "bg-primary-400/50 dark:bg-primary-500/30"
                            : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                        } group flex w-full items-center rounded-md p-2 text-sm text-gray-700 hover:text-primary-500
                        hover:backdrop-blur-sm dark:text-white dark:hover:text-primary-500 dark:hover:text-primary-500
                        text-shadow text-shadow-gray-400/80 dark:text-shadow-black`}
                      >
                        <Monitor className="size-6" />
                        <span className="ml-2">{t("system")}</span>
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
