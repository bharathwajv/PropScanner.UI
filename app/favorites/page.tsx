'use client'

import { Layout } from "@/components/layout"
import PropertyCard from "@/components/property-card"
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/redux/store'

// This is a mock function to get property details. In a real app, you'd fetch this data from an API or database.
const getPropertyDetails = (id: string) => ({
  id,
  image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-a1a761d4b579a4df105c42dd73a06e54-nVZCpxnbsYmRrMycuuszVhcyAO2eWh.webp",
  title: `Property ${id}`,
  price: Math.floor(Math.random() * 1000000) + 100000,
  specs: {
    beds: Math.floor(Math.random() * 5) + 1,
    baths: Math.floor(Math.random() * 3) + 1,
    area: `${Math.floor(Math.random() * 1000) + 500}m²`,
  },
  has360Tour: Math.random() > 0.5,
})

export default function FavoritesPage() {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids)

  return (
    <div className="container py-4">
      <h1 className="text-2xl font-bold mb-4">Favorites</h1>
      {favoriteIds.length === 0 ? (
        <p>You haven't added any properties to your favorites yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteIds.map((id) => {
            const property = getPropertyDetails(id)
            return <PropertyCard key={id} {...property} />
          })}
        </div>
      )}
    </div>
  )
}

