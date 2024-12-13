import siteMetadata from '@/data/siteMetadata'
import { formatDate } from 'pliny/utils/formatDate'
import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import SectionTitle from '@/components/landing/SectionTitle'
import { devOps, cloud } from '@/data/benefits'

interface LandingProps {
  params: { locale: LocaleTypes }
}

const MAX_DISPLAY = 5

export default async function Landing({ params: { locale } }: LandingProps) {
  const { t } = await createTranslation(locale, 'home')
  return (
    <>
      <div>
        <div className='snap-always snap-center'>
          <Hero params={{ locale: locale }} />
        </div>
        {/* <SectionTitle pretitle={t('presentation_title')}>{t('presentation')}</SectionTitle> */}
        <div className='snap-always snap-center'>
          <Benefits data={devOps[locale]} />
        </div>
        <div className='snap-always snap-center'>
          <Benefits imgPos="right" data={cloud[locale]} />
        </div>
      </div>
    </>
  )
}
