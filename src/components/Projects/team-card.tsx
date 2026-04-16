"use client"

import { motion } from "motion/react"
import { Users, Bot, FolderOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { TeamSummary } from "../Foundry/types"

interface TeamCardProps {
  team: TeamSummary
  onOpen?: (team: TeamSummary) => void
  className?: string
}

export function TeamCard({ team, onOpen, className }: TeamCardProps) {
  return (
    <motion.div whileHover={{ scale: 1.02, y: -5 }} whileTap={{ scale: 0.98 }} className={className}>
      <Card className="overflow-hidden rounded-3xl border hover:border-primary/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg">{team.name}</CardTitle>
          <CardDescription className="mt-1 text-sm">{team.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>Human</span>
              </div>
              <span className="font-medium">{team.humanColleagues}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-purple-500" />
                <span>Digital</span>
              </div>
              <span className="font-medium">{team.digitalColleagues}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm border-t pt-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-4 w-4 text-green-500" />
              <span>Projects</span>
            </div>
            <span className="font-medium">{team.projects}</span>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button 
            variant="secondary" 
            className="flex-1 rounded-2xl" 
            onClick={() => onOpen?.(team)}
          >
            View Team
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
