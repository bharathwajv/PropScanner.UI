"use client"

import { useState } from "react"
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
import type React from "react"
import { useDispatch } from "react-redux"
import { login } from "@/lib/redux/userSlice"
import { toast } from "react-hot-toast"
import { HelpCircle } from "lucide-react"

interface AuthDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDrawer({ isOpen, onOpenChange }: AuthDrawerProps) {
  const [username, setUsername] = useState("TheOneWhoForgotUsername")
  const [password, setPassword] = useState("iLoveBricks123")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const handleForgotPassword = () => {
    toast("Did you check under your welcome mat?", {
      icon: "🔑",
      duration: 4000,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!username || !password) {
      toast.error("Please fill in all fields")
      return
    }

    setIsLoading(true)
    
    try {
      const user: User = {
        username,
        password,
        name: "Property Enthusiast",
        mobileNumber: "+1234567890",
      }
      
      UserStorage.setUser(user)
      dispatch(login(user))
      toast.success("Successfully logged in!")
      onOpenChange(false)
      router.push("/profile")
    } catch (error) {
      toast.error("Failed to login. Please try again.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
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
            <div className="space-y-2">
              <Input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground italic pl-1">Hint: anything would work here 🥷</p>
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground italic pl-1">Hint: guess its too secure</p>
            </div>
            <div className="flex items-center justify-end">
              <Button
                variant="link"
                size="sm"
                className="text-muted-foreground hover:text-primary p-0 h-auto font-normal"
                onClick={handleForgotPassword}
                type="button"
              >
                <HelpCircle className="w-3 h-3 mr-1" />
                Forgot Password?
              </Button>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
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

