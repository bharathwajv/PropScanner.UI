"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Building2, Home, Hotel, MapPin, Building, Star } from "lucide-react"

interface PropertyFiltersProps {
  location?: string
  onLocationChange: (location: string) => void
}

export function PropertyFilters({ location, onLocationChange }: PropertyFiltersProps) {
  const propertyTypes = [
    { icon: Building2, label: "Flat/Apartment" },
    { icon: Home, label: "House/Villa" },
    { icon: Hotel, label: "Serviced Apartment" },
    { icon: MapPin, label: "Plot/Land" },
    { icon: Building, label: "Builder Floor" },
    { icon: Star, label: "1 RK/ Studio" },
  ]

  const bedrooms = ["1 RK/1 BHK", "2 BHK", "3 BHK", "4 BHK", "4+ BHK"]

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Budget Range</Label>
        <div className="grid grid-cols-2 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Min Price" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5l">₹5 Lakhs</SelectItem>
              <SelectItem value="10l">₹10 Lakhs</SelectItem>
              <SelectItem value="20l">₹20 Lakhs</SelectItem>
            </SelectContent>
          </Select>
          <Select>
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
            <Card key={label} className="p-4 cursor-pointer hover:border-primary transition-colors">
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
            <Button key={bedroom} variant="outline" className="rounded-full">
              {bedroom}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

