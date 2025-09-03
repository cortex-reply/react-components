"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { DashboardHero } from "../../Heros/DashboardHero/DashboardHero"
import { TeamCard } from "../../Projects/team-card"
import { type TeamSummary } from "../types"
import { TeamForm, type Team } from "../team-form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface TeamsIndexViewProps {
  teams?: TeamSummary[]
  onCreateTeam?: (team: Team) => void
  onTeamOpen?: (team: TeamSummary) => void
}

export default function TeamsIndexView({
  teams = [],
  onCreateTeam,
  onTeamOpen,
}: TeamsIndexViewProps) {
  const [isNewTeamDialogOpen, setIsNewTeamDialogOpen] = useState(false)

  const handleNewTeamClick = () => {
    setIsNewTeamDialogOpen(true)
  }

  const handleTeamSave = (team: Team) => {
    onCreateTeam?.(team)
    setIsNewTeamDialogOpen(false)
  }

  const handleTeamCancel = () => {
    setIsNewTeamDialogOpen(false)
  }

  const handleTeamOpen = (team: TeamSummary) => {
    onTeamOpen?.(team)
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="teams-index-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <DashboardHero
            title="My Teams"
            description="Collaborate with your human and digital colleagues across different teams and projects."
            gradient="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600"
            primaryAction={{
              label: "Create Team",
              onClick: handleNewTeamClick,
            }}
          />

          <section className="space-y-4 mt-8">
            <h2 className="text-2xl font-semibold">Active Teams</h2>
            {teams.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  You're not part of any teams yet.
                </p>
                <p className="text-muted-foreground text-sm mt-2">
                  Create a new team or ask to be added to an existing one.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                  <TeamCard
                    key={team.id}
                    team={team}
                    onOpen={handleTeamOpen}
                  />
                ))}
              </div>
            )}
          </section>
        </motion.div>
      </AnimatePresence>

      {/* New Team Dialog */}
      <Dialog open={isNewTeamDialogOpen} onOpenChange={setIsNewTeamDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
          <div className="sr-only">
            <DialogHeader>
              <DialogTitle>Create New Team</DialogTitle>
              <DialogDescription>
                Set up a new team to collaborate with colleagues on projects.
              </DialogDescription>
            </DialogHeader>
          </div>
          <TeamForm
            title="Create New Team"
            submitLabel="Create Team"
            onSave={handleTeamSave}
            onCancel={handleTeamCancel}
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
