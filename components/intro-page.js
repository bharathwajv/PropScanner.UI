"use client"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Image from "next/image"

interface IntroPageProps {
  background: string
  image: string
  title: string
  description: string
  currentPage: number
  totalPages: number
  onNext: () => void
}

export function IntroPage({ background, image, title, description, currentPage, totalPages, onNext }: IntroPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="p-6">
        <div className="relative w-48 h-48 mx-auto mb-6">
          <div className="absolute inset-0 bg-primary/20 rounded-full" />
          <Image src={image || "/placeholder.svg"} alt={title} fill className="object-contain" />
        </div>
        <h1 className="text-3xl font-bold tracking-tighter text-center mb-4">{title}</h1>
        <p className="text-lg text-center text-muted-foreground mb-8">{description}</p>
        <div className="flex justify-center">
          <Button size="lg" onClick={onNext}>
            {currentPage < totalPages -1 ? "Next" : "Get Started"}
          </Button>
        </div>
      </Card>
    </div>
  )
}

