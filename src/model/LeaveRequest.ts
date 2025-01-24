export interface LeaveRequest {
  id: string
  userId: string
  userName: string
  userEmail: string
  userImage?: string
  startDate: string
  endDate: string
  status: 'requested' | 'approved' | 'rejected'
  totalDays: number
  leaveTypeStart: 'Full Day' | 'Morning' | 'Afternoon'
  leaveTypeEnd?: 'Full Day' | 'Morning' | 'Afternoon'
}
