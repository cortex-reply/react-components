import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Employee } from '../../model/Employee'
import { Holiday } from '../../model/Holiday'

interface HolidayGridProps {
  currentDate: Date
  setCurrentDate: (date: Date) => Promise<{ success: boolean }>
  holidays: Holiday[]
  employees: Employee[]
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function HolidayGrid({
  currentDate,
  setCurrentDate,
  holidays,
  employees,
}: HolidayGridProps) {
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-accent">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
          <p className="mt-2 text-sm text-foreground">
            All staff with holidays for the current month.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <Button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
            }
            variant="outline"
            size="icon"
            className="mr-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            onClick={() =>
              setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
            }
            variant="outline"
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-r border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Employee
                  </th>
                  {[...Array(daysInMonth)].map((_, index) => (
                    <th
                      key={index}
                      scope="col"
                      className="sticky top-0 z-10 border-b border-r border-gray-300 bg-white bg-opacity-75 px-0 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                    >
                      {index + 1}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {employees.map((employee, employeeIdx) => (
                  <tr key={employee.id}>
                    <td
                      className={classNames(
                        employeeIdx !== employees.length - 1 ? ' border-gray-200' : '',
                        'whitespace-nowrap py-4 border-r pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                      )}
                    >
                      <div className="flex items-center">
                        <Avatar className="h-11 w-11">
                          <AvatarImage src={employee.image} alt={employee.name} />
                          <AvatarFallback>
                            {employee.name
                              .split(' ')
                              .map((n) => n[0])
                              .join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-4">
                          <div className="font-medium text-accent">{employee.name}</div>
                        </div>
                      </div>
                    </td>
                    {[...Array(daysInMonth)].map((_, day) => {
                      const date = new Date(
                        currentDate.getFullYear(),
                        currentDate.getMonth(),
                        day + 1,
                      )

                      const holiday = holidays.find(
                        (h) =>
                          h.userId === employee.id &&
                          new Date(h.startDate) <= date &&
                          new Date(h.endDate) >= date,
                      )

                      const isFirstDay =
                        holiday &&
                        new Date(holiday.startDate).toDateString() === date.toDateString()
                      const isLastDay =
                        holiday && new Date(holiday.endDate).toDateString() === date.toDateString()

                      const isMultipleDays = holiday && holiday.startDate !== holiday.endDate

                      return (
                        <td
                          key={`${employee.id}-${day}`}
                          className={classNames(
                            employeeIdx !== employees.length - 1 ? 'border-r border-gray-200' : '',
                            'whitespace-nowrap border-r border-gray-200',
                          )}
                        >
                          <div
                            className={`h-6 w-6 mx-auto rounded-full overflow-hidden ${
                              holiday
                                ? holiday.status === 'approved'
                                  ? 'bg-green-500'
                                  : holiday.status === 'rejected'
                                    ? 'bg-red-500'
                                    : 'bg-gray-600'
                                : 'bg-gray-100'
                            }`}
                            title={
                              holiday
                                ? `${employee.name}: ${holiday.status} (${holiday.startDate} ${holiday.leaveTypeStart === 'Full Day' ? '' : holiday.leaveTypeStart} - ${holiday.endDate} ${!holiday.leaveTypeEnd || (holiday.leaveTypeEnd && holiday.leaveTypeEnd === 'Full Day') ? '' : holiday.leaveTypeEnd})`
                                : ''
                            }
                          >
                            {/* Half-Day for Start */}
                            {holiday && isFirstDay && holiday.leaveTypeStart !== 'Full Day' && (
                              <div
                                className={`h-3 w-6 ${
                                  holiday.leaveTypeStart === 'Morning'
                                    ? 'bg-white rounded-b-full mt-3'
                                    : 'bg-white rounded-t-full'
                                }`}
                              />
                            )}
                            {/* Half-Day for End */}
                            {holiday &&
                              isLastDay &&
                              isMultipleDays &&
                              holiday.leaveTypeEnd &&
                              holiday.leaveTypeEnd !== 'Full Day' && (
                                <div
                                  className={`h-3 w-6 ${
                                    holiday.leaveTypeEnd === 'Morning'
                                      ? 'bg-white rounded-b-full mt-3'
                                      : 'bg-white rounded-t-full'
                                  }`}
                                />
                              )}
                          </div>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
