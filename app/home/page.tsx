"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav, setIsSearchOpen } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import PropertyCard from "@/components/property-card"
import { Search } from "lucide-react"
import { SearchDialog } from "@/components/search/search-dialog"
import { PropertyDetailsPopup } from "@/components/property-details-popup"

export default function HomePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { isSearchOpen } = useSelector((state: RootState) => state.ui)
  const properties = useSelector((state: RootState) => state.properties.items)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(true))
  }, [dispatch])

  return (
    <div className="container py-4 space-y-6">
      <div className="relative cursor-pointer" onClick={() => dispatch(setIsSearchOpen(true))}>
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search properties by location..." className="pl-10 pr-4 bg-muted cursor-pointer" readOnly />
      </div>

      <SearchDialog open={isSearchOpen} onOpenChange={(open) => dispatch(setIsSearchOpen(open))} />

      <div className="space-y-4 p-4">
        <h2 className="text-2xl font-bold">For You</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.slice(0, 4).map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>
      </div>

      <div className="text-center">
        <Button onClick={() => dispatch(setIsSearchOpen(true))}>View More Properties</Button>
      </div>
      <PropertyDetailsPopup />
    </div>
  )
}

