"use client"
import PropertyCard from "@/components/property-card"
import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/lib/redux/store"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { setPropertyDetailsOpen, setSelectedPropertyId } from "@/lib/redux/uiSlice"
import { useEffect, useState } from "react"
import { setShowHeaderAndNav } from "@/lib/redux/uiSlice"
import { PropertyDetailsPopup } from "@/components/property-details-popup"
import { NotificationDialog } from "@/components/notification-dialog"
import { addNotificationAlert, removeNotificationAlert } from "@/lib/redux/notificationsSlice"
import { toast } from "react-hot-toast"

export default function FavoritesPage() {
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids)
  const properties = useSelector((state: RootState) => state.properties.items)
  const notificationAlerts = useSelector((state: RootState) => state.notifications.alerts)
  const router = useRouter()
  const dispatch = useDispatch()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedPropertyId, setSelectedPropertyForNotification] = useState<string | null>(null)

  useEffect(() => {
    dispatch(setShowHeaderAndNav(true))
  }, [dispatch])

  const favoriteProperties = properties.filter((property) => favoriteIds.includes(property.id))

  const handlePropertyClick = (id: string) => {
    dispatch(setSelectedPropertyId(id))
    dispatch(setPropertyDetailsOpen(true))
  }

  const handleNotificationToggle = (propertyId: string, checked: boolean) => {
    if (!checked) {
      setSelectedPropertyForNotification(propertyId)
      setDialogOpen(true)
    } else {
      if (notificationAlerts.length >= 2) {
        toast.error("You can only set up to 2 notification alerts")
        return
      }
      dispatch(addNotificationAlert({ location: propertyId, filters: "Price changes" }))
      toast.success("Notification alert set for this property")
    }
  }

  const handleConfirmNotificationTurnOff = () => {
    if (selectedPropertyId) {
      const alert = notificationAlerts.find((alert) => alert.location === selectedPropertyId)
      if (alert) {
        dispatch(removeNotificationAlert(alert.id))
        toast.success("Notification alert removed")
      }
    }
    setDialogOpen(false)
    setSelectedPropertyForNotification(null)
  }

  return (
    <div className="container py-4 md:py-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Favorites ({favoriteProperties.length})</h1>
      {favoriteProperties.length === 0 ? (
        <div className="text-center py-12 md:py-24">
          <p className="text-xl mb-4">You haven't added any properties to your favorites yet.</p>
          <p className="text-muted-foreground mb-8">
            Explore properties and add them to your favorites to see them here.
          </p>
          <Button onClick={() => router.push("/")}>Explore Properties</Button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {favoriteProperties.map((property) => (
            <div key={property.id} className="space-y-2">
              <PropertyCard {...property} onClick={() => handlePropertyClick(property.id)} />
            </div>
          ))}
        </div>
      )}
      <PropertyDetailsPopup />
      <NotificationDialog open={dialogOpen} onOpenChange={setDialogOpen} onConfirm={handleConfirmNotificationTurnOff} />
    </div>
  )
}

