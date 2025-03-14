"use client"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { DualSlider } from "@/components/ui/dual-slider"
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface FilterDrawerProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilterDrawer({ open, onOpenChange }: FilterDrawerProps) {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const [selectedHouseType, setSelectedHouseType] = useState("all")
  const [selectedRooms, setSelectedRooms] = useState("4")
  const [selectedSize, setSelectedSize] = useState("1000") // default to 1000

  useEffect(() => {
    const checkScreenSize = () => setIsSmallDevice(window.innerWidth < 640)
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleApply = () => {
    onOpenChange(false)
  }

  const FilterButton = ({
    value,
    label,
    selected,
    onClick,
  }: {
    value: string
    label: string
    selected: boolean
    onClick: () => void
  }) => (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-3 rounded-full text-sm transition-all duration-200",
        selected
          ? "bg-primary text-white"
          : "bg-white text-primary border border-gray-200"
      )}
    >
      {label}
    </button>
  )

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className={isSmallDevice ? "h-[77vh]" : ""}>
        <div className="mx-auto w-full max-w-sm flex flex-col h-full p-0">
          <DrawerHeader>
            <DrawerTitle className="text-2xl">Filter</DrawerTitle>
          </DrawerHeader>

          {/* Main scrollable area */}
          <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
            <div className="space-y-8">
              {/* House Type */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">House Type</Label>
                <div className="overflow-x-auto whitespace-nowrap flex gap-2 -mx-4 px-4 scrollbar-hide">
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

              {/* Rooms */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Rooms</Label>
                <div className="overflow-x-auto whitespace-nowrap no-scrollbar flex gap-2 -mx-4 px-4">
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

              {/* Size */}
              <div className="space-y-4 ">
                <Label className="text-lg font-medium">Size (sq.ft.)</Label>
                <div className="overflow-x-auto whitespace-nowrap no-scrollbar flex gap-2 -mx-4 px-4 scrollbar-hide">
                  <FilterButton
                    value="100"
                    label="Up to 1000"
                    selected={selectedSize === "1000"}
                    onClick={() => setSelectedSize("1000")}
                  />
                  <FilterButton
                    value="2400"
                    label="Up to 2400"
                    selected={selectedSize === "2400"}
                    onClick={() => setSelectedSize("2400")}
                  />
                  <FilterButton
                    value="15000"
                    label="Up to 15000"
                    selected={selectedSize === "15000"}
                    onClick={() => setSelectedSize("15000")}
                  />
                </div>
              </div>

              {/* Price */}
              <div className="space-y-4">
                <Label className="text-lg font-medium">Price</Label>
                <div className="space-y-6">
                  <DualSlider
                    defaultValue={[175000, 1000000]}
                    max={3000000}
                    min={0}
                    step={1000}
                    className="mt-6"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>₹1,75,000</span>
                    <span>₹30,00,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <DrawerFooter className="mt-auto flex flex-col gap-2 p-0 py-6">
            <div className="flex gap-4 ">
              <Button
                variant="outline"
                className="flex-1 h-12 text-lg rounded-full border-primary hover:bg-gray-50"
                onClick={() => onOpenChange(false)}
              >
                Reset
              </Button>
              <Button
  className="flex-1 h-12 text-lg rounded-full bg-primary"
  onClick={handleApply}
>
  Apply
</Button>

            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
