'use client'

import { Heart, MoreVertical, Share2 } from 'lucide-react'
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setShowHeaderAndNav } from '@/lib/redux/uiSlice'
import { BackHeader } from "@/components/back-header"
import { useRouter } from 'next/navigation'
import { RootState } from '@/lib/redux/store'
import { motion } from 'framer-motion'

export default function PropertyPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch()
  const router = useRouter()
  const property = useSelector((state: RootState) => 
    state.properties.items.find(p => p.id === params.id)
  )

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  const handleGoBack = () => {
    router.back()
  }

  if (!property) {
    return <div>Property not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader title="Property Details" onBack={handleGoBack} />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="container pb-20 lg:pb-6"
      >
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 mt-6">
          <motion.div
            layoutId={`property-image-${property.id}`}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl"
          >
            <Badge 
              variant="secondary" 
              className="absolute left-4 top-4 z-10 bg-white/80 backdrop-blur-sm"
            >
              Open for sale
            </Badge>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-10 rounded-full bg-white/80 backdrop-blur-sm"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Image
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              fill
              className="object-cover"
            />
          </motion.div>

          <div className="mt-6 space-y-6 lg:mt-0">
            <div>
              <motion.h1 layoutId={`property-title-${property.id}`} className="text-2xl font-semibold">{property.title}</motion.h1>
              <motion.p layoutId={`property-location-${property.id}`} className="text-muted-foreground">{property.location}</motion.p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <motion.p layoutId={`property-price-${property.id}`} className="text-2xl font-semibold">${property.price}</motion.p>
                <p className="text-sm text-muted-foreground">Residence</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <motion.div layoutId={`property-specs-${property.id}`} className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>{property.specs.beds} Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{property.specs.baths} Bath</span>
              </div>
              <div className="flex items-center gap-1">
                <span>{property.specs.area}</span>
              </div>
            </motion.div>

            <p className="text-sm text-muted-foreground">
              {property.description}
            </p>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1">
                Explore in VR
              </Button>
              <Button className="flex-1 bg-primary hover:bg-primary/90">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

