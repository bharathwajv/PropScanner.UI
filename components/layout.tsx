"use client"

import { type ReactNode, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { BottomNav } from "./bottom-nav"
import { SideNav } from "./side-nav"
import { useSelector } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import Link from "next/link"
import { Bell } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AuthDrawer } from "./auth-drawer"
import { UserStorage } from "@/lib/UserStorage"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  const showHeaderAndNav = useSelector((state: RootState) => state.ui.showHeaderAndNav)
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(UserStorage.isLoggedIn())
  }, [])

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/profile")
    } else {
      setIsAuthDrawerOpen(true)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {showHeaderAndNav && (
        <div className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
          <header className="container mx-auto py-3 border-b">
            <div className="flex w-full justify-between items-center gap-4">
              <Link
                href="/"
                className="font-bold text-xl border-2 border-gray-200 px-4 py-1.5 rounded-full hover:bg-black/5 transition-colors tracking-wider"
              >
                PropScan
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/notifications" className="p-1 hover:bg-secondary/80 rounded-full transition-colors">
                  <Bell className="w-5 h-5" color="#2E3331"/>
                </Link>
                <button 
                  onClick={handleProfileClick}
                  className="p-1 hover:bg-secondary/80 rounded-full transition-colors"
                >
                  <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" alt="User" />
                    <AvatarFallback>B</AvatarFallback>
                  </Avatar>
                </button>
              </div>
            </div>
          </header>
        </div>
      )}
      <div className="flex">
        {showHeaderAndNav && <SideNav className="hidden lg:block" />}
        <main className={`flex-1 ${showHeaderAndNav ? "pb-20 lg:pb-0" : ""}`}>{children}</main>
      </div>
      {showHeaderAndNav && <BottomNav className="lg:hidden" />}
      <AuthDrawer isOpen={isAuthDrawerOpen} onOpenChange={setIsAuthDrawerOpen} />
    </div>
  )
}

