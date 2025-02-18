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
  leaveType: 'Full Day' | 'Morning' | 'Afternoon'
}
