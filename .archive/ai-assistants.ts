import type { AIAssistantType } from "../DigitalColleagues/types"

export const aiAssistants: AIAssistantType[] = [
  {
    id: "design",
    name: "Design Assistant",
    description: "Powered by Designali AI",
    avatarFallback: "DA",
    welcomeMessage: "Hi there! I'm your design assistant. How can I help you today?",
    accentColor: "bg-primary",
  },
  {
    id: "copilot",
    name: "Copilot",
    description: "Development assistant",
    avatarFallback: "CP",
    welcomeMessage: "Hello! I'm Copilot, your coding assistant. What are you working on today?",
    accentColor: "bg-blue-600",
  },
  {
    id: "hr",
    name: "HR Assistant",
    description: "Human resources support",
    avatarFallback: "HR",
    welcomeMessage: "Welcome! I'm your HR assistant. How can I help you with HR-related questions?",
    accentColor: "bg-purple-600",
  },
  {
    id: "it",
    name: "IT Support",
    description: "Technical assistance",
    avatarFallback: "IT",
    welcomeMessage: "Hi there! I'm your IT support assistant. Having technical issues I can help with?",
    accentColor: "bg-emerald-600",
  },
]
