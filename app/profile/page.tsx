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
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

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
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between">
          <button onClick={() => router.back()} className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Go Back</span>
          </button>
          <h1 className="text-xl font-semibold absolute left-1/2 transform -translate-x-1/2">Profile</h1>
          <div className="w-[72px]"></div> {/* This empty div balances the layout */}
        </div>
      </header>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="flex-grow overflow-y-auto pb-20">
          <div className="space-y-6">
            <Card className="p-6 space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-muted-foreground">{user?.mobileNumber}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme</Label>
                  <p className="text-sm text-muted-foreground">Select your preferred theme</p>
                </div>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        <span>Light</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        <span>Dark</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-4 w-4" />
                        <span>System</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Notifications</Label>
                  <p className="text-sm text-muted-foreground">Enable push notifications</p>
                </div>
                <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
              </div>

              <AnimatePresence initial={false}>
                {notificationsEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4 overflow-hidden"
                  >
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

            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">About PropScanner</h2>
              <p className="text-sm text-muted-foreground mb-4">
                PropScanner is revolutionizing the real estate industry by providing innovative solutions for property
                search and management. Our mission is to make property hunting simpler and more efficient for everyone.
              </p>
              <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            </Card>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 w-full bg-background p-4 border-t">
        <Button variant="destructive" className="w-full" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  )
}

