"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Building2, Building } from "lucide-react"
import { useEffect, useRef } from "react"

interface PropertyTypeTabsProps {
  value: string
  onValueChange: (value: string) => void
}

export function PropertyTypeTabs({ value, onValueChange }: PropertyTypeTabsProps) {
  const buyTabRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (buyTabRef.current) {
      buyTabRef.current.focus()
    }
  }, [])

  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="w-full p-1 mt-1 bg-muted/50 rounded-lg">
        <TabsTrigger
          ref={buyTabRef}
          value="buy"
          className="flex-1 py-2.5 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium transition-all"
        >
          <Home className="w-4 h-4 mr-2" />
          Buy
        </TabsTrigger>
        <TabsTrigger
          value="rent"
          className="flex-1 py-2.5 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium transition-all"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Rent
        </TabsTrigger>
        <TabsTrigger
          value="pg"
          className="flex-1 py-2.5 px-3 rounded-md data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium transition-all"
        >
          <Building className="w-4 h-4 mr-2" />
          PG
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

