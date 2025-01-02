'use client'

import siteMetadata from '@/data/siteMetadata'
import { useTranslation } from 'app/[locale]/i18n/client'
import { LocaleTypes } from 'app/[locale]/i18n/settings'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AlgoliaButton } from 'pliny/search/AlgoliaButton'
import { KBarButton } from '../search/KBarButton'
import { CommentsIcon, ArrowTopIcon } from './icons'
import { SearchIcon } from '../search/icons'

const ScrollTopAndComment = () => {
  const locale = useParams()?.locale as LocaleTypes;
  const { t } = useTranslation(locale, 'common');
  const [show, setShow] = useState<boolean>(false);
  const [backgroundImage, setBackgroundImage] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Définir l'élément `background-image` uniquement côté client
    const element = document.getElementById('background-image');
    setBackgroundImage(element);

    const handleScroll = () => {
      if (element && element.scrollTop > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    };

    // Ajouter un écouteur de scroll sur l'élément trouvé
    if (element) {
      element.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (element) {
        element.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const handleScrollTop = () => {
    backgroundImage?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToComment = () => {
    const commentElement = document.getElementById('comment');
    if (commentElement && backgroundImage) {
      const offset = 50; // Ajuster si nécessaire
      const elementPosition = commentElement.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + backgroundImage.scrollTop - offset;

      backgroundImage.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton

    return (
      <div
        className={`fixed bottom-8 right-8 z-50 flex flex-col space-y-2 ${show ? 'md:flex' : 'md:hidden'} transition-all`}
      >
        <SearchButtonWrapper aria-label="Search">
          <div className="flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600">
            <SearchIcon className="h-5 w-5" />
          </div>
        </SearchButtonWrapper>
        {siteMetadata.comments?.provider && (
          <button
            aria-label={t('scrollcomment')}
            onClick={handleScrollToComment}
            className="flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
          >
            <CommentsIcon className="h-5 w-5" />
          </button>
        )}
        <button
          aria-label={t('scrolltop')}
          onClick={handleScrollTop}
          className="flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-600 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <ArrowTopIcon className="h-5 w-5" />
        </button>
      </div>

      )
  }
}

export default ScrollTopAndComment
