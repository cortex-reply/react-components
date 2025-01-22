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

interface RequestLeaveProps {
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

export function RequestLeave({ remainingDays, submitLeaveRequest }: RequestLeaveProps) {
  const router = useRouter()
  const TODAY = new Date()
  const TOMORROW = new Date(TODAY.getTime() + 86400000)
  const INITIAL_LEAVE = {
    startDate: TOMORROW,
    endDate: TOMORROW,
    startLeaveType: 'Full Day',
    endLeaveType: 'Full Day',
    duration: 1,
  }

  const [leave, setLeave] = useState({ ...INITIAL_LEAVE })

  const handleLeaveSelection = (event: any, eventType: string) => {
    if (!event) return

    const newLeave = { ...leave, [eventType]: event }

    // if the start of the holiday is morning, then the end of the holiday must be the same day
    // Reset the end stuff to make sure it's the same day
    if (newLeave.startLeaveType === 'Morning') {
      newLeave.endDate = newLeave.startDate
      newLeave.endLeaveType = 'Full Day'
    }

    // count the total days of the leave
    let totalDays =
      Math.ceil(
        (newLeave.endDate.getTime() - newLeave.startDate.getTime()) / (1000 * 60 * 60 * 24),
      ) + 1
    //adjust total days to account for half days
    const startAdj = newLeave.endLeaveType != 'Full Day' ? 0.5 : 0
    const endAdj = newLeave.startLeaveType != 'Full Day' ? 0.5 : 0
    newLeave.duration = totalDays - startAdj - endAdj

    // dont actually set the leave if it's invalid
    if (newLeave.duration > 0 && newLeave.startDate.getTime() > Date.now()) {
      setLeave({ ...newLeave })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (leave.duration === 0) {
      toast.error('Please select both start and end dates')
      // alert('Please select both start and end dates')
      return
    }

    if (leave.duration > remainingDays) {
      toast.error('you do not have enough leave days remaining')
      // alert('you do not have enough leave days remaining')
      return
    }

    const formData = new FormData()
    formData.append('startDate', leave.startDate.toISOString())
    formData.append('endDate', leave.endDate.toISOString())
    formData.append('leaveType', leave.startLeaveType)
    formData.append('duration', leave.duration.toString())
    const result = await (submitLeaveRequest || defaultSubmitLeaveRequest)(formData)

    if (result.success) {
      toast.success(result.message)
      setLeave({ ...INITIAL_LEAVE })
      router.refresh() // Refresh the page to show updated data
    } else {
      toast.error(`Error: ${result.message}`)
    }
  }

  return (
    <div className="max-w-2xl">
      <h2 className="text-lg font-semibold mb-4">Request Leave</h2>
      <p className="text-sm text-gray-500 mb-4">Remaining leave days: {remainingDays}</p>
      <p className="text-sm text-gray-500 mb-4">Requested leave days: {leave.duration}</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !leave.startDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {leave.startDate ? format(leave.startDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={leave.startDate}
                  onSelect={(date) => handleLeaveSelection(date, 'startDate')}
                  initialFocus
                />
                <ButtonGroup
                  options={['Full Day', 'Morning', 'Afternoon']}
                  value={leave.startLeaveType}
                  onChange={(o) => handleLeaveSelection(o, 'startLeaveType')}
                />
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className={cn(
                    'w-full justify-start text-left font-normal',
                    !leave.endDate && 'text-muted-foreground',
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {leave.endDate && leave.startLeaveType !== 'Morning' ? (
                    format(leave.endDate, 'PPP')
                  ) : (
                    <span>Single Morning Only</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {leave.startLeaveType !== 'Morning' && (
                  <div>
                    <Calendar
                      mode="single"
                      selected={leave.endDate}
                      onSelect={(date) => handleLeaveSelection(date, 'endDate')}
                      initialFocus
                    />
                    <div className="space-y-2">
                      {leave.startDate < leave.endDate && (
                        <ButtonGroup
                          options={['Full Day', 'Morning']}
                          value={leave.endLeaveType}
                          onChange={(o) => handleLeaveSelection(o, 'endLeaveType')}
                        />
                      )}
                    </div>
                  </div>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <Button type="submit" className="w-full hover:bg-accent hover:text-accent-foreground">
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
  // console.log('Leave request submitted:', formDataEntries);
  return {
    success: true,
    message: `Leave request submitted successfully for ${formData.get('duration')}`,
  }
}
