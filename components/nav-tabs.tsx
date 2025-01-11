'use client'

import { cn } from "@/lib/utils"

interface NavTabsProps {
  tabs: string[]
  selected: string
  onSelect: (tab: string) => void
}

export function NavTabs({ tabs, selected, onSelect }: NavTabsProps) {
  return (
    <div className="inline-flex rounded-full border border-gray-200 bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={cn(
            "relative px-4 py-2 text-sm transition-colors",
            selected === tab 
              ? "text-foreground font-medium before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-1 before:bg-primary before:rounded-full" 
              : "text-muted-foreground"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

