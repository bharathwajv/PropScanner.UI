'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"
import { Building2, Search, Bell } from 'lucide-react'

interface OnboardingScreen {
  title: string
  subtitle: string
  illustration: React.ReactNode
  action?: {
    label: string
    onClick: () => void
  }
}

interface PricingPlan {
  name: string
  price: string
  description: string
  features: string[]
}

interface OnboardingScreensProps {
  onComplete: () => void
}

export function OnboardingScreens({ onComplete }: OnboardingScreensProps) {
  const [currentScreen, setCurrentScreen] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState<string>("Always Free")
  const plansRef = useRef<HTMLDivElement>(null)

  const plans: PricingPlan[] = [
    {
      name: "Always Free",
      price: "₹0",
      description: "Basic features for property search",
      features: [
        "Unlimited property searches",
        "Compare up to 2 properties at a time",
        "Basic search filters",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "₹99",
      description: "Advanced features for serious property hunters",
      features: [
        "All Free plan features",
        "Notifications on new properties in your area",
        "Notifications on modifications to specific properties",
        "Priority customer support"
      ]
    }
  ]

  useEffect(() => {
    if (currentScreen === 1 && plansRef.current) {
      plansRef.current.scrollTop = 0
    }
  }, [currentScreen])

  const screens: OnboardingScreen[] = [
    {
      title: "Welcome to PropScanner",
      subtitle: "Find your dream property across multiple platforms",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-primary/20 rounded-full" />
          <Search className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
        </div>
      ),
      action: {
        label: "Get Started",
        onClick: () => setCurrentScreen(1)
      }
    },
    {
      title: "Choose your plan",
      subtitle: "Start with our free plan or go pro for advanced features",
      illustration: (
        <div ref={plansRef} className="grid gap-6 w-full max-w-lg mx-auto overflow-y-auto max-h-[400px] pb-16">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`p-6 cursor-pointer transition-all ${
                selectedPlan === plan.name
                  ? 'border-primary ring-2 ring-primary shadow-lg'
                  : 'hover:border-primary/50 hover:shadow-md'
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              {plan.name === "Always Free" && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                  Selected
                </div>
              )}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.name === "Pro" && <span className="text-sm text-muted-foreground">/month</span>}
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-primary rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      ),
      action: {
        label: "Continue",
        onClick: () => setCurrentScreen(2)
      }
    },
    {
      title: "You're all set!",
      subtitle: "Let's start finding your perfect property",
      illustration: (
        <div className="relative w-48 h-48 mx-auto">
          <div className="absolute inset-0 bg-primary/20 rounded-full" />
          <Building2 className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary" />
        </div>
      ),
      action: {
        label: "Start Exploring",
        onClick: onComplete
      }
    }
  ]

  const currentScreenData = screens[currentScreen]

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-lg"
        >
          <div className="text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter">
                {currentScreenData.title}
              </h1>
              <p className="text-muted-foreground">
                {currentScreenData.subtitle}
              </p>
            </div>

            <div className="py-8">
              {currentScreenData.illustration}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {currentScreenData.action && (
        <div className="fixed bottom-8 left-0 right-0 flex justify-center">
          <Button
            size="lg"
            className="w-full max-w-xs"
            onClick={currentScreenData.action.onClick}
            disabled={currentScreen === 1 && !selectedPlan}
          >
            {currentScreenData.action.label}
          </Button>
        </div>
      )}
    </div>
  )
}

