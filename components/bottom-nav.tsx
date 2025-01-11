'use client'

import { Camera, Heart, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("fixed bottom-6 left-1/2 -translate-x-1/2 z-50", className)}>
      <nav className="flex items-center gap-8 bg-white rounded-full px-8 py-4 shadow-lg">
        <Link 
          href="/camera"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname === "/camera" && "text-foreground"
          )}
        >
          <Camera className="w-6 h-6" />
        </Link>
        <Link 
          href="/"
          className={cn(
            "p-4 rounded-full transition-colors",
            pathname === "/" 
              ? "bg-[#2C3333] text-white" 
              : "bg-muted text-muted-foreground"
          )}
        >
          <Camera className="w-6 h-6" />
        </Link>
        <Link 
          href="/favorites"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname === "/favorites" && "text-foreground"
          )}
        >
          <Heart className="w-6 h-6" />
        </Link>
        <Link 
          href="/messages"
          className={cn(
            "text-muted-foreground hover:text-foreground transition-colors",
            pathname === "/messages" && "text-foreground"
          )}
        >
          <MessageCircle className="w-6 h-6" />
        </Link>
      </nav>
    </div>
  )
}

