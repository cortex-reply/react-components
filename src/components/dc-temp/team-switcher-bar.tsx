"use client"

import { ChevronDown, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { BusinessUnit } from "./business-units"

interface TeamSwitcherBarProps {
  teams: BusinessUnit[]
  selectedTeam: BusinessUnit
  onTeamChange: (team: BusinessUnit) => void
  onDashboardClick?: () => void
  className?: string
}

export function TeamSwitcherBar({
  teams,
  selectedTeam,
  onTeamChange,
  onDashboardClick,
  className,
}: TeamSwitcherBarProps) {
  return (
    <div className={`border-t bg-muted/30 ${className || ""}`}>
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Team:</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-8 gap-2 rounded-xl">
                  <div
                    className={cn(
                      "flex h-4 w-4 items-center justify-center rounded text-white text-xs",
                      selectedTeam.color,
                    )}
                  >
                    {selectedTeam.icon}
                  </div>
                  <span className="font-medium">{selectedTeam.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {teams.map((unit) => (
                  <DropdownMenuItem
                    key={unit.id}
                    className="flex items-center gap-3 p-3"
                    onClick={() => onTeamChange(unit)}
                  >
                    <div
                      className={cn("flex h-6 w-6 items-center justify-center rounded text-white text-xs", unit.color)}
                    >
                      {unit.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{unit.name}</div>
                      <div className="text-xs text-muted-foreground">{unit.description}</div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button variant="ghost" size="sm" className="gap-2 rounded-xl" onClick={onDashboardClick}>
            <Grid3X3 className="h-3 w-3" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
