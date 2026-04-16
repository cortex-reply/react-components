import { useState } from 'react';
import { Send, Bot, Users, Plus, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  mode: 'copilot' | 'teams';
  onModeChange: (mode: 'copilot' | 'teams') => void;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant' | 'team';
  timestamp: Date;
  senderName?: string;
}

interface ChatSession {
  id: string;
  name: string;
  messages: Message[];
  mode: 'copilot' | 'teams';
  selectedTeam?: string;
}

const TEAMS = [
  { id: 'it', name: 'IT', color: 'bg-blue-600' },
  { id: 'hr', name: 'HR', color: 'bg-green-600' },
  { id: 'marketing', name: 'Marketing', color: 'bg-purple-600' },
  { id: 'finance', name: 'Finance', color: 'bg-orange-600' },
  { id: 'operations', name: 'Operations', color: 'bg-red-600' },
  { id: 'sales', name: 'Sales', color: 'bg-indigo-600' },
];

export const ChatInterface = ({ mode, onModeChange }: ChatInterfaceProps) => {
  const [message, setMessage] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('it');
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(false);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([
    {
      id: '1',
      name: 'General Chat',
      mode: 'copilot',
      messages: [
        {
          id: '1',
          content: 'Hello! I\'m your AI assistant. How can I help you today?',
          sender: 'assistant',
          timestamp: new Date(),
        },
      ],
    },
  ]);
  const [activeChat, setActiveChat] = useState('1');

  const currentChat = chatSessions.find(chat => chat.id === activeChat);
  const selectedTeamInfo = TEAMS.find(team => team.id === selectedTeam);

  const createNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: ChatSession = {
      id: newChatId,
      name: `${mode === 'copilot' ? 'AI Chat' : selectedTeamInfo?.name + ' Chat'} ${chatSessions.length + 1}`,
      mode,
      selectedTeam: mode === 'teams' ? selectedTeam : undefined,
      messages: [
        {
          id: '1',
          content: mode === 'copilot' 
            ? 'Hello! I\'m your AI assistant. How can I help you today?'
            : `Welcome to ${selectedTeamInfo?.name} team chat!`,
          sender: mode === 'copilot' ? 'assistant' : 'team',
          timestamp: new Date(),
          senderName: mode === 'teams' ? `${selectedTeamInfo?.name} Bot` : undefined,
        },
      ],
    };
    
    setChatSessions([...chatSessions, newChat]);
    setActiveChat(newChatId);
  };

  const deleteChat = (chatId: string) => {
    if (chatSessions.length === 1) return;
    
    const updatedChats = chatSessions.filter(chat => chat.id !== chatId);
    setChatSessions(updatedChats);
    
    if (activeChat === chatId) {
      setActiveChat(updatedChats[0].id);
    }
  };

  const handleSend = () => {
    if (!message.trim() || !currentChat) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };

    const updatedMessages = [...currentChat.messages, newMessage];
    
    setChatSessions(chatSessions.map(chat => 
      chat.id === activeChat 
        ? { ...chat, messages: updatedMessages }
        : chat
    ));
    
    setMessage('');

    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: currentChat.mode === 'copilot' 
          ? 'I understand your request. Let me help you with that.'
          : `Message sent to ${selectedTeamInfo?.name} team channel.`,
        sender: currentChat.mode === 'copilot' ? 'assistant' : 'team',
        timestamp: new Date(),
        senderName: currentChat.mode === 'teams' ? `${selectedTeamInfo?.name} Bot` : undefined,
      };
      
      setChatSessions(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [...chat.messages, response] }
          : chat
      ));
    }, 1000);
  };

  const handleModeChange = (newMode: 'copilot' | 'teams') => {
    onModeChange(newMode);
    if (currentChat) {
      setChatSessions(chatSessions.map(chat => 
        chat.id === activeChat 
          ? { ...chat, mode: newMode, selectedTeam: newMode === 'teams' ? selectedTeam : undefined }
          : chat
      ));
    }
  };

  return (
    <Card className="h-full flex shadow-lg border-0 bg-white/50 backdrop-blur-sm relative overflow-hidden">
      {/* Left Sidebar - Chat Sessions - completely hidden on mobile when closed */}
      <div className={`
        w-64 border-r bg-gradient-to-b from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 flex flex-col
        transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:flex
        ${isLeftSidebarOpen 
          ? 'translate-x-0 absolute left-0 top-0 bottom-0 z-40 shadow-xl' 
          : '-translate-x-full absolute left-0 top-0 bottom-0 lg:translate-x-0 lg:static lg:flex'
        }
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex justify-end p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLeftSidebarOpen(false)}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Sidebar Header */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between mb-4">
            <div className="flex rounded-lg bg-white dark:bg-slate-800 p-1">
              <Button
                variant={mode === 'copilot' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleModeChange('copilot')}
                className={cn(
                  'flex items-center space-x-2 text-xs',
                  mode === 'copilot' && 'bg-blue-600 text-white'
                )}
              >
                <Bot className="h-3 w-3" />
                <span>Copilot</span>
              </Button>
              <Button
                variant={mode === 'teams' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleModeChange('teams')}
                className={cn(
                  'flex items-center space-x-2 text-xs',
                  mode === 'teams' && 'bg-purple-600 text-white'
                )}
              >
                <Users className="h-3 w-3" />
                <span>Teams</span>
              </Button>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={createNewChat}
            className="w-full flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>

        {/* Chat Sessions List */}
        <ScrollArea className="flex-1 p-2">
          <div className="space-y-1">
            {chatSessions.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChat(chat.id)}
                className={cn(
                  'group relative p-3 rounded-lg cursor-pointer transition-colors text-sm',
                  activeChat === chat.id
                    ? 'bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 shadow-sm'
                    : 'hover:bg-white/60 dark:hover:bg-slate-800/60 text-gray-700 dark:text-gray-300'
                )}
              >
                <div className="truncate pr-6">{chat.name}</div>
                {chatSessions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteChat(chat.id);
                    }}
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Mobile Overlay for Left Sidebar */}
      {isLeftSidebarOpen && (
        <div 
          className="lg:hidden absolute inset-0 bg-black/50 z-30"
          onClick={() => setIsLeftSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
          <div className="flex items-center justify-between">
            {/* Mobile Left Sidebar Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
              className="lg:hidden mr-2"
            >
              <Menu className="h-4 w-4" />
            </Button>
            
            <Badge variant="outline" className="bg-white/80">
              {mode === 'copilot' ? 'AI Assistant' : `${selectedTeamInfo?.name} Chat`}
            </Badge>
          </div>
          
          {mode === 'teams' && (
            <div className="flex gap-2 pt-3 flex-wrap">
              {TEAMS.map((team) => (
                <Button
                  key={team.id}
                  variant={selectedTeam === team.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedTeam(team.id)}
                  className={cn(
                    'flex items-center space-x-2 text-xs',
                    selectedTeam === team.id && `${team.color} text-white hover:${team.color}/90`
                  )}
                >
                  <div className={`w-2 h-2 rounded-full ${selectedTeam === team.id ? 'bg-white' : team.color}`} />
                  <span>{team.name}</span>
                </Button>
              ))}
            </div>
          )}
        </CardHeader>

        {/* Chat Messages */}
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {currentChat?.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex',
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      'max-w-xs lg:max-w-md px-4 py-2 rounded-lg',
                      msg.sender === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
                    )}
                  >
                    {msg.senderName && (
                      <p className="text-xs font-medium mb-1 opacity-70">
                        {msg.senderName}
                      </p>
                    )}
                    <p className="text-sm">{msg.content}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Message Input */}
          <div className="p-6 border-t bg-gray-50/50 dark:bg-gray-900/50">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={`Message ${mode === 'copilot' ? 'AI Assistant' : selectedTeamInfo?.name}...`}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
