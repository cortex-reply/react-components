'use client'

import { useState } from 'react'
import { Menu } from '@headlessui/react'
import { ChevronLeft, ChevronRight, ChevronDown, MoreHorizontal, Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface CalendarViewProps {
  currentDate: Date
  setCurrentDate: (date: Date) => void
  holidays: Holiday[]
}

interface Holiday {
  id: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: 'approved' | 'requested' | 'rejected'
  totalDays: number
  leaveType: 'Full Day' | 'Morning' | 'Afternoon'
}

export function CalendarView({ currentDate, setCurrentDate, holidays }: CalendarViewProps) {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null)

  const firstDayOfMonth =
    (new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay() + 6) % 7

  const days = Array.from({ length: 42 }, (_, i) => {
    const day = new Date(currentDate.getFullYear(), currentDate.getMonth(), i - firstDayOfMonth + 1)
    return {
      date: day,
      isCurrentMonth: day.getMonth() === currentDate.getMonth(),
      isToday: day.toDateString() === new Date().toDateString(),
      holidays: holidays.filter((h) => new Date(h.startDate) <= day && new Date(h.endDate) >= day),
    }
  })

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  const setToday = () => {
    setCurrentDate(new Date())
  }

  return (
    <div className="lg:flex lg:h-full lg:flex-col">
      <header className="flex items-center justify-between border-b border-gray-200 px-6 py-4 lg:flex-none">
        <h1 className="text-base font-semibold text-foreground">
          <time dateTime={currentDate.toISOString()}>
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </time>
        </h1>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md gap-1 md:items-stretch">
            <Button
              onClick={prevMonth}
              variant="outline"
              size="icon"
              className="rounded-l-md border-accent hover:text-accent"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
            <Button
              variant="outline"
              onClick={setToday}
              className="hidden border-l border-r border-accent px-3.5 text-sm font-semibold text-accent hover:bg-gray-50 focus:relative md:block"
            >
              Today
            </Button>
            <Button
              onClick={nextMonth}
              variant="outline"
              size="icon"
              className="rounded-r-md border-accent hover:text-accent"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </header>
      <div className="shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-auto lg:flex-col">
        <div className="grid grid-cols-7 gap-px border-b border-gray-300 bg-gray-200 text-center text-xs font-semibold leading-6 text-gray-700 lg:flex-none">
          <div className="bg-white py-2">
            M<span className="sr-only sm:not-sr-only">on</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">ue</span>
          </div>
          <div className="bg-white py-2">
            W<span className="sr-only sm:not-sr-only">ed</span>
          </div>
          <div className="bg-white py-2">
            T<span className="sr-only sm:not-sr-only">hu</span>
          </div>
          <div className="bg-white py-2">
            F<span className="sr-only sm:not-sr-only">ri</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">at</span>
          </div>
          <div className="bg-white py-2">
            S<span className="sr-only sm:not-sr-only">un</span>
          </div>
        </div>
        <div className="flex bg-gray-200 text-xs leading-6 text-gray-700 lg:flex-auto">
          <div className="hidden w-full lg:grid lg:grid-cols-7 lg:grid-rows-6 lg:gap-px">
            {days.map((day) => (
              <div
                key={day.date.toISOString()}
                className={cn(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-500',
                  'relative px-3 py-2',
                )}
              >
                <time
                  dateTime={day.date.toISOString()}
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-full',
                    day.isToday && 'bg-indigo-600 font-semibold text-white',
                  )}
                >
                  {day.date.getDate()}
                </time>
                {day.holidays.length > 0 && (
                  <ol className="mt-2 space-y-1">
                    {day.holidays.map((holiday) => (
                      <li key={holiday.id}>
                        <div
                          className={`text-xs px-1 py-0.5 rounded ${
                            holiday.status === 'approved' ? 'border-green-500' : 'border-gray-500'
                          } border`}
                        >
                          {holiday.userName}
                        </div>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ))}
          </div>
          <div className="isolate grid w-full grid-cols-7 grid-rows-6 gap-px lg:hidden">
            {days.map((day) => (
              <button
                key={day.date.toISOString()}
                type="button"
                className={cn(
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.date === selectedDay || day.isToday) && 'font-semibold',
                  day.date === selectedDay && 'text-white',
                  !day.date && day.isToday && 'text-indigo-600',
                  day.date !== selectedDay && day.isCurrentMonth && !day.isToday && 'text-gray-900',
                  day.date !== selectedDay &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    'text-gray-500',
                  'flex h-14 flex-col px-3 py-2 hover:bg-gray-100 focus:z-10',
                )}
              >
                <time
                  dateTime={day.date.toISOString()}
                  className={cn(
                    'ml-auto',
                    day.date === selectedDay &&
                      day.isToday &&
                      'flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600',
                    day.date === selectedDay &&
                      !day.isToday &&
                      'flex h-6 w-6 items-center justify-center rounded-full bg-gray-900',
                  )}
                >
                  {day.date.getDate()}
                </time>
                <span className="sr-only">{day.holidays.length} holidays</span>
                {day.holidays.length > 0 && (
                  <span className="-mx-0.5 mt-auto flex flex-wrap-reverse">
                    {day.holidays.map((holiday) => (
                      <span
                        key={holiday.id}
                        className={`mx-0.5 mb-1 h-1.5 w-1.5 rounded-full ${
                          holiday.status === 'approved' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      />
                    ))}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
