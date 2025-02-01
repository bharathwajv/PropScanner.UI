import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Scale, ViewIcon as View360 } from "lucide-react"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { toggleFavorite } from "@/lib/redux/favoritesSlice"
import { addToCompare } from "@/lib/redux/compareSlice"
import type { RootState } from "@/lib/redux/store"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import { motion } from "framer-motion"
import { setPropertyDetailsOpen, setSelectedPropertyId } from "@/lib/redux/uiSlice"

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
  has360Tour?: boolean
  location: string
  type?: string
}

export default function PropertyCard({
  id,
  image,
  title,
  price,
  specs,
  has360Tour,
  location,
  type,
}: PropertyCardProps) {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state: RootState) => state.favorites.ids.includes(id))
  const compareIds = useSelector((state: RootState) => state.compare.ids)

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(toggleFavorite(id))
  }

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (compareIds.length < 3) {
      dispatch(addToCompare(id))
      toast.success("Added to compare")
    } else {
      toast.error("You can compare up to 3 properties at a time")
    }
  }

  const handleCardClick = () => {
    dispatch(setSelectedPropertyId(id))
    dispatch(setPropertyDetailsOpen(true))
  }

  return (
    <motion.div layoutId={`property-card-${id}`} onClick={handleCardClick} className="cursor-pointer">
      <Card className="overflow-hidden hover:shadow-md transition-shadow p-4">
        <motion.div className="relative aspect-[4/3]" layoutId={`property-image-${id}`}>
          <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {has360Tour && (
            <Badge variant="secondary" className="absolute top-4 right-4 bg-primary text-primary-foreground">
              <View360 className="w-4 h-4 mr-1" />
              360°
            </Badge>
          )}
        </motion.div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <motion.h3 layoutId={`property-title-${id}`} className="font-semibold text-foreground">
                {title}
              </motion.h3>
              <motion.div layoutId={`property-specs-${id}`} className="text-sm text-muted-foreground mt-1">
                {specs.beds}bd {specs.baths}ba {specs.area}
              </motion.div>
              <motion.div layoutId={`property-location-${id}`} className="text-sm text-muted-foreground mt-1">
                {location}
              </motion.div>
            </div>
            <motion.div layoutId={`property-price-${id}`} className="font-semibold text-primary">
              ₹{price.toLocaleString()}
            </motion.div>
          </div>
          <div className="flex gap-2">
            <button
              className={cn(
                "p-2 rounded-full transition-colors",
                compareIds.includes(id)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground",
              )}
              onClick={handleAddToCompare}
            >
              <Scale className="w-5 h-5" />
            </button>
            <button
              className={cn(
                "p-2 rounded-full border transition-colors",
                isFavorite ? "bg-primary text-primary-foreground" : "border-primary text-primary",
              )}
              onClick={handleToggleFavorite}
            >
              <Heart className="w-5 h-5" fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

