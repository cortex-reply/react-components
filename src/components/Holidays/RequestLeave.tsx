'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { DateRange } from 'react-day-picker'

interface RequestLeaveProps {
  userId: string
  userName: string
  remainingDays: number
  submitLeaveRequest?: (formData: FormData) => Promise<{ success: boolean; message: string }>
}

interface ButtonGroupProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  disabled?: boolean[]
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ options, value, onChange, disabled = [] }) => {
  return (
    <div className="flex space-x-2">
      {options.map((option, index) => (
        <Button
          key={option}
          type="button"
          variant={value === option ? 'default' : 'outline'}
          onClick={() => onChange(option)}
          disabled={disabled[index]}
          className="flex-1 hover:bg-accent hover:text-accent-foreground"
        >
          {option}
        </Button>
      ))}
    </div>
  )
}

export function RequestLeave({
  userId,
  userName,
  remainingDays,
  submitLeaveRequest,
}: RequestLeaveProps) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)
  const [leaveTypeStart, setLeaveTypeStart] = useState('Full Day')
  const [leaveTypeEnd, setLeaveTypeEnd] = useState('Full Day')
  const [totalDays, setTotalDays] = useState(0)

  const router = useRouter()

  useEffect(() => {
    if (!dateRange?.from || !dateRange?.to) {
      setTotalDays(0)
      return
    }

    const calculateWeekdays = (start: Date, end: Date): number => {
      const dayOfWeekStart = start.getDay() // 0 = Sunday, 6 = Saturday

      // Calculate total days between start and end
      const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1

      // Calculate full weeks in the range
      const fullWeeks = Math.floor(totalDays / 7)

      // Remaining days outside of full weeks
      const extraDays = totalDays % 7

      // Adjust for the weekdays in the remaining days
      let weekdays = fullWeeks * 5 // 5 weekdays per week

      for (let i = 0; i < extraDays; i++) {
        const day = (dayOfWeekStart + i) % 7 // Cycle through the days of the week
        if (day !== 0 && day !== 6) {
          weekdays++
        }
      }

      return weekdays
    }

    // Calculate the number of weekdays between start and end dates
    let dayDiff = calculateWeekdays(dateRange.from, dateRange.to)

    // Adjust for partial days based on leave types
    if (leaveTypeStart === 'Morning' || leaveTypeStart === 'Afternoon') {
      dayDiff -= 0.5
    }
    if (leaveTypeEnd === 'Morning' || leaveTypeEnd === 'Afternoon') {
      dayDiff -= 0.5
    }

    setTotalDays(dayDiff)
  }, [dateRange?.from, dateRange?.to, leaveTypeStart, leaveTypeEnd])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!dateRange?.from || !dateRange.to) {
      toast.error('Please select both start and end dates')
      return
    }

    if (totalDays > remainingDays) {
      toast.error('You do not have enough leave days remaining')
      return
    }

    const formData = new FormData()
    formData.append('userId', userId)
    formData.append('userName', userName)
    formData.append('dateRange.from', dateRange.from.toISOString())
    formData.append('dateRange.to', dateRange.to.toISOString())
    formData.append('leaveTypeStart', leaveTypeStart)
    formData.append('leaveTypeEnd', leaveTypeEnd)
    formData.append('duration', totalDays.toString())

    const result = await (submitLeaveRequest || defaultSubmitLeaveRequest)(formData)

    if (result.success) {
      toast.success(result.message)
      setDateRange(undefined)
      setLeaveTypeStart('Full Day')
      setLeaveTypeEnd('Full Day')
      router.refresh()
    } else {
      toast.error(`Error: ${result.message}`)
    }
  }

  console.log('dateRange', dateRange)

  let footer = `Please pick the first day.`
  if (dateRange?.from) {
    if (!dateRange.to) {
      footer = format(dateRange.from, 'PPP')
    } else if (dateRange.to) {
      footer = `${format(dateRange.from, 'PPP')}–${format(dateRange.to, 'PPP')}`
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Request Leave</h2>
      <p className="text-sm text-gray-500 mb-4">Remaining leave days: {remainingDays}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="flex flex-col space-y-2">
            <Label htmlFor="dateRange.from">Dates</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !dateRange?.from && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? format(dateRange.from, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  id="test"
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  footer={footer}
                />
                <button type="button" onClick={() => setDateRange(undefined)}>
                  Reset
                </button>
              </PopoverContent>
            </Popover>

            <div className="space-y-2">
              <Label>Select full day or part day</Label>
              <ButtonGroup
                options={['Full Day', 'Morning', 'Afternoon']}
                value={leaveTypeStart}
                disabled={
                  dateRange?.from === dateRange?.to ? [false, false, false] : [false, true, false]
                }
                onChange={(value) => setLeaveTypeStart(value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Select full day or part day</Label>
              <ButtonGroup
                options={['Full Day', 'Morning', 'Afternoon']}
                disabled={
                  dateRange?.from === dateRange?.to ? [true, true, true] : [false, false, true]
                }
                value={leaveTypeEnd}
                onChange={(value) => setLeaveTypeEnd(value)}
              />
            </div>
          </div>
        </div>

        {/* Total Days */}
        <div className="text-sm text-gray-700">
          <Label>Total requested days: {totalDays}</Label>
        </div>

        <Button
          disabled={totalDays <= 0}
          type="submit"
          className="w-full hover:bg-accent hover:text-accent-foreground"
        >
          Submit Request
        </Button>
      </form>
      <Toaster richColors position="top-right" closeButton visibleToasts={9} />
    </div>
  )
}

// Default server action implementation
const defaultSubmitLeaveRequest = async (formData: FormData) => {
  const formDataEntries: { [key: string]: any } = {}
  formData.forEach((value, key) => {
    formDataEntries[key] = value
  })
  console.log('Leave request submitted:', formDataEntries)
  return {
    success: true,
    message: `Leave request submitted successfully for ${formData.get('duration')} days.`,
  }
}
