'use client'

import React, { useState } from 'react'

interface ApprovalRequestModalProps {
  isOpen?: boolean
  reason: string
  onClose: () => void
  onApprove: () => void
  onDeny: () => void
  title?: string
}

const ApprovalRequestModal: React.FC<ApprovalRequestModalProps> = ({
  isOpen = true,
  reason,
  onClose,
  onApprove,
  onDeny,
  title = 'Approval Required'
}) => {
  const [isProcessing, setIsProcessing] = useState(false)

  const handleApprove = () => {
    setIsProcessing(true)
    onApprove()
    onClose()
  }

  const handleDeny = () => {
    setIsProcessing(true)
    onDeny()
    onClose()
  }

  const handleCancel = () => {
    setIsProcessing(true)
    onDeny()
    onClose()
  }

  if (!isOpen) return null

  return (
    // <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <h3 className="text-lg font-bold mb-3 text-primary">
          {title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-6">
          {reason}
        </p>

        <div className="flex gap-2">
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            className={`
              px-4 py-2 text-white border-none rounded text-sm font-bold flex-1
              ${isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 cursor-pointer'
              }
            `}
          >
            {isProcessing ? 'Processing...' : 'Approve'}
          </button>

          <button
            onClick={handleDeny}
            disabled={isProcessing}
            className={`
              px-4 py-2 text-white border-none rounded text-sm font-bold flex-1
              ${isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 cursor-pointer'
              }
            `}
          >
            {isProcessing ? 'Processing...' : 'Deny'}
          </button>

          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className={`
              px-4 py-2 text-white border-none rounded text-sm
              ${isProcessing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gray-500 hover:bg-gray-600 cursor-pointer'
              }
            `}
          >
            Cancel
          </button>
        </div>
      </div>
    // </div>
  )
}

export type { ApprovalRequestModalProps }
export { ApprovalRequestModal }
