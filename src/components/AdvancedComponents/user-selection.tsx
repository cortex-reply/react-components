'use client'

import { useState, useMemo } from 'react'
import { Search, User, Check, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { motion, AnimatePresence } from 'motion/react'
import { type User as UserType } from '../Foundary/types'

interface UserSelectionProps {
  users: UserType[]
  onUserSelect: (user: UserType) => void
  onCancel: () => void
  selectedUserId?: string
}

export function UserSelection({
  users,
  onUserSelect,
  onCancel,
  selectedUserId,
}: UserSelectionProps) {
  const [searchTerm, setSearchTerm] = useState('')

  // Ensure users is always an array
  const safeUsers = Array.isArray(users) ? users : []

  const filteredUsers = useMemo(() => {
    // First filter out any undefined/null users, then apply search filter
    return safeUsers
      .filter((user): user is UserType => user != null && user !== undefined)
      .filter((user) => {
        const matchesSearch =
          user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
        // user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        // (user.skills || []).some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()))

        return matchesSearch
      })
  }, [safeUsers, searchTerm])

  const handleUserSelect = (user: UserType) => {
    onUserSelect(user)
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="user-selection"
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
              <h1 className="text-3xl font-bold">Select User</h1>
              <p className="text-muted-foreground">Choose a user to add as a colleague</p>
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="container">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name, email, role, or skills..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Grid */}
          <div className="container grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredUsers.map((user) => {
              // Safety check - skip rendering if user is invalid
              if (!user || !user.id) return null

              return (
                <motion.div
                  key={user.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer transition-all hover:shadow-lg ${
                      selectedUserId === user.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleUserSelect(user)}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            {/* <AvatarImage src={user.avatar} alt={user?.name || 'User'} /> */}
                            <AvatarFallback>
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">
                              {user?.name || 'Unknown User'}
                            </CardTitle>
                            {/* <p className="text-sm text-muted-foreground">{user.role}</p> */}
                          </div>
                        </div>
                        {selectedUserId === user.id && <Check className="h-5 w-5 text-primary" />}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="text-sm font-medium">{user?.email || 'No email'}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Department</p>
                          {/* <Badge variant="secondary">{user.department}</Badge> */}
                        </div>
                        {/* {user.location && (
                        <div>
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="text-sm">{user.location}</p>
                        </div>
                      )} */}
                        {/* {user.skills && user.skills.length > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground mb-2">Skills</p>
                          <div className="flex flex-wrap gap-1">
                            {user.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                            {user.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{user.skills.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )} */}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          {filteredUsers.length === 0 && (
            <Card className="container mt-4">
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No users found</h3>
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
