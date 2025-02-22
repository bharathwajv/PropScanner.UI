"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { setSearchQuery } from "@/lib/redux/uiSlice"
import { useRouter } from "next/navigation"

interface SearchDrawerProps {
  onSearch: (query: string) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDrawer({ onSearch, isOpen, onOpenChange }: SearchDrawerProps) {
  const [isSmallDevice, setIsSmallDevice] = useState(false)
  const dispatch = useDispatch()
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery)
  const router = useRouter()

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallDevice(window.innerWidth < 640)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)

    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSearch = () => {
    if (onSearch) onSearch(searchQuery)
    onOpenChange(false)
    router.push(`/search-results?q=${encodeURIComponent(searchQuery)}`)
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isSmallDevice ? "h-[80vh]" : ""}>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Search Properties</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by location, property type, or features"
                value={searchQuery}
                onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                className="pl-10"
              />
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={handleSearch}>Search</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

