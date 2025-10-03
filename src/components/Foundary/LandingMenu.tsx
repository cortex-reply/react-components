'use client'

import { motion, AnimatePresence } from 'motion/react'
import { Bot, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/Payload/Logo'
import { cn } from '../../utils'

export interface WorkspaceChoice {
  id: string
  title: string
  description: string
  icon: React.ReactNode
  color: string
  gradient: string
  url?: string
  onClick?: () => void
}

export interface LandingMenuProps {
  /**
   * Custom class name for the landing menu container
   */
  className?: string
  /**
   * Welcome title text
   */
  welcomeTitle?: string
  /**
   * Welcome subtitle text
   */
  welcomeSubtitle?: string
  /**
   * Logo source URL
   */
  logoSrc?: string
  /**
   * Logo alt text
   */
  logoAlt?: string
  /**
   * Workspace choice options
   */
  workspaceChoices?: WorkspaceChoice[]
}

const defaultWorkspaceChoices: WorkspaceChoice[] = [
  {
    id: 'ava',
    title: 'Chat with Ava',
    description: 'Start a conversation with our digital assistant for instant help and guidance.',
    icon: <Bot className="h-12 w-12" />,
    color: 'text-purple-600',
    gradient: 'from-purple-500 to-blue-600',
    url: '/chat/ava'
  },
  {
    id: 'team',
    title: 'Collaborate with Team',
    description: 'Work together with your colleagues on projects and share knowledge.',
    icon: <Users className="h-12 w-12" />,
    color: 'text-blue-600',
    gradient: 'from-blue-500 to-green-600',
    url: '/workspace/team'
  }
]

export function LandingMenu({ 
  className,
  welcomeTitle = "Welcome to Cortex",
  welcomeSubtitle = "Choose how you'd like to get started",
  logoSrc = "/logo.png",
  logoAlt = "Cortex Logo",
  workspaceChoices = defaultWorkspaceChoices
}: LandingMenuProps) {
  const handleWorkspaceChoice = (choice: WorkspaceChoice) => {
    // Handle custom onClick callback first
    if (choice.onClick) {
      choice.onClick()
      return
    }
    
    // Handle URL redirection
    if (choice.url) {
      if (choice.url.startsWith('http://') || choice.url.startsWith('https://')) {
        // External URL
        window.open(choice.url, '_blank')
      } else {
        // Internal navigation
        window.location.href = choice.url
      }
    } else {
      // Fallback - just log for demo
      console.log(`User selected: ${choice.title}`)
    }
  }

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="w-full max-w-4xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6 flex justify-center"
          >
            <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Logo 
                className="w-24 h-auto"
                loading="eager"
                priority="high"
                alt={logoAlt}
                src={logoSrc}
              />
            </div>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            {welcomeTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg text-muted-foreground"
          >
            {welcomeSubtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence>
            {workspaceChoices.map((choice, index) => (
              <motion.div
                key={choice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 0.4 + (index * 0.1), 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className="cursor-pointer transition-all duration-300 hover:shadow-xl border-2 hover:border-primary/30 group h-full"
                  onClick={() => handleWorkspaceChoice(choice)}
                >
                  <CardHeader className="text-center pb-4">
                    <div className={cn(
                      'mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300',
                      'bg-gradient-to-br', choice.gradient,
                      'group-hover:scale-110'
                    )}>
                      <div className="text-white">
                        {choice.icon}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-semibold">
                      {choice.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <CardDescription className="text-base leading-relaxed mb-6">
                      {choice.description}
                    </CardDescription>
                    <Button 
                      className={cn(
                        'w-full bg-gradient-to-r', choice.gradient,
                        'text-white border-0 hover:opacity-90 transition-opacity duration-300'
                      )}
                      size="lg"
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
