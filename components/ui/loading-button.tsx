"use client"

import type * as React from "react"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  loading?: boolean
  loadingText?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
}

export function LoadingButton({
  children,
  loading = false,
  loadingText,
  className,
  disabled,
  variant = "default",
  ...props
}: LoadingButtonProps) {
  return (
    <Button
      className={cn("flex items-center justify-center gap-2", className)}
      disabled={loading || disabled}
      variant={variant}
      {...props}
    >
      {loading ? (
        <>
          {loadingText || children}
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        children
      )}
    </Button>
  )
}

