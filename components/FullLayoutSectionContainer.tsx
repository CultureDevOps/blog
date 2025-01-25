import { ReactNode } from "react"

interface FullLayoutSectionContainerProps {
  children: ReactNode
}

export default function FullLayoutSectionContainer({ children }: FullLayoutSectionContainerProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-7xl xl:px-0">{children}</section>
  )
}
