"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Scale, Building, Info } from "lucide-react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "@/lib/redux/favoritesSlice"
import { addToCompare, removeFromCompare } from "@/lib/redux/compareSlice"
import type { RootState } from "@/lib/redux/store"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { setPropertyDetailsOpen, setSelectedPropertyId } from "@/lib/redux/uiSlice"
import { Switch } from "@/components/ui/switch"
import { PriceAlertsDialog } from "./price-alerts-dialog"
import { addNotificationAlert, removeNotificationAlert } from "@/lib/redux/notificationsSlice"

interface PropertyCardProps {
  id: string
  image: string
  title: string
  price: number
  specs: {
    beds: number
    baths: number
    area: string
  }
  source: string
  location: string
  type?: string
  onClick?: () => void
}

export default function PropertyCard({
  id,
  image,
  title,
  price,
  specs,
  source,
  location,
  type,
  onClick,
}: PropertyCardProps) {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state: RootState) => state.favorites.ids.includes(id))
  const isCompared = useSelector((state: RootState) => state.compare.ids.includes(id))
  const compareIds = useSelector((state: RootState) => state.compare.ids)
  const notificationAlerts = useSelector((state: RootState) => state.notifications.alerts)
  const [showPriceAlertsInfo, setShowPriceAlertsInfo] = useState(false)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(id))
  }

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isCompared) {
      dispatch(removeFromCompare(id))
      toast.success("Removed from compare")
    } else if (compareIds.length < 3) {
      dispatch(addToCompare(id))
      toast.success("Added to compare")
    } else {
      toast.error("You can compare up to 3 properties at a time")
    }
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick()
    } else {
      dispatch(setSelectedPropertyId(id))
      dispatch(setPropertyDetailsOpen(true))
    }
  }

  const handleNotificationToggle = (checked: boolean) => {
    if (checked) {
      if (notificationAlerts.length >= 2) {
        toast.error("You can only set up to 2 notification alerts")
        return
      }
      dispatch(addNotificationAlert({ location: id, filters: "Price changes" }))
      toast.success("Price alert set for this property")
    } else {
      const alert = notificationAlerts.find((alert) => alert.location === id)
      if (alert) {
        dispatch(removeNotificationAlert(alert.id))
        toast.success("Price alert removed")
      }
    }
  }

  const isNotificationSet = notificationAlerts.some((alert) => alert.location === id)

  return (
    <>
      <motion.div layoutId={`property-card-${id}`} onClick={handleCardClick} className="cursor-pointer">
        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out">
          <motion.div className="relative aspect-[4/3]" layoutId={`property-image-${id}`}>
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Badge
              variant="secondary"
              className={cn("absolute top-2 left-2 flex items-center gap-1", getSourceColor(source))}
            >
              <Building className="w-3 h-3" />
              {source}
            </Badge>
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                className={cn(
                  "p-2 rounded-full transition-colors bg-white/80 hover:bg-white",
                  isCompared ? "text-primary bg-white" : "text-secondary-foreground",
                )}
                onClick={handleToggleCompare}
              >
                <Scale className="w-4 h-4" />
              </button>
              <button
                className={cn(
                  "p-2 rounded-full transition-colors bg-white/80 hover:bg-white",
                  isFavorite ? "text-primary bg-white" : "text-secondary-foreground",
                )}
                onClick={handleToggleFavorite}
              >
                <Heart className="w-4 h-4" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </motion.div>
          <div className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <motion.h3 layoutId={`property-title-${id}`} className="font-semibold text-foreground truncate">
                  {title}
                </motion.h3>
                <motion.div layoutId={`property-specs-${id}`} className="text-sm text-muted-foreground mt-1 truncate">
                  {specs.beds}bd {specs.baths}ba {specs.area}
                </motion.div>
                <motion.div
                  layoutId={`property-location-${id}`}
                  className="text-sm text-muted-foreground mt-1 truncate"
                >
                  {location}
                </motion.div>
              </div>
              <motion.div layoutId={`property-price-${id}`} className="font-semibold text-primary ml-2">
                ₹{price.toLocaleString()}
              </motion.div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isNotificationSet}
                  onCheckedChange={handleNotificationToggle}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className="text-sm text-muted-foreground">Price Alerts</span>
                <button
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPriceAlertsInfo(true)
                  }}
                >
                  <Info className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <PriceAlertsDialog open={showPriceAlertsInfo} onOpenChange={setShowPriceAlertsInfo} />
    </>
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

