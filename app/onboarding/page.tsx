"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { setShowHeaderAndNav } from "@/lib/redux/uiSlice"
import { OnboardingScreens } from "@/components/onboarding-screens"

export default function OnboardingPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
    // Check if onboarding is already completed
    const onboardingCompleted = localStorage.getItem("onboardingCompleted")
    if (onboardingCompleted) {
      router.push("/home")
    }
  }, [dispatch, router])

  const handleComplete = () => {
    localStorage.setItem("onboardingCompleted", "true")
    router.push("/home")
  }

  return <OnboardingScreens onComplete={handleComplete} />
}

