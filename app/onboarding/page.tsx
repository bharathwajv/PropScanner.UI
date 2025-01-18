'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setShowHeaderAndNav } from '@/lib/redux/uiSlice'
import { OnboardingScreens } from '@/components/onboarding-screens'

export default function OnboardingPage() {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setShowHeaderAndNav(false))
  }, [dispatch])

  const handleComplete = () => {
    localStorage.setItem('onboardingCompleted', 'true')
    router.push('/')
  }

  return <OnboardingScreens onComplete={handleComplete} />
}

