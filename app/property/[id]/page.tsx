'use client'

import { ArrowLeft, Heart, MoreVertical, Share2 } from 'lucide-react'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <main className="container pb-20 lg:pb-6">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl">
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
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-SypxMUxghmfQD1feY8y3sm5aRrDvBP.png"
              alt="Property"
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-6 space-y-6 lg:mt-0">
            <div>
              <h1 className="text-2xl font-semibold">Lakeshore Blvd West</h1>
              <p className="text-muted-foreground">Celina, Delaware</p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-semibold">$3,822</p>
                <p className="text-sm text-muted-foreground">Residence</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <span>4 Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <span>2 Bath</span>
              </div>
              <div className="flex items-center gap-1">
                <span>1493m²</span>
              </div>
              <div className="flex items-center gap-1">
                <span>Penthouse</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground">
              The House "Neither Big Nor Small" Is Designed For A Family Of 8. The Entrance Hall Divides The...
            </p>

            <div className="fixed bottom-6 left-0 right-0 flex gap-4 px-4 lg:static lg:px-0">
              <Button variant="outline" className="flex-1">
                Explore in VR
              </Button>
              <Button className="flex-1 bg-[#2C3333] hover:bg-[#2C3333]/90">
                Book a Call
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

