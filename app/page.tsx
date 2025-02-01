"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoadingScreen } from "@/components/loading-screen"

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    // Check if this is the first visit
    const isFirstVisit = !localStorage.getItem("hasVisited")
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")

    if (isFirstVisit) {
      // Set the flag for future visits
      localStorage.setItem("hasVisited", "true")
      // Show loading screen for first time visitors
      setTimeout(() => {
        router.push(onboardingCompleted ? "/home" : "/onboarding")
      }, 3000) // Show loading screen for 3 seconds
    } else {
      // For returning visitors, go directly to home if onboarding is completed
      router.push(onboardingCompleted ? "/home" : "/onboarding")
    }
  }, [router])

  return <LoadingScreen />
}

