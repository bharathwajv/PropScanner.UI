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
                "flex items-center rounded-full border border-gray-200 px-4 py-2.5 transition-colors hover:bg-gray-100"
              )}
            >
              {/* Icon with Circular Background */}
              <span className="flex items-center justify-center h-8 w-11 rounded-full bg-gray-100">
                <ArrowLeft className="h-4 w-4 text-black" />
              </span>
              {/* "Go Back" Text - removed if screen size is small */}
              <span className="ml-2 text-sm font-medium text-black hidden sm:inline">Go Back</span>
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
