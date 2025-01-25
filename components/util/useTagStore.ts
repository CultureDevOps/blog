import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

interface TagStore {
  selectedTag: string
  setSelectedTag: (tag: string) => void
}

export const useTagStore = create(
  subscribeWithSelector<TagStore>((set) => ({
    selectedTag: "",
    setSelectedTag: (tag) => set({ selectedTag: tag }), // Pas de mise à jour si valeur identique
  }))
)
