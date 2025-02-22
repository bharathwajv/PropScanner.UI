"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { motion, AnimatePresence } from "framer-motion"

interface FeatureTooltipProps {
  children: React.ReactNode
  content: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function FeatureTooltip({ children, content, open, onOpenChange }: FeatureTooltipProps) {
  const [isOpen, setIsOpen] = useState(open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  const handleOpenChange = (newOpen: boolean) => {
    setIsOpen(newOpen)
    onOpenChange?.(newOpen)
  }

  return (
    <TooltipProvider>
      <Tooltip open={isOpen} onOpenChange={handleOpenChange}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <AnimatePresence>
          {isOpen && (
            <TooltipContent asChild forceMount>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                className="bg-white p-3 shadow-lg rounded-lg border max-w-[200px] text-center"
              >
                <p>{content}</p>
              </motion.div>
            </TooltipContent>
          )}
        </AnimatePresence>
      </Tooltip>
    </TooltipProvider>
  )
}

