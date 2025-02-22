"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface OnboardingScreensProps {
  onComplete: () => void
}

const screens = [
  {
    title: "Find Your Dream Property",
    subtitle: "Discover and compare properties across multiple platforms in one place",
    illustration: "/illustrations/search.svg",
  },
  {
    title: "Track Price Changes",
    subtitle: "Get notified when prices change for properties you're interested in",
    illustration: "/illustrations/track.svg",
  },
  {
    title: "Make Informed Decisions",
    subtitle: "Compare properties side by side and analyze market trends",
    illustration: "/illustrations/compare.svg",
  },
]

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)

  const handleNext = () => {
    if (currentScreen === screens.length - 1) {
      onComplete()
    } else {
      setCurrentScreen((prev) => prev + 1)
    }
  }

  const handleSkip = () => {
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="relative aspect-square max-w-sm mx-auto mb-8">
              <div className="absolute inset-0 bg-pink-100/50 rounded-full blur-3xl" />
              <img
                src={screens[currentScreen].illustration || "/placeholder.svg"}
                alt="Illustration"
                className="relative w-full h-full object-contain"
              />
            </div>

            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{screens[currentScreen].title}</h1>
              <p className="text-lg text-muted-foreground">{screens[currentScreen].subtitle}</p>
            </div>

            <div className="flex justify-center gap-2 py-4">
              {screens.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentScreen ? "bg-primary" : "bg-gray-200"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 space-y-4">
          <Button
            className="w-full h-12 text-base font-medium rounded-full bg-primary hover:bg-primary/90"
            onClick={handleNext}
          >
            {currentScreen === screens.length - 1 ? (
              "Get Started"
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </Button>
          {currentScreen < screens.length - 1 && (
            <Button
              variant="ghost"
              className="w-full h-12 text-base font-medium rounded-full hover:bg-gray-100"
              onClick={handleSkip}
            >
              Skip
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

