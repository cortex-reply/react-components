'use client'

import { useState, useMemo } from 'react'
import { Search, Bot, Check, ChevronLeft, Copy, Calendar, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { type DigitalColleague } from './types'

interface DigitalColleagueCloneProps {
  digitalColleagues: DigitalColleague[]
  onColleagueClone: (colleague: DigitalColleague) => void
  onCancel: () => void
  selectedColleagueId?: string
}

export function DigitalColleagueClone({
  digitalColleagues,
  onColleagueClone,
  onCancel,
  selectedColleagueId,
}: DigitalColleagueCloneProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  const filteredColleagues = useMemo(() => {
    return digitalColleagues.filter((colleague) => {
      const matchesSearch =
        colleague?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        colleague.jobDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // colleague.capabilities?.some(cap => cap.toLowerCase().includes(searchTerm.toLowerCase())) ||
        colleague.workInstructions?.toLowerCase().includes(searchTerm.toLowerCase())

      // const matchesStatus = statusFilter === "all" || colleague.status === statusFilter

      return matchesSearch
    })
  }, [digitalColleagues, searchTerm, statusFilter])

  const handleColleagueClone = (colleague: DigitalColleague) => {
    // Create a clone with a new ID and name
    const clonedColleague: DigitalColleague = {
      ...colleague,
      // id: `${colleague.id}-clone-${Date.now()}`,
      name: `${colleague?.name} (Copy)`,
      // joinedDate: new Date(),
      // lastActive: new Date(),
      // lastUpdated: new Date(),
      // version: "1.0.0", // Reset version for new clone
    }
    onColleagueClone(clonedColleague)
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
          key="colleague-clone"
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
              <h1 className="text-3xl font-bold">Clone Digital Colleague</h1>
              <p className="text-muted-foreground">Select a digital colleague to clone</p>
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
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Colleagues Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredColleagues.map((colleague) => (
              <motion.div
                key={colleague.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedColleagueId?.toString() === colleague.id.toString()
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                  onClick={() => handleColleagueClone(colleague)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-blue-100">
                            <Bot className="h-4 w-4 text-blue-600" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {colleague?.name}
                            {/* <Badge 
                              variant={colleague.status === "active" ? "default" : "secondary"}
                              className="text-xs"
                            >
                              {colleague.status}
                            </Badge> */}
                          </CardTitle>
                          {/* <p className="text-sm text-muted-foreground">v{colleague.version}</p> */}
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        className="gap-2 h-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleColleagueClone(colleague)
                        }}
                      >
                        <Copy className="h-3 w-3" />
                        Clone
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-muted-foreground">Job Description</p>
                        <p className="text-sm line-clamp-2">{colleague.jobDescription}</p>
                      </div>

                      {colleague.capabilities && colleague.capabilities.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Capabilities</p>
                          <div className="flex flex-wrap gap-1">
                            {/* {colleague.capabilities.slice(0, 3).map((capability) => (
                              <Badge key={capability} variant="outline" className="text-xs">
                                {capability}
                              </Badge>
                            ))} */}
                            {colleague.capabilities.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{colleague.capabilities.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        {/* <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>Updated {formatDate(colleague.lastUpdated)}</span>
                        </div>
                        {colleague.knowledge && (
                          <div className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            <span>{colleague.knowledge.length} docs</span>
                          </div>
                        )} */}
                      </div>

                      {colleague.workInstructions && (
                        <div>
                          <p className="text-sm text-muted-foreground">Instructions</p>
                          <p className="text-xs line-clamp-2">{colleague.workInstructions}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredColleagues.length === 0 && (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No digital colleagues found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search terms or filters.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
