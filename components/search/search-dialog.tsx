"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PropertyTypeTabs } from "./property-type-tabs"
import { PropertyFilters } from "./property-filters"
import { SearchBar } from "./search-bar"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, X } from "lucide-react"
import { useDispatch } from "react-redux"
import { setIsSearchOpen } from "@/lib/redux/uiSlice"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialLocation?: string
}

export function SearchDialog({ open, onOpenChange, initialLocation }: SearchDialogProps) {
  const [page, setPage] = useState(initialLocation ? 2 : 1)
  const [propertyType, setPropertyType] = useState("buy")
  const [location, setLocation] = useState<string | undefined>(initialLocation)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
    setPage(2)
  }

  const handleApply = () => {
    onOpenChange(false)
    dispatch(setIsSearchOpen(false))
    router.push(`/search-results?type=${propertyType}&location=${location || ""}`, { scroll: false })
  }

  const handleBack = () => {
    setPage(1)
    setLocation(undefined)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0 h-[90vh] max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Search Properties</h2>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full border-2 border-red-500"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {page === 1 ? (
            <PropertyTypeTabs value={propertyType} onValueChange={setPropertyType} />
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">{location}</h3>
            </div>
          )}
        </div>
        <div className="flex-grow overflow-y-auto px-6">
          {page === 1 ? (
            <SearchBar onLocationSelect={handleLocationSelect} />
          ) : (
            <PropertyFilters location={location} onLocationChange={setLocation} />
          )}
        </div>
        {page === 2 && (
          <div className="p-6 border-t flex-shrink-0">
            <Button className="w-full" size="lg" onClick={handleApply}>
              Apply Filters
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

