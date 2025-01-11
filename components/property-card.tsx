import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageCircle, ViewIcon as View360 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

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
}

export default function PropertyCard({ id, image, title, price, specs, has360Tour }: PropertyCardProps) {
  return (
    <Link href={`/property/${id}`}>
      <Card className="overflow-hidden">
        <div className="relative aspect-[4/3]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
          {has360Tour && (
            <Badge variant="secondary" className="absolute top-4 right-4">
              <View360 className="w-4 h-4 mr-1" />
              360°
            </Badge>
          )}
        </div>
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold">{title}</h3>
              <div className="text-sm text-muted-foreground">
                {specs.beds}bd {specs.baths}ba {specs.area}
              </div>
            </div>
            <div className="font-semibold">${price}</div>
          </div>
          <div className="flex gap-2">
            <button className="p-2 rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full border">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
    </Link>
  )
}

