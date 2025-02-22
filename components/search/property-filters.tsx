"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building2, Home, Hotel, MapPin, Building, Star } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PropertyFiltersProps {
  location?: string
  onLocationChange: (location: string) => void
  onFiltersChange?: (filters: string) => void
}

export function PropertyFilters({ location, onLocationChange, onFiltersChange }: PropertyFiltersProps) {
  const [selectedPropertyType, setSelectedPropertyType] = useState<string | null>(null)
  const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null)
  const [minPrice, setMinPrice] = useState<string>("")
  const [maxPrice, setMaxPrice] = useState<string>("")

  const propertyTypes = [
    { icon: Building2, label: "Flat/Apartment" },
    { icon: Home, label: "House/Villa" },
    { icon: Hotel, label: "Serviced Apartment" },
    { icon: MapPin, label: "Plot/Land" },
    { icon: Building, label: "Builder Floor" },
    { icon: Star, label: "1 RK/ Studio" },
  ]

  const bedrooms = ["1 RK/1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"]

  useEffect(() => {
    if (onFiltersChange) {
      const filters = [
        selectedPropertyType,
        selectedBedrooms,
        minPrice && `Min ₹${minPrice}`,
        maxPrice && `Max ₹${maxPrice}`,
      ]
        .filter(Boolean)
        .join(", ")
      onFiltersChange(filters)
    }
  }, [selectedPropertyType, selectedBedrooms, minPrice, maxPrice, onFiltersChange])

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Budget Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Select onValueChange={setMinPrice}>
            <SelectTrigger>
              <SelectValue placeholder="Min Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5l">₹5 Lakhs</SelectItem>
              <SelectItem value="10l">₹10 Lakhs</SelectItem>
              <SelectItem value="20l">₹20 Lakhs</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setMaxPrice}>
            <SelectTrigger>
              <SelectValue placeholder="Max Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="50l">₹50 Lakhs</SelectItem>
              <SelectItem value="1cr">₹1 Crore</SelectItem>
              <SelectItem value="2cr">₹2 Crore</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Property Type</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {propertyTypes.map(({ icon: Icon, label }) => (
            <Card
              key={label}
              className={cn(
                "p-4 cursor-pointer hover:border-primary transition-colors",
                selectedPropertyType === label ? "border-primary bg-primary/10" : "",
              )}
              onClick={() => setSelectedPropertyType(label)}
            >
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      <div className="space-y-2">
        <Label>Bedrooms</Label>
        <div className="flex flex-wrap gap-2">
          {bedrooms.map((bedroom) => (
            <Button
              key={bedroom}
              variant={selectedBedrooms === bedroom ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedBedrooms(bedroom)}
            >
              {bedroom}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

