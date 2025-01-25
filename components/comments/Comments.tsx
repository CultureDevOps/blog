"use client"

import { Comments as CommentsComponent } from "pliny/comments"
import { useState } from "react"
import siteMetadata from "@/data/siteMetadata"
import { useParams } from "next/navigation"
import { LocaleTypes } from "app/[locale]/i18n/settings"
import { useTranslation } from "app/[locale]/i18n/client"

type CommentsProps = {
  slug: string
}

export default function Comments({ slug }: CommentsProps) {
  const [loadComments, setLoadComments] = useState(false)
  const locale = useParams()?.locale as LocaleTypes
  const { t } = useTranslation(locale, "home")
  return (
    <>
      {!loadComments && (
        <button onClick={() => setLoadComments(true)}>
          <p
            className="text-highlighted dark:text-darkmode-highlighted mr-3 px-4 text-lg font-bold text-primary-700
              hover:text-primary-600 dark:text-primary-300 dark:hover:text-primary-400"
          >
            {t("comment")}
          </p>
        </button>
      )}
      {siteMetadata.comments && loadComments && (
        <CommentsComponent commentsConfig={siteMetadata.comments} slug={slug} />
      )}
    </>
  )
}
