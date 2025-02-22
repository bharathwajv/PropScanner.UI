"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface IntroTooltipProps {
  title: string
  description: string
  icon: string
  isOpen: boolean
  onClose: () => void
  onRemindLater?: () => void
}

export function IntroTooltip({ title, description, icon, isOpen, onClose, onRemindLater }: IntroTooltipProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto w-32 h-32 relative mb-4">
            <Image src={icon || "/placeholder.svg"} alt={title} width={128} height={128} className="object-contain" />
          </div>
          <DialogTitle className="text-center text-xl">{title}</DialogTitle>
          <DialogDescription className="text-center">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:gap-0">
          <Button className="w-full" onClick={onClose}>
            Got it
          </Button>
          {onRemindLater && (
            <Button variant="link" className="w-full" onClick={onRemindLater}>
              Remind me later
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

