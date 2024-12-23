'use client'

import { useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { useTagStore } from '../util/useTagStore'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  const locale = useParams()?.locale as LocaleTypes
  const { setSelectedTag } = useTagStore()

  const handleClick = useCallback(() => {
    setSelectedTag(text)
  }, [text, setSelectedTag])

  return (
    <Link href={`/${locale}/blog`}>
      <span
        onClick={handleClick}
        className="mr-3 cursor-pointer text-sm font-medium uppercase 
                  py-2
                  text-primary-700 hover:text-primary-600 
                  dark:text-primary-300 dark:hover:text-primary-400"
      >
        {text.split(' ').join('-')}
      </span>
    </Link>
  )
}

export default Tag
