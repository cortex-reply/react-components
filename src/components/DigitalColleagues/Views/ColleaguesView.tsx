'use client'

import { useEffect, useState } from 'react'
import { Plus, Search, Users, Bot, User, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NavigationTabs, type TabOption } from '../../AdvancedComponents/navigation-tabs'
import { ColleagueCard } from '../colleague-card'
import { ColleagueForm } from '../colleague-form'
import { UserSelection } from '../../AdvancedComponents/user-selection'
import { DigitalColleagueClone } from '../digital-colleague-clone'
import { ColleagueTypeSelection } from '../colleague-type-selection'
import { DigitalColleagueOptions } from '../digital-colleague-options'
import {
  type Colleague,
  type HumanColleague,
  type DigitalColleague,
  type KnowledgeDocument,
  type User as UserType,
} from '../types'
import { motion, AnimatePresence } from 'framer-motion'
import { DashboardHero } from '../../Heros/DashboardHero'
interface ColleaguesViewProps {
  initialColleagues?: Colleague[]
  onColleagueAdd?: (colleague: Colleague) => void
  onColleagueEdit?: (colleague: Colleague) => void
  onColleagueDelete?: (colleagueId: string) => void
  compactView?: boolean
  departments?: string[]
  className?: string
  // New props for user and colleague selection
  availableUsers?: UserType[]
  existingDigitalColleagues?: DigitalColleague[]
}

export default function ColleaguesView({
  initialColleagues,
  onColleagueAdd,
  onColleagueEdit,
  onColleagueDelete,
  compactView = false,
  departments = ['Design', 'Engineering', 'Marketing', 'Product', 'Sales', 'Operations'],
  className,
  availableUsers = [],
  existingDigitalColleagues = [],
}: ColleaguesViewProps) {
  const [colleagues, setColleagues] = useState<Colleague[]>(initialColleagues || [])
  const [searchTerm, setSearchTerm] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('all')
  const [editingColleague, setEditingColleague] = useState<DigitalColleague | null>(null)
  const [viewingColleague, setViewingColleague] = useState<DigitalColleague | null>(null)

  useEffect(() => {
    setColleagues(initialColleagues || [])
  }, [initialColleagues])

  // New state for selection flows
  const [currentView, setCurrentView] = useState<
    'main' | 'typeSelection' | 'userSelection' | 'digitalOptions' | 'digitalClone' | 'form' | 'view'
  >('main')

  const filteredColleagues = colleagues.filter((colleague) => {
    const matchesSearch =
      colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (colleague.type === 'human' &&
        (colleague.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          colleague.role.toLowerCase().includes(searchTerm.toLowerCase()))) ||
      (colleague.type === 'digital' &&
        colleague.jobDescription.toLowerCase().includes(searchTerm.toLowerCase()))

    const matchesDepartment =
      departmentFilter === 'all' ||
      (colleague.type === 'human' && colleague.department === departmentFilter)
    const matchesStatus = statusFilter === 'all' || colleague.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const humanColleagues = filteredColleagues.filter((c) => c.type === 'human')
  const digitalColleagues = filteredColleagues.filter((c) => c.type === 'digital')

  const handleAddColleague = () => {
    setCurrentView('typeSelection')
  }

  const handleEditColleague = (colleague: Colleague) => {
    if (colleague.type === 'digital') {
      setEditingColleague(colleague as DigitalColleague)
      setCurrentView('form')
    }
    // For now, only digital colleagues can be edited through the form
    console.log('Editing colleague:', colleague)
    onColleagueEdit?.(colleague)
  }

  const handleViewDetails = (colleague: Colleague) => {
    if (colleague.type === 'digital') {
      setViewingColleague(colleague as DigitalColleague)
      setCurrentView('view')
    }
    // For human colleagues, you could implement a different detail view
  }

  // New handler functions
  const handleUserSelect = (user: UserType) => {
    // Convert User to HumanColleague
    const humanColleague: HumanColleague = {
      id: `human-${Date.now()}`,
      type: 'human',
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      phone: user.phone,
      location: user.location,
      timezone: user.timezone,
      skills: user.skills,
      bio: user.bio,
      status: 'active',
      joinedDate: new Date(),
      lastActive: new Date(),
    }

    setColleagues((prev) => [...prev, humanColleague])
    onColleagueAdd?.(humanColleague)
    setCurrentView('main')
  }

  const handleDigitalColleagueClone = (clonedColleague: DigitalColleague) => {
    setColleagues((prev) => [...prev, clonedColleague])
    onColleagueAdd?.(clonedColleague)
    setCurrentView('main')
  }

  const handleCreateNewDigital = () => {
    setEditingColleague(null)
    setCurrentView('form')
  }

  const handleSaveColleague = (colleague: DigitalColleague) => {
    if (editingColleague) {
      // Update existing colleague
      setColleagues((prev) => prev.map((c) => (c.id === colleague.id ? colleague : c)))
      onColleagueEdit?.(colleague)
    } else {
      // Add new colleague
      setColleagues((prev) => [...prev, colleague])
      onColleagueAdd?.(colleague)
    }
    setCurrentView('main')
    setEditingColleague(null)
  }

  const handleCancelForm = () => {
    setCurrentView('main')
    setEditingColleague(null)
    setViewingColleague(null)
  }

  const handleCancelView = () => {
    setCurrentView('main')
    setViewingColleague(null)
  }

  const handleEditFromView = () => {
    if (viewingColleague) {
      setEditingColleague(viewingColleague)
      setViewingColleague(null)
      setCurrentView('form')
    }
  }

  const handleDeleteColleague = (colleagueId: string) => {
    console.log('handling delete colleague', colleagueId)
    setColleagues((prev) => prev.filter((c) => c.id !== colleagueId))
    onColleagueDelete?.(colleagueId)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setDepartmentFilter('all')
    setStatusFilter('all')
  }

  // Extract all unique knowledge documents from existing digital colleagues
  const getAllAvailableKnowledgeDocuments = (): KnowledgeDocument[] => {
    const allDocuments: KnowledgeDocument[] = []

    // Get documents from existing digital colleagues
    existingDigitalColleagues.forEach((colleague) => {
      allDocuments.push(...colleague.knowledge, ...colleague.coreKnowledge)
    })

    // Get documents from current colleagues in state
    colleagues.forEach((colleague) => {
      if (colleague.type === 'digital') {
        allDocuments.push(...colleague.knowledge, ...colleague.coreKnowledge)
      }
    })

    // Remove duplicates based on document ID
    const uniqueDocuments = allDocuments.filter(
      (doc, index, self) => index === self.findIndex((d) => d.id === doc.id),
    )

    return uniqueDocuments
  }

  // Handle different views
  if (currentView === 'typeSelection') {
    return (
      <ColleagueTypeSelection
        onSelectHuman={() => setCurrentView('userSelection')}
        onSelectDigital={() => setCurrentView('digitalOptions')}
        onCancel={() => setCurrentView('main')}
      />
    )
  }

  if (currentView === 'userSelection') {
    return (
      <UserSelection
        users={availableUsers}
        onUserSelect={handleUserSelect}
        onCancel={() => setCurrentView('typeSelection')}
      />
    )
  }

  if (currentView === 'digitalOptions') {
    return (
      <DigitalColleagueOptions
        onCloneExisting={() => setCurrentView('digitalClone')}
        onCreateNew={handleCreateNewDigital}
        onCancel={() => setCurrentView('typeSelection')}
      />
    )
  }

  if (currentView === 'digitalClone') {
    return (
      <DigitalColleagueClone
        digitalColleagues={existingDigitalColleagues}
        onColleagueClone={handleDigitalColleagueClone}
        onCancel={() => setCurrentView('digitalOptions')}
      />
    )
  }

  if (currentView === 'form') {
    return (
      <ColleagueForm
        colleague={editingColleague || undefined}
        onSave={handleSaveColleague}
        onCancel={handleCancelForm}
        availableKnowledgeDocuments={getAllAvailableKnowledgeDocuments()}
      />
    )
  }

  if (currentView === 'view') {
    return (
      <ColleagueForm
        colleague={viewingColleague || undefined}
        onSave={handleSaveColleague}
        onCancel={handleCancelView}
        readOnly={true}
        availableKnowledgeDocuments={getAllAvailableKnowledgeDocuments()}
      />
    )
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="projects-index-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`space-y-6 ${className || ''}`}>
            <DashboardHero
              title="Colleagues"
              description="Manage your team members and digital colleagues."
              gradient="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"
              primaryAction={{
                label: 'Add colleague',
                onClick: handleAddColleague,
              }}
            />

            {/* Header */}
            {/* <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Colleagues</h1>
          <p className="text-muted-foreground">Manage your team members and digital assistants</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleAddColleague} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Colleague
          </Button>
        </div>
      </div> */}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Colleagues</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{colleagues.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {colleagues.filter((c) => c.status === 'active').length} active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Human Members</CardTitle>
                  <User className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {colleagues.filter((c) => c.type === 'human').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {colleagues.filter((c) => c.type === 'human' && c.status === 'active').length}{' '}
                    active
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Digital Colleagues</CardTitle>
                  <Bot className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {colleagues.filter((c) => c.type === 'digital').length}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {colleagues.filter((c) => c.type === 'digital' && c.status === 'active').length}{' '}
                    active
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search colleagues..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full md:w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {(searchTerm || departmentFilter !== 'all' || statusFilter !== 'all') && (
                    <Button variant="outline" onClick={clearFilters} className="gap-2">
                      <Filter className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Colleagues List */}
            <div className="space-y-4">
              <NavigationTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabOptions={[
                  { value: 'all', label: `All (${filteredColleagues.length})` },
                  { value: 'human', label: `Human (${humanColleagues.length})` },
                  { value: 'digital', label: `Digital (${digitalColleagues.length})` },
                ]}
                maxWidth="400px"
                gridCols={3}
              />

              {activeTab === 'all' && (
                <div
                  className={`grid gap-4 ${
                    compactView
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {filteredColleagues.map((colleague) => (
                    <ColleagueCard
                      key={colleague.id}
                      colleague={colleague}
                      onEdit={handleEditColleague}
                      onDelete={handleDeleteColleague}
                      onViewDetails={handleViewDetails}
                      compact={compactView}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'human' && (
                <div
                  className={`grid gap-4 ${
                    compactView
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {humanColleagues.map((colleague) => (
                    <ColleagueCard
                      key={colleague.id}
                      colleague={colleague}
                      onEdit={handleEditColleague}
                      onDelete={handleDeleteColleague}
                      onViewDetails={handleViewDetails}
                      compact={compactView}
                    />
                  ))}
                </div>
              )}

              {activeTab === 'digital' && (
                <div
                  className={`grid gap-4 ${
                    compactView
                      ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
                      : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                  }`}
                >
                  {digitalColleagues.map((colleague) => (
                    <ColleagueCard
                      key={colleague.id}
                      colleague={colleague}
                      onEdit={handleEditColleague}
                      onDelete={handleDeleteColleague}
                      onViewDetails={handleViewDetails}
                      compact={compactView}
                    />
                  ))}
                </div>
              )}
            </div>

            {filteredColleagues.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No colleagues found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || departmentFilter !== 'all' || statusFilter !== 'all'
                        ? 'Try adjusting your filters to see more results.'
                        : 'Get started by adding your first colleague.'}
                    </p>
                    <Button onClick={handleAddColleague} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Colleague
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
