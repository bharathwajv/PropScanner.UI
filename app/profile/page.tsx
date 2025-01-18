'use client'

import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setShowHeaderAndNav } from '@/lib/redux/uiSlice'
import { useRouter } from 'next/navigation'
import { BackHeader } from "@/components/back-header"

const APP_VERSION = "1.0.0" // You can update this as needed

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <BackHeader title="Profile" onBack={() => router.back()} />
      <main className="container pb-20 lg:pb-6">
        <div className="space-y-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-16 h-16">
                <AvatarImage src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-a1a761d4b579a4df105c42dd73a06e54-nVZCpxnbsYmRrMycuuszVhcyAO2eWh.webp" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-500">john.doe@example.com</p>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p>New York, NY</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p>January 2023</p>
              </div>
            </div>
            <Button className="mt-6 w-full">Edit Profile</Button>
          </Card>
          <div className="text-center text-sm text-gray-500">
            App Version: {APP_VERSION}
          </div>
        </div>
      </main>
    </div>
  )
}

