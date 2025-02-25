"use client"

import { useDispatch, useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { setPropertyDetailsOpen, setSelectedPropertyId } from "@/lib/redux/uiSlice"
import { pinField, unpinField } from "@/lib/redux/propertiesSlice"
import { motion, AnimatePresence } from "framer-motion"
import type { Property } from "@/lib/types"
import {
  X,
  Heart,
  Share2,
  Scale,
  Bed,
  Bath,
  Square,
  MapPin,
  Calendar,
  Home,
  ExternalLink,
  Pin,
  PinOff,
  Building,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toggleFavorite } from "@/lib/redux/favoritesSlice"
import { addToCompare, removeFromCompare } from "@/lib/redux/compareSlice"
import { toast } from "react-hot-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { LoadingButton } from "@/components/ui/loading-button"
import { useState } from "react"

export function PropertyDetailsPopup() {
  const dispatch = useDispatch()
  const { isPropertyDetailsOpen, selectedPropertyId } = useSelector((state: RootState) => state.ui)
  const property = useSelector((state: RootState) => state.properties.items.find((p) => p.id === selectedPropertyId))
  const isFavorite = useSelector((state: RootState) => state.favorites.ids.includes(selectedPropertyId || ""))
  const isCompared = useSelector((state: RootState) => state.compare.ids.includes(selectedPropertyId || ""))
  const compareIds = useSelector((state: RootState) => state.compare.ids)
  const pinnedFields = useSelector((state: RootState) => state.properties.pinnedFields)

  const [isBookingCall, setIsBookingCall] = useState(false)
  if (!property) return null

  const handleClose = () => {
    dispatch(setPropertyDetailsOpen(false))
    dispatch(setSelectedPropertyId(null))
  }

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(property.id))
  }

  const handleToggleCompare = () => {
    if (isCompared) {
      dispatch(removeFromCompare(property.id))
      toast.success("Removed from compare")
    } else if (compareIds.length < 3) {
      dispatch(addToCompare(property.id))
      toast.success("Added to compare")
    } else {
      toast.error("You can compare up to 3 properties at a time")
    }
  }

  const handleOpenSource = () => {
    const sourceUrls = {
      "99acres": "https://www.99acres.com",
      NoBroker: "https://www.nobroker.in",
      MagicBricks: "https://www.magicbricks.com",
    }
    const url = sourceUrls[property.source as keyof typeof sourceUrls] || "https://www.99acres.com"
    window.open(url, "_blank")
  }

  const handlePinField = (field: string) => {
    dispatch(pinField(field))
  }

  const handleUnpinField = (field: string) => {
    dispatch(unpinField(field))
  }
  const handleBookCall = async () => {
    setIsBookingCall(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsBookingCall(false)
    toast.success("Call scheduled successfully!")
  }
  const areaInSqft = property.specs?.area ? property.specs.area * 10.7639 : null

  return (
    <AnimatePresence>
      {isPropertyDetailsOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] overflow-hidden flex items-center justify-center"
        >
          <motion.div
            layoutId={`property-card-${selectedPropertyId}`}
            initial={{ borderRadius: 8, width: "100%", height: "100%" }}
            animate={{ borderRadius: 12 }}
            transition={{ duration: 0.2, ease: "easeIn" }}
            className="bg-background rounded-lg shadow-lg overflow-hidden w-full h-full sm:h-[90vh] sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] max-w-4xl relative flex flex-col"
          >
            <div className="absolute top-0 left-0 right-0 z-10 bg-background/50 backdrop-blur-sm p-6 flex justify-between items-center border-b">
              <h2 className="text-2xl font-semibold">Property Details</h2>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50"
                onClick={handleClose}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            <ScrollArea className="flex-grow mt-24 mb-20">
              <div className="p-6 space-y-6">
                <motion.div
                  layoutId={`property-image-${selectedPropertyId}`}
                  className="relative w-full h-[200px] sm:h-[300px] lg:h-[400px]"
                >
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                  <Badge
                    variant="secondary"
                    className={cn(
                      "absolute left-4 top-4 z-10 flex items-center gap-2 px-3 py-1.5 text-sm backdrop-blur-md bg-black/20 border-none text-white shadow-sm",
                    )}
                  >
                    <Building className="w-3 h-3" />
                    {property.source}
                  </Badge>
                </motion.div>

                <div>
                  <motion.h1 layoutId={`property-title-${property.id}`} className="text-2xl font-semibold">
                    {property.title}
                  </motion.h1>
                  <motion.p
                    layoutId={`property-location-${property.id}`}
                    className="text-muted-foreground flex items-center mt-1"
                  >
                    <MapPin className="w-4 h-4 mr-1" /> {property.location}
                  </motion.p>
                </div>

                <div className="flex items-center justify-between">
                  <motion.div layoutId={`property-price-${property.id}`} className="text-2xl font-semibold">
                    ₹{property.price.toLocaleString()}
                  </motion.div>
                  <div className="flex gap-2">
                    <Button 
                      variant={isCompared ? "default" : "outline"} 
                      size="icon" 
                      onClick={handleToggleCompare}
                      className={cn(
                        "transition-colors",
                        isCompared && "bg-primary text-primary-foreground"
                      )}
                    >
                      <Scale className="h-5 w-5" />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Share2 className="h-5 w-5" />
                    </Button>
                    <Button variant={isFavorite ? "default" : "outline"} size="icon" onClick={handleToggleFavorite}>
                      <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>
                </div>

                <motion.div
                  layoutId={`property-specs-${property.id}`}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Bed className="w-4 h-4" />
                    <span>{property.specs?.beds || "N/A"} Beds</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-4 h-4" />
                    <span>{property.specs?.baths || "N/A"} Baths</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4" />
                    <span>{areaInSqft ? areaInSqft.toFixed(2) : "N/A"} sqft</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Home className="w-4 h-4" />
                    <span>{property.type || "N/A"}</span>
                  </div>
                </motion.div>

                <div>
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    Description
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        pinnedFields.includes("description")
                          ? handleUnpinField("description")
                          : handlePinField("description")
                      }
                    >
                      {pinnedFields.includes("description") ? (
                        <PinOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {property.description ||
                      "This stunning property offers modern living at its finest. With spacious rooms, high-end finishes, and a prime location, it's perfect for those seeking comfort and convenience."}
                  </p>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    Amenities
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        pinnedFields.includes("amenities") ? handleUnpinField("amenities") : handlePinField("amenities")
                      }
                    >
                      {pinnedFields.includes("amenities") ? (
                        <PinOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {property.amenities?.map((amenity: string, index: number) => (
                      <li key={index}>• {amenity}</li>
                    )) || <li>No amenities listed</li>}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    Property Details
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        pinnedFields.includes("propertyDetails")
                          ? handleUnpinField("propertyDetails")
                          : handlePinField("propertyDetails")
                      }
                    >
                      {pinnedFields.includes("propertyDetails") ? (
                        <PinOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    <li>Type: {property.type || "N/A"}</li>
                    <li>Floors: {property.floors || "N/A"}</li>
                    <li>Parking: {property.parking || "N/A"}</li>
                    <li>Energy Rating: {property.energyRating || "N/A"}</li>
                    <li>Taxes per Year: ${property.taxesPerYear?.toLocaleString() || "N/A"}</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    Nearby Places
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        pinnedFields.includes("nearbyPlaces")
                          ? handleUnpinField("nearbyPlaces")
                          : handlePinField("nearbyPlaces")
                      }
                    >
                      {pinnedFields.includes("nearbyPlaces") ? (
                        <PinOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                  </h2>
                  <ul className="grid grid-cols-2 gap-2 text-sm">
                    {property.nearbyPlaces?.map((place: string, index: number) => (
                      <li key={index}>• {place}</li>
                    )) || <li>No nearby places listed</li>}
                  </ul>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-2 flex items-center justify-between">
                    Location Details
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        pinnedFields.includes("nearbyPlaces")
                          ? handleUnpinField("nearbyPlaces")
                          : handlePinField("nearbyPlaces")
                      }
                    >
                      {pinnedFields.includes("nearbyPlaces") ? (
                        <PinOff className="h-4 w-4 text-red-500" />
                      ) : (
                        <Pin className="h-4 w-4" />
                      )}
                    </Button>
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Located in the heart of the city, this property is just minutes away from shopping centers,
                    restaurants, and public transportation. The neighborhood is known for its excellent schools and
                    family-friendly atmosphere.
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Listed on {new Date().toLocaleDateString()}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      pinnedFields.includes("yearBuilt") ? handleUnpinField("yearBuilt") : handlePinField("yearBuilt")
                    }
                  >
                    {pinnedFields.includes("yearBuilt") ? (
                      <PinOff className="h-4 w-4 text-red-500" />
                    ) : (
                      <Pin className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 bg-background/50 backdrop-blur-sm p-4 flex gap-4">
              <Button variant="outline" className="flex-1 text-lg p-3" onClick={handleOpenSource}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open {property.source}
              </Button>
              <LoadingButton
                className="flex-1 bg-primary hover:bg-primary/90 text-lg p-3"
                loading={isBookingCall}
                loadingText="Booking Call"
                onClick={handleBookCall}
              >
                Book a Call
              </LoadingButton>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const getSourceColor = (source: string) => {
  switch (source.toLowerCase()) {
    case "99acres":
      return "bg-blue-500 text-white"
    case "nobroker":
      return "bg-red-500 text-white"
    case "magicbricks":
      return "bg-yellow-500 text-black"
    default:
      return "bg-gray-500 text-white"
  }
}

