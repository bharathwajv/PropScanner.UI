'use client'

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface PropertyTypeTabsProps {
  value: string
  onValueChange: (value: string) => void
}

export function PropertyTypeTabs({ value, onValueChange }: PropertyTypeTabsProps) {
  return (
    <Tabs value={value} onValueChange={onValueChange} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="buy">Buy</TabsTrigger>
        <TabsTrigger value="rent">Rent/PG</TabsTrigger>
        <TabsTrigger value="commercial">Commercial</TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

