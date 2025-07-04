"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronDown, Search, Settings, Wand2, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BusinessUnitSwitcher } from "./business-unit-switcher"
import { cn } from "@/lib/utils"
import { businessUnits, type BusinessUnit } from "./business-units"
import type { SidebarItem } from "./types"

interface SidebarProps {
  items: SidebarItem[]
  isOpen: boolean
  isMobile?: boolean
  onClose?: () => void
  currentBusinessUnit?: BusinessUnit
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  className?: string
}

export function Sidebar({
  items,
  isOpen,
  isMobile = false,
  onClose,
  currentBusinessUnit = businessUnits[0], // Default to Design unit
  onBusinessUnitChange,
  className,
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    onBusinessUnitChange?.(unit)
  }

  const renderSidebarItem = (item: SidebarItem) => {
    const buttonContent = (
      <>
        <div className="flex items-center gap-3">
          {item.icon}
          <span>{item.title}</span>
        </div>
        {item.badge && (
          <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
            {item.badge}
          </Badge>
        )}
        {item.items && (
          <ChevronDown
            className={cn("ml-2 h-4 w-4 transition-transform", expandedItems[item.title] ? "rotate-180" : "")}
          />
        )}
      </>
    )

    const buttonClasses = cn(
      "flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium",
      item.isActive ? "bg-primary/10 text-primary" : "hover:bg-muted",
    )

    if (item.url) {
      return (
        <Link href={item.url} className={buttonClasses} onClick={isMobile ? onClose : undefined}>
          {buttonContent}
        </Link>
      )
    }

    return (
      <button className={buttonClasses} onClick={() => item.items && toggleExpanded(item.title)}>
        {buttonContent}
      </button>
    )
  }

  const sidebarContent = (
    <div className="flex h-full flex-col border-r bg-background">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          {/* <div className="flex aspect-square size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
            <Wand2 className="size-5" />
          </div> */}
          <div className="flex h-14 w-14 items-center justify-center ">
              <img src="/headerlogo.png" alt="Header Logo" className="h-14 w-14 object-contain" />
            </div>
          <div>
            <h2 className="font-semibold">Nuvia<br /></h2>
            <p className="text-xs text-muted-foreground">Collaboration Platform<br /></p>
          </div>
        </div>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2" />
        </div>
      </div>

      {/* Chat Button */}
      {/* <div className="px-3 pb-2">
        <Link href="/ai-assistant" onClick={isMobile ? onClose : undefined}>
          <Button className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Wand2 className="mr-2 h-4 w-4" />
            Chat
          </Button>
        </Link>
      </div> */}

      {/* Business Unit Switcher */}
      <div className="px-3 pb-2">
        <BusinessUnitSwitcher currentUnit={currentBusinessUnit} onUnitChange={handleBusinessUnitChange} />
      </div>

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {items.map((item) => (
            <div key={item.title} className="mb-1">
              {renderSidebarItem(item)}

              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      href={subItem.url}
                      className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                      onClick={isMobile ? onClose : undefined}
                    >
                      {subItem.title}
                      {subItem.badge && (
                        <Badge variant="outline" className="ml-auto rounded-full px-2 py-0.5 text-xs">
                          {subItem.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
          {/* <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <div className="flex items-center gap-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </div>
            <Badge variant="outline" className="ml-auto">
              Pro
            </Badge>
          </button> */}
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          className,
        )}
      >
        {sidebarContent}
      </div>
    )
  }

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform border-r bg-background transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className,
      )}
    >
      {sidebarContent}
    </div>
  )
}
