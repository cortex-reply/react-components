import { bankHolidays } from './BankHolidays'

export const isDayOff = (date: Date) => {
  const isSunday = date.getUTCDay() === 0
  const isSaturday = date.getUTCDay() === 6
  const isBankHoliday = bankHolidays.some(
    (h) =>
      h.getFullYear() === date.getUTCFullYear() &&
      h.getMonth() === date.getUTCMonth() &&
      h.getDate() === date.getUTCDate()
  )

  return isSunday || isSaturday || isBankHoliday
}

export const getTotalDaysBetween = (startDate: Date, endDate: Date, isHalfDay = false) => {
  // Work with UTC day values to avoid timezone issues
  let start = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate()))
  const end = new Date(Date.UTC(endDate.getUTCFullYear(), endDate.getUTCMonth(), endDate.getUTCDate()))

  let count = 0

  if (isHalfDay && !isDayOff(start)) {
    return 0.5
  }

  while (start <= end) {
    if (!isDayOff(start)) {
      count++
    }

    start = new Date(start.getTime() + 24 * 60 * 60 * 1000) // Add 1 day in milliseconds
  }

  return count
}

export const getIsMultipleDays = (startDate?: Date, endDate?: Date) => {
  if (!startDate || !endDate) {
    return false
  }

  // Compare UTC dates to avoid timezone issues
  const isMultipleDays =
    startDate.getUTCFullYear() !== endDate.getUTCFullYear() ||
    startDate.getUTCMonth() !== endDate.getUTCMonth() ||
    startDate.getUTCDate() !== endDate.getUTCDate()
  return isMultipleDays
}
