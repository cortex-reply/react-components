'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Toaster, toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LeaveRequest } from '../../model/LeaveRequest'

interface ApproveLeaveProps {
  leaveRequests: LeaveRequest[]
  onApprove: (ids: string[]) => Promise<{ success: boolean; message: string }>
  onReject: (ids: string[]) => Promise<{ success: boolean; message: string }>
}

export function ApproveLeave({ leaveRequests, onApprove, onReject }: ApproveLeaveProps) {
  const [selectedRequests, setSelectedRequests] = useState<string[]>([])
  const router = useRouter()

  const handleSelectAll = () => {
    if (selectedRequests.length === leaveRequests.length) {
      setSelectedRequests([])
    } else {
      setSelectedRequests(leaveRequests.map((request) => request.id))
    }
  }

  const handleSelect = (id: string) => {
    setSelectedRequests((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id],
    )
  }

  const handleApprove = async () => {
    const result = await onApprove(selectedRequests)
    if (result.success) {
      toast.success(result.message)

      router.refresh() // Refresh the page to show updated data
    } else {
      toast.error(`Error: ${result.message}`)
    }
    setSelectedRequests([])
  }

  const handleReject = async () => {
    const result = await onReject(selectedRequests)
    if (result.success) {
      toast.success(result.message)
      router.refresh() // Refresh the page to show updated data
    } else {
      toast.error(`Error: ${result.message}`)
    }
    setSelectedRequests([])
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Approve Leave Requests</h2>
        <div className="space-x-2">
          <Button
            onClick={handleApprove}
            disabled={selectedRequests.length === 0}
            variant="default"
          >
            Approve Selected
          </Button>
          <Button
            onClick={handleReject}
            disabled={selectedRequests.length === 0}
            variant="destructive"
          >
            Reject Selected
          </Button>
        </div>
      </div>
      <div className="overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          <li className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Checkbox
                  id="select-all"
                  checked={selectedRequests.length === leaveRequests.length}
                  onCheckedChange={handleSelectAll}
                  className="border-accent"
                />
                <label htmlFor="select-all" className="ml-2 text-sm font-medium text-foreground">
                  Select All
                </label>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {selectedRequests.length} of {leaveRequests.length} selected
              </span>
            </div>
          </li>
          {leaveRequests.map((request) => (
            <li key={request.id} className="px-4 py-4 sm:px-6 group hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id={`select-${request.id}`}
                    checked={selectedRequests.includes(request.id)}
                    onCheckedChange={() => handleSelect(request.id)}
                    className="border-accent"
                  />
                  <div className="ml-3 flex items-center">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={request.userImage} alt={request.userName} />
                      <AvatarFallback>
                        {request.userName
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent">
                        {request.userName}
                      </p>
                      {/* <p className="text-sm text-gray-500">{request.userEmail}</p> */}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">
                    {new Date(request.startDate).toLocaleDateString()}
                    {request.startDate !== request.endDate &&
                      ` - ${new Date(request.endDate).toLocaleDateString()}`}
                    {request.leaveType != 'Full Day' && ` (${request.leaveType})`}
                    {` - ${request.totalDays} day${request.totalDays !== 1 ? 's' : ''}`}
                  </span>
                  <Badge
                    variant={
                      request.status === 'approved'
                        ? 'default'
                        : request.status === 'rejected'
                          ? 'destructive'
                          : 'secondary'
                    }
                  >
                    {request.status}
                  </Badge>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Toaster richColors position="top-right" closeButton visibleToasts={9} className="z-50" />
    </div>
  )
}
