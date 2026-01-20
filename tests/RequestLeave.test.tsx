import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react'
import React from 'react'
import { RequestLeave } from '../src/components/Holidays/RequestLeave'

// Mock toast - use vi.hoisted to ensure mocks are available before vi.mock runs
const { mockToast, routerMock } = vi.hoisted(() => ({
  mockToast: {
    error: vi.fn(),
    success: vi.fn(),
  },
  routerMock: {
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  },
}))

vi.mock('sonner', () => ({
  toast: mockToast,
  Toaster: () => null,
}))

vi.mock('next/navigation', () => ({
  useRouter: () => routerMock,
}))


describe('RequestLeave', () => {
  const mockSubmit = vi.fn()
  const remainingDays = 10

  beforeEach(() => {
    mockSubmit.mockReset()
    // Default mock response - tests can override this
    mockSubmit.mockResolvedValue({ success: true, message: 'Leave submitted' })
    mockToast.error.mockReset()
    mockToast.success.mockReset()
    Object.values(routerMock).forEach(fn => {
      if (typeof fn === 'function' && 'mockReset' in fn) {
        fn.mockReset()
      }
    })
    vi.useRealTimers()
  })

  // Helper to select a date in the calendar popover
  const selectDate = async (labelText: string, dayNumber: number) => {
    // Find the label and its associated button (next sibling in the flex container)
    const label = screen.getByText(labelText)
    const container = label.closest('.flex.flex-col')!
    const button = within(container as HTMLElement).getByRole('button')
    
    fireEvent.click(button)
    
    // Wait for popover to open and find the day button
    const calendar = await screen.findByRole('grid')
    const dayButtons = within(calendar).getAllByRole('gridcell')
    
    // Find the day button that matches the day number AND is not from adjacent months
    // The 'day-outside' class is used by react-day-picker for adjacent month days
    const dayButton = dayButtons.find(btn => {
      if (btn.textContent !== String(dayNumber)) return false
      // The button inside the cell has the day-outside class
      const innerButton = btn.querySelector('button')
      if (innerButton && innerButton.classList.contains('day-outside')) return false
      // Also check the cell itself
      if (btn.classList.contains('day-outside')) return false
      return true
    })
    
    if (dayButton) {
      fireEvent.click(dayButton)
    }
  }

  it('submits correct UTC dates and verifies startDate and endDate are set correctly', async () => {
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 15, 12, 0, 0))) // June 15, 2024
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    // Select start date: June 10
    await selectDate('Start Date', 10)
    // Select end date: June 12
    await selectDate('End Date', 12)
    
    // Submit the form
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    
    const formData = mockSubmit.mock.calls[0][0] as FormData
    const startDateStr = formData.get('startDate') as string
    const endDateStr = formData.get('endDate') as string
    
    // Verify the dates are UTC midnight
    expect(startDateStr).toBe('2024-06-10T00:00:00.000Z')
    expect(endDateStr).toBe('2024-06-12T00:00:00.000Z')
    
    // Verify parsed dates
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    
    expect(startDate.getUTCFullYear()).toBe(2024)
    expect(startDate.getUTCMonth()).toBe(5) // June (0-indexed)
    expect(startDate.getUTCDate()).toBe(10)
    expect(startDate.getUTCHours()).toBe(0)
    expect(startDate.getUTCMinutes()).toBe(0)
    expect(startDate.getUTCSeconds()).toBe(0)
    
    expect(endDate.getUTCFullYear()).toBe(2024)
    expect(endDate.getUTCMonth()).toBe(5)
    expect(endDate.getUTCDate()).toBe(12)
    expect(endDate.getUTCHours()).toBe(0)
  })

  it('submits correct UTC dates regardless of local timezone offset', async () => {
    // Simulate a time that could cause date shift in certain timezones
    // e.g., UTC+12 at 23:00 UTC would be next day locally
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 15, 23, 0, 0)))
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    await selectDate('Start Date', 20)
    await selectDate('End Date', 22)
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    
    const formData = mockSubmit.mock.calls[0][0] as FormData
    const startDateStr = formData.get('startDate') as string
    const endDateStr = formData.get('endDate') as string
    
    // Dates should always be UTC midnight regardless of when submitted
    expect(startDateStr).toBe('2024-06-20T00:00:00.000Z')
    expect(endDateStr).toBe('2024-06-22T00:00:00.000Z')
  })

  it('resets fields after successful submit', async () => {
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 15, 12, 0, 0)))
    mockSubmit.mockResolvedValue({ success: true, message: 'Leave approved' })
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    await selectDate('Start Date', 5)
    await selectDate('End Date', 6)
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    await waitFor(() => expect(mockToast.success).toHaveBeenCalledWith('Leave approved'))
    
    // After successful submit, dates should be reset to "Pick a date"
    await waitFor(() => {
      expect(screen.getAllByText('Pick a date').length).toBeGreaterThanOrEqual(2)
    })
    expect(routerMock.refresh).toHaveBeenCalled()
  })

  it('shows error if total days exceed remaining days in current year', async () => {
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 15, 12, 0, 0)))
    
    render(<RequestLeave remainingDays={1} submitLeaveRequest={mockSubmit} />)
    
    // Select 3 days which exceeds remaining 1 day
    await selectDate('Start Date', 10)
    await selectDate('End Date', 12)
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockToast.error).toHaveBeenCalledWith('You do not have enough leave days remaining.')
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('submits correct leaveType and duration for half-day leave', async () => {
    // June 18, 2024 is a Tuesday (weekday) - using 20:00 UTC so it's still June 18 in UTC-8
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 18, 20, 0, 0)))
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    // The component initializes with today's date for both start and end (single day)
    // So we can directly select the leave type without changing dates
    
    // Select Morning leave type
    const morningButton = screen.getByRole('button', { name: /^morning$/i })
    fireEvent.click(morningButton)
    
    // Wait for the total days to update to 0.5
    await waitFor(() => {
      expect(screen.getByText(/total days:/i).textContent).toContain('0.5')
    })
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    
    const formData = mockSubmit.mock.calls[0][0] as FormData
    expect(formData.get('leaveType')).toBe('Morning')
    expect(formData.get('duration')).toBe('0.5')
  })

  it('displays correct total days calculation', async () => {
    // June 18, 2024 is a Tuesday (weekday) - using 20:00 UTC so it's still June 18 in UTC-8
    vi.setSystemTime(new Date(Date.UTC(2024, 5, 18, 20, 0, 0)))
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    // Initially shows 1 day (today to today)
    await waitFor(() => {
      expect(screen.getByText(/total days:/i).textContent).toContain('1')
    })
    
    // Select a 3-day range (Tue 18 to Thu 20 = 3 working days)
    await selectDate('Start Date', 18)
    await selectDate('End Date', 20)
    
    // Should show 3 days
    await waitFor(() => {
      expect(screen.getByText(/total days:/i).textContent).toContain('3')
    })
  })

  it('submits correct UTC dates when user timezone is ahead of system (user: 2026-01-11 01:00, system: 2026-01-10 19:00 UTC)', async () => {
    // To properly test timezone differences, we need to set the TZ environment variable
    // This test documents the expected behavior when a user in UTC+6 selects a date
    // 
    // Scenario:
    // - System UTC time: 2026-01-10 19:00 UTC
    // - User in UTC+6 sees: 2026-01-11 01:00 local time
    // - User selects January 30, 2026 in the calendar
    // - Expected: The submitted date should be 2026-01-30T00:00:00.000Z
    //
    // Note: vi.setSystemTime() only changes the clock, not the timezone.
    // To run this test with a real timezone offset, use:
    //   TZ='Asia/Dhaka' pnpm vitest run tests/RequestLeave.test.tsx
    
    // Store original timezone
    const originalTZ = process.env.TZ
    
    // Set timezone to UTC+6 (e.g., Bangladesh/Dhaka)
    process.env.TZ = 'Asia/Dhaka'
    
    // Set system time to 2026-01-10 19:00 UTC (which is 2026-01-11 01:00 in UTC+6)
    vi.setSystemTime(new Date(Date.UTC(2026, 0, 10, 19, 0, 0)))
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    // User selects January 30, 2026 for both start and end (single day)
    await selectDate('Start Date', 30)
    await selectDate('End Date', 30)
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    
    const formData = mockSubmit.mock.calls[0][0] as FormData
    const startDateStr = formData.get('startDate') as string
    const endDateStr = formData.get('endDate') as string
    
    // Both dates should be 2026-01-30 at UTC midnight
    expect(startDateStr).toBe('2026-01-30T00:00:00.000Z')
    expect(endDateStr).toBe('2026-01-30T00:00:00.000Z')
    
    // Verify the dates are correct
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    
    expect(startDate.getUTCFullYear()).toBe(2026)
    expect(startDate.getUTCMonth()).toBe(0) // January (0-indexed)
    expect(startDate.getUTCDate()).toBe(30)
    expect(startDate.getUTCHours()).toBe(0)
    expect(startDate.getUTCMinutes()).toBe(0)
    expect(startDate.getUTCSeconds()).toBe(0)
    
    expect(endDate.getUTCFullYear()).toBe(2026)
    expect(endDate.getUTCMonth()).toBe(0)
    expect(endDate.getUTCDate()).toBe(30)
    expect(endDate.getUTCHours()).toBe(0)
    
    // Restore original timezone
    process.env.TZ = originalTZ
  })

  it('submits correct UTC dates when user timezone is behind system (user: 2026-01-13 16:00, system: 2026-01-14 00:00 UTC)', async () => {
    // Scenario:
    // - System UTC time: 2026-01-14 00:00 UTC (midnight, start of new day - Wednesday)
    // - User in UTC-8 (US Pacific) sees: 2026-01-13 16:00 local time (still Tuesday)
    // - User selects January 22, 2026 (Thursday) in the calendar
    // - Expected: The submitted date should be 2026-01-22T00:00:00.000Z
    //
    // This tests that when the user's local day is BEHIND UTC, the correct date is submitted.
    // To run this test with a real timezone offset, use:
    //   TZ='America/Los_Angeles' pnpm vitest run tests/RequestLeave.test.tsx
    
    // Store original timezone
    const originalTZ = process.env.TZ
    
    // Set timezone to UTC-8 (e.g., US Pacific / Los Angeles)
    process.env.TZ = 'America/Los_Angeles'
    
    // Set system time to 2026-01-14 00:00 UTC (which is 2026-01-13 16:00 in UTC-8, a Tuesday)
    vi.setSystemTime(new Date(Date.UTC(2026, 0, 14, 0, 0, 0)))
    
    render(<RequestLeave remainingDays={remainingDays} submitLeaveRequest={mockSubmit} />)
    
    // User selects January 22, 2026 (Thursday) for both start and end (single day)
    await selectDate('Start Date', 22)
    await selectDate('End Date', 22)
    
    // Wait for calendar to close and totalDays to update
    await waitFor(() => {
      expect(screen.getByText(/total days:/i).textContent).toContain('1')
    })
    
    const submitButton = screen.getByRole('button', { name: /submit request/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => expect(mockSubmit).toHaveBeenCalled())
    
    const formData = mockSubmit.mock.calls[0][0] as FormData
    const startDateStr = formData.get('startDate') as string
    const endDateStr = formData.get('endDate') as string
    
    // Both dates should be 2026-01-22 at UTC midnight
    expect(startDateStr).toBe('2026-01-22T00:00:00.000Z')
    expect(endDateStr).toBe('2026-01-22T00:00:00.000Z')
    
    // Verify the dates are correct
    const startDate = new Date(startDateStr)
    const endDate = new Date(endDateStr)
    
    expect(startDate.getUTCFullYear()).toBe(2026)
    expect(startDate.getUTCMonth()).toBe(0) // January (0-indexed)
    expect(startDate.getUTCDate()).toBe(22)
    expect(startDate.getUTCHours()).toBe(0)
    expect(startDate.getUTCMinutes()).toBe(0)
    expect(startDate.getUTCSeconds()).toBe(0)
    
    expect(endDate.getUTCFullYear()).toBe(2026)
    expect(endDate.getUTCMonth()).toBe(0)
    expect(endDate.getUTCDate()).toBe(22)
    expect(endDate.getUTCHours()).toBe(0)
    
    // Restore original timezone
    process.env.TZ = originalTZ
  })
})