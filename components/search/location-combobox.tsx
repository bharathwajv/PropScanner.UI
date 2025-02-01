'use client'

import * as React from "react"
import { Check, ChevronsUpDown, MapPin } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const locations = [
  { value: "gst", label: "GST Road, Chennai" },
  { value: "ecr", label: "ECR, Chennai" },
  { value: "omr", label: "OMR, Chennai" },
  { value: "tambaram", label: "Tambaram, Chennai" },
  { value: "sithalapakkam", label: "Sithalapakkam, Chennai" },
]

interface LocationComboboxProps {
  value?: string
  onChange: (value: string) => void
}

export function LocationCombobox({ value, onChange }: LocationComboboxProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? locations.find((location) => location.value === value)?.label
            : "Search location..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search location..." />
          <CommandEmpty>No location found.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              value="current-location"
              onSelect={() => {
                onChange("current-location")
                setOpen(false)
              }}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Use current location
            </CommandItem>
          </CommandGroup>
          <CommandGroup heading="Popular Locations">
            {locations.map((location) => (
              <CommandItem
                key={location.value}
                value={location.value}
                onSelect={(currentValue) => {
                  onChange(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === location.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {location.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

