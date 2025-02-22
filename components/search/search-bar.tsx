"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ArrowUpRight } from "lucide-react"

interface SearchBarProps {
  onLocationSelect: (location: string) => void
}

export function SearchBar({ onLocationSelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const popularLocations = [
    "GST Road, Chennai",
    "ECR, Chennai",
    "OMR, Chennai",
    "Tambaram, Chennai",
    "Sithalapakkam, Chennai",
  ]

  useEffect(() => {
    if (searchTerm) {
      const filteredSuggestions = popularLocations.filter((location) =>
        location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setSuggestions(filteredSuggestions)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchTerm])

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="relative" ref={inputRef}>
      <div className="relative rounded-md">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 w-full focus-visible:ring-2 focus-visible:ring-offset-0 h-12 text-lg"
          onFocus={() => setShowSuggestions(true)}
        />
      </div>
      {showSuggestions && (
        <div className="absolute z-10 w-full mt-1 bg-background border rounded-md shadow-lg overflow-hidden">
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                className="w-full justify-between px-4 py-6 font-normal hover:bg-muted text-base"
                onClick={() => onLocationSelect(suggestion)}
              >
                {suggestion}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
              </Button>
            ))
          ) : (
            <div className="p-4 text-base text-muted-foreground">No suggestions found</div>
          )}
        </div>
      )}
    </div>
  )
}

