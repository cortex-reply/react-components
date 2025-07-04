"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Sidebar } from "./sidebar"
import { AppHeader } from "./app-header"
import { businessUnits, type BusinessUnit } from "./business-units"
import type { SidebarItem } from "./types"
import type { Notification } from "./notifications-panel"

interface CreativeLayoutProps {
  sidebarItems: SidebarItem[]
  children: React.ReactNode
  title?: string
  notifications?: Notification[]
  currentBusinessUnit?: BusinessUnit
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  businessUnits?: typeof businessUnits
  activeTab?: string
  onTabChange?: (tab: string) => void
  showTabs?: boolean
}

export function CreativeLayout({
  sidebarItems,
  children,
  title = "Digital Colleagues",
  notifications = [],
  currentBusinessUnit = businessUnits[0], // Default to Design unit
  onBusinessUnitChange,
  businessUnits: businessUnitsProp = businessUnits,
  activeTab,
  onTabChange,
  showTabs = false,
}: CreativeLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [localBusinessUnit, setLocalBusinessUnit] = useState(currentBusinessUnit)

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    setLocalBusinessUnit(unit)
    onBusinessUnitChange?.(unit)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border bg-background w-[]">
      {/* Animated gradient background */}
      <motion.div
        className="flex h-full flex-col overflow-hidden rounded-xl border bg-background w-3"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 30% 70%, rgba(233, 30, 99, 0.5) 0%, rgba(81, 45, 168, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 70% 30%, rgba(76, 175, 80, 0.5) 0%, rgba(32, 119, 188, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
            "radial-gradient(circle at 50% 50%, rgba(120, 41, 190, 0.5) 0%, rgba(53, 71, 125, 0.5) 50%, rgba(0, 0, 0, 0) 100%)",
          ],
        }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar - Mobile */}
      <div className="md:hidden">
        <Sidebar
          items={sidebarItems}
          isOpen={mobileMenuOpen}
          isMobile={true}
          onClose={() => setMobileMenuOpen(false)}
          currentBusinessUnit={localBusinessUnit}
          onBusinessUnitChange={handleBusinessUnitChange}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <Sidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          isMobile={false}
          currentBusinessUnit={localBusinessUnit}
          onBusinessUnitChange={handleBusinessUnitChange}
        />
      </div>

      {/* Main Content */}
      <div className={cn("min-h-screen transition-all duration-300 ease-in-out", sidebarOpen ? "md:pl-64" : "md:pl-0")}>
        <AppHeader
          title={title}
          notifications={notifications}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={onTabChange}
          showTabs={showTabs}
        />

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
