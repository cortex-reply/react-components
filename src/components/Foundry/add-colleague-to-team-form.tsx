'use client'

import { Bot, Users, ChevronLeft, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { type DigitalColleague, type Team } from './types'

interface AddColleagueToTeamFormProps {
  colleague: DigitalColleague
  team: Team
  onSave: (colleague: DigitalColleague, teamId: number) => void
  onCancel: () => void
  isLoading?: boolean
}

export function AddColleagueToTeamForm({
  colleague,
  team,
  onSave,
  onCancel,
  isLoading = false,
}: AddColleagueToTeamFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(colleague, team.id)
  }

  // Check if colleague is already a member of the team
  const isColleagueAlreadyMember = (): boolean => {
    if (!team.members) return false
    return team.members.some(
      (member) =>
        member.relationTo === 'digital-colleagues' &&
        ((typeof member.value === 'number' && member.value === colleague.id) ||
          (typeof member.value === 'object' && member.value.id === colleague.id))
    )
  }

  const alreadyMember = isColleagueAlreadyMember()

  return (
    <div className="px-2 md:px-4 py-4 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="add-colleague-to-team"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" onClick={onCancel} className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Add to Team</h1>
              <p className="text-muted-foreground">
                Confirm adding this digital colleague to your team
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Selected Colleague Card */}
            <Card>
              <CardHeader>
                {/* <CardTitle className="text-lg">Selected Digital Colleague</CardTitle> */}
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarFallback className="bg-purple-100">
                      <Bot className="h-8 w-8 text-purple-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-xl font-semibold">{colleague.name}</h3>
                    {colleague.jobDescription && (
                      <p className="text-sm text-muted-foreground">{colleague.jobDescription}</p>
                    )}
                    {colleague.model && (
                      <div className="flex items-center gap-2 text-sm">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">
                          {typeof colleague.model === 'object'
                            ? colleague.model.name
                            : colleague.model}
                        </span>
                      </div>
                    )}
                    {colleague.capabilities && colleague.capabilities.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {colleague.capabilities.slice(0, 5).map((cap, index) => {
                          const capName =
                            typeof cap === 'object' &&
                            cap.value &&
                            typeof cap.value === 'object' &&
                            'name' in cap.value
                              ? String(cap.value.name)
                              : 'Capability'
                          return (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {capName}
                            </Badge>
                          )
                        })}
                        {colleague.capabilities.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{colleague.capabilities.length - 5} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Team</CardTitle>
                <p className="text-sm text-muted-foreground">
                  This colleague will be added to the following team
                </p>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-primary/5 border-primary">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold">{team.name}</h3>
                        {alreadyMember && (
                          <Badge variant="secondary" className="text-xs">
                            <Check className="h-3 w-3 mr-1" />
                            Already a member
                          </Badge>
                        )}
                      </div>
                      {team.description && (
                        <p className="text-sm text-muted-foreground mt-1">{team.description}</p>
                      )}
                      {team.members && team.members.length > 0 && (
                        <p className="text-xs text-muted-foreground mt-2">
                          {team.members.length} current member{team.members.length !== 1 ? 's' : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading || alreadyMember}
                className="gap-2"
              >
                <Users className="h-4 w-4" />
                {alreadyMember ? 'Already in Team' : 'Add to Team'}
              </Button>
            </div>
          </form>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
