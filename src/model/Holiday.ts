export interface Holiday {
  id: string
  userId: string
  userName: string
  startDate: string
  endDate: string
  status: 'approved' | 'requested' | 'rejected'
  totalDays: number
  leaveType: 'Full Day' | 'Morning' | 'Afternoon'
}
