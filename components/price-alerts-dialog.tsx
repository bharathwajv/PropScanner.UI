"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface PriceAlertsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PriceAlertsDialog({ open, onOpenChange }: PriceAlertsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] p-0">
        <div className="p-6 space-y-6">
          <div className="relative h-48 w-full">
            <Image src="/placeholder.svg" alt="Price Alerts Illustration" fill className="object-contain" priority />
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">Real-time Price Alerts</DialogTitle>
            <DialogDescription className="text-center text-base">
              Get hassle-free price tracking with email and push notifications, keeping you up to date with your saved
              properties.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button className="w-full" onClick={() => onOpenChange(false)}>
              Got it
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

