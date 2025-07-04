"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { FaChevronDown, FaChevronUp } from "react-icons/fa"

interface HeroSectionProps {
  title: string
  description?: string
  badge?: string
  primaryAction?: {
    label: string
    onClick: () => void
  }
  secondaryAction?: {
    label: string
    onClick: () => void
  }
  gradient: string
  children?: React.ReactNode
  className?: string
}

export function HeroSection({
  title,
  description,
  badge,
  primaryAction,
  secondaryAction,
  gradient,
  children,
  className,
}: HeroSectionProps) {
  const [minimized, setMinimized] = useLocalStorage(
    `hero-section-minimized-${title.replace(/\s+/g, "-").toLowerCase()}`,
    !secondaryAction && !description ? true : false
  )

  // Always minimize if there's no content to expand to
  const shouldBeMinimized = (!secondaryAction && !description) || minimized

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`overflow-hidden rounded-3xl ${gradient} p-8 text-white ${className || ""}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          {badge && <Badge className="bg-white/20 text-white hover:bg-white/30 rounded-xl">{badge}</Badge>}
          <h2 className="text-3xl font-bold m-0">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {shouldBeMinimized && primaryAction && (
            <Button
              className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90"
              onClick={primaryAction.onClick}
            >
              {primaryAction.label}
            </Button>
          )}

          {(secondaryAction || description) && (
          <button
            aria-label={minimized ? "Expand hero section" : "Minimize hero section"}
            className="rounded-full bg-white/20 hover:bg-white/30 p-1 text-white transition-colors"
            onClick={() => setMinimized(!minimized)}
            style={{ lineHeight: 0 }}
          >
            {minimized ? <FaChevronDown size={22} /> : <FaChevronUp size={22} />}
          </button>
          )}
        </div>
      </div>
      {!shouldBeMinimized && (
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-4">
            {/* badge and title are now above */}
            <p className="max-w-[600px] text-white/80">{description}</p>
            <div className="flex flex-wrap gap-3">
              {primaryAction && (
                <Button
                  className="rounded-2xl bg-white text-indigo-700 hover:bg-white/90"
                  onClick={primaryAction.onClick}
                >
                  {primaryAction.label}
                </Button>
              )}
              {secondaryAction && (
                <Button
                  variant="outline"
                  className="rounded-2xl bg-transparent border-white text-white hover:bg-white/10"
                  onClick={secondaryAction.onClick}
                >
                  {secondaryAction.label}
                </Button>
              )}
            </div>
          </div>
          {children && <div className="hidden lg:block">{children}</div>}
        </div>
      )}
    </motion.div>
  )
}
