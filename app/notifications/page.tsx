"use client"

import { Card } from "@/components/ui/card"
import { Bell, Trash2 } from "lucide-react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav } from "@/lib/redux/uiSlice"
import { removeNotificationAlert } from "@/lib/redux/notificationsSlice"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import type { RootState } from "@/lib/redux/store"
import { ArrowLeft } from "lucide-react"

export default function NotificationsPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const notificationAlerts = useSelector((state: RootState) => state.notifications.alerts)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  const handleDeleteAlert = (id: string) => {
    dispatch(removeNotificationAlert(id))
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <button onClick={() => router.back()} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Notifications</h1>
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="space-y-4">
          {notificationAlerts.map((alert) => (
            <Card key={alert.id} className="p-4 bg-white border-l-4 border-l-primary">
              <div className="flex items-start gap-4">
                <Bell className="w-5 h-5 mt-1 text-primary" />
                <div className="flex-grow">
                  <p className="text-gray-900">{alert.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{alert.filters}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}
          {notificationAlerts.length === 0 && <p className="text-center text-gray-500">No notification alerts set</p>}
        </div>
        <div className="mt-8 text-center">
          <Button variant="outline" onClick={() => router.push("/manage-notifications")}>
            Manage Notifications
          </Button>
        </div>
      </div>
    </div>
  )
}

