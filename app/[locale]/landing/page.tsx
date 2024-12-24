import { createTranslation } from '../i18n/server'
import { LocaleTypes } from '../i18n/settings'
import Hero from '@/components/landing/Hero'
import Benefits from '@/components/landing/Benefits'
import { devOps, cloud, services, experience } from '@/data/benefits'
import FullLayoutSectionContainer from '@/components/FullLayoutSectionContainer'

interface LandingProps {
  params: { locale: LocaleTypes }
}

export default async function Landing({ params: { locale } }: LandingProps) {
  const { t } = await createTranslation(locale, 'home')
  return (
    <FullLayoutSectionContainer>
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
        <div>
          <Benefits data={services[locale]} />
        </div>        
        <div>
          <Benefits imgPos="right" data={experience[locale]} />
        </div>        
      </div>
    </FullLayoutSectionContainer>
  )
}
