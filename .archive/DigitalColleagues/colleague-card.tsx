'use client'

import { useState } from 'react'
import {
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Clock,
  Settings,
  Trash2,
  Edit,
  User,
  Bot,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import type { Colleague } from './types'

interface ColleagueCardProps {
  colleague: Colleague
  onEdit?: (colleague: Colleague) => void
  onDelete?: (colleagueId: string) => void
  onViewDetails?: (colleague: Colleague) => void
  showActions?: boolean
  compact?: boolean
  className?: string
}

export function ColleagueCard({
  colleague,
  onEdit,
  onDelete,
  onViewDetails,
  showActions = true,
  compact = false,
  className,
}: ColleagueCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500'
      case 'inactive':
        return 'bg-gray-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Active'
      case 'inactive':
        return 'Inactive'
      default:
        return 'Unknown'
    }
  }

  const formatLastActive = (date?: Date) => {
    if (!date) return 'Never'
    const now = new Date()
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`
    return `${Math.floor(diffInMinutes / 1440)}d ago`
  }

  return (
    <Card className={cn('hover:shadow-md transition-shadow', compact && 'p-2', className)}>
      <CardHeader className={cn('pb-3', compact && 'pb-2')}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Avatar className={cn('h-12 w-12', compact && 'h-8 w-8')}>
                <AvatarImage src="/placeholder.svg" alt={colleague.name} />
                <AvatarFallback>
                  {colleague.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              {/* <div
                className={cn(
                  "absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-background",
                  compact && "h-3 w-3",
                  getStatusColor(colleague.status),
                )}
              /> */}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className={cn('font-semibold text-sm truncate', compact && 'text-xs')}>
                  {colleague.name}
                </h3>
                {colleague.type === 'digital' ? (
                  <Bot className={cn('h-4 w-4 text-blue-500', compact && 'h-3 w-3')} />
                ) : (
                  <User className={cn('h-4 w-4 text-green-500', compact && 'h-3 w-3')} />
                )}
              </div>
              <p className={cn('text-sm text-muted-foreground truncate', compact && 'text-xs')}>
                {colleague.type === 'human' ? colleague.role : colleague.description}
              </p>
              {!compact && (
                <div className="flex items-center gap-2 mt-1">
                  {colleague.type === 'human' && (
                    <Badge variant="secondary" className="text-xs">
                      {colleague.department}
                    </Badge>
                  )}
                  {colleague.type === 'digital' && (
                    <Badge variant="secondary" className="text-xs">
                      v{colleague.version}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    {getStatusText(colleague.status)}
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className={cn('h-8 w-8', compact && 'h-6 w-6')}>
                  <MoreHorizontal className={cn('h-4 w-4', compact && 'h-3 w-3')} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {colleague.type === 'digital' && (
                  <>
                    <DropdownMenuItem onClick={() => onViewDetails?.(colleague)}>
                      <Settings className="h-4 w-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit?.(colleague)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuItem
                  onClick={() => onDelete?.(colleague.id)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {colleague.type === 'digital' ? 'Delete' : 'Remove from team'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      {!compact && (
        <CardContent className="pt-0">
          <div className="space-y-2 text-sm">
            {colleague.type === 'human' && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-3 w-3" />
                <span className="truncate">{colleague.email}</span>
              </div>
            )}

            {colleague.type === 'human' && (
              <>
                {colleague.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-3 w-3" />
                    <span>{colleague.phone}</span>
                  </div>
                )}
                {colleague.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{colleague.location}</span>
                  </div>
                )}
              </>
            )}

            {colleague.type === 'digital' && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Settings className="h-3 w-3" />
                <span>v{colleague.version}</span>
              </div>
            )}

            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-3 w-3" />
              <span>Last active: {formatLastActive(colleague.lastActive)}</span>
            </div>
          </div>

          {colleague.type === 'human' && colleague.skills && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {colleague.skills
                  .slice(0, isExpanded ? colleague.skills.length : 3)
                  .map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                {colleague.skills.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-2 text-xs"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show less' : `+${colleague.skills.length - 3} more`}
                  </Button>
                )}
              </div>
            </div>
          )}

          {colleague.type === 'digital' && (
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {colleague.capabilities
                  .slice(0, isExpanded ? colleague.capabilities.length : 2)
                  .map((capability) => (
                    <Badge key={capability} variant="outline" className="text-xs">
                      {capability}
                    </Badge>
                  ))}
                {colleague.capabilities.length > 2 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-2 text-xs"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? 'Show less' : `+${colleague.capabilities.length - 2} more`}
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  )
}
