'use client'

import * as React from 'react'
import Link from 'next/link'
import { ChevronDown, Search, Settings, Wand2, X, Star, Heart, MoreVertical } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'
import { BusinessUnitSwitcher } from '../Projects/business-unit-switcher'
import { cn } from '@/lib/utils'
import { businessUnits } from '../DigitalColleagues/test-data'
import type { BusinessUnit, SidebarItem } from '../DigitalColleagues/types'
import { useLocalStorage } from '@/hooks/use-local-storage'

interface SidebarProps {
  items: SidebarItem[]
  isOpen: boolean
  isMobile?: boolean
  onClose?: () => void
  currentBusinessUnit?: BusinessUnit
  onBusinessUnitChange?: (unit: BusinessUnit) => void
  onSearch?: (query: string) => void
  className?: string
  logo?: string
  logoLink?: string
  appName?: string
  tagline?: string
}

export function AppSidebar({
  items,
  isOpen,
  isMobile = false,
  onClose,
  currentBusinessUnit = businessUnits[0], // Default to Design unit
  onBusinessUnitChange,
  onSearch,
  className,
  logo = '/headerlogo.png',
  logoLink = '/teams',
  appName = 'Nuvia',
  tagline = 'Collaboration Platform',
}: SidebarProps) {
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})
  const [favorites, setFavorites] = useLocalStorage<Record<string, string[]>>(
    'sidebar-favorites',
    {},
  )
  const [showFavoritesDialog, setShowFavoritesDialog] = React.useState<string | null>(null)
  const [searchQuery, setSearchQuery] = React.useState('')

  const toggleExpanded = (title: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    onBusinessUnitChange?.(unit)
  }

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      onSearch?.(searchQuery.trim())
    }
  }

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearchSubmit()
    }
  }

  const toggleFavorite = (parentItemId: string, subItemId: string) => {
    const itemFavorites = favorites[parentItemId] || []
    const newItemFavorites = itemFavorites.includes(subItemId)
      ? itemFavorites.filter((id: string) => id !== subItemId)
      : itemFavorites.concat(subItemId)

    setFavorites({
      ...favorites,
      [parentItemId]: newItemFavorites,
    })
  }

  const getDisplaySubItems = (item: SidebarItem) => {
    if (!item.items || !item.maxItems || item.items.length <= item.maxItems) {
      return item.items || []
    }

    const itemFavorites = favorites[item.id] || []
    const favoriteSubItems = item.items.filter((subItem) => itemFavorites.includes(subItem.id))
    const nonFavoriteSubItems = item.items.filter((subItem) => !itemFavorites.includes(subItem.id))

    return [...favoriteSubItems, ...nonFavoriteSubItems].slice(0, item.maxItems)
  }

  const needsFavorites = (item: SidebarItem) =>
    item.maxItems && item.items && item.items.length > item.maxItems

  const displayItems = items

  const renderSidebarItem = (item: SidebarItem) => {
    const hasLimitedSubItems = needsFavorites(item)
    const displaySubItems = getDisplaySubItems(item)

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
            className={cn(
              'ml-2 h-4 w-4 transition-transform',
              expandedItems[item.title] ? 'rotate-180' : '',
            )}
          />
        )}
      </>
    )

    const buttonClasses = cn(
      'flex w-full items-center justify-between rounded-2xl px-3 py-2 text-sm font-medium',
      item.isActive ? 'bg-primary/10 text-primary' : 'hover:bg-muted',
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

  const FavoritesDialog = () => {
    const currentItem = items.find((item) => item.id === showFavoritesDialog)
    if (!currentItem || !currentItem.items || !currentItem.maxItems) return null

    const itemFavorites = favorites[currentItem.id] || []

    return (
      <Dialog
        open={!!showFavoritesDialog}
        onOpenChange={(open) => !open && setShowFavoritesDialog(null)}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage {currentItem.title} Favorites</DialogTitle>
            <p className="text-sm text-muted-foreground">
              Select up to {currentItem.maxItems} items to show in {currentItem.title.toLowerCase()}
              .
            </p>
          </DialogHeader>
          <ScrollArea className="max-h-96 pr-4">
            <div className="space-y-4">
              {currentItem.items.map((subItem) => (
                <div key={subItem.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subItem.id}
                    checked={itemFavorites.includes(subItem.id)}
                    onCheckedChange={() => toggleFavorite(currentItem.id, subItem.id)}
                    disabled={
                      !itemFavorites.includes(subItem.id) &&
                      itemFavorites.length >= (currentItem.maxItems || 0)
                    }
                  />
                  <label
                    htmlFor={subItem.id}
                    className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                  >
                    {subItem.title}
                    {subItem.badge && (
                      <Badge variant="outline" className="text-xs">
                        {subItem.badge}
                      </Badge>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    )
  }

  const sidebarContent = (
    <div className="flex h-full flex-col bg-background">
      <div className="flex items-center justify-between p-4">
        <Link href={logoLink} className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center">
            <img src={logo} alt="Header Logo" className="h-14 w-14 object-contain" />
          </div>
          <div>
            <h2 className="font-semibold">{appName}</h2>
            <p className="text-xs text-muted-foreground">{tagline}</p>
          </div>
        </Link>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-2xl bg-muted pl-9 pr-4 py-2"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearchKeyPress}
          />
        </div>
      </div>

      {/* Business Unit Switcher */}
      {/* <div className="px-3 pb-2">
        <BusinessUnitSwitcher currentUnit={currentBusinessUnit} onUnitChange={handleBusinessUnitChange} />
      </div> */}

      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {displayItems.map((item) => (
            <div key={item.id} className="mb-1">
              {renderSidebarItem(item)}

              {item.items && expandedItems[item.title] && (
                <div className="mt-1 ml-6 space-y-1 border-l pl-3">
                  {getDisplaySubItems(item).map((subItem) => (
                    <Link
                      key={subItem.id}
                      href={subItem.url}
                      className="flex items-center justify-between rounded-2xl px-3 py-2 text-sm hover:bg-muted"
                      onClick={isMobile ? onClose : undefined}
                    >
                      {subItem.title}
                      {subItem.badge && (
                        <Badge
                          variant="outline"
                          className="ml-auto rounded-full px-2 py-0.5 text-xs"
                        >
                          {subItem.badge}
                        </Badge>
                      )}
                    </Link>
                  ))}
                  {needsFavorites(item) &&
                    item.items &&
                    item.items.length > getDisplaySubItems(item).length && (
                      <button
                        onClick={() => setShowFavoritesDialog(item.id)}
                        className="w-full px-3 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-2xl transition-colors text-left"
                      >
                        ...{item.items.length - getDisplaySubItems(item).length} more available
                      </button>
                    )}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3">
        <div className="space-y-1">
          <button className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium hover:bg-muted">
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </button>
        </div>
      </div>

      <FavoritesDialog />
    </div>
  )

  if (isMobile) {
    return (
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 transform bg-background transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
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
        'fixed inset-y-0 left-0 z-30 w-64 transform bg-background transition-transform duration-300 ease-in-out',
        isOpen ? 'translate-x-0' : '-translate-x-full',
        className,
      )}
    >
      {sidebarContent}
    </div>
  )
}
