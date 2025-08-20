// tool-requestEndpointLogin

import React from "react"
import { OAuthModal } from "../Components/Oauth"
import { set } from "date-fns"

interface TaskToolPart {
  type: string
  state: 'input-available' | 'output-available' | 'output-error'
  input?: any
  output?: any
  errorText?: string
}

interface ChatTaskToolRendererProps {
  toolPart: TaskToolPart
  index: number
  addToolResult: (toolCallId: string, tool: string, output: any) => void
}

export const PartAuthenticateTool: React.FC<ChatTaskToolRendererProps> = ({ 
  toolPart, 
  index,
  addToolResult,
}) => {
  const [open, setOpen] = React.useState(true)
  const handleOAuthSuccess = () => {
    addToolResult(toolPart.input?.toolCallId, toolPart.input?.tool, "Authentication completed")
    setOpen(false)
  }



  switch (toolPart.state) {
    
    case 'input-available':
      return (
        <div key={index} className="mb-2">
          <OAuthModal
            isOpen={open}
            authUrl={toolPart.input?.url || toolPart.input?.authUrl}
            onClose={() => setOpen(false)}
            onSuccess={handleOAuthSuccess}
            description={toolPart.output?.reason || toolPart.input?.reason}
          />
          { !open && (
            <div className="flex items-center justify-center mt-3">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 text-green-800 text-sm font-medium border border-green-200">
                <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Authentication completed
              </div>
            </div>
          )}
        </div>
      )
        
    case 'output-error':
      return (
        <div key={index} className="text-sm text-red-500">
          Error: {toolPart.errorText}
        </div>
      )
    
    default:
      return null
  }
}