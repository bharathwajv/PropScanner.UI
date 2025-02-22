"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Building2, Building } from "lucide-react"

interface PropertyTypeTabsProps {
  value: string
  onValueChange: (value: string) => void
}

export function PropertyTypeTabs({ value, onValueChange }: PropertyTypeTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="w-full p-1 bg-muted/50">
        <TabsTrigger
          value="buy"
          className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
        >
          <Home className="w-4 h-4 mr-2" />
          Buy
        </TabsTrigger>
        <TabsTrigger
          value="rent"
          className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
        >
          <Building2 className="w-4 h-4 mr-2" />
          Rent
        </TabsTrigger>
        <TabsTrigger
          value="pg"
          className="flex-1 data-[state=active]:bg-background data-[state=active]:text-primary data-[state=active]:shadow-sm data-[state=active]:font-medium"
        >
          <Building className="w-4 h-4 mr-2" />
          PG
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

