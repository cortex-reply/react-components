"use client"

import type { Meta, StoryObj } from "@storybook/react"
import { motion } from "framer-motion"
import { HeroSection } from "./hero-section"

const meta: Meta<typeof HeroSection> = {
  title: "DC/HeroSection",
  component: HeroSection,
  parameters: {
    layout: "padded",
  },
}

export default meta
type Story = StoryObj<typeof HeroSection>

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

export const Default: Story = {
  args: {
    title: "Welcome to Digital Colleagues Suite",
    description: "Unleash your creativity with our comprehensive suite of professional design tools and resources.",
    badge: "Premium",
    gradient: "bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600",
    primaryAction: {
      label: "Explore Plans",
      onClick: () => console.log("Explore plans clicked"),
    },
    secondaryAction: {
      label: "Take a Tour",
      onClick: () => console.log("Take a tour clicked"),
    },
    children: <AnimatedCircles />,
  },
}

export const WithoutBadge: Story = {
  args: {
    title: "Creative Apps Collection",
    description: "Discover our full suite of professional design and creative applications.",
    gradient: "bg-gradient-to-r from-pink-600 via-red-600 to-orange-600",
    primaryAction: {
      label: "Install Desktop App",
      onClick: () => console.log("Install app clicked"),
    },
  },
}

export const MinimalActions: Story = {
  args: {
    title: "Your Creative Files",
    description: "Access, manage, and share all your design files in one place.",
    gradient: "bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600",
    primaryAction: {
      label: "Upload Files",
      onClick: () => console.log("Upload files clicked"),
    },
  },
}

export const Minimized: Story = {
  args: {
    title: "Minimizable Hero",
    description: "This hero section can be minimized and will remember its state.",
    badge: "New",
    gradient: "bg-gradient-to-r from-green-600 via-lime-600 to-yellow-600",
    primaryAction: {
      label: "Try Now",
      onClick: () => console.log("Try Now clicked"),
    },
    secondaryAction: {
      label: "Learn More",
      onClick: () => console.log("Learn More clicked"),
    },
    children: <AnimatedCircles />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The hero section can be minimized using the button in the header. The minimized state is remembered in localStorage.",
      },
    },
  },
}


export const OnlyAction: Story = {
  args: {
    title: "Your Creative Files",
    gradient: "bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600",
    primaryAction: {
      label: "Upload Files",
      onClick: () => console.log("Upload files clicked"),
    },
  },
}