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
          <div className="mb-6 flex-grow 
                   bg-gradient-to-tr from-white/40 via-blue-200/30 to-white/30 
                   dark:bg-gradient-to-tr dark:from-slate-900/30 dark:via-blue-950/30 dark:to-slate-900/30 
                   backdrop-blur-sm rounded-lg p-8 shadow-lg 
                   border border-white/20 dark:border-gray-700/20
                   shadow-xl shadow-slate-400 dark:shadow-slate-950">
            <Hero params={{ locale: locale }} />
          </div>
          <div className="mb-6 flex-grow 
                   bg-gradient-to-tr from-white/40 via-blue-200/30 to-white/30 
                   dark:bg-gradient-to-tr dark:from-slate-900/30 dark:via-blue-950/30 dark:to-slate-900/30 
                   backdrop-blur-sm rounded-lg p-8 shadow-lg 
                   border border-white/20 dark:border-gray-700/20
                   shadow-xl shadow-slate-400 dark:shadow-slate-950">
            <Benefits data={devOps[locale]} />
          </div>
          <div className="mb-6 flex-grow 
                   bg-gradient-to-tr from-white/40 via-blue-200/30 to-white/30 
                   dark:bg-gradient-to-tr dark:from-slate-900/30 dark:via-blue-950/30 dark:to-slate-900/30 
                   backdrop-blur-sm rounded-lg p-8 shadow-lg 
                   border border-white/20 dark:border-gray-700/20
                   shadow-xl shadow-slate-400 dark:shadow-slate-950">
            <Benefits imgPos="right" data={cloud[locale]} />
          </div>
          <div className="mb-6 flex-grow 
                   bg-gradient-to-tr from-white/40 via-blue-200/30 to-white/30 
                   dark:bg-gradient-to-tr dark:from-slate-900/30 dark:via-blue-950/30 dark:to-slate-900/30 
                   backdrop-blur-sm rounded-lg p-8 shadow-lg 
                   border border-white/20 dark:border-gray-700/20
                   shadow-xl shadow-slate-400 dark:shadow-slate-950">
            <Benefits data={services[locale]} />
          </div>        
          <div className="mb-6 flex-grow 
                   bg-gradient-to-tr from-white/40 via-blue-200/30 to-white/30 
                   dark:bg-gradient-to-tr dark:from-slate-900/30 dark:via-blue-950/30 dark:to-slate-900/30 
                   backdrop-blur-sm rounded-lg p-8 shadow-lg 
                   border border-white/20 dark:border-gray-700/20
                   shadow-xl shadow-slate-400 dark:shadow-slate-950">
            <Benefits imgPos="right" data={experience[locale]} />
          </div>        
    </FullLayoutSectionContainer>
  )
}
