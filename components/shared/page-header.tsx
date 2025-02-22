"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  children?: React.ReactNode
  className?: string
  showBackButton?: boolean
}

export function PageHeader({ 
  title, 
  children, 
  className,
  showBackButton = true 
}: PageHeaderProps) {
  const router = useRouter()

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      className
    )}>
      <div className="container mx-auto px-4 py-4 space-y-4">
        <div className="flex items-center relative">
          {showBackButton && (
            <button 
              onClick={() => router.back()} 
              className="flex items-center gap-2 rounded-full bg-gray-100/80 px-4 py-2.5 hover:bg-gray-200/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Go Back</span>
            </button>
          )}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">{title}</h1>
        </div>
        {children}
      </div>
    </header>
  )
} 