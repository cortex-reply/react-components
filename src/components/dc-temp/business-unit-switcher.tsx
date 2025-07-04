"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { businessUnits, type BusinessUnit } from "./business-units"

interface BusinessUnitSwitcherProps {
  currentUnit: BusinessUnit
  onUnitChange: (unit: BusinessUnit) => void
  className?: string
}

export function BusinessUnitSwitcher({ currentUnit, onUnitChange, className }: BusinessUnitSwitcherProps) {
  const [open, setOpen] = useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between rounded-2xl px-3 py-2 h-auto min-h-[44px] hover:bg-muted/50",
            className,
          )}
        >
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white", currentUnit.color)}>
              {currentUnit.icon}
            </div>
            <div className="flex flex-col items-start min-w-0 flex-1">
              <span className="font-medium text-sm truncate w-full text-left">{currentUnit.name}</span>
              <span className="text-xs text-muted-foreground truncate w-full text-left">{currentUnit.description}</span>
            </div>
          </div>
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[280px] p-2" align="start">
        <DropdownMenuLabel className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          Switch Business Unit
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="grid gap-1">
          {businessUnits.map((unit) => (
            <DropdownMenuItem
              key={unit.id}
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer"
              onSelect={() => {
                onUnitChange(unit)
                setOpen(false)
              }}
            >
              <div className={cn("flex h-8 w-8 items-center justify-center rounded-lg text-white", unit.color)}>
                {unit.icon}
              </div>
              <div className="flex flex-col items-start min-w-0 flex-1">
                <div className="flex items-center gap-2 w-full">
                  <span className="font-medium text-sm truncate">{unit.name}</span>
                  {currentUnit.id === unit.id && <Check className="h-4 w-4 text-primary" />}
                </div>
                <span className="text-xs text-muted-foreground truncate w-full">{unit.description}</span>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
