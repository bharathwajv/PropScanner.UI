"use client"

import { Home, Heart, Scale, Search } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsSearchOpen } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dispatch = useDispatch()
  const isSearchOpen = useSelector((state: RootState) => state.ui.isSearchOpen)

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
          setIsVisible(false)
        } else {
          setIsVisible(true)
        }
        setLastScrollY(currentScrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  if (isSearchOpen) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-[90] transition-all duration-300 w-full px-4",
        isVisible ? "bottom-6" : "-bottom-full",
        className,
      )}
    >
      <div className="flex justify-between max-w-lg mx-auto">
        {/* Left Navigation Group */}
        <nav className="flex items-center gap-1 bg-white rounded-full px-2 py-2 shadow-lg">
          <Link
            href="/"
            className={cn(
              "p-3 rounded-full transition-colors",
              pathname === "/" || pathname === "/home" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            <Home className="w-6 h-6" />
          </Link>
          <Link
            href="/favorites"
            className={cn(
              "p-3 rounded-full transition-colors",
              pathname === "/favorites" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            <Heart className="w-6 h-6" />
          </Link>
          <Link
            href="/compare"
            className={cn(
              "p-3 rounded-full transition-colors",
              pathname === "/compare" ? "bg-primary text-primary-foreground" : "text-muted-foreground",
            )}
          >
            <Scale className="w-6 h-6" />
          </Link>
        </nav>

        {/* Right Action Button */}
        <div className="w-14 h-14">
          <button
            onClick={() => dispatch(setIsSearchOpen(true))}
            className="w-full h-full bg-white rounded-full shadow-lg text-muted-foreground hover:text-primary transition-colors flex items-center justify-center"
          >
            <Search className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  )
}

