'use strict'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { CalendarDays, Cake, Award, PartyPopper } from 'lucide-react'

type EventType = 'birthday' | 'workAnniversary' | 'companyEvent' | 'other'

export interface EventCardProps {
  eventType: EventType
  date: string
  title: string
  description?: string
  avatarSrc?: string
}

export function EventCard({
  eventType = 'birthday',
  date = '',
  title = '',
  description = '',
  avatarSrc,
}: EventCardProps) {
  const getEventIcon = (eventType: EventType) => {
    switch (eventType) {
      case 'birthday':
        return <Cake className="h-4 w-4" />
      case 'workAnniversary':
        return <Award className="h-4 w-4" />
      case 'companyEvent':
        return <PartyPopper className="h-4 w-4" />
      default:
        return <CalendarDays className="h-4 w-4" />
    }
  }

  const getEventColor = (eventType: EventType) => {
    switch (eventType) {
      case 'birthday':
        return 'bg-brand-cyan'
      case 'workAnniversary':
        return 'bg-brand-blue'
      case 'companyEvent':
        return 'bg-brand-plum'
      default:
        return 'from-gray-500 to-slate-500'
    }
  }

  return (
    <Card
      className={`w-full max-w-md overflow-hidden bg-gradient-to-br ${getEventColor(eventType)}`}
    >
      <CardHeader className="flex flex-row items-center gap-3 text-white">
        {avatarSrc && (
          <Avatar className="h-14 w-14 border-2 border-white">
            <AvatarImage src={avatarSrc} alt={title || 'Event'} />
            <AvatarFallback className="bg-white text-gray-900">
              {title ? title.charAt(0).toUpperCase() : '?'}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col">
          <CardTitle className="text-xl">{title || 'Untitled Event'}</CardTitle>
          <p className="text-sm text-white/80">
            <CalendarDays className="mr-1 inline-block h-4 w-4" />
            {date ? new Date(date).toLocaleDateString('en-GB') : 'Date not specified'}
          </p>
        </div>
      </CardHeader>
      <CardContent className="bg-white bg-opacity-80 p-4">
        {description && <p className="mb-2 text-sm text-gray-700">{description}</p>}
        <Badge variant="secondary" className={`${getEventColor(eventType)} text-white/80`}>
          {/* <Badge variant="secondary" className="bg-white text-gray-800 hover:bg-gray-100"> */}
          {getEventIcon(eventType)}
          <span className="ml-1">
            {eventType
              ? eventType
                  .replace(/([a-z])([A-Z])/g, '$1 $2')
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')
              : 'Event'}
          </span>
        </Badge>
      </CardContent>
    </Card>
  )
}
