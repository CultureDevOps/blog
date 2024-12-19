import Image from 'next/image'
import Container from './Container'
import heroImg from 'public/static/images/light-and-gears-01-compressed.png'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import { createTranslation } from 'app/[locale]/i18n/server'
import { LocaleTypes } from 'app/[locale]/i18n/settings'

type Props = {
  params: { locale: LocaleTypes }
}

export default async function Hero({ params: { locale } }: Props) {
  const { t } = await createTranslation(locale, 'hero')
  return (
    <>
      <Container className="flex flex-wrap ">
        <div className="flex w-full items-center lg:w-1/2">
          <div className="mb-8 max-w-2xl font-headings">
            {/* <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              {siteMetadata.headerTitle}
            </h1> */}
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              {t('title_1')}
            </h1>
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              {t('title_2')}
            </h1>
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 dark:text-white lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight">
              {t('title_3')}
            </h1>
            <p className="py-5 text-xl leading-normal text-gray-500 dark:text-gray-300 lg:text-xl xl:text-2xl">
              {t('title_description')}
            </p>
            <div className="mb-3 flex space-x-4">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
              <SocialIcon kind="github" href={siteMetadata.github} size={6} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
              <SocialIcon kind="x" href={siteMetadata.x} size={6} />
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="">
            <Image
              src={heroImg}
              // width="720"
              // height="720"
              className="object-cover"
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
              priority
            />
          </div>
        </div>
      </Container>
    </>
  )
}
