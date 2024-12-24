import { LocaleTypes } from './i18n/settings'
import Landing from './landing/page'

type HomeProps = {
  params: { locale: LocaleTypes }
}

export default async function Page({ params: { locale } }: HomeProps) {
  
  return (
    <Landing params={{ locale: locale }} />
  )
}
