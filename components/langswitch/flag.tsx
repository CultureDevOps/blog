import React from "react"
import FlagEn from "@/data/flag-en.svg"
import FlagFr from "@/data/flag-fr.svg"

type FlagProps = {
  locale: string
}

const flags = [
  { locale: "en", icon: <FlagEn className="size-5" /> },
  { locale: "fr", icon: <FlagFr className="size-5" /> },
]

const Flag: React.FC<FlagProps> = ({ locale }) => {
  const flag = flags.find((l) => l.locale.toLowerCase() === locale.toLowerCase())
  if (!flag) {
    // Si aucun drapeau correspondant, retournez seulement le nom de la locale
    return <span className="text-sm font-bold">{locale.toUpperCase()}</span>
  }
  return (
    <div className="flex items-center space-x-2">
      {flag.icon}
      <span className="text-sm">{flag.locale.toUpperCase()}</span>
    </div>
  )
}

export default Flag
