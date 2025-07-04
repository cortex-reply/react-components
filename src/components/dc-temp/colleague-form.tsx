"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Bot, Plus, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import type { Colleague, HumanColleague, DigitalColleague } from "./colleagues"

interface ColleagueFormProps {
  colleague?: Colleague
  onSave: (colleague: Colleague) => void
  onCancel: () => void
  departments?: string[]
  isLoading?: boolean
  title?: string
  submitLabel?: string
  cancelLabel?: string
}

export function ColleagueForm({
  colleague,
  onSave,
  onCancel,
  departments = ["Design", "Engineering", "Marketing", "Product", "Sales", "Operations"],
  isLoading = false,
  title,
  submitLabel,
  cancelLabel = "Cancel",
}: ColleagueFormProps) {
  const [formData, setFormData] = useState<Partial<Colleague>>({
    type: "human",
    name: "",
    email: "",
    role: "",
    department: "",
    status: "active",
    ...colleague,
  })

  const [newSkill, setNewSkill] = useState("")
  const [newCapability, setNewCapability] = useState("")
  const [newKnowledge, setNewKnowledge] = useState("")
  const [newCoreKnowledge, setNewCoreKnowledge] = useState("")
  const [newWorkInstruction, setNewWorkInstruction] = useState("")

  useEffect(() => {
    if (colleague) {
      setFormData(colleague)
    }
  }, [colleague])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const baseData = {
      id: formData.id || Date.now().toString(),
      name: formData.name!,
      email: formData.email!,
      role: formData.role!,
      department: formData.department!,
      status: formData.status as "active" | "inactive" | "away",
      joinedDate: formData.joinedDate || new Date(),
      lastActive: formData.lastActive || new Date(),
    }

    if (formData.type === "human") {
      const humanData: HumanColleague = {
        ...baseData,
        type: "human",
        phone: (formData as HumanColleague).phone,
        location: (formData as HumanColleague).location,
        timezone: (formData as HumanColleague).timezone,
        skills: (formData as HumanColleague).skills || [],
        bio: (formData as HumanColleague).bio,
        avatar: formData.avatar,
      }
      onSave(humanData)
    } else {
      const digitalData: DigitalColleague = {
        ...baseData,
        type: "digital",
        jobDescription: (formData as DigitalColleague).jobDescription || "",
        workInstructions: (formData as DigitalColleague).workInstructions || [],
        capabilities: (formData as DigitalColleague).capabilities || [],
        knowledge: (formData as DigitalColleague).knowledge || [],
        coreKnowledge: (formData as DigitalColleague).coreKnowledge || [],
        version: (formData as DigitalColleague).version || "1.0.0",
        lastUpdated: (formData as DigitalColleague).lastUpdated || new Date(),
        isActive: (formData as DigitalColleague).isActive ?? true,
        avatar: formData.avatar,
      }
      onSave(digitalData)
    }
  }

  const addArrayItem = (field: string, value: string, setter: (value: string) => void) => {
    if (!value.trim()) return

    const currentArray = (formData as any)[field] || []
    setFormData({
      ...formData,
      [field]: [...currentArray, value.trim()],
    })
    setter("")
  }

  const removeArrayItem = (field: string, index: number) => {
    const currentArray = (formData as any)[field] || []
    setFormData({
      ...formData,
      [field]: currentArray.filter((_: any, i: number) => i !== index),
    })
  }

  const renderArrayField = (
    field: string,
    label: string,
    newValue: string,
    setNewValue: (value: string) => void,
    placeholder: string,
  ) => {
    const items = (formData as any)[field] || []

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <div className="flex gap-2">
          <Input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                addArrayItem(field, newValue, setNewValue)
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => addArrayItem(field, newValue, setNewValue)}
            disabled={isLoading}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {items.map((item: string, index: number) => (
            <Badge key={index} variant="secondary" className="gap-1">
              {item}
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeArrayItem(field, index)}
                disabled={isLoading}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      </div>
    )
  }

  const formTitle = title || (colleague ? "Edit Colleague" : "Add New Colleague")
  const buttonLabel = submitLabel || (colleague ? "Update Colleague" : "Add Colleague")

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {formData.type === "digital" ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
          {formTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div className="space-y-2">
            <Label>Colleague Type</Label>
            <Tabs
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value as "human" | "digital" })}
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="human" className="flex items-center gap-2" disabled={isLoading}>
                  <User className="h-4 w-4" />
                  Human
                </TabsTrigger>
                <TabsTrigger value="digital" className="flex items-center gap-2" disabled={isLoading}>
                  <Bot className="h-4 w-4" />
                  Digital
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role || ""}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department *</Label>
              <Select
                value={formData.department || ""}
                onValueChange={(value) => setFormData({ ...formData, department: value })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status || "active"}
                onValueChange={(value) => setFormData({ ...formData, status: value as "active" | "inactive" | "away" })}
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="away">Away</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={formData.avatar || ""}
                onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                placeholder="https://example.com/avatar.jpg"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Type-specific fields */}
          {formData.type === "human" ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Human Colleague Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={(formData as HumanColleague).phone || ""}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={(formData as HumanColleague).location || ""}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Input
                    id="timezone"
                    value={(formData as HumanColleague).timezone || ""}
                    onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                    placeholder="PST, EST, UTC, etc."
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={(formData as HumanColleague).bio || ""}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  disabled={isLoading}
                />
              </div>
              {renderArrayField("skills", "Skills", newSkill, setNewSkill, "Add a skill")}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Digital Colleague Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    value={(formData as DigitalColleague).version || ""}
                    onChange={(e) => setFormData({ ...formData, version: e.target.value })}
                    placeholder="1.0.0"
                    disabled={isLoading}
                  />
                </div>
                <div className="space-y-2 flex items-center gap-2">
                  <Switch
                    id="isActive"
                    checked={(formData as DigitalColleague).isActive ?? true}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    disabled={isLoading}
                  />
                  <Label htmlFor="isActive">Is Active</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobDescription">Job Description *</Label>
                <Textarea
                  id="jobDescription"
                  value={(formData as DigitalColleague).jobDescription || ""}
                  onChange={(e) => setFormData({ ...formData, jobDescription: e.target.value })}
                  rows={4}
                  required={formData.type === "digital"}
                  disabled={isLoading}
                />
              </div>
              {renderArrayField(
                "workInstructions",
                "Work Instructions",
                newWorkInstruction,
                setNewWorkInstruction,
                "Add work instruction",
              )}
              {renderArrayField("capabilities", "Capabilities", newCapability, setNewCapability, "Add capability")}
              {renderArrayField("knowledge", "Knowledge", newKnowledge, setNewKnowledge, "Add knowledge item")}
              {renderArrayField(
                "coreKnowledge",
                "Core Knowledge",
                newCoreKnowledge,
                setNewCoreKnowledge,
                "Add core knowledge item",
              )}
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : buttonLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
