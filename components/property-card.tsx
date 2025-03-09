"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
  const [bgColor, setBgColor] = useState("bg-white")
  const [textColor, setTextColor] = useState("text-black")

  useEffect(() => {
    const img = new window.Image()
    img.src = image
    img.onload = () => {
      const canvas = document.createElement("canvas")
      const context = canvas.getContext("2d")
      if (context) {
        canvas.width = 1
        canvas.height = 1
        context.drawImage(img, 0, 0, 1, 1)
        const [r, g, b] = context.getImageData(0, 0, 1, 1).data
        const brightness = (r * 299 + g * 587 + b * 114) / 1000
        if (brightness < 128) {
          setBgColor("bg-black/50") // Dark background
          setTextColor("text-white") // Light text
        } else {
          setBgColor("bg-white/50") // Light background
          setTextColor("text-black") // Dark text
        }
      }
    }
  }, [image])

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
        <Card className={`overflow-hidden hover:shadow-md transition-all duration-300 ease-in-out ${bgColor}`}>
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
              className={`absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 text-sm backdrop-blur-md border-none ${textColor} shadow-sm`}
            >
              <Building className="w-4 h-4" />
              {source}
            </Badge>
            <div className="absolute bottom-2 right-2 flex gap-2">
              <button
                className={cn(
                  "p-3 rounded-full transition-colors bg-white/85 hover:bg-white shadow-sm",
                  isCompared ? "text-primary bg-white ring-2 ring-primary" : "text-secondary-foreground",
                )}
                onClick={handleToggleCompare}
              >
                <Scale className="w-6 h-6" />
              </button>
              <button
                className={cn(
                  "p-3 rounded-full transition-colors bg-white/90 hover:bg-white shadow-sm",
                  isFavorite ? "text-primary bg-white" : "text-secondary-foreground",
                )}
                onClick={handleToggleFavorite}
              >
                <Heart className="w-6 h-6" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </motion.div>
          <div className="p-3 sm:p-4">
            <div className="flex justify-between items-start">
              <div className="min-w-0 flex-1">
                <motion.h3 layoutId={`property-title-${id}`} className={`font-semibold ${textColor} truncate`}>
                  {title}
                </motion.h3>
                <motion.div layoutId={`property-specs-${id}`} className={`text-sm ${textColor} mt-1 truncate`}>
                  {specs.beds}bd {specs.baths}ba {specs.area}
                </motion.div>
                <motion.div
                  layoutId={`property-location-${id}`}
                  className={`text-sm ${textColor} mt-1 truncate`}
                >
                  {location}
                </motion.div>
              </div>
              <motion.div layoutId={`property-price-${id}`} className={`font-semibold ${textColor} ml-2`}>
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price)}

              </motion.div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div className="flex items-center gap-2">
                <Switch
                  checked={isNotificationSet}
                  onCheckedChange={handleNotificationToggle}
                  onClick={(e) => e.stopPropagation()}
                />
                <span className={`text-sm ${textColor}`}>Price Alerts</span>
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

