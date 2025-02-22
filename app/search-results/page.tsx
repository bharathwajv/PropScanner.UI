"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav, setIsSearchOpen, setIsFilterOpen, setSelectedTab } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/property-card"
import { Search, SlidersHorizontal, Bell, BellOff } from "lucide-react"
import { SearchDialog } from "@/components/search/search-dialog"
import { Button } from "@/components/ui/button"
import { FilterDrawer } from "@/components/filter-drawer"
import { PropertyDetailsPopup } from "@/components/property-details-popup"
import { NavTabs } from "@/components/nav-tabs"
import { toast } from "react-hot-toast"
import { addNotificationAlert, removeNotificationAlert } from "@/lib/redux/notificationsSlice"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { PageHeader } from "@/components/shared/page-header"

export default function SearchResultsPage() {
  const searchParams = useSearchParams()
  const dispatch = useDispatch()
  const { isSearchOpen, isFilterOpen, selectedTab } = useSelector((state: RootState) => state.ui)
  const properties = useSelector((state: RootState) => state.properties.items)
  const notificationAlerts = useSelector((state: RootState) => state.notifications.alerts)
  const searchLocation = searchParams.get("location") || ""

  const tabs = ["Nearby", "Recommend", "Upcoming"]

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  const isNotificationSet = notificationAlerts.some((alert) => alert.location === searchLocation)

  const handleToggleNotification = () => {
    if (isNotificationSet) {
      const alert = notificationAlerts.find((alert) => alert.location === searchLocation)
      if (alert) {
        dispatch(removeNotificationAlert(alert.id))
        toast.success("Notification alert removed")
      }
    } else {
      if (notificationAlerts.length >= 2) {
        toast.error("You can only set up to 2 notification alerts")
        return
      }
      dispatch(addNotificationAlert({ location: searchLocation, filters: selectedTab }))
      toast.success("Notification alert set for this search")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader title="Search Results">
        <div className="flex gap-2">
          <div className="relative cursor-pointer flex-grow" onClick={() => dispatch(setIsSearchOpen(true))}>
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Find Your New apartment, House, lands and more"
              value={searchLocation}
              className="pl-10 pr-4 bg-muted cursor-pointer"
              readOnly
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg border-2"
            onClick={() => dispatch(setIsFilterOpen(true))}
          >
            <SlidersHorizontal className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex justify-center">
          <NavTabs tabs={tabs} selected={selectedTab} onSelect={(tab) => dispatch(setSelectedTab(tab))} />
        </div>
      </PageHeader>

      <div className="flex-1 container mx-auto px-4 py-6 space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <PropertyCard {...property} />
            </motion.div>
          ))}
        </div>
      </div>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={(open) => dispatch(setIsSearchOpen(open))}
        initialLocation={searchLocation}
      />

      <PropertyDetailsPopup />

      <Button
        variant={isNotificationSet ? "destructive" : "outline"}
        className={cn(
          "fixed bottom-20 right-4 rounded-full shadow-lg p-0",
          "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16",
          isNotificationSet
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            : "bg-white hover:bg-white/90"
        )}
        onClick={handleToggleNotification}
      >
        {isNotificationSet ? (
          <BellOff className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        ) : (
          <Bell className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
        )}
      </Button>
    </div>
  )
}

