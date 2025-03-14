"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"

export function LoadingScreen() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(timer)
          return 100
        }
        return Math.min(oldProgress + 3, 100)
      })
    }, 40)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-24 h-24 relative mb-8"
      >
        <Image src="/placeholder.svg" alt="PropScanner Logo" fill className="object-contain" priority />
      </motion.div>
      <div className="w-64">
        <motion.div
          initial={{ width: "0" }}
          animate={{ width: `${Math.min(progress + 70 , 100)}%` }}
          transition={{ ease: "easeInOut", duration: 0.4 }}
        >
          <Progress value={progress} className="h-1 primary" />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, ease: "easeInOut" }}
        className="absolute bottom-8 text-xl font-semibold text-muted-foreground"
      >
        PropScanner
      </motion.div>
    </div>
  )
}
