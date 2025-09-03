"use client"

import { Bot, ChevronLeft, Copy, Plus, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion, AnimatePresence } from "motion/react"

interface DigitalColleagueOptionsProps {
  onCloneExisting: () => void
  onCreateNew: () => void
  onCancel: () => void
}

export function DigitalColleagueOptions({
  onCloneExisting,
  onCreateNew,
  onCancel,
}: DigitalColleagueOptionsProps) {
  return (
    <div className="px-2 md:px-4 py-4 space-y-6">
      <AnimatePresence mode="wait">
        <motion.div
          key="digital-colleague-options"
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
              <h1 className="text-3xl font-bold">Add Digital Colleague</h1>
              <p className="text-muted-foreground">Choose how to create your digital colleague</p>
            </div>
          </div>

          {/* Options Cards */}
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg border-2 hover:border-primary/50"
                onClick={onCloneExisting}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Copy className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">Clone Existing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Start with an existing digital colleague and customize it for your needs.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Bot className="h-4 w-4 text-blue-600" />
                      <span>Pre-configured capabilities</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Copy className="h-4 w-4 text-blue-600" />
                      <span>Inherit knowledge base</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" onClick={onCloneExisting}>
                    Browse & Clone
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
                onClick={onCreateNew}
              >
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">Create New</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-4">
                    Build a completely new digital colleague from scratch with custom specifications.
                  </p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <Plus className="h-4 w-4 text-green-600" />
                      <span>Custom job description</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Sparkles className="h-4 w-4 text-green-600" />
                      <span>Define unique capabilities</span>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" onClick={onCreateNew}>
                    Create from Scratch
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
