"use client"

import { User, Bot, ChevronLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"

interface ColleagueTypeSelectionProps {
  onSelectHuman: () => void
  onSelectDigital: () => void
  onCancel: () => void
}

export function ColleagueTypeSelection({
  onSelectHuman,
  onSelectDigital,
  onCancel,
}: ColleagueTypeSelectionProps) {
  return (
    <div className="px-2 md:px-4 py-4 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="colleague-type-selection"
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
              <h1 className="text-3xl font-bold">Add Colleague</h1>
              <p className="text-muted-foreground">Choose the type of colleague to add</p>
            </div>
          </div>

          {/* Selection Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
                onClick={onSelectHuman}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <User className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Add Human Colleague</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Select from existing users in your organization to add as team members.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Users className="h-4 w-4 text-blue-600" />
                      <span>Browse existing users</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <User className="h-4 w-4 text-blue-600" />
                      <span>Import user details automatically</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" onClick={onSelectHuman}>
                    Select User
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
                onClick={onSelectDigital}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">Add Digital Colleague</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Clone an existing digital colleague or create a new AI assistant for your team.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Bot className="h-4 w-4 text-purple-600" />
                      <span>Clone existing colleagues</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span>Create from templates</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" onClick={onSelectDigital}>
                    Add Digital Colleague
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
