import { useEffect, useState } from "react"

export function LinearProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 200)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="w-full bg-gray-200 h-1">
      <div className="bg-primary h-1 transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
    </div>
  )
}

