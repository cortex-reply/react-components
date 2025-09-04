'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import { ProjectCreationData } from '../DigitalColleagues/types'
import { Loader2, Plus, X } from 'lucide-react'

interface ProjectFormProps {
  onSubmit: (data: ProjectCreationData) => void | Promise<void>
  onCancel?: () => void
  isLoading?: boolean
  initialData?: Partial<ProjectCreationData>
  className?: string
}

export const ProjectForm: React.FC<ProjectFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
  initialData,
  className = '',
}) => {
  const [formData, setFormData] = useState<ProjectCreationData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    objectives: initialData?.objectives || '',
    workInstructions: initialData?.workInstructions || '',
    plan: initialData?.plan || false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof ProjectCreationData, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ProjectCreationData, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Project name must be at least 3 characters'
    }

    if (!formData.objectives.trim()) {
      newErrors.objectives = 'Project objectives are required'
    } else if (formData.objectives.trim().length < 10) {
      newErrors.objectives = 'Please provide more detailed objectives (at least 10 characters)'
    }

    if (!formData.workInstructions.trim()) {
      newErrors.workInstructions = 'Work instructions are required'
    } else if (formData.workInstructions.trim().length < 20) {
      newErrors.workInstructions =
        'Please provide more detailed work instructions (at least 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Error submitting project form:', error)
    }
  }

  const handleInputChange = (field: keyof ProjectCreationData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New Project
        </div>
        <p className="text-sm text-gray-500">
          Set up a new project with clear objectives and work instructions to help your team
          collaborate effectively.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* Project Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Project Name *
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter project name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={errors.name ? 'border-red-500 focus:border-red-500' : ''}
              disabled={isLoading}
              maxLength={100}
            />
            {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Project Description *
            </Label>
            <Input
              id="description"
              type="text"
              placeholder="Enter project description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={errors.description ? 'border-red-500 focus:border-red-500' : ''}
              disabled={isLoading}
              maxLength={100}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          {/* Project Objectives */}
          <div className="space-y-2">
            <Label htmlFor="objectives" className="text-sm font-medium">
              Project Objectives *
            </Label>
            <Textarea
              id="objectives"
              placeholder="Describe the main goals and objectives of this project..."
              value={formData.objectives}
              onChange={(e) => handleInputChange('objectives', e.target.value)}
              className={`min-h-[100px] resize-y ${
                errors.objectives ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={isLoading}
              maxLength={1000}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {errors.objectives && <span className="text-red-600">{errors.objectives}</span>}
              </span>
              <span>{formData.objectives.length}/1000</span>
            </div>
          </div>

          {/* Work Instructions */}
          <div className="space-y-2">
            <Label htmlFor="workInstructions" className="text-sm font-medium">
              Work Instructions *
            </Label>
            <Textarea
              id="workInstructions"
              placeholder="Provide detailed instructions on how the work should be carried out, including processes, standards, and expectations..."
              value={formData.workInstructions}
              onChange={(e) => handleInputChange('workInstructions', e.target.value)}
              className={`min-h-[120px] resize-y ${
                errors.workInstructions ? 'border-red-500 focus:border-red-500' : ''
              }`}
              disabled={isLoading}
              maxLength={2000}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>
                {errors.workInstructions && (
                  <span className="text-red-600">{errors.workInstructions}</span>
                )}
              </span>
              <span>{formData.workInstructions.length}/2000</span>
            </div>
          </div>

          {/* Project Planning Option */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Project Management</Label>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="plan"
                checked={formData.plan}
                onCheckedChange={(checked) => handleInputChange('plan', checked === true)}
                disabled={isLoading}
              />
              <Label htmlFor="plan" className="text-sm text-gray-700 cursor-pointer">
                Enable project planning and management features
              </Label>
            </div>
            <p className="text-xs text-gray-500 ml-6">
              This will allow project managers to create sprints, assign tasks, and track progress.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Create Project
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default ProjectForm
