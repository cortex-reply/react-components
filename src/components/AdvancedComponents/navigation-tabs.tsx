'use client'

import { motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export interface TabOption {
  value: string
  label: string
}

interface NavigationTabsProps {
  activeTab: string
  onTabChange?: (tab: string) => void
  tabOptions: TabOption[]
  className?: string
  maxWidth?: string
  gridCols?: number
}

export function NavigationTabs({
  activeTab,
  onTabChange,
  tabOptions,
  className = '',
  maxWidth = '700px',
  gridCols = 6,
}: NavigationTabsProps) {
  const currentTab = tabOptions.find((tab) => tab.value === activeTab)

  return (
    <motion.div
      className={`flex-1 flex justify-center ${className}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Desktop Tabs */}
      <div className="hidden lg:block">
        <Tabs value={activeTab} onValueChange={onTabChange}>
          <TabsList
            className="grid w-full rounded-2xl p-0 h-10"
            style={{
              maxWidth: maxWidth,
              gridTemplateColumns: `repeat(${Math.min(
                gridCols,
                tabOptions.length,
              )}, minmax(0, 1fr))`,
            }}
          >
            {tabOptions.map((tab) => (
              <motion.div
                key={tab.value}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                className="flex-1 px-2"
              >
                <TabsTrigger
                  value={tab.value}
                  onClick={() => onTabChange?.(tab.value)}
                  className="w-full h-8 rounded-xl data-[state=active]:rounded-xl transition-all duration-200 hover:border hover:border-accent hover:bg-accent/10 px-4 py-2 text-sm font-medium"
                >
                  {tab.label}
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </Tabs>
      </div>

      {/* Mobile Dropdown */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="rounded-2xl min-w-[140px] justify-between">
              {currentTab?.label || 'Select'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-[180px]">
            {tabOptions.map((tab) => (
              <DropdownMenuItem
                key={tab.value}
                onClick={() => onTabChange?.(tab.value)}
                className={`cursor-pointer ${activeTab === tab.value ? 'bg-accent' : ''}`}
              >
                {tab.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}
