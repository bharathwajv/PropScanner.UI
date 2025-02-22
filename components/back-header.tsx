"use client"

import { ArrowLeft } from "lucide-react"

interface BackHeaderProps {
  title: string
  onBack: () => void
}

export function BackHeader({ title, onBack }: BackHeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <button onClick={onBack} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
          <ArrowLeft className="h-5 w-5" />
          <span className="text-sm font-medium">Go Back</span>
        </button>
        <h1 className="ml-4 text-xl font-semibold">{title}</h1>
      </div>
    </header>
  )
}

