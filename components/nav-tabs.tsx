"use client"

import { cn } from "@/lib/utils"

interface NavTabsProps {
  tabs: string[]
  selected: string
  onSelect: (tab: string) => void
}

export function NavTabs({ tabs, selected, onSelect }: NavTabsProps) {
  return (
    <div className="inline-flex justify-center rounded-full border border-gray-200 bg-white p-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onSelect(tab)}
          className={cn(
            "relative px-6 py-2 text-sm transition-colors rounded-full",
            selected === tab
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

