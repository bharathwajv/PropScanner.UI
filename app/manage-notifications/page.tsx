"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setShowHeaderAndNav } from "@/lib/redux/uiSlice"
import { BackHeader } from "@/components/back-header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus } from "lucide-react"
import { toast } from "react-hot-toast"
import { SearchDialog } from "@/components/search/search-dialog"

interface NotificationAlert {
  id: number
  location: string
  filters: string
}

export default function ManageNotificationsPage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const [alerts, setAlerts] = useState<NotificationAlert[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
    // Load existing alerts (this would typically come from an API or local storage)
    setAlerts([
      { id: 1, location: "Downtown", filters: "New listings, 2BHK" },
      { id: 2, location: "Suburb", filters: "Price drops, 3BHK" },
    ])
  }, [dispatch])

  const handleAddAlert = (location: string, filters: string) => {
    if (alerts.length >= 2) {
      toast.error("You can only have up to 2 notification alerts")
      return
    }
    setAlerts([...alerts, { id: Date.now(), location, filters }])
    toast.success("Notification alert added")
  }

  const handleDeleteAlert = (id: number) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast.success("Notification alert removed")
  }

  return (
    <div className="min-h-screen bg-background">
      <BackHeader title="Manage Notifications" onBack={() => router.back()} />
      <main className="container pb-20 lg:pb-6">
        <div className="space-y-6 mt-6">
          {alerts.map((alert) => (
            <Card key={alert.id} className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{alert.location}</h3>
                  <p className="text-sm text-muted-foreground">{alert.filters}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)}>
                  <Trash2 className="h-5 w-5 text-red-500" />
                </Button>
              </div>
            </Card>
          ))}

          {alerts.length < 2 && (
            <Button onClick={() => setIsSearchOpen(true)} className="w-full flex items-center justify-center gap-2">
              <Plus className="h-5 w-5" />
              Add New Alert
            </Button>
          )}

          <p className="text-sm text-muted-foreground text-center mt-4">You can set up to 2 notification alerts.</p>
        </div>
      </main>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onApply={(location, filters) => {
          handleAddAlert(location, filters)
          setIsSearchOpen(false)
        }}
        mode="alert"
      />
    </div>
  )
}

