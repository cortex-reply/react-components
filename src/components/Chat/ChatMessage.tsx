import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { ChatCardTask } from './Components/ChatCardTask'
import { ChatCardArtefact } from './Components/ChatCardArtefact'

const tools = {
  task: ChatCardTask,
  // artefact: ChatCardArtefact,
}

const aiAvatarSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white" width="20" height="20">
  <path d="M327.5 85.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 128l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 128l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 64 426.8 7.5C425.1 3 420.8 0 416 0s-9.1 3-10.8 7.5L384 64 327.5 85.2zM205.1 73.3c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3L123.3 187.3 9.3 240C3.6 242.6 0 248.3 0 254.6s3.6 11.9 9.3 14.5l114.1 52.7L176 435.8c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l52.7-114.1 114.1-52.7c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5L257.8 187.4 205.1 73.3zM384 384l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L384 448l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L448 448l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L448 384l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L384 384z"/>
</svg>`;
const aiAvatar = `data:image/svg+xml;utf8,${encodeURIComponent(aiAvatarSvg)}`
interface ChatMessage {
  type: 'text' | 'image' | 'file' | 'code' | 'tool-invocation' | 'artifact' | 'forwarding'
  data?: { tool?: string; [key: string | number]: any }
}

export interface ChatMessageProps {
  id: string
  message: ChatMessage
  role: 'user' | 'assistant'
  currentUser?: {
    name?: string
    avatar?: string
  }
}

export const ChatMessage = React.memo(function ChatMessage(props: ChatMessageProps) {
  const { id, message, currentUser, role } = props
  const isUser = role === 'user'
  const userName = isUser ? currentUser?.name || 'You' : currentUser?.name || 'AI Assistant'
  const userAvatar = isUser
    ? currentUser?.avatar || '/placeholder-user.jpg'
    : '/placeholder.svg?height=40&width=40'

  switch (message.type) {
    case 'forwarding':
      return (
        <div
          key={id}
          className={`flex items-start gap-3 text-primary text-xs ${isUser ? 'flex-row-reverse' : ''}`}
        >
            Forwarding to {message?.data?.content}
         
        </div>
      )


    case 'text':
      return (
        <div
          key={id}
          className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >

{ isUser ? (
            <Avatar>
              <AvatarImage src={userAvatar} alt={userName} />
              <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>  
            </Avatar>
) : (
  <img src={aiAvatar} alt="AI Assistant" className="w-10 h-10" />
)}
          <div className={`grid gap-1.5 ${isUser ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{userName}</span>
            </div>

            <div
              className={`rounded-lg p-3 text-sm ${
                isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
              style={{ whiteSpace: 'pre-line' }}
            >
              {message?.data?.content}
            </div>
          </div>
        </div>
      )
    case 'image':
      return (
        <div
          key={id}
          className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
        >
          <Avatar className={!isUser ? 'ai-border' : ''}>
            <AvatarImage src={userAvatar} alt={userName} />
            <AvatarFallback>{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className={`grid gap-1.5 ${isUser ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2">
              <span className="font-medium">{userName}</span>
            </div>

            <img
              src={message?.data?.image}
              alt="User uploaded content"
              className={`rounded-lg p-3 text-sm ${
                isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>
      )
    case 'tool-invocation':
      if (message.data && message.data.tool) {
        // Dynamically render the tool component based on the tool name
        const ToolComponent = tools[message.data.tool as keyof typeof tools]
        if (ToolComponent) {
          return (
            <div className="mt-2">
              <ToolComponent data={message.data as any} />
            </div>
          )
        } else {
          console.warn(`Tool ${message.data.tool} is not defined.`)
          return <div className="mt-2">......</div>
        }
      }
  }

  //   return (
  //     <div
  //       key={message.id}
  //       className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : ""}`}
  //     >
  //       <Avatar className={!isUser ? "ai-border" : ""}>
  //         <AvatarImage src={userAvatar} alt={userName} />
  //         <AvatarFallback>
  //           {userName.substring(0, 2).toUpperCase()}
  //         </AvatarFallback>
  //       </Avatar>
  //       <div className={`grid gap-1.5 ${isUser ? "text-right" : ""}`}>
  //         <div className="flex items-center gap-2">
  //           <span className="font-medium">{userName}</span>
  //         </div>

  //         <div
  //           className={`rounded-lg p-3 text-sm ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
  //           style={{ whiteSpace: "pre-line" }}
  //         >
  //           {message.content}
  //         </div>

  //         {message.taskId && !message.artefact && (
  //           <div className="mt-2">
  //             <ChatCardTask id={message.taskId} fetchLatest={true} />
  //           </div>
  //         )}
  //         {message.taskId && message.artefact && (
  //           <div className="mt-2">
  //             <ChatCardArtefact artefact={message.artefact} taskId={message.taskId} />
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
})
