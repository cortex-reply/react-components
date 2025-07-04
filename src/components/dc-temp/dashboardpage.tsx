"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreativeLayout } from "./creative-layout"
import { HeroSection } from "./hero-section"
import { AppCard } from "./app-card"
import { FileList } from "./file-list"
import { ProjectCard } from "./project-card"
import { type BusinessUnit } from "./business-units"
import {
  mockSidebarItems,
  mockApps,
  mockRecentFiles,
  mockProjects,
  mockTutorials,
  mockNotifications,
} from "./mock-data"
import type { App, RecentFile, Project } from "./types"
import { ColleaguesManagement } from "./colleagues-management"

const AnimatedCircles = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
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
  title?: string
  businessUnits: BusinessUnit[]
}

export default function Home({ title = "Digital Colleagues", businessUnits }: HomeProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [currentBusinessUnit, setCurrentBusinessUnit] = useState<BusinessUnit>(businessUnits[0]) // Default to Design

  // Mock handlers
  const handleAppOpen = (app: App) => {
    console.log("Opening app:", app.name)
  }

  const handleAppFavorite = (app: App) => {
    console.log("Favoriting app:", app.name)
  }

  const handleFileClick = (file: RecentFile) => {
    console.log("Opening file:", file.name)
  }

  const handleFileShare = (file: RecentFile) => {
    console.log("Sharing file:", file.name)
  }

  const handleProjectOpen = (project: Project) => {
    console.log("Opening project:", project.name)
  }

  const handleProjectShare = (project: Project) => {
    console.log("Sharing project:", project.name)
  }

  const handleBusinessUnitChange = (unit: BusinessUnit) => {
    setCurrentBusinessUnit(unit)
    console.log("Business unit changed to:", unit.name)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="space-y-8">
            {/* Hero Section */}
            <section className="text-center py-12">
              <h1 className="text-4xl font-bold mb-4">Welcome to {title}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your collaborative workspace for creativity and productivity
              </p>
            </section>

            {/* Quick Stats */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Projects</h3>
                <p className="text-3xl font-bold text-primary">12</p>
                <p className="text-sm text-muted-foreground">Active projects</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Team Members</h3>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-sm text-muted-foreground">Collaborators</p>
              </div>
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-2">Files</h3>
                <p className="text-3xl font-bold text-primary">156</p>
                <p className="text-sm text-muted-foreground">Shared files</p>
              </div>
            </section>
            <HeroSection
              title={`Chat with ${title}`}
              // description={`Chat with ${title}.`}
              gradient="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600"
              primaryAction={{
                label: "Go",
                onClick: () => setActiveTab('assistant'),
              }}
            />
          </div>
        )
      case "colleagues":
        return <ColleaguesManagement />
      case "apps":
        return (
          <div className="space-y-8">
            <HeroSection
              title="Creative Apps Collection"
              description="Discover our full suite of professional design and creative applications."
              gradient="bg-gradient-to-r from-pink-600 via-red-600 to-orange-600"
              primaryAction={{
                label: "Install Desktop App",
                onClick: () => console.log("Install desktop app clicked"),
              }}
            />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">New Releases</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {mockApps
                  .filter((app) => app.new)
                  .map((app) => (
                    <AppCard
                      key={app.name}
                      app={app}
                      showProgress={true}
                      onOpen={handleAppOpen}
                      onFavorite={handleAppFavorite}
                    />
                  ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">All Apps</h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {mockApps.map((app) => (
                  <AppCard key={app.name} app={app} onOpen={handleAppOpen} onFavorite={handleAppFavorite} />
                ))}
              </div>
            </section>
          </div>
        )
      case "files":
        return (
          <div className="space-y-8">
            <HeroSection
              title="Your Creative Files"
              description="Access, manage, and share all your design files in one place."
              gradient="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600"
              primaryAction={{
                label: "Upload Files",
                onClick: () => console.log("Upload files clicked"),
              }}
            />

            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold">All Files</h2>
              </div>

              <FileList files={mockRecentFiles} onFileClick={handleFileClick} onShare={handleFileShare} />
            </section>
          </div>
        )
      case "projects":
        return (
          <div className="space-y-8">
            <HeroSection
              title="Project Management"
              description="Organize your creative work into projects and collaborate with your team."
              gradient="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600"
              primaryAction={{
                label: "New Project",
                onClick: () => console.log("New project clicked"),
              }}
            />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Active Projects</h2>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {mockProjects.map((project) => (
                  <ProjectCard
                    key={project.name}
                    project={project}
                    onOpen={handleProjectOpen}
                    onShare={handleProjectShare}
                  />
                ))}
              </div>
            </section>
          </div>
        )
      case "learn":
        return (
          <div className="space-y-8">
            <HeroSection
              title="Learn & Grow"
              description="Expand your creative skills with tutorials, courses, and resources."
              gradient="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600"
              primaryAction={{
                label: "Upgrade to Pro",
                onClick: () => console.log("Upgrade to pro clicked"),
              }}
            />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">Featured Tutorials</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mockTutorials.slice(0, 3).map((tutorial) => (
                  <div key={tutorial.title} className="rounded-3xl border p-6">
                    <h3 className="font-semibold mb-2">{tutorial.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{tutorial.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span>{tutorial.duration}</span>
                      <span>{tutorial.level}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <CreativeLayout
      sidebarItems={mockSidebarItems}
      title={title}
      notifications={mockNotifications}
      businessUnits={businessUnits}
      currentBusinessUnit={currentBusinessUnit}
      onBusinessUnitChange={handleBusinessUnitChange}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      showTabs={true}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </AnimatePresence>
    </CreativeLayout>
  )
}
