"use client"

import { Search, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SearchFabProps {
  onClick: () => void
  className?: string
}

export function SearchFab({ onClick, className }: SearchFabProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn("relative p-3 rounded-full bg-white shadow-md", className)}
      onClick={onClick}
    >
      <Search className="w-7 h-7" />
      
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute inset-0 rounded-full animate-glow"
      />

      <motion.div
        animate={{
          y: [0, -3, 0],  // Floating effect
          rotate: [0, 10, -10, 0], // Slight tilting motion
          opacity: [1, 0.8, 1], // Twinkling effect
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-1 -right-1"
      >
        <Sparkles className="w-5 h-5 text-yellow-400" />
      </motion.div>
    </motion.button>
  )
}
