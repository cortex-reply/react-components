'use client'

import { useState, useMemo } from 'react'
import { Search, Bot, Check, ChevronLeft, UserPlus, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { type DigitalColleague } from './types'

interface DigitalColleagueSelectionProps {
  digitalColleagues: DigitalColleague[]
  onColleagueSelect: (colleague: DigitalColleague) => void
  onCancel: () => void
  selectedColleagueId?: string
}

export function DigitalColleagueSelection({
  digitalColleagues,
  onColleagueSelect,
  onCancel,
  selectedColleagueId,
}: DigitalColleagueSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredColleagues = useMemo(() => {
    return digitalColleagues.filter((colleague) => {
      const matchesSearch =
        colleague?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colleague.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colleague.workInstructions?.toLowerCase().includes(searchTerm.toLowerCase())

      return matchesSearch
    })
  }, [digitalColleagues, searchTerm, statusFilter])

  const handleColleagueSelect = (colleague: DigitalColleague) => {
    onColleagueSelect(colleague)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="colleague-selection"
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
              <h1 className="text-3xl font-bold">Add Existing Digital Colleague</h1>
              <p className="text-muted-foreground">Select a digital colleague to add to your team</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, job description, or capabilities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <div className="space-y-4 mt-4">
            {filteredColleagues.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">No digital colleagues found</p>
                  <p className="text-muted-foreground">
                    {searchTerm
                      ? 'Try adjusting your search criteria'
                      : 'No digital colleagues available to add'}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredColleagues.map((colleague) => (
                  <motion.div
                    key={colleague.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card
                      className="cursor-pointer transition-all hover:shadow-lg hover:border-primary/50"
                      onClick={() => handleColleagueSelect(colleague)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Avatar className="h-12 w-12 flex-shrink-0">
                              <AvatarFallback className="bg-purple-100">
                                <Bot className="h-6 w-6 text-purple-600" />
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <CardTitle className="text-base truncate">{colleague?.name}</CardTitle>
                              <p className="text-sm text-muted-foreground truncate">
                                {colleague.jobDescription || 'Digital Colleague'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* Model */}
                        {colleague.model && (
                          <div className="flex items-center gap-2 text-sm">
                            <Bot className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground truncate">
                              {typeof colleague.model === 'object' ? colleague.model.name : colleague.model}
                            </span>
                          </div>
                        )}

                        {/* Capabilities */}
                        {colleague.capabilities && colleague.capabilities.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {colleague.capabilities.slice(0, 3).map((cap, index) => {
                              const capName = typeof cap === 'object' && cap.value && typeof cap.value === 'object' && 'name' in cap.value
                                ? String(cap.value.name)
                                : 'Capability'
                              return (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {capName}
                                </Badge>
                              )
                            })}
                            {colleague.capabilities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{colleague.capabilities.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}

                        {/* Work Instructions Preview */}
                        {colleague.workInstructions && (
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {colleague.workInstructions}
                          </p>
                        )}

                        <div className="pt-2">
                          <Button className="w-full" variant="outline" size="sm">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add to Team
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
