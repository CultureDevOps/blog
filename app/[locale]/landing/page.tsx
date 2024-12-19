import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import { devOps, cloud } from '@/data/benefits'

interface LandingProps {
  params: { locale: LocaleTypes }
}

export default async function Landing({ params: { locale } }: LandingProps) {
  const { t } = await createTranslation(locale, 'home')
  return (
    <>
      <div>
        <div>
          <Hero params={{ locale: locale }} />
        </div>
        <div>
          <Benefits data={devOps[locale]} />
        </div>
        <div>
          <Benefits imgPos="right" data={cloud[locale]} />
        </div>
      </div>
    </>
  )
}
