"use client"

import { ChevronDown } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollIndicatorProps {
  show: boolean
  className?: string
}

export function ScrollIndicator({ show, className }: ScrollIndicatorProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className={cn("fixed bottom-24 left-1/2 -translate-x-1/2 z-20", className)}
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
            className="flex flex-col items-center gap-1"
          >
            <div className="bg-white/80 backdrop-blur-sm shadow-lg rounded-full p-2">
              <ChevronDown className="w-5 h-5 text-gray-600" />
            </div>
            <span className="text-xs text-gray-600 font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full">
              Scroll for more
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

