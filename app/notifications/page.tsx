'use client'

import { Card } from "@/components/ui/card"
import { Bell } from 'lucide-react'
import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import { setShowHeaderAndNav } from '@/lib/redux/uiSlice'
import { useRouter } from 'next/navigation'
import { BackHeader } from "@/components/back-header"

const notifications = [
  { id: 1, message: "New property listed in your favorite area", read: false },
  { id: 2, message: "Price drop alert for 123 Main St", read: false },
  { id: 3, message: "Your saved search has new results", read: true },
]

export default function NotificationsPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  return (
    <div className="min-h-screen bg-background">
      <BackHeader title="Notifications" onBack={() => router.back()} />
      <main className="container pb-20 lg:pb-6">
        <div className="space-y-4 mt-6">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 ${notification.read ? 'bg-gray-50' : 'bg-white border-l-4 border-l-primary'}`}>
              <div className="flex items-start gap-4">
                <Bell className={`w-5 h-5 mt-1 ${notification.read ? 'text-gray-400' : 'text-primary'}`} />
                <div>
                  <p className={`${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">{notification.read ? 'Read' : 'Unread'}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

