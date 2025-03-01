"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  loadingStates?: string[]
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function LoadingButton({
  children,
  loading = false,
  loadingStates = ["Book a call", "Finding slots", "Finding proxy buyer"],
  className,
  disabled,
  variant = "default",
  ...props
}: LoadingButtonProps) {
  const [currentState, setCurrentState] = React.useState(-1)
  const [showCheck, setShowCheck] = React.useState(false)

  React.useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentState((prevState) => {
          if (prevState < loadingStates.length - 1) {
            return prevState + 1
          } else {
            clearInterval(interval)
            setShowCheck(true)
            return prevState
          }
        })
      }, 1500)

      return () => clearInterval(interval)
    } else {
      setCurrentState(-1)
      setShowCheck(false)
    }
  }, [loading, loadingStates.length])

  return (
    <Button
      className={cn("relative overflow-hidden min-w-[200px] min-h-[40px]", className)}
      disabled={loading || disabled}
      variant={variant}
      {...props}
    >
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex items-center space-x-2">
              <AnimatePresence mode="wait">
                {currentState >= 0 && (
                  <motion.span
                    key={currentState}
                    initial={{ y: 10, opacity: 0, filter: "blur(4px)" }}
                    animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                    exit={{ y: -10, opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.3 }}
                  >
                    {showCheck ? <Check className="w-5 h-5 text-green-500" /> : loadingStates[currentState]}
                  </motion.span>
                )}
              </AnimatePresence>
              {!showCheck && currentState < loadingStates.length - 1 && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="default"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </Button>
  )
}