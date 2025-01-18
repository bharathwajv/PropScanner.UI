'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DualSlider } from "@/components/ui/dual-slider"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { SlidersHorizontal } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Skeleton } from "@/components/ui/skeleton"

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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  useEffect(() => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setPropertyCount(Math.floor(Math.random() * 100) + 1)
      setIsLoading(false)
    }, 1500)
  }, [isLoading])

  const handleApply = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      if (onFilter) onFilter()
      onOpenChange(false)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SlidersHorizontal className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isSmallDevice ? 'h-[80vh]' : ''}>
        <div className="mx-auto w-full max-w-sm flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
          </DrawerHeader>
          <div className="flex-1 overflow-y-auto px-4">
            <div className="space-y-6">

              <div>
                <Label>House Type</Label>
                <ToggleGroup type="single" defaultValue="all" className="mt-2">
                  <ToggleGroupItem value="all">All of them</ToggleGroupItem>
                  <ToggleGroupItem value="single">Single Storey</ToggleGroupItem>
                  <ToggleGroupItem value="buildings">Buildings</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Label>Rooms</Label>
                <ToggleGroup type="single" defaultValue="4" className="mt-2">
                  <ToggleGroupItem value="3">3 and less</ToggleGroupItem>
                  <ToggleGroupItem value="4">4 Room</ToggleGroupItem>
                  <ToggleGroupItem value="6">6 Room</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Label>Size (M²)</Label>
                <ToggleGroup type="single" defaultValue="100" className="mt-2">
                  <ToggleGroupItem value="100">Up to 100</ToggleGroupItem>
                  <ToggleGroupItem value="160">Up to 160</ToggleGroupItem>
                  <ToggleGroupItem value="220">Up to 220</ToggleGroupItem>
                </ToggleGroup>
              </div>

              <div>
                <Label>Price (₹)</Label>
                <div className="space-y-4 mt-2">
                  <DualSlider
                    defaultValue={[1000000, 30000000]}
                    max={50000000}
                    min={0}
                    step={100000}
                    minStepsBetweenThumbs={10}
                    onValueChange={(values) => {
                      console.log(`Min: ₹${values[0]}, Max: ₹${values[1]}`)
                    }}
                  />
                  <div className="flex justify-between text-sm">
                    <span>₹{Intl.NumberFormat('en-IN').format(0)}</span>
                    <span>₹{Intl.NumberFormat('en-IN').format(50000000)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-6 p-4 bg-secondary rounded-lg"
          >
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ) : (
              <p className="text-sm font-medium">
                {propertyCount > 0
                  ? `${propertyCount} properties found`
                  : 'No properties found'}
              </p>
            )}
          </motion.div>
          <DrawerFooter>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button className="flex-1" onClick={handleApply} disabled={isLoading}>
                {isLoading ? 'Applying...' : 'Apply'}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

