import { Providers } from './providers'
import { Layout } from '@/components/layout'
import { Toaster } from 'react-hot-toast'
import { Metadata } from 'next'
import { AnimatePresence } from 'framer-motion'

export const metadata: Metadata = {
  title: 'PropScan',
  description: 'Find your dream property with PropScan',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnimatePresence mode="wait">
            <Layout>{children}</Layout>
          </AnimatePresence>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}



import './globals.css'