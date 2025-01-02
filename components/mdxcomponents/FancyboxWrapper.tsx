"use client";

import { useEffect } from "react";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const FancyboxWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("@fancyapps/ui").then((module) => {
        const Fancybox = module.Fancybox;

        // Associer Fancybox avec un gestionnaire d'événements
        Fancybox.bind("[data-fancybox='gallery']", {
          trapFocus: false, // Désactive la gestion automatique du focus
          autoFocus: false, // Empêche de donner le focus sur des éléments inutiles
          placeFocusBack: true, // Retourne le focus à l'origine après fermeture
          on: {
            done: () => {
              // Désactive le focus automatique et gère l'ouverture
              document.body.style.pointerEvents = "none";
            },
            close: () => {
              // Réactive les événements sur le body à la fermeture
              document.body.style.pointerEvents = "auto";
            },
          },
          Toolbar:{
            display: {
              left: ["infobar"],
              middle: [],
              right: ["iterateZoom","slideshow","fullscreen","download", "thumbs", "close"],
            },            
          }
        });
      });
    }
  }, []);

  return <>{children}</>;
};

export default FancyboxWrapper;
