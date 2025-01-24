'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { CalendarDays, Grid, PlusCircle, CheckSquare } from 'lucide-react'
import { HolidayGrid } from './HolidayGrid'
import { CalendarView } from './CalendarView'
import { RequestLeave } from './RequestLeave'
import { ApproveLeave } from './ApproveLeave'
import { Employee } from '../../model/Employee'
import { Holiday } from '../../model/Holiday'
import { LeaveRequest } from '../../model/LeaveRequest'

interface HolidayTrackerProps {
  holidays: Holiday[]
  leaveApprovals: LeaveRequest[]
  employees: Employee[]
  currentDate: Date
  userGrade: string
  submitLeaveRequest?: (formData: FormData) => Promise<{ success: boolean; message: string }>
  setCurrentDate?: (date: Date) => Promise<{ success: boolean }>
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function HolidayTracker({
  holidays,
  currentDate,
  leaveApprovals,
  employees,
  userGrade,
  setCurrentDate = async () => ({ success: true }),
  submitLeaveRequest,
}: HolidayTrackerProps) {
  const [currentTab, setCurrentTab] = useState('Calendar View')
  //   const { user, isLoading } = useUser()
  const isLoading = false
  // For preview purposes, we'll assume the user is a manager
  const previewUser = {
    id: 'manager1',
    firstName: 'Manager',
    lastName: 'User',
    grade: 'manager',
    remainingLeaveDays: 20,
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Use the preview user for demonstration
  const currentUser = previewUser

  const tabs = [
    { name: 'Grid View', icon: Grid, current: currentTab === 'Grid View' },
    { name: 'Calendar View', icon: CalendarDays, current: currentTab === 'Calendar View' },
    { name: 'Request Leave', icon: PlusCircle, current: currentTab === 'Request Leave' },
    { name: 'Approve Leave', icon: CheckSquare, current: currentTab === 'Approve Leave' },
  ]

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Holiday Tracker</h1>

      <div className="mb-8">
        <div className="sm:hidden">
          <select
            value={currentTab}
            onChange={(e) => setCurrentTab(e.target.value)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 top-3 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {tabs.map((tab) => (
                <a
                  key={tab.name}
                  onClick={() => {
                    if (
                      tab.name !== 'Approve Leave' ||
                      userGrade === 'Manager' ||
                      userGrade === 'Senior Manager' ||
                      userGrade === 'Partner'
                    ) {
                      setCurrentTab(tab.name)
                    }
                  }}
                  className={classNames(
                    tab.current
                      ? 'border-accent text-accent'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                    tab.name === 'Approve Leave' &&
                      userGrade !== 'Manager' &&
                      userGrade !== 'Senior Manager' &&
                      userGrade !== 'Partner'
                      ? 'cursor-not-allowed opacity-50'
                      : '',
                    'group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium',
                  )}
                  aria-current={tab.current ? 'page' : undefined}
                >
                  <tab.icon
                    className={classNames(
                      tab.current ? 'text-accent' : 'text-gray-400 group-hover:text-gray-500',
                      '-ml-0.5 mr-2 h-5 w-5',
                    )}
                    aria-hidden="true"
                  />
                  <span>{tab.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {currentTab === 'Grid View' && (
        <HolidayGrid
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          holidays={holidays}
          employees={employees}
        />
      )}
      {currentTab === 'Calendar View' && (
        <CalendarView
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          holidays={holidays}
        />
      )}
      {currentTab === 'Request Leave' && (
        <RequestLeave
          userId={currentUser.id}
          userName={`${currentUser.firstName} ${currentUser.lastName}`}
          remainingDays={currentUser.remainingLeaveDays}
          submitLeaveRequest={(formData) => {
            if (submitLeaveRequest) {
              return submitLeaveRequest(formData)
            }
            return Promise.resolve({
              success: false,
              message: 'Submit leave request function not provided',
            })
          }}
        />
      )}
      {currentTab === 'Approve Leave' && (
        <ApproveLeave leaveRequests={leaveApprovals} onApprove={() => {}} onReject={() => {}} />
      )}
    </div>
  )
}
