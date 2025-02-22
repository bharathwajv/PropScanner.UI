"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { setShowHeaderAndNav, setIsSearchOpen, setIsFilterOpen, setSelectedTab } from "@/lib/redux/uiSlice"
import type { RootState } from "@/lib/redux/store"
import { Input } from "@/components/ui/input"
import PropertyCard from "@/components/property-card"
import { Search, ArrowLeft, SlidersHorizontal, Bell, BellOff } from "lucide-react"
import { SearchDialog } from "@/components/search/search-dialog"
import { Button } from "@/components/ui/button"
import { FilterDrawer } from "@/components/filter-drawer"
import { PropertyDetailsPopup } from "@/components/property-details-popup"
import { NavTabs } from "@/components/nav-tabs"
import { toast } from "react-hot-toast"
import { addNotificationAlert, removeNotificationAlert } from "@/lib/redux/notificationsSlice"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export default function SearchResultsPage() {
  const router = useRouter()
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

  const handleGoBack = () => {
    router.back()
  }

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
    <div className="container mx-auto px-4 py-4 space-y-4">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center relative">
            <button 
              onClick={handleGoBack} 
              className="flex items-center gap-2 rounded-full bg-gray-100/80 px-4 py-2.5 hover:bg-gray-200/80 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Go Back</span>
            </button>
            <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">Search Results</h1>
          </div>

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
        </div>
      </header>

      <SearchDialog
        open={isSearchOpen}
        onOpenChange={(open) => dispatch(setIsSearchOpen(open))}
        initialLocation={searchLocation}
      />


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

