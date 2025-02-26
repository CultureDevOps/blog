import { useState, useRef, useCallback, useMemo, useEffect } from "react"
import { usePathname, useParams, useRouter } from "next/navigation"
import { useOuterClick } from "../util/useOuterClick"
import { useTagStore } from "@/components/util/useTagStore"
import { LocaleTypes, locales } from "app/[locale]/i18n/settings"
import {
  Menu,
  Transition,
  RadioGroup,
  MenuButton,
  MenuItems,
  Radio,
  MenuItem,
} from "@headlessui/react"
import { ChevronDownIcon } from "./icon"
import Flag from "./flag"

const LangSwitch = () => {
  const pathname = usePathname()
  const params = useParams()
  const locale = (params.locale as string) || ""
  const router = useRouter()
  const setSelectedTag = useTagStore((state) => state.setSelectedTag)
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const menubarRef = useRef<HTMLDivElement>(null)
  useOuterClick(menubarRef, () => setIsMenuOpen(false))

  const handleLocaleChange = useCallback(
    (newLocale: string): string => {
      const segments = pathname!.split("/")
      const localeIndex = segments.findIndex((segment) => locales.includes(segment as LocaleTypes))
      if (localeIndex !== -1) {
        segments[localeIndex] = newLocale
      } else {
        segments.splice(1, 0, newLocale)
      }
      const newPath = segments.join("/").replace(/\/$/, "")
      return newPath
    },
    [pathname]
  )

  const handleLinkClick = useCallback(
    (newLocale: string) => {
      setSelectedTag("")
      const resolvedUrl = handleLocaleChange(newLocale)
      router.push(resolvedUrl)
      setIsMenuOpen(false)
    },
    [handleLocaleChange, router, setSelectedTag]
  )

  useEffect(() => {
    const backgroundElement = document.getElementById("background-image")
    if (backgroundElement) {
      backgroundElement.style.overflow = isMenuOpen ? "hidden" : "auto"
    }
  }, [isMenuOpen])

  const currentLocale = useMemo(() => locale.charAt(0).toUpperCase() + locale.slice(1), [locale])

  return (
    <div ref={menubarRef} className="relative inline-block text-left">
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton
              className="inline-flex rounded-md px-1 py-2 font-bold leading-5 text-gray-700 dark:text-white text-shadow
                text-shadow-gray-400/80 dark:text-shadow-black"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* {currentLocale} */}
              <Flag locale={currentLocale} />
              <ChevronDownIcon
                className={`ml-1 mt-1 transition-transform duration-300${open ? "rotate-180" : "rotate-0"}`}
              />
            </MenuButton>
            <Transition
              show={open}
              enter="transition-all ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-[-10px]"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="transition-all ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-[10px]"
            >
              <MenuItems
                modal={false}
                className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md shadow-lg
                  ring-1 ring-black/5 focus:outline-none backdrop-blur-sm"
                aria-orientation="vertical"
              >
                <RadioGroup>
                  <div
                    className="p-1 rounded-md bg-gradient-to-br from-gray-200/95 via-primary-200/95 to-gray-200/95
                      dark:bg-gradient-to-br dark:from-gray-900/95 dark:via-primary-900/95 dark:to-gray-900/95 shadow-xl
                      shadow-gray-400 dark:shadow-gray-950"
                  >
                    {locales.map((newLocale: string) => (
                      <Radio key={newLocale} value={newLocale}>
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              onClick={() => handleLinkClick(newLocale)}
                              className={`${
                              focus
                                  ? "bg-primary-400/50 dark:bg-primary-500/30"
                                  : "hover:bg-primary-400/50 dark:hover:bg-gray-600/40"
                              } group flex w-full items-center rounded-md p-2 text-sm font-bold text-gray-700
                              hover:text-primary-500 dark:text-white dark:hover:text-primary-500 text-shadow
                              text-shadow-gray-400/80 dark:text-shadow-black`}
                              role="menuitem"
                            >
                              <Flag locale={newLocale} />
                            </button>
                          )}
                        </MenuItem>
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>
              </MenuItems>
            </Transition>
          </div>
        )}
      </Menu>
    </div>
  )
}

export default LangSwitch
