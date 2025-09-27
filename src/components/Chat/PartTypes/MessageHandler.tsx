import {
  PartAuthenticateTool,
  PartText,
  PartApprovalTool,
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
  Tool,
  ToolHeader,
  ToolContent,
  ToolInput,
  ToolOutput,
  Response,
} from '.'

import {
  Send,
  Bot,
  User,
  Menu,
  Upload,
  Paperclip,
  X,
  FileText,
  Image as ImageIcon,
  File,
  Download,
  ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ChatCardTask } from '../Components/ChatCardTask'
import { ChatCardArtefact } from '../Components/ChatCardArtefact'
import { type UIMessage } from 'ai'
import { render } from '@testing-library/react'

const getFileIcon = (type: string) => {
  if (type.startsWith('image/')) return <ImageIcon className="h-4 w-4" />
  if (type.startsWith('text/')) return <FileText className="h-4 w-4" />
  return <File className="h-4 w-4" />
}

interface ChatInterfaceProps {
  messages: UIMessage[]
  addToolResult?: (toolCallId: string, tool: string, output: any) => void
  status: 'submitted' | 'streaming' | 'ready' | 'error'
  message: UIMessage
}

export const messageHandler = ({
  message,
  addToolResult,
  status,
  messages,
}: ChatInterfaceProps) => {
return(
  message.parts.map((part, key) => {
    if (part.type === 'text') {
      return <Response key={`${key}`}>{part.text}</Response>
    }

    // Handle file parts
    if (part.type === 'file') {
      const filePart = part as any
      return (
        <div key={key} className="mb-2 p-2 bg-background/50 rounded-lg">
          <div className="flex items-center gap-2">
            {getFileIcon(filePart.mediaType || 'application/octet-stream')}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {filePart.filename || filePart.url?.split('/').pop() || 'File'}
              </p>
              {/* {filePart.size && (
                        <p className="text-xs opacity-70">{formatFileSize(filePart.size)}</p>
                      )}
                      {filePart.mimeType && (
                        <p className="text-xs opacity-70">{filePart.mimeType}</p>
                      )} */}
            </div>
            {filePart.url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(filePart.url, '_blank')}
                className="h-8 w-8 p-0"
              >
                <Download className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )
    }

    // Handle tool parts (following AI SDK v5 pattern)
    if (part.type.startsWith('tool-')) {
      const toolPart = part as any
      const toolName = part.type.replace('tool-', '')

      // Handle task tool
      if (toolName === 'task') {
        switch (toolPart.state) {
          case 'input-available':
            return (
              <div key={key} className="text-sm opacity-70">
                Loading task...
              </div>
            )
          case 'output-available':
            return (
              <div key={key} className="mb-2">
                <ChatCardTask
                  data={{
                    id: toolPart.output?.id || toolPart.input?.id,
                    fetchLatest: false,
                    taskData: toolPart.output || toolPart.input,
                  }}
                />
              </div>
            )
          case 'output-error':
            return (
              <div key={key} className="text-sm text-red-500">
                Error: {toolPart.errorText}
              </div>
            )
          default:
            return null
        }
      }

      if (part.type === 'tool-requestEndpointLogin') {
        return (
          <div key={key} className="mb-2">
            <PartAuthenticateTool
              toolPart={toolPart}
              index={key}
              addToolResult={addToolResult ?? (() => {})}
            />
          </div>
        )
      }
      if (part.type === 'tool-authenticate') {
        return (
          <div key={key} className="mb-2">
            <PartAuthenticateTool
              toolPart={toolPart}
              index={key}
              addToolResult={addToolResult ?? (() => {})}
            />
          </div>
        )
      }
      if (part.type === 'tool-requestApproval') {
        return (
          <div key={key} className="mb-2">
            <PartApprovalTool
              toolPart={toolPart}
              index={key}
              addToolResult={addToolResult ?? (() => {})}
            />
          </div>
        )
      }

      // Handle artefact tool
      if (toolName === 'artefact') {
        switch (toolPart.state) {
          case 'input-available':
            return (
              <div key={key} className="text-sm opacity-70">
                Loading artefact...
              </div>
            )
          case 'output-available':
            return (
              <div key={key} className="mb-2">
                <ChatCardArtefact
                  artefact={toolPart.output?.description || ''}
                  taskId={toolPart.output?.id || toolPart.input?.id}
                  taskData={toolPart.output || toolPart.input}
                />
              </div>
            )
          case 'output-error':
            return (
              <div key={key} className="text-sm text-red-500">
                Error: {toolPart.errorText}
              </div>
            )
          default:
            return null
        }
      }

      // Generic tool handling
      return (
        <div key={key} className="mb-2">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">{toolName}</CardTitle>
            </CardHeader>
            <CardContent>
              {toolPart.state === 'input-available' && (
                <p className="text-sm">Processing {toolName}...</p>
              )}
              {toolPart.state === 'output-available' && (
                <pre className="text-sm">{JSON.stringify(toolPart.output, null, 2)}</pre>
              )}
              {toolPart.state === 'output-error' && (
                <p className="text-sm text-red-500">Error: {toolPart.errorText}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )
    }

    // Handle custom data parts (for cards, references, menus, etc.)
    if (part.type.startsWith('data-')) {
      const dataPart = part as any
      const dataType = part.type.replace('data-', '')

      if (dataType === 'reference') {
        return (
          <div key={key} className="mb-2">
            <Card className="w-full">
              <CardContent className="p-4">
                <div className="space-y-2">
                  {dataPart.data?.references?.map((ref: any, refIndex: number) => (
                    <div
                      key={refIndex}
                      className="flex items-center gap-2 p-2 rounded-md bg-muted/50"
                    >
                      <Badge variant="outline">{ref.type || 'link'}</Badge>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{ref.title}</p>
                        {ref.description && (
                          <p className="text-xs text-muted-foreground truncate">
                            {ref.description}
                          </p>
                        )}
                      </div>
                      {ref.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(ref.url, '_blank')}
                          className="h-8 w-8 p-0"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }

      if (dataType === 'menu') {
        return (
          <div key={key} className="mb-2">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-lg">{dataPart.data?.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {dataPart.data?.items?.map((item: any, itemIndex: number) => (
                    <Button
                      key={itemIndex}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={item.action}
                    >
                      <div className="text-left">
                        <p className="font-medium">{item.label}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      }

      // Generic data part handling
      return (
        <div key={key} className="mb-2">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-lg">{dataType}</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="text-sm">{JSON.stringify(dataPart.data, null, 2)}</pre>
            </CardContent>
          </Card>
        </div>
      )
    }

    if (part.type === 'reasoning') {
      return (
        <Reasoning
          key={`${key}`}
          className="w-full"
          isStreaming={
            status === 'streaming' &&
            key === message.parts.length - 1 &&
            message.id === messages.at(-1)?.id
          }
        >
          <ReasoningTrigger />
          <ReasoningContent>{part.text}</ReasoningContent>
        </Reasoning>
      )
    }

    if (part.type === 'dynamic-tool') {
      return (
        <Tool defaultOpen={true} key={`${message.id}-${key}`}>
          <ToolHeader type={`tool-${part.toolName}`} state={part.state} />
          <ToolContent>
            <ToolInput input={part.input} />
            <ToolOutput
              // output={<Response>{String(part.output)}</Response>}
              output={part.output}
              errorText={part.errorText}
            />
          </ToolContent>
        </Tool>
      )
    }
    return <>Unknown part type: {part.type}</>
  })
)
 
}
