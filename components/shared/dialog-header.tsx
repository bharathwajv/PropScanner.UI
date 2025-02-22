"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface DialogHeaderProps {
  title: string
  onClose: () => void
  children?: React.ReactNode
}

export function DialogHeader({ title, onClose, children }: DialogHeaderProps) {
  return (
    <div className="p-6 flex-shrink-0 border-b">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">{title}</h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onClose} 
          className="rounded-full hover:bg-background border-2 border-red-500"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      {children}
    </div>
  )
} 