"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"

type FavoriteContextType = {
  favorites: string[]
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined)

export function FavoriteProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (id: string) => favorites.includes(id)

  return (
    <FavoriteContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>{children}</FavoriteContext.Provider>
  )
}

export function useFavorite() {
  const context = useContext(FavoriteContext)
  if (context === undefined) {
    throw new Error("useFavorite must be used within a FavoriteProvider")
  }
  return context
}

