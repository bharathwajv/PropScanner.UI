import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, Pin, PinOff } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { removeFromCompare } from "@/lib/redux/compareSlice"
import { pinField, unpinField } from "@/lib/redux/propertiesSlice"
import type { RootState } from "@/lib/redux/store"
import Image from "next/image"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useState as useState2 } from "react"

interface Property {
  id: string
  title: string
  price: number
  specs: {
    beds: number
    baths: number
    area: string
  }
  location: string
  yearBuilt: number
  image: string
  type: string
  floors: number
  parking: string
  amenities: string[]
  nearbyPlaces: string[]
  energyRating: string
  taxesPerYear: number
  description: string
}

interface ComparisonTableProps {
  properties: Property[]
}

export function ComparisonTable({ properties }: ComparisonTableProps) {
  const dispatch = useDispatch()
  const compareIds = useSelector((state: RootState) => state.compare.ids)
  const pinnedFields = useSelector((state: RootState) => state.properties.pinnedFields)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pinnedRows, setPinnedRows] = useState<string[]>([])

  useEffect(() => {
    if (activeIndex >= properties.length) {
      setActiveIndex(Math.max(0, properties.length - 1))
    }
  }, [properties, activeIndex])

  useEffect(() => {
    setPinnedRows(pinnedFields)
  }, [pinnedFields])

  const handleRemove = (id: string) => {
    dispatch(removeFromCompare(id))
  }

  const nextProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length)
  }

  const prevProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length)
  }

  const handlePinField = (field: string) => {
    dispatch(pinField(field))
  }

  const handleUnpinField = (field: string) => {
    dispatch(unpinField(field))
  }

  const handlePinRow = (key: string) => {
    setPinnedRows((prev) => {
      const newPinnedRows = prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
      // Force a re-render by updating a state
      setActiveIndex((prevIndex) => prevIndex)
      return newPinnedRows
    })
  }

  const features = [
    { name: "Price", key: "price" },
    { name: "Type", key: "type" },
    { name: "Bedrooms", key: "specs.beds" },
    { name: "Bathrooms", key: "specs.baths" },
    { name: "Area", key: "specs.area" },
    { name: "Location", key: "location" },
    { name: "Year Built", key: "yearBuilt" },
    { name: "Floors", key: "floors" },
    { name: "Parking", key: "parking" },
    { name: "Amenities", key: "amenities" },
    { name: "Nearby Places", key: "nearbyPlaces" },
    { name: "Energy Rating", key: "energyRating" },
    { name: "Taxes per Year", key: "taxesPerYear" },
    { name: "Description", key: "description" },
  ]

  const sortedFeatures = [...features].sort((a, b) => {
    if (pinnedRows.includes(a.key) && !pinnedRows.includes(b.key)) return -1
    if (!pinnedRows.includes(a.key) && pinnedRows.includes(b.key)) return 1
    if (pinnedFields.includes(a.key) && !pinnedFields.includes(b.key)) return -1
    if (!pinnedFields.includes(a.key) && pinnedFields.includes(b.key)) return 1
    return 0
  })

  if (properties.length === 0) {
    return <div>No properties to compare</div>
  }

  const getPropertyValue = (property: Property, key: string) => {
    if (key.includes(".")) {
      const [obj, prop] = key.split(".")
      return property[obj]?.[prop] ?? "N/A"
    }
    return property[key] ?? "N/A"
  }

  return (
    <div className="w-full">
      <div className="md:hidden">
        {properties.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button variant="outline" size="icon" onClick={prevProperty}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h3 className="text-lg font-semibold">{properties[activeIndex]?.title ?? "N/A"}</h3>
              <Button variant="outline" size="icon" onClick={nextProperty}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative w-full h-48">
              <Image
                src={properties[activeIndex]?.image ?? "/placeholder.svg"}
                alt={properties[activeIndex]?.title ?? "Property"}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <Table>
              <TableBody>
                {sortedFeatures.map((feature) => (
                  <TableRow key={feature.key}>
                    <TableCell className="font-medium">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              handlePinRow(feature.key)
                              if (pinnedFields.includes(feature.key)) {
                                handleUnpinField(feature.key)
                              } else {
                                handlePinField(feature.key)
                              }
                            }}
                          >
                            {pinnedRows.includes(feature.key) || pinnedFields.includes(feature.key) ? (
                              <PinOff className="h-4 w-4" />
                            ) : (
                              <Pin className="h-4 w-4" />
                            )}
                          </Button>
                          {feature.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getPropertyValue(properties[activeIndex], feature.key)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => properties[activeIndex] && handleRemove(properties[activeIndex].id)}
            >
              Remove from comparison
            </Button>
          </div>
        )}
      </div>
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Feature</TableHead>
              {properties.map((property) => (
                <TableHead key={property.id} className="text-center">
                  {property.title}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-2 rounded-full border-2 border-red-500 p-0 w-6 h-6"
                    onClick={() => handleRemove(property.id)}
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Image</TableCell>
              {properties.map((property) => (
                <TableCell key={property.id} className="text-center">
                  <div className="relative w-32 h-24 mx-auto">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {sortedFeatures.map((feature) => (
              <TableRow key={feature.key}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        handlePinRow(feature.key)
                        if (pinnedFields.includes(feature.key)) {
                          handleUnpinField(feature.key)
                        } else {
                          handlePinField(feature.key)
                        }
                      }}
                    >
                      {pinnedRows.includes(feature.key) || pinnedFields.includes(feature.key) ? (
                        <PinOff className="h-4 w-4" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                    {feature.name}
                  </div>
                </TableCell>
                {properties.map((property) => (
                  <TableCell key={property.id} className="text-center">
                    {Array.isArray(getPropertyValue(property, feature.key))
                      ? getPropertyValue(property, feature.key).join(", ")
                      : getPropertyValue(property, feature.key)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

