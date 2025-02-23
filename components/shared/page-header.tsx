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
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className
      )}
    >
      <div className="container mx-auto px-4 py-4 space-y-4">
        <div className="flex items-center relative">
          {showBackButton && (
            <button
              onClick={() => router.back()}
              className={cn(
                // Entire button: pill shape, subtle border, light-gray background
                "flex items-center gap-2 rounded-full border border-gray-200 bg-gray-100",
                // Adjust padding & text style
                "px-4 py-2.5 text-sm font-medium text-black",
                // Hover effect for a slightly darker gray
                "hover:bg-gray-200 transition-colors"
              )}
            >
              <ArrowLeft className="h-4 w-4 text-black" />
              <span>Go Back</span>
            </button>
          )}
          <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
            {title}
          </h1>
        </div>
        {children}
      </div>
    </header>
  )
}
