'use client'

import { Home, Heart, Scale, Search, ScanLine } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <div className={cn(
      "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300 w-full px-4",
      isVisible ? "bottom-4" : "-bottom-full",
      className
    )}>
      <div className="flex justify-between max-w-lg mx-auto">
        {/* Left Navigation Group */}
        <nav className="flex items-center gap-1 bg-white rounded-full px-4 py-3 shadow-lg">
          <Link 
            href="/"
            className={cn(
              "p-2 rounded-full transition-colors",
              pathname === "/" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <Home className="w-5 h-5" />
          </Link>
          <Link 
            href="/favorites"
            className={cn(
              "p-2 rounded-full transition-colors",
              pathname === "/favorites" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <Heart className="w-5 h-5" />
          </Link>
          <Link 
            href="/compare"
            className={cn(
              "p-2 rounded-full transition-colors",
              pathname === "/compare" ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            )}
          >
            <Scale className="w-5 h-5" />
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch({ type: 'ui/setIsSearchOpen', payload: true })}
            className="p-4 bg-white rounded-full shadow-lg text-muted-foreground hover:text-primary transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link
            href="/camera"
            className="p-4 bg-white rounded-full shadow-lg text-muted-foreground hover:text-primary transition-colors"
          >
            <ScanLine className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  )
}

