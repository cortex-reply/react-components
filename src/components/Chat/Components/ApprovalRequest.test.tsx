import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ApprovalRequestModal } from './ApprovalRequest'

describe('ApprovalRequestModal', () => {
  const mockProps = {
    reason: 'Test approval reason',
    onClose: vi.fn(),
    onApprove: vi.fn(),
    onDeny: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders when isOpen is true', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={true} />)
    
    expect(screen.getByText('Approval Required')).toBeTruthy()
    expect(screen.getByText('Test approval reason')).toBeTruthy()
  })

  it('does not render when isOpen is false', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={false} />)
    
    expect(screen.queryByText('Approval Required')).toBeNull()
  })

  it('displays custom title when provided', () => {
    render(<ApprovalRequestModal {...mockProps} title="Custom Title" isOpen={true} />)
    
    expect(screen.getByText('Custom Title')).toBeTruthy()
  })

  it('calls onApprove and onClose when Approve button is clicked', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={true} />)
    
    const approveButton = screen.getByText('Approve')
    fireEvent.click(approveButton)
    
    expect(mockProps.onApprove).toHaveBeenCalledTimes(1)
    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onDeny and onClose when Deny button is clicked', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={true} />)
    
    const denyButton = screen.getByText('Deny')
    fireEvent.click(denyButton)
    
    expect(mockProps.onDeny).toHaveBeenCalledTimes(1)
    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Cancel button is clicked', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={true} />)
    
    const cancelButton = screen.getByText('Cancel')
    fireEvent.click(cancelButton)
    
    expect(mockProps.onClose).toHaveBeenCalledTimes(1)
    expect(mockProps.onApprove).not.toHaveBeenCalled()
    expect(mockProps.onDeny).not.toHaveBeenCalled()
  })

  it('disables buttons when processing', () => {
    render(<ApprovalRequestModal {...mockProps} isOpen={true} />)
    
    const approveButton = screen.getByText('Approve')
    fireEvent.click(approveButton)
    
    // After clicking, buttons should be disabled
    expect(screen.getByText('Processing...')).toBeTruthy()
  })

  it('displays the reason text correctly', () => {
    const longReason = 'This is a very long reason that explains why approval is needed for this specific action that the user is about to perform.'
    render(<ApprovalRequestModal {...mockProps} reason={longReason} isOpen={true} />)
    
    expect(screen.getByText(longReason)).toBeTruthy()
  })
})
