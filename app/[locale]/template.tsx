"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useMediaQuery } from "react-responsive"

export default function Template({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [isHydrated, setIsHydrated] = useState(false)
  const isMobileQuery = useMediaQuery({ maxWidth: 768 })

  useEffect(() => {
    // Après l'hydratation, mettre à jour l'état `isMobile`
    setIsMobile(isMobileQuery)
    setIsHydrated(true)
  }, [isMobileQuery])

  if (isMobile) {
    return <>{children}</>
  }

  return isHydrated ? (
    <motion.div
      initial={{ y: 15, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.7 }}
    >
      {children}
    </motion.div>
  ) : (
    <div>{children}</div> // Fallback sans animation
  )
}
