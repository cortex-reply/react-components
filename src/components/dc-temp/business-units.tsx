import { Building2, Code, Palette, TrendingUp, Users, Wrench, DollarSign, Scale, Package, Zap } from "lucide-react"
import type React from "react"

export interface BusinessUnit {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  accentColor: string
}

export const businessUnits: BusinessUnit[] = [
  {
    id: "design",
    name: "Design",
    description: "Creative and visual design team",
    icon: <Palette className="h-4 w-4" />,
    color: "bg-purple-600",
    accentColor: "text-purple-600",
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Software development and technical teams",
    icon: <Code className="h-4 w-4" />,
    color: "bg-blue-600",
    accentColor: "text-blue-600",
  },
  {
    id: "marketing",
    name: "Marketing",
    description: "Brand, campaigns, and growth marketing",
    icon: <TrendingUp className="h-4 w-4" />,
    color: "bg-pink-600",
    accentColor: "text-pink-600",
  },
  {
    id: "sales",
    name: "Sales",
    description: "Revenue generation and customer acquisition",
    icon: <DollarSign className="h-4 w-4" />,
    color: "bg-green-600",
    accentColor: "text-green-600",
  },
  {
    id: "hr",
    name: "Human Resources",
    description: "People operations and talent management",
    icon: <Users className="h-4 w-4" />,
    color: "bg-orange-600",
    accentColor: "text-orange-600",
  },
  {
    id: "operations",
    name: "Operations",
    description: "Business operations and process optimization",
    icon: <Wrench className="h-4 w-4" />,
    color: "bg-indigo-600",
    accentColor: "text-indigo-600",
  },
  {
    id: "legal",
    name: "Legal",
    description: "Legal affairs and compliance",
    icon: <Scale className="h-4 w-4" />,
    color: "bg-slate-600",
    accentColor: "text-slate-600",
  },
  {
    id: "product",
    name: "Product",
    description: "Product strategy and management",
    icon: <Package className="h-4 w-4" />,
    color: "bg-violet-600",
    accentColor: "text-violet-600",
  },
  {
    id: "it",
    name: "IT Support",
    description: "Information technology and infrastructure",
    icon: <Zap className="h-4 w-4" />,
    color: "bg-cyan-600",
    accentColor: "text-cyan-600",
  },
  {
    id: "company",
    name: "Company",
    description: "Company-wide resources and information",
    icon: <Building2 className="h-4 w-4" />,
    color: "bg-gray-600",
    accentColor: "text-gray-600",
  },
]

export function getBusinessUnitById(id: string): BusinessUnit | undefined {
  return businessUnits.find((unit) => unit.id === id)
}

export function getBusinessUnitColor(id: string): string {
  const unit = getBusinessUnitById(id)
  return unit?.color || "bg-gray-600"
}

export function getBusinessUnitAccentColor(id: string): string {
  const unit = getBusinessUnitById(id)
  return unit?.accentColor || "text-gray-600"
}
