import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Holiday } from '../../model/Holiday'
import { Employee } from '../../model/Employee'
import { isDayOff } from '@/lib/utils/DaysUtil'

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

  const prevMonth = () => {
    console.log('prevMonth')
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    console.log('nextMonth')
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
  }
  const setToday = () => {
    setCurrentDate(new Date())
  }

  const getDayInitial = (date: Date) => {
    return date.toLocaleString('default', { weekday: 'short' }).charAt(0)
  }

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
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="max-h-[60vh] overflow-y-auto">
            <table className="min-w-full border-separate border-spacing-0">
              {/* Sticky Header */}
              <thead className="sticky top-0 z-20 bg-white">
                <tr>
                  {/* Sticky First Column (Header) */}
                  <th
                    scope="col"
                    className="sticky left-0 top-0 z-30 border-b border-r border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Employee
                  </th>
                  {/* Scrollable Header Cells */}
                  {[...Array(daysInMonth)].map((_, index) => {
                    const date = new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      index + 1,
                    )

                    return (
                      <th
                        key={index}
                        scope="col"
                        className={`sticky top-0 z-10 border-b border-r border-gray-300 bg-white bg-opacity-75 px-0 py-3.5 text-center text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter ${
                          isDayOff(date) ? 'bg-gray-200' : ''
                        }`}
                      >
                        <div>{getDayInitial(date)}</div>
                        <div>{index + 1}</div>
                      </th>
                    )
                  })}
                </tr>
              </thead>

              <tbody>
                {employees.map((employee, employeeIdx) => (
                  <tr key={employee.id}>
                    {/* Sticky First Column (Employee Names) */}
                    <td
                      className={classNames(
                        employeeIdx !== employees.length - 1 ? 'border-gray-200' : '',
                        'sticky left-0 z-10 bg-white border-r pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
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

                    {/* Scrollable Days */}
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
                      return (
                        <td
                          key={`${employee.id}-${day}`}
                          className={classNames(
                            employeeIdx !== employees.length - 1 ? 'border-r border-gray-200' : '',
                            'whitespace-nowrap border-r border-gray-200',
                            isDayOff(date) ? 'bg-gray-200' : '',
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
                                ? `${employee.name}: ${holiday.status} (${holiday.startDate} - ${holiday.endDate}) - ${holiday.leaveType}`
                                : ''
                            }
                          >
                            {holiday && holiday.leaveType !== 'Full Day' && (
                              <div
                                className={`h-3 w-6 ${
                                  holiday.leaveType === 'Morning'
                                    ? 'bg-white rounded-t-full'
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
