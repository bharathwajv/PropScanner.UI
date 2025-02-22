"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DualSlider } from "@/components/ui/dual-slider"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { SlidersHorizontal } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FilterDrawerProps {
  onFilter: () => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterDrawer({ onFilter, isOpen, onOpenChange }: FilterDrawerProps) {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [propertyCount, setPropertyCount] = useState(0)
  const [selectedHouseType, setSelectedHouseType] = useState("all")
  const [selectedRooms, setSelectedRooms] = useState("4")
  const [selectedSize, setSelectedSize] = useState("100")

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleApply = () => {
    setIsLoading(true)
    setTimeout(() => {
      if (onFilter) onFilter()
      onOpenChange(false)
      setIsLoading(false)
    }, 1500)
  }

  const FilterButton = ({
    value,
    label,
    selected,
    onClick,
  }: { value: string; label: string; selected: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full text-sm transition-all duration-200",
        selected ? "bg-gray-900 text-white" : "bg-white text-gray-600 border border-gray-200",
      )}
    >
      {label}
    </button>
  )

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <SlidersHorizontal className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isSmallDevice ? "h-[85vh]" : ""}>
        <div className="mx-auto w-full max-w-sm flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Filter</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-8">
              <div className="space-y-4">
                <Label className="text-lg font-medium">House Type</Label>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    value="all"
                    label="All of them"
                    selected={selectedHouseType === "all"}
                    onClick={() => setSelectedHouseType("all")}
                  />
                  <FilterButton
                    value="single"
                    label="Single Storey"
                    selected={selectedHouseType === "single"}
                    onClick={() => setSelectedHouseType("single")}
                  />
                  <FilterButton
                    value="buildings"
                    label="Buildings"
                    selected={selectedHouseType === "buildings"}
                    onClick={() => setSelectedHouseType("buildings")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Rooms</Label>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    value="3"
                    label="3 and less"
                    selected={selectedRooms === "3"}
                    onClick={() => setSelectedRooms("3")}
                  />
                  <FilterButton
                    value="4"
                    label="4 Room"
                    selected={selectedRooms === "4"}
                    onClick={() => setSelectedRooms("4")}
                  />
                  <FilterButton
                    value="6"
                    label="6 Room"
                    selected={selectedRooms === "6"}
                    onClick={() => setSelectedRooms("6")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Size (M²)</Label>
                <div className="flex flex-wrap gap-2">
                  <FilterButton
                    value="100"
                    label="Up to 100"
                    selected={selectedSize === "100"}
                    onClick={() => setSelectedSize("100")}
                  />
                  <FilterButton
                    value="160"
                    label="Up to 160"
                    selected={selectedSize === "160"}
                    onClick={() => setSelectedSize("160")}
                  />
                  <FilterButton
                    value="220"
                    label="Up to 220"
                    selected={selectedSize === "220"}
                    onClick={() => setSelectedSize("220")}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Price</Label>
                <div className="space-y-6">
                  <DualSlider defaultValue={[175000, 300000]} max={300000} min={0} step={1000} className="mt-6" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>£175,000</span>
                    <span>£300,000</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-lg font-medium">Location</Label>
                <Input placeholder="Great Falls, Maryland" className="rounded-full bg-white border-gray-200" />
              </div>
            </div>
          </div>
          <DrawerFooter className="px-4 py-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 rounded-full border-gray-200 hover:bg-gray-50"
                onClick={() => onOpenChange(false)}
              >
                Reset
              </Button>
              <Button className="flex-1 rounded-full bg-gray-900 hover:bg-gray-800" onClick={handleApply}>
                Apply
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

