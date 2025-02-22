"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { PropertyTypeTabs } from "./property-type-tabs"
import { PropertyFilters } from "./property-filters"
import { SearchBar } from "./search-bar"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useDispatch } from "react-redux"
import { setIsSearchOpen } from "@/lib/redux/uiSlice"
import { DialogHeader } from "@/components/shared/dialog-header"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  initialLocation?: string
  mode?: "search" | "alert"
  onApply?: (location: string, filters: string) => void
  onSearchComplete?: (location: string) => void
}

export function SearchDialog({
  open,
  onOpenChange,
  initialLocation,
  mode = "search",
  onApply,
  onSearchComplete,
}: SearchDialogProps) {
  const [page, setPage] = useState(initialLocation ? 2 : 1)
  const [propertyType, setPropertyType] = useState("buy")
  const [location, setLocation] = useState<string | undefined>(initialLocation)
  const [filters, setFilters] = useState<string>("")
  const router = useRouter()
  const dispatch = useDispatch()

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
    setPage(2)
  }

  const handleApply = () => {
    if (mode === "alert" && onApply) {
      onApply(location || "", filters)
    } else {
      dispatch(setIsSearchOpen(false))
      onOpenChange(false)
      if (onSearchComplete) {
        onSearchComplete(location || "")
      }
      router.push(`/search-results?type=${propertyType}&location=${location || ""}`, { scroll: false })
    }
  }

  const handleBack = () => {
    setPage(1)
    setLocation(undefined)
  }

  const handleClose = () => {
    dispatch(setIsSearchOpen(false))
    onOpenChange(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) {
          dispatch(setIsSearchOpen(false))
        }
        onOpenChange(newOpen)
      }}
    >
      <DialogContent className="sm:max-w-[425px] p-0 h-[90vh] max-h-[90vh] overflow-hidden flex flex-col gap-0" hideCloseButton>
        <DialogHeader title={mode === "alert" ? "Set Alert" : "Search Properties"} onClose={handleClose}>
          {page === 1 ? (
            <div className="relative after:absolute after:bottom-[-1px] after:left-0 after:right-0 after:h-[1px] after:bg-border">
              <PropertyTypeTabs value={propertyType} onValueChange={setPropertyType} />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">{location}</h3>
            </div>
          )}
        </DialogHeader>
        <div className="flex-grow overflow-y-auto px-6 py-4">
          {page === 1 ? (
            <SearchBar onLocationSelect={handleLocationSelect} />
          ) : (
            <PropertyFilters
              location={location}
              onLocationChange={setLocation}
              onFiltersChange={(newFilters) => setFilters(newFilters)}
            />
          )}
        </div>
        {page === 2 && (
          <div className="p-6 border-t flex-shrink-0">
            <Button className="w-full" size="lg" onClick={handleApply}>
              {mode === "alert" ? "Set Alert" : "Apply Filters"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

