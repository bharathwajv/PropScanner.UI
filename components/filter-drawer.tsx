'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
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

export function FilterDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <SlidersHorizontal className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filter</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
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
                <Label>Price</Label>
                <div className="space-y-4 mt-2">
                  <Slider
                    defaultValue={[175000]}
                    max={300000}
                    min={0}
                    step={1000}
                  />
                  <div className="flex justify-between text-sm">
                    <span>£175,000</span>
                    <span>£300,000</span>
                  </div>
                </div>
              </div>

              <div>
                <Label>Location</Label>
                <Input placeholder="Great Falls, Maryland" className="mt-2" />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">Reset</Button>
              <Button className="flex-1">Apply</Button>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

