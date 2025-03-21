"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setShowHeaderAndNav } from "@/lib/redux/uiSlice"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun, Laptop, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { UserStorage, type User } from "@/lib/UserStorage"
import { motion, AnimatePresence } from "framer-motion"
import { LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { PageHeader } from "@/components/shared/page-header"

export default function ProfilePage() {
  const router = useRouter()
  const dispatch = useDispatch()
  const { theme, setTheme } = useTheme()
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [notificationFrequency, setNotificationFrequency] = useState("daily")
  const [notificationTime, setNotificationTime] = useState("09:00")
  const [mounted, setMounted] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    setMounted(true)
    const currentUser = UserStorage.getUser()
    if (currentUser) {
      setUser(currentUser)
    } else {
      router.push("/")
    }
    dispatch(setShowHeaderAndNav(false))
  }, [router, dispatch])

  if (!mounted) return null

  const handleLogout = () => {
    UserStorage.removeUser()
    router.push("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader title="Profile" className="fixed top-0 left-0 w-full bg-white z-10" />

      {/* Main Scrollable Content */}
      <main className="flex-1 container mx-auto px-4 py-20 space-y-6">
        <Card className="p-6 space-y-6 mt-6">
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.mobileNumber}</p>
          </div>

          <div className="space-y-4">
            {/* Theme Selector */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Theme</h3>
                <p className="text-sm text-muted-foreground">Select your preferred theme</p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Notifications Switch */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Notifications</h3>
                <p className="text-sm text-muted-foreground">Enable push notifications</p>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
          </div>

          {/* Conditionally render notification settings */}
          <AnimatePresence initial={false}>
            {notificationsEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 overflow-hidden"
              >
                {/* Frequency */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Notification Frequency</Label>
                    <p className="text-sm text-muted-foreground">
                      How often would you like to receive notifications?
                    </p>
                  </div>
                  <Select value={notificationFrequency} onValueChange={setNotificationFrequency}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Time (only for daily) */}
                <AnimatePresence initial={false}>
                  {notificationFrequency === "daily" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-between overflow-hidden"
                    >
                      <div className="space-y-0.5">
                        <Label className="text-base">Notification Time</Label>
                        <p className="text-sm text-muted-foreground">
                          At what time would you like to receive daily notifications?
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={notificationTime}
                          onChange={(e) => setNotificationTime(e.target.value)}
                          className="w-[120px]"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* About Section */}
        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">About PropScanner</h2>
            <p className="text-muted-foreground">
              PropScanner is revolutionizing the real estate industry by providing innovative solutions
              for property search and management. Our mission is to make property hunting simpler and
              more efficient for everyone.
            </p>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
          </div>
        </Card>
      </main>

      {/* Sticky/Fixed Logout Button at Bottom */}
      <div className="sticky bottom-0 left-0 bg-white border-t border-gray-200 p-4">
        {/* Wrap the button in the same container constraints as the cards */}
        <div className="container mx-auto px-4">
          <Button
            variant="destructive"
            className="w-full" // The w-full is now limited by the container width
            size="lg"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

    </div>
  )
}
