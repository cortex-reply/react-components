import type React from "react"
import type { BusinessUnit } from "../Foundry/types"

export function getBusinessUnitById(businessUnits: BusinessUnit[], id: string): BusinessUnit | undefined {
  return businessUnits.find((unit) => unit.id === id)
}

export function getBusinessUnitColor(businessUnits: BusinessUnit[],id: string): string {
  const unit = getBusinessUnitById(businessUnits,id)
  return unit?.color || "bg-gray-600"
}

export function getBusinessUnitAccentColor(businessUnits: BusinessUnit[],id: string): string {
  const unit = getBusinessUnitById(businessUnits,id)
  return unit?.accentColor || "text-gray-600"
}
