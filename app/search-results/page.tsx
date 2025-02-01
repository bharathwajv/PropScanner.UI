"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav, setIsSearchOpen, setIsFilterOpen, setSelectedTab } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/property-card"
import { Search, ArrowLeft, SlidersHorizontal } from "lucide-react"
import { SearchDialog } from "@/components/search/search-dialog"
import { Button } from "@/components/ui/button"
import { FilterDrawer } from "@/components/filter-drawer"
import { PropertyDetailsPopup } from "@/components/property-details-popup"
import { LinearProgress } from "@/components/ui/linear-progress"
import { NavTabs } from "@/components/nav-tabs"

export default function SearchResultsPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const { isSearchOpen, isFilterOpen, selectedTab } = useSelector((state: RootState) => state.ui)
  const allProperties = useSelector((state: RootState) => state.properties.items)
  const [properties, setProperties] = useState([])
  const [searchLocation, setSearchLocation] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  const tabs = ["Nearby", "Recommend", "Upcoming"]

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
    const location = searchParams.get("location")
    if (location) {
      setSearchLocation(location)
    }
    loadProperties()
  }, [dispatch, searchParams])

  const loadProperties = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProperties(allProperties)
    setIsLoading(false)
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button onClick={handleGoBack} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Search Results</h1>
        </div>
      </header>

      {isLoading && <LinearProgress />}

      <div className="container py-4 space-y-6">
        <div className="flex gap-2">
          <div className="relative cursor-pointer flex-grow" onClick={() => dispatch(setIsSearchOpen(true))}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Find Your New apartment, House, lands and more"
              value={searchLocation}
              className="pl-10 pr-4 bg-muted cursor-pointer"
              readOnly
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-2"
            onClick={() => dispatch(setIsFilterOpen(true))}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center">
          <NavTabs tabs={tabs} selected={selectedTab} onSelect={(tab) => dispatch(setSelectedTab(tab))} />
        </div>

        <SearchDialog
          open={isSearchOpen}
          onOpenChange={(open) => dispatch(setIsSearchOpen(open))}
          initialLocation={searchLocation}
        />

        <FilterDrawer
          isOpen={isFilterOpen}
          onOpenChange={(open) => dispatch(setIsFilterOpen(open))}
          onFilter={() => {
            // Implement filter logic here
          }}
        />

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>
      </div>
      <PropertyDetailsPopup />
    </div>
  )
}

