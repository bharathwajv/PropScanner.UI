'use client'

import { Heart, Home, Scale, Bell, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface SideNavProps {
  className?: string
}

export function SideNav({ className }: SideNavProps) {
  const pathname = usePathname()

  return (
    <div className={cn("w-64 border-r bg-background p-6", className)}>
      <nav className="space-y-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/" && "bg-secondary text-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link
          href="/favorites"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/favorites" && "bg-secondary text-foreground"
          )}
        >
          <Heart className="h-5 w-5" />
          <span>Favorites</span>
        </Link>
        <Link
          href="/compare"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:text-foreground",
            pathname === "/compare" && "bg-secondary text-foreground"
          )}
        >
          <Scale className="h-5 w-5" />
          <span>Compare</span>
        </Link>
      </nav>
    </div>
  )
}

