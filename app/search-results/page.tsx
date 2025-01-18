'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setShowHeaderAndNav, setIsLoading, setSearchQuery } from '@/lib/redux/uiSlice'
import { RootState } from '@/lib/redux/store'
import { setProperties } from '@/lib/redux/propertiesSlice'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { NavTabs } from "@/components/nav-tabs"
import { FilterDrawer } from "@/components/filter-drawer"
import { LinearProgress } from "@/components/linear-progress"
import { Search, ArrowLeft } from 'lucide-react'
import { SearchDrawer } from "@/components/search-drawer"

// Dummy property generator
const generateDummyProperty = (id: number) => ({
  id: `dummy-${id}`,
  image: `https://source.unsplash.com/random/800x600?house&${id}`,
  title: `Dummy Property ${id}`,
  price: Math.floor(Math.random() * 500000) + 100000,
  specs: {
    beds: Math.floor(Math.random() * 5) + 1,
    baths: Math.floor(Math.random() * 3) + 1,
    area: `${Math.floor(Math.random() * 2000) + 1000}sqft`,
  },
  has360Tour: Math.random() > 0.5,
})

export default function SearchResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const properties = useSelector((state: RootState) => state.properties.items)
  const { searchQuery, selectedTab, isLoading, isFilterOpen, isSearchOpen } = useSelector((state: RootState) => state.ui)
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
    const query = searchParams.get('q')
    if (query && query !== searchQuery) {
      setLocalSearchQuery(query)
      dispatch(setSearchQuery(query))
      handleSearch(query)
    }
  }, [dispatch, searchParams, searchQuery])

  const handleSearch = (query: string = localSearchQuery) => {
    if (query === searchQuery && properties.length > 0) return;
    
    dispatch({ type: 'ui/setIsFilterOpen', payload: false })
    dispatch(setIsLoading(true))
    dispatch(setProperties([]))
    
    // Simulate asynchronous loading of dummy properties
    let loadedProperties: any[] = []
    const loadProperty = (index: number) => {
      setTimeout(() => {
        loadedProperties.push(generateDummyProperty(index + 1))
        dispatch(setProperties([...loadedProperties]))
        if (index < 4) {
          loadProperty(index + 1)
        } else {
          dispatch(setIsLoading(false))
        }
      }, 1000)
    }

    loadProperty(0)
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button
            onClick={() => router.back()}
            className="mr-4 rounded-full bg-gray-100 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search properties"
              className="pl-10 pr-4 bg-gray-100 border-none"
              value={localSearchQuery}
              onChange={(e) => {
                setLocalSearchQuery(e.target.value)
                dispatch(setSearchQuery(e.target.value))
              }}
              onKeyPress={(e) => e.key === 'Enter' && dispatch({ type: 'ui/setIsSearchOpen', payload: true })}
            />
          </div>
          <FilterDrawer 
            onFilter={handleSearch} 
            isOpen={isFilterOpen} 
            onOpenChange={(open) => dispatch({ type: 'ui/setIsFilterOpen', payload: open })} 
          />
        </div>
      </header>

      <main className="container py-4 space-y-6">
        {isLoading && <LinearProgress />}

        {properties.length > 0 && (
          <>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {properties.length} properties found
              </div>
              <Button variant="outline" size="sm" onClick={() => dispatch({ type: 'ui/setIsFilterOpen', payload: true })}>
                Filter
              </Button>
            </div>

            <div className="flex justify-center">
              <NavTabs
                tabs={["Nearby", "Recommend", "New Listings"]}
                selected={selectedTab}
                onSelect={(tab) => dispatch({ type: 'ui/setSelectedTab', payload: tab })}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {properties.map(property => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </>
        )}

        {properties.length === 0 && !isLoading && (
          <div className="text-center space-y-4 py-12">
            <h2 className="text-2xl font-bold">No properties found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search or filter to find more properties.
            </p>
          </div>
        )}
      </main>

      <SearchDrawer
        onSearch={handleSearch}
        isOpen={isSearchOpen}
        onOpenChange={(open) => dispatch({ type: 'ui/setIsSearchOpen', payload: open })}
      />
    </div>
  )
}

