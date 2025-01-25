"use client"

import { useCallback } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { useTagStore } from "../util/useTagStore"
import { LocaleTypes } from "app/[locale]/i18n/settings"

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes
  const { setSelectedTag } = useTagStore()

  const handleClick = useCallback(() => {
    setSelectedTag(text)
  }, [text, setSelectedTag])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick()
    }
  }

  return (
    <Link href={`/${locale}/blog`}>
      <span
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className="mr-3 cursor-pointer py-2 text-sm font-medium uppercase text-primary-700 hover:text-primary-600
          dark:text-primary-300 dark:hover:text-primary-400"
        role="button" // Ajout du rôle de bouton
        tabIndex={0} // Rendre l'élément focusable
      >
        {text.split(" ").join("-")}
      </span>
    </Link>
  )
}

export default Tag
