"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserStorage } from "@/lib/UserStorage"

export default function UserPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const currentUser = UserStorage.getUser()
    if (!currentUser) {
      router.push("/")
    } else {
      setUser(currentUser)
    }
  }, [router])

  const handleLogout = () => {
    UserStorage.removeUser()
    router.push("/")
  }

  if (!user) {
    return null
  }

  return (
    <div className="container py-4 space-y-6">
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <Avatar className="w-16 h-16">
            <AvatarImage src="/placeholder-user.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">User Profile</h2>
            <p className="text-gray-500">{user.phoneNumber}</p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Phone</h3>
            <p>{user.phoneNumber}</p>
          </div>
          {/* Add more user details here as needed */}
        </div>
        <Button className="mt-6 w-full" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  )
}

