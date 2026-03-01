'use client'

import type React from 'react'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { AppSidebar } from '../AdvancedComponents/AppSidebar'
import { AppHeader } from '../AdvancedComponents/app-header'
import type { SidebarItem, BusinessUnit } from './types'
import type { Notification } from '../AdvancedComponents/notifications-panel'
import { User } from 'lucide-react'

interface FoundaryLayoutProps {
  sidebarItems: SidebarItem[]
  children: React.ReactNode
  title?: string
  notifications?: Notification[]
  currentBusinessUnit?: BusinessUnit
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  onSearch?: (query: string) => void
  businessUnits?: BusinessUnit[]
  activeTab?: string
  onTabChange?: (tab: string) => void
  showTabs?: boolean
  // New props for enhanced functionality
  onActionClick?: () => void
  actionIcon?: React.ReactNode
  actionText?: string
  onNotificationRemove?: (id: string) => void
  onRemoveAll?: () => void
  logo?: string
  logoLink?: string
  appName?: string
  tagline?: string
  sidebarInitiallyClosed?: boolean
}

const businessUnits: BusinessUnit[] = [
  {
    id: 'copilot',
    name: 'Peronal Copilot',
    description: 'Your personal AI assistant for all tasks',
    icon: <User className="h-4 w-4" />,
    color: 'bg-orange-600',
    accentColor: 'text-orange-600',
  },
]

export function FoundaryLayout({
  sidebarItems,
  children,
  title = 'Digital Colleagues',
  notifications = [],
  currentBusinessUnit = businessUnits[0], // Default to Design unit
  onBusinessUnitChange,
  onSearch,
  businessUnits: businessUnitsProp = businessUnits,
  activeTab,
  onTabChange,
  showTabs = false,
  onActionClick,
  actionIcon,
  actionText = 'Action',
  onNotificationRemove,
  onRemoveAll,
  logo = '/headerlogo.png',
  logoLink = '/teams',
  appName = 'Nuvia',
  tagline = 'Collaboration Platform',
  sidebarInitiallyClosed = false,
}: FoundaryLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(!sidebarInitiallyClosed)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [localBusinessUnit, setLocalBusinessUnit] = useState(currentBusinessUnit)

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    setLocalBusinessUnit(unit)
    onBusinessUnitChange?.(unit)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl  bg-background w-[]">
      {/* Animated gradient background
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
      /> */}

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Mobile */}
      <div className="md:hidden">
        <AppSidebar
          items={sidebarItems}
          isOpen={mobileMenuOpen}
          isMobile={true}
          onClose={() => setMobileMenuOpen(false)}
          currentBusinessUnit={localBusinessUnit}
          onBusinessUnitChange={handleBusinessUnitChange}
          onSearch={onSearch}
          logo={logo}
          logoLink={logoLink}
          appName={appName}
          tagline={tagline}
        />
      </div>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block">
        <AppSidebar
          items={sidebarItems}
          isOpen={sidebarOpen}
          isMobile={false}
          currentBusinessUnit={localBusinessUnit}
          onBusinessUnitChange={handleBusinessUnitChange}
          onSearch={onSearch}
          logo={logo}
          logoLink={logoLink}
          appName={appName}
          tagline={tagline}
        />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          'min-h-screen fixed w-full transition-all duration-300 ease-in-out',
          sidebarOpen ? 'md:pl-64' : 'md:pl-0',
        )}
      >
        <AppHeader
          title={title}
          notifications={notifications}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          onToggleMobileMenu={() => setMobileMenuOpen(true)}
          sidebarOpen={sidebarOpen}
          activeTab={activeTab}
          onTabChange={onTabChange}
          showTabs={showTabs}
          onActionClick={onActionClick}
          actionIcon={actionIcon}
          actionText={actionText}
          onNotificationRemove={onNotificationRemove}
          onRemoveAll={onRemoveAll}
          logo={logo}
          appName={appName}
          tagline={tagline}
        />

        <main className="flex-1 p-0 flex flex-col h-[calc(100vh-4rem)] overflow-y-scroll">
          {children}
        </main>
      </div>
    </div>
  )
}
