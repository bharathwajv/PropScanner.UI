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

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export function NotificationDialog({ open, onOpenChange, onConfirm }: NotificationDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Turn this alert off?</DialogTitle>
          <DialogDescription>Stop receiving email and push notification alerts for this property.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex flex-col gap-2 sm:flex-col">
          <Button onClick={onConfirm} variant="destructive" className="w-full">
            Turn off
          </Button>
          <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full">
            Keep me updated
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

