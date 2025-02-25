"use client"

import { useState } from "react"
import { LoadingButton } from "./ui/loading-button"

export function LoadingButtonExample() {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Default */}
      <LoadingButton onClick={handleClick} loading={isLoading}>
        Click Me
      </LoadingButton>

      {/* With custom loading text */}
      <LoadingButton onClick={handleClick} loading={isLoading} loadingText="Processing..." variant="outline">
        Submit
      </LoadingButton>

      {/* Different variants */}
      <LoadingButton onClick={handleClick} loading={isLoading} variant="secondary">
        Secondary Button
      </LoadingButton>

      <LoadingButton onClick={handleClick} loading={isLoading} variant="destructive">
        Destructive Button
      </LoadingButton>
    </div>
  )
}

