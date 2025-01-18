import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromCompare } from '@/lib/redux/compareSlice'
import { RootState } from '@/lib/redux/store'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { cn } from "@/lib/utils"

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
}

interface ComparisonTableProps {
  properties: Property[]
}

export function ComparisonTable({ properties }: ComparisonTableProps) {
  const dispatch = useDispatch()
  const compareIds = useSelector((state: RootState) => state.compare.ids)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (activeIndex >= properties.length) {
      setActiveIndex(Math.max(0, properties.length - 1))
    }
  }, [properties, activeIndex])

  const handleRemove = (id: string) => {
    dispatch(removeFromCompare(id))
  }

  const nextProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % properties.length)
  }

  const prevProperty = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + properties.length) % properties.length)
  }

  const features = [
    { name: 'Price', key: 'price' },
    { name: 'Bedrooms', key: 'specs.beds' },
    { name: 'Bathrooms', key: 'specs.baths' },
    { name: 'Area', key: 'specs.area' },
    { name: 'Location', key: 'location' },
    { name: 'Year Built', key: 'yearBuilt' },
  ]

  if (properties.length === 0) {
    return <div>No properties to compare</div>
  }

  const getPropertyValue = (property: Property, key: string) => {
    if (key.includes('.')) {
      const [obj, prop] = key.split('.')
      return property[obj]?.[prop] ?? 'N/A'
    }
    return property[key] ?? 'N/A'
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
              <h3 className="text-lg font-semibold">{properties[activeIndex]?.title ?? 'N/A'}</h3>
              <Button variant="outline" size="icon" onClick={nextProperty}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative w-full h-48">
              <Image
                src={properties[activeIndex]?.image ?? "/placeholder.svg"}
                alt={properties[activeIndex]?.title ?? 'Property'}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <Table>
              <TableBody>
                {features.map((feature) => (
                  <TableRow key={feature.key}>
                    <TableCell className="font-medium">{feature.name}</TableCell>
                    <TableCell>
                      {getPropertyValue(properties[activeIndex], feature.key)}
                    </TableCell>
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
                      src={property.image ?? "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                </TableCell>
              ))}
            </TableRow>
            {features.map((feature) => (
              <TableRow key={feature.key}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                {properties.map((property) => (
                  <TableCell key={property.id} className="text-center">
                    {getPropertyValue(property, feature.key)}
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

