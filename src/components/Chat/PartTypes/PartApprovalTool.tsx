// tool-requestEndpointLogin

import React from "react"
import { ApprovalRequestModal } from "../Components/ApprovalRequest"
import { set } from "date-fns"

interface TaskToolPart {
  type: string
  toolCallId: string
  state: 'input-available' | 'output-available' | 'output-error'
  input?: any
  output?: any
  errorText?: string
}

interface ChatTaskToolRendererProps {
  toolPart: TaskToolPart
  index: string | number
  addToolResult: (toolCallId: string, tool: string, output: any) => void
}

export const PartApprovalTool: React.FC<ChatTaskToolRendererProps> = ({ 
  toolPart, 
  index,
  addToolResult,
}) => {
  const [open, setOpen] = React.useState(true)
  const [action, setAction] = React.useState<'approve' | 'deny' | null>(null)
  const handleApprove = () => {
    addToolResult(toolPart.toolCallId, toolPart.type, "Approved")
    setOpen(false)
    setAction('approve')
  }
  const handleDeny = () => {
    addToolResult(toolPart.toolCallId, toolPart.type, "Denied")
    setOpen(false)
    setAction('deny')
  }



  switch (toolPart.state) {
    
    case 'input-available':
      return (
        <div key={index} className="mb-2">
          <ApprovalRequestModal
            isOpen={open}
            onApprove={handleApprove}
            onDeny={handleDeny}
            onClose={() => setOpen(false)}
            title={toolPart.input?.title || "Approval Required"}
            reason={toolPart.output?.reason || toolPart.input?.reason}
          />
          { !open && (
            <>
              { action === 'approve' && (
                <div className="flex items-center justify-center mt-3">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium border border-green-200">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approved
                  </div>
                </div>
              )}
              { action === 'deny' && (
                <div className="flex items-center justify-center mt-3">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium border border-red-200">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Denied
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )
        
    case 'output-error':
      return (
        <div key={index} className="text-sm text-red-500">
          Error: {toolPart.errorText}
        </div>
      )

    case 'output-available':
      return (
        <>
              { toolPart.output === 'approve' && (
                <div className="flex items-center justify-center mt-3">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium border border-green-200">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approved
                  </div>
                </div>
              )}
              { toolPart.output === 'deny' && (
                <div className="flex items-center justify-center mt-3">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-100 text-red-800 text-sm font-medium border border-red-200">
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Denied
                  </div>
                </div>
              )}
            </>
      )
    
    default:
      return null
  }
}