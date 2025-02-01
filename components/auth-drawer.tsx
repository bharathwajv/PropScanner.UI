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
import { UserStorage } from "@/lib/UserStorage"

interface AuthDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function AuthDrawer({ isOpen, onOpenChange }: AuthDrawerProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically call an API to verify the OTP
    // For this example, we'll just simulate a successful login
    const user = { id: "1", phoneNumber }
    UserStorage.saveUser(user)
    onOpenChange(false)
  }

  const handleGoogleLogin = () => {
    // Implement Google login logic here
    console.log("Google login clicked")
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="h-[80vh] sm:max-h-[80vh] w-full">
        <div className="mx-auto w-full max-w-sm flex flex-col h-full">
          <DrawerHeader>
            <DrawerTitle>{isLogin ? "Login" : "Sign Up"}</DrawerTitle>
            <DrawerDescription>{isLogin ? "Welcome back!" : "Create your account"}</DrawerDescription>
          </DrawerHeader>
          <form onSubmit={handleSubmit} className="p-6 space-y-6 flex-grow">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <Input type="text" placeholder="OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
            <Button type="submit" className="w-full">
              {isLogin ? "Login" : "Sign Up"}
            </Button>
            <Button type="button" variant="outline" className="w-full" onClick={handleGoogleLogin}>
              Continue with Google
            </Button>
          </form>
          <DrawerFooter className="p-6 pt-0">
            <Button variant="ghost" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

