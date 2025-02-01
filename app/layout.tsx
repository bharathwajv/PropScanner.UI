import { Providers } from "./providers"
import { Layout } from "@/components/layout"
import { Toaster } from "react-hot-toast"
import type { Metadata } from "next"
import { AnimatePresence } from "framer-motion"
import { LoadingScreen } from "@/components/loading-screen"
import { usePathname } from "next/navigation"

export const metadata: Metadata = {
  title: "PropScanner",
  description: "Find your dream property with PropScanner",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnimatePresence mode="wait">{pathname !== "/" ? <Layout>{children}</Layout> : children}</AnimatePresence>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'