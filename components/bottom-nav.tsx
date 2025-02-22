"use client"

import { Home, Heart, Scale, Search } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setIsSearchOpen } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { motion, AnimatePresence } from "framer-motion"

interface BottomNavProps {
  className?: string
}

export function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const dispatch = useDispatch()
  const isSearchOpen = useSelector((state: RootState) => state.ui.isSearchOpen)

  const isComparePage = pathname === "/compare"
  const isFavoritesPage = pathname === "/favorites"
  const isHomePage = pathname === "/" || pathname === "/home"

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (isComparePage || isFavoritesPage) {
          setIsVisible(true)
          return
        }

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
  }, [lastScrollY, isComparePage, isFavoritesPage])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={isHomePage ? { y: 100 } : { x: "100%" }}
          animate={isHomePage ? { y: 0 } : { x: 0 }}
          exit={isHomePage ? { y: 100 } : { x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className={cn("fixed z-[50] w-full px-4 sm:px-6 bottom-6 sm:bottom-8", className)}
        >
          <div className="flex justify-between max-w-lg mx-auto">
            <motion.nav
              initial={isHomePage ? { x: 0 } : { x: "50%" }}
              animate={isHomePage ? { x: 0 } : { x: "50%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="flex items-center gap-2 sm:gap-3 bg-white rounded-full px-3 sm:px-4 py-2 sm:py-3 shadow-lg border border-black/10"
            >
              <button
                onClick={() => {
                  if (!isHomePage) {
                    router.push("/")
                  }
                }}
                className={cn(
                  "p-4 rounded-full transition-colors",
                  isHomePage ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/80",
                )}
              >
                <Home className="w-6 h-6 sm:w-7 sm:h-7" />
              </button>
              <Link
                href="/favorites"
                className={cn(
                  "p-4 rounded-full transition-colors",
                  isFavoritesPage ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/80",
                )}
              >
                <Heart className="w-6 h-6 sm:w-7 sm:h-7" />
              </Link>
              <Link
                href="/compare"
                className={cn(
                  "p-4 rounded-full transition-colors",
                  isComparePage ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/80",
                )}
              >
                <Scale className="w-6 h-6 sm:w-7 sm:h-7" />
              </Link>
            </motion.nav>

            {isHomePage && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <button
                  onClick={() => dispatch(setIsSearchOpen(true))}
                  className="p-4 rounded-full bg-white shadow-lg text-muted-foreground hover:text-primary transition-colors flex items-center justify-center relative border border-black/10"
                >
                  <Search className="w-7 h-7" />
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.3 }}
                    className="absolute inset-0 rounded-full animate-glow"
                  />
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

