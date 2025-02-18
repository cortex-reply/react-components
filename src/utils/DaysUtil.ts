import { bankHolidays } from './BankHolidays'

export const isDayOff = (date: Date) => {
  const isSunday = date.getDay() === 0
  const isSaturday = date.getDay() === 6
  const isBankHoliday = bankHolidays.some((h) => h.date.toISOString() === date.toISOString())

  return isSunday || isSaturday || isBankHoliday
}

export const getTotalDaysBetween = (startDate: Date, endDate: Date, isHalfDay = false) => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  let count = 0

  if (isHalfDay && !isDayOff(start)) {
    return 0.5
  }

  while (start <= end) {
    if (!isDayOff(start)) {
      count++
    }

    start.setDate(start.getDate() + 1)
  }

  return count
}

export const getIsMultipleDays = (startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) {
    return false
  }

  const isMultipleDays = startDate.toDateString() !== endDate.toDateString()
  console.log('isMultipleDaysfunc:', isMultipleDays)
  return isMultipleDays
}
