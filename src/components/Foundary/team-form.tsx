"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Users, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import type { User, DigitalColleague, Team as BaseTeam } from "./types"

export interface Team {
  id: number;
  name: string;
  description?: string | null;
  systemMsg?: string | null;
  useProjects?: boolean | null;
  useKnowledge?: boolean | null;
  useFiles?: boolean | null;
  useChat?: boolean | null;
  updatedAt: string;
  createdAt: string;
}

interface TeamFormProps {
  team?: Team
  onSave: (team: Team) => void
  onCancel: () => void
  isLoading?: boolean
  title?: string
  submitLabel?: string
  cancelLabel?: string
  readOnly?: boolean
}

export function TeamForm({
  team,
  onSave,
  onCancel,
  isLoading = false,
  title,
  submitLabel,
  cancelLabel = "Cancel",
  readOnly = false,
}: TeamFormProps) {
  const [formData, setFormData] = useState<Partial<Team>>({
    name: "",
    description: "",
    systemMsg: "",
    useProjects: false,
    useKnowledge: false,
    useFiles: false,
    useChat: false,
    ...team,
  })

  const [editMode, setEditMode] = useState(!readOnly)

  useEffect(() => {
    if (team) {
      setFormData(team)
    }
  }, [team])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const teamData: Team = {
      id: formData.id || Date.now(),
      name: formData.name!,
      description: formData.description || null,
      systemMsg: formData.systemMsg || null,
      useProjects: formData.useProjects || false,
      useKnowledge: formData.useKnowledge || false,
      useFiles: formData.useFiles || false,
      useChat: formData.useChat || false,
      updatedAt: new Date().toISOString(),
      createdAt: formData.createdAt || new Date().toISOString(),
    }
    onSave(teamData)
  }

  const handleEditToggle = (e: React.FormEvent) => {
    e.preventDefault()
    setEditMode(!editMode)
  }

  const formTitle = title || (!editMode ? "View Team" : (team ? "Edit Team" : "Create New Team"))
  const buttonLabel = submitLabel || (team ? "Update Team" : "Create Team")

  return (
    <Card className="m-8 w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading || !editMode}
                placeholder="Enter team name..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                placeholder="Brief description of this team..."
                disabled={isLoading || !editMode}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="systemMsg">Ways of working</Label>
              <Textarea
                id="systemMsg"
                value={formData.systemMsg || ""}
                onChange={(e) => setFormData({ ...formData, systemMsg: e.target.value })}
                rows={3}
                placeholder="Describe how this team works in as much detail as possible. Include processes, tools, systems, styles..."
                disabled={isLoading || !editMode}
              />
            </div>
          </div>

          {/* Team Configuration */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Team Configuration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="useProjects"
                  checked={formData.useProjects || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, useProjects: checked })}
                  disabled={isLoading || !editMode}
                />
                <Label htmlFor="useProjects">Enable Projects</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useKnowledge"
                  checked={formData.useKnowledge || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, useKnowledge: checked })}
                  disabled={isLoading || !editMode}
                />
                <Label htmlFor="useKnowledge">Enable Knowledge Base</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useFiles"
                  checked={formData.useFiles || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, useFiles: checked })}
                  disabled={isLoading || !editMode}
                />
                <Label htmlFor="useFiles">Enable File Management</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="useChat"
                  checked={formData.useChat || false}
                  onCheckedChange={(checked) => setFormData({ ...formData, useChat: checked })}
                  disabled={isLoading || !editMode}
                />
                <Label htmlFor="useChat">Enable Team Chat</Label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              {!editMode ? "Close" : cancelLabel}
            </Button>
            {!editMode ? (
              <Button type="button" onClick={handleEditToggle} disabled={isLoading} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <Button type="submit" disabled={isLoading || !formData.name?.trim()}>
                {isLoading ? "Saving..." : buttonLabel}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
