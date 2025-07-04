"use client"

import { motion } from "framer-motion"
import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { App } from "./types"

interface AppCardProps {
  app: App
  onOpen?: (app: App) => void
  onFavorite?: (app: App) => void
  showProgress?: boolean
  className?: string
}

export function AppCard({ app, onOpen, onFavorite, showProgress = false, className }: AppCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }} className={className}>
      <Card className="overflow-hidden rounded-3xl border-2 hover:border-primary/50 transition-all duration-300">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted">{app.icon}</div>
            {app.new ? (
              <Badge className="rounded-xl bg-amber-500">New</Badge>
            ) : (
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-2xl" onClick={() => onFavorite?.(app)}>
                <Star className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <CardTitle className="text-lg">{app.name}</CardTitle>
          <CardDescription>{app.description}</CardDescription>
          {showProgress && app.progress < 100 && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-sm">
                <span>Installation</span>
                <span>{app.progress}%</span>
              </div>
              <Progress value={app.progress} className="h-2 mt-1 rounded-xl" />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button variant="secondary" className="w-full rounded-2xl" onClick={() => onOpen?.(app)}>
            {app.progress < 100 ? "Continue Install" : "Open"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
