"use client"

import { useEffect } from "react"
import "@fancyapps/ui/dist/fancybox/fancybox.css"

const FancyboxWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@fancyapps/ui").then((module) => {
        const Fancybox = module.Fancybox

        // Associer Fancybox avec un gestionnaire d'événements
        Fancybox.bind("[data-fancybox='gallery']", {
          Toolbar: {
            display: {
              left: ["infobar"],
              middle: [],
              right: ["iterateZoom", "slideshow", "fullscreen", "download", "thumbs", "close"],
            },
          },
        })
      })
    }
  }, [])

  return <>{children}</>
}

export default FancyboxWrapper
