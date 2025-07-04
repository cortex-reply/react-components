"use client"

import { useState } from "react"
import { Plus, Search, Users, Bot, User, Filter, Download, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ColleagueCard } from "./colleague-card"
import { ColleagueForm } from "./colleague-form"
import { mockColleagues, type Colleague } from "./colleagues"

interface ColleaguesManagementProps {
  initialColleagues?: Colleague[]
  onColleagueAdd?: (colleague: Colleague) => void
  onColleagueEdit?: (colleague: Colleague) => void
  onColleagueDelete?: (colleagueId: string) => void
  onImport?: () => void
  onExport?: () => void
  showImportExport?: boolean
  compactView?: boolean
  departments?: string[]
  className?: string
}

export function ColleaguesManagement({
  initialColleagues = mockColleagues,
  onColleagueAdd,
  onColleagueEdit,
  onColleagueDelete,
  onImport,
  onExport,
  showImportExport = true,
  compactView = false,
  departments = ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"],
  className,
}: ColleaguesManagementProps) {
  const [colleagues, setColleagues] = useState<Colleague[]>(initialColleagues)
  const [searchTerm, setSearchTerm] = useState("")
  const [departmentFilter, setDepartmentFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [showForm, setShowForm] = useState(false)
  const [editingColleague, setEditingColleague] = useState<Colleague | null>(null)

  const filteredColleagues = colleagues.filter((colleague) => {
    const matchesSearch =
      colleague.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      colleague.role.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDepartment = departmentFilter === "all" || colleague.department === departmentFilter
    const matchesStatus = statusFilter === "all" || colleague.status === statusFilter

    return matchesSearch && matchesDepartment && matchesStatus
  })

  const humanColleagues = filteredColleagues.filter((c) => c.type === "human")
  const digitalColleagues = filteredColleagues.filter((c) => c.type === "digital")

  const handleAddColleague = () => {
    setEditingColleague(null)
    setShowForm(true)
  }

  const handleEditColleague = (colleague: Colleague) => {
    setEditingColleague(colleague)
    setShowForm(true)
  }

  const handleSaveColleague = (colleague: Colleague) => {
    if (editingColleague) {
      // Update existing colleague
      setColleagues((prev) => prev.map((c) => (c.id === colleague.id ? colleague : c)))
      onColleagueEdit?.(colleague)
    } else {
      // Add new colleague
      setColleagues((prev) => [...prev, colleague])
      onColleagueAdd?.(colleague)
    }
    setShowForm(false)
    setEditingColleague(null)
  }

  const handleDeleteColleague = (colleagueId: string) => {
    setColleagues((prev) => prev.filter((c) => c.id !== colleagueId))
    onColleagueDelete?.(colleagueId)
  }

  const handleCancelForm = () => {
    setShowForm(false)
    setEditingColleague(null)
  }

  const clearFilters = () => {
    setSearchTerm("")
    setDepartmentFilter("all")
    setStatusFilter("all")
  }

  if (showForm) {
    return (
      <ColleagueForm
        colleague={editingColleague || undefined}
        onSave={handleSaveColleague}
        onCancel={handleCancelForm}
        departments={departments}
      />
    )
  }

  return (
    <div className={`space-y-6 ${className || ""}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Colleagues</h1>
          <p className="text-muted-foreground">Manage your team members and digital assistants</p>
        </div>
        <div className="flex gap-2">
          {showImportExport && (
            <>
              <Button variant="outline" onClick={onImport} className="gap-2">
                <Upload className="h-4 w-4" />
                Import
              </Button>
              <Button variant="outline" onClick={onExport} className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </>
          )}
          <Button onClick={handleAddColleague} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Colleague
          </Button>
        </div>
      </div>

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
              {colleagues.filter((c) => c.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Human Members</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{colleagues.filter((c) => c.type === "human").length}</div>
            <p className="text-xs text-muted-foreground">
              {colleagues.filter((c) => c.type === "human" && c.status === "active").length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Digital Assistants</CardTitle>
            <Bot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{colleagues.filter((c) => c.type === "digital").length}</div>
            <p className="text-xs text-muted-foreground">
              {colleagues.filter((c) => c.type === "digital" && c.status === "active").length} active
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
                <SelectItem value="away">Away</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            {(searchTerm || departmentFilter !== "all" || statusFilter !== "all") && (
              <Button variant="outline" onClick={clearFilters} className="gap-2">
                <Filter className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Colleagues List */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All ({filteredColleagues.length})</TabsTrigger>
          <TabsTrigger value="human">Human ({humanColleagues.length})</TabsTrigger>
          <TabsTrigger value="digital">Digital ({digitalColleagues.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div
            className={`grid gap-4 ${compactView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {filteredColleagues.map((colleague) => (
              <ColleagueCard
                key={colleague.id}
                colleague={colleague}
                onEdit={handleEditColleague}
                onDelete={handleDeleteColleague}
                onViewDetails={(colleague) => console.log("View details:", colleague)}
                compact={compactView}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="human" className="space-y-4">
          <div
            className={`grid gap-4 ${compactView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {humanColleagues.map((colleague) => (
              <ColleagueCard
                key={colleague.id}
                colleague={colleague}
                onEdit={handleEditColleague}
                onDelete={handleDeleteColleague}
                onViewDetails={(colleague) => console.log("View details:", colleague)}
                compact={compactView}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="digital" className="space-y-4">
          <div
            className={`grid gap-4 ${compactView ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"}`}
          >
            {digitalColleagues.map((colleague) => (
              <ColleagueCard
                key={colleague.id}
                colleague={colleague}
                onEdit={handleEditColleague}
                onDelete={handleDeleteColleague}
                onViewDetails={(colleague) => console.log("View details:", colleague)}
                compact={compactView}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {filteredColleagues.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No colleagues found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || departmentFilter !== "all" || statusFilter !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "Get started by adding your first colleague."}
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
  )
}
