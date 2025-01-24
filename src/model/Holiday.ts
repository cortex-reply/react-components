export interface Holiday {
  id: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: 'approved' | 'requested' | 'rejected'
  totalDays: number
  leaveTypeStart: 'Full Day' | 'Morning' | 'Afternoon'
  leaveTypeEnd?: 'Full Day' | 'Morning' | 'Afternoon'
}
