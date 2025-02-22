"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer"
import { UserStorage, type User } from "@/lib/UserStorage"
import { useRouter } from "next/navigation"
import type React from "react" // Added import for React

interface AuthDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDrawer({ isOpen, onOpenChange }: AuthDrawerProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  useEffect(() => {
    const user = UserStorage.getUser()
    if (user) {
      setUsername(user.username)
      setPassword(user.password)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const user: User = {
      username,
      password,
      name: "John Doe",
      mobileNumber: "+1234567890",
    }
    UserStorage.saveUser(user)
    onOpenChange(false)
    router.push("/profile")
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh] sm:max-h-[80vh] w-full">
        <div className="mx-auto w-full max-w-sm flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle>Login</DrawerTitle>
            <DrawerDescription>Enter your credentials to access your account.</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-grow">
            <Input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <DrawerFooter className="p-6 pt-0">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

