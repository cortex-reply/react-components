'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { ProjectCard } from './project-card'
import { ProjectForm } from './project-form'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import type { ProjectSummary, ProjectFormData, ProjectCreationData } from '../Foundary/types'

const AnimatedCircles = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
    className="relative h-40 w-40"
  >
    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-md" />
    <div className="absolute inset-4 rounded-full bg-white/20" />
    <div className="absolute inset-8 rounded-full bg-white/30" />
    <div className="absolute inset-12 rounded-full bg-white/40" />
    <div className="absolute inset-16 rounded-full bg-white/50" />
  </motion.div>
)

interface HomeProps {
  projects?: ProjectSummary[]
  onAddProject: (project: ProjectCreationData) => Promise<void>
  handleProjectOpen: (project: ProjectSummary) => void
  handleProjectShare: (project: ProjectSummary) => void
}

export default function Home({
  projects = [],
  onAddProject,
  handleProjectOpen,
  handleProjectShare,
}: HomeProps) {
  const [isNewProjectDialogOpen, setIsNewProjectDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateProject = async (formData: ProjectFormData) => {
    setIsSubmitting(true)
    try {
      await onAddProject(formData)
      setIsNewProjectDialogOpen(false)
    } catch (error) {
      console.error('Error creating project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleNewProjectClick = () => {
    setIsNewProjectDialogOpen(true)
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
          <DashboardHero
            title="Project Management"
            description="Organize your work into projects to collaborate with your team."
            gradient="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600"
            primaryAction={{
              label: 'New Project',
              onClick: handleNewProjectClick,
            }}
          />

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Active Projects</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpen={handleProjectOpen}
                  onShare={handleProjectShare}
                />
              ))}
            </div>
          </section>
        </motion.div>
      </AnimatePresence>

      {/* New Project Dialog */}
      <Dialog open={isNewProjectDialogOpen} onOpenChange={setIsNewProjectDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="sr-only">
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>Fill out the form below to create a new project.</DialogDescription>
          </DialogHeader>
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setIsNewProjectDialogOpen(false)}
            isLoading={isSubmitting}
            className="border-0 shadow-none"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
