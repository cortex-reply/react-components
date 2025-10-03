'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Logo } from '@/components/Payload/Logo'
import { cn } from '../../utils'

export interface LoginProps {
  /** Function called when login is attempted */
  onLogin: () => void
  /** Text to display on the login button */
  buttonText?: string
  /** Main title text */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** Props to pass to the Logo component */
  logoProps?: { width?: number; height?: number; className?: string }
  /** URL to redirect to after successful login */
  redirectUrl?: string
  /** Additional CSS classes */
  className?: string
}

export const Login: React.FC<LoginProps> = ({
  onLogin,
  buttonText = "Login",
  title = "Login to Cortex",
  subtitle = "Welcome back",
  logoProps = { width: 80, height: 80 },
  redirectUrl = "/dashboard",
  className
}) => {
  const [isLoggingIn, setIsLoggingIn] = useState(false)

  const handleLogin = async () => {
    setIsLoggingIn(true)
    // Call the callback with the token
    onLogin()
  }

  return (
    <div className={cn('min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4', className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg"
            >
              <Logo 
                {...logoProps}
                className={cn("w-16 h-auto", logoProps?.className)}
                loading="eager"
                priority="high"
              />
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-accent bg-clip-text text-transparent">
              {title}
            </CardTitle>
            <CardDescription className="text-base mt-2">
              {subtitle}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 py-6">
            <Button 
              onClick={handleLogin}
              className="w-full h-12 text-white border-0 font-medium text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="mr-3"
                  >
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  </motion.div>
                  Signing In...
                </>
              ) : (
                <>
                  <Lock className="mr-3 h-5 w-5" />
                  {buttonText}
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
