import { bankHolidays } from '@/lib/utils/BankHolidays'
import { getTotalDaysBetween, isDayOff, getIsMultipleDays } from '@/lib/utils/DaysUtil'
import { describe, expect, test } from 'vitest'

describe('DaysUtil', () => {
  describe('isDayOff', () => {
    test('returns true for weekends (Saturday & Sunday)', () => {
      expect(isDayOff(new Date(2025, 3, 19))).toBe(true) // Saturday, 19 April 2025
      expect(isDayOff(new Date(2025, 3, 20))).toBe(true) // Sunday, 20 April 2025
      expect(isDayOff(new Date(2025, 3, 26))).toBe(true) // Saturday, 26 April 2025
      expect(isDayOff(new Date(2025, 3, 27))).toBe(true) // Sunday, 27 April 2025
    })

    test('returns true for bank holidays', () => {
      bankHolidays.forEach(({ date }) => {
        expect(isDayOff(date)).toBe(true)
      })
    })

    test("returns false for a regular weekday that's not a bank holiday", () => {
      expect(isDayOff(new Date(2025, 3, 22))).toBe(false) // Tuesday, 22 April 2025 (Not a holiday)
      expect(isDayOff(new Date(2025, 3, 25))).toBe(false) // Friday, 23 April 2025 (Not a holiday)
    })
  })

  describe('getTotalDaysBetween', () => {
    test('returns half day', () => {
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 3), true)).toBe(0.5)
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 3), false)).toBe(1)
      expect(getTotalDaysBetween(new Date(2025, 1, 15), new Date(2025, 1, 15), true)).toBe(0) // weekend
    })

    test('returns correct number days off excluding weekend', () => {
      expect(getTotalDaysBetween(new Date(2025, 0, 3), new Date(2025, 0, 9))).toBe(5)
      expect(getTotalDaysBetween(new Date(2025, 2, 3), new Date(2025, 2, 14))).toBe(10)
    })

    test('returns correct number days off excluding bank holidays and weekend', () => {
      expect(getTotalDaysBetween(new Date(2025, 3, 17), new Date(2025, 3, 24))).toBe(4) // easter weekend
      expect(getTotalDaysBetween(new Date(2025, 2, 3), new Date(2025, 2, 14))).toBe(10)
    })
  })

  describe('isMultipleDays', () => {
    test('returns false for same date', () => {
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 3))).toBe(false)
    })

    test('returns true for different dates', () => {
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 4))).toBe(true)
      expect(getIsMultipleDays(new Date(2025, 0, 3), new Date(2025, 0, 5))).toBe(true)
    })

    test('returns false for undefined dates', () => {
      expect(getIsMultipleDays(undefined, undefined)).toBe(false)
      expect(getIsMultipleDays(new Date(2025, 0, 3), undefined)).toBe(false)
      expect(getIsMultipleDays(undefined, new Date(2025, 0, 3))).toBe(false)
    })
  })
})
