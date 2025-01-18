'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setShowHeaderAndNav, setSearchQuery } from '@/lib/redux/uiSlice'
import { RootState } from '@/lib/redux/store'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { Search } from 'lucide-react'
import { SearchDrawer } from "@/components/search-drawer"
import { PriceAnalytics } from "@/components/price-analytics"

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { searchQuery, isSearchOpen } = useSelector((state: RootState) => state.ui)
  const properties = useSelector((state: RootState) => state.properties.items)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(true))
    const onboardingCompleted = localStorage.getItem('onboardingCompleted')
    if (!onboardingCompleted) {
      router.push('/onboarding')
    }
  }, [dispatch, router])

  const handleSearch = (query: string) => {
    router.push(`/search-results?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="container py-4 space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Find Your New apartment, House, lands and more"
          className="pl-10 pr-4 bg-gray-100 border-none"
          value={searchQuery}
          onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          onKeyPress={(e) => e.key === 'Enter' && dispatch({ type: 'ui/setIsSearchOpen', payload: true })}
        />
      </div>
      <SearchDrawer
        onSearch={handleSearch}
        isOpen={isSearchOpen}
        onOpenChange={(open) => dispatch({ type: 'ui/setIsSearchOpen', payload: open })}
      />
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">For You</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:px-4">
          {properties.slice(0, 4).map(property => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button onClick={() => handleSearch(searchQuery)}>View More Properties</Button>
      </div>
      <div className="space-y-6">
        <PriceAnalytics />
      </div>
    </div>
  )
}

