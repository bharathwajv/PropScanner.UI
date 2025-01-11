import Link from "next/link"
import { Bell } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BottomNav } from "@/components/bottom-nav"
import { SideNav } from "@/components/side-nav"

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="flex w-full justify-between items-center gap-4">
            <Link href="/" className="font-bold text-xl bg-gray-100 px-4 py-1.5 rounded-full">
              HOMECO
            </Link>
            <div className="flex items-center gap-4">
              <Bell className="w-5 h-5" />
              <Avatar>
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-a1a761d4b579a4df105c42dd73a06e54-nVZCpxnbsYmRrMycuuszVhcyAO2eWh.webp" alt="User" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>
      <div className="flex">
        <SideNav className="hidden lg:block" />
        <main className="flex-1 pb-24 lg:pb-0">
          {children}
        </main>
      </div>
      <BottomNav className="lg:hidden" />
    </div>
  )
}

