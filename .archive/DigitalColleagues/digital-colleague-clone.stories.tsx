import React from "react";
import { DigitalColleagueClone } from "./digital-colleague-clone";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/react";
import type { DigitalColleague } from "./types";

// Mock digital colleagues data
const mockDigitalColleagues: DigitalColleague[] = [
  {
    id: "digital-template-1",
    type: "digital",
    name: "Content Creator Assistant",
    status: "active",
    joinedDate: new Date("2024-01-15"),
    lastActive: new Date("2024-12-01"),
    jobDescription: "AI assistant specialized in creating engaging content for various platforms including blog posts, social media, and marketing materials.",
    workInstructions: "Focus on brand voice consistency, SEO optimization, and audience engagement. Always fact-check information and cite sources when needed.",
    capabilities: ["Content Writing", "SEO Optimization", "Social Media", "Copywriting", "Research"],
    knowledge: [],
    coreKnowledge: [],
    version: "2.1.0",
    lastUpdated: new Date("2024-12-01"),
    isActive: true
  },
  {
    id: "digital-template-2", 
    type: "digital",
    name: "Code Review Bot",
    status: "active",
    joinedDate: new Date("2024-02-20"),
    lastActive: new Date("2024-12-01"),
    jobDescription: "Automated code review assistant that analyzes code quality, suggests improvements, and ensures coding standards compliance.",
    workInstructions: "Review code for best practices, security vulnerabilities, performance issues, and maintainability. Provide constructive feedback with examples.",
    capabilities: ["Code Analysis", "Security Review", "Performance Optimization", "Best Practices", "Documentation"],
    knowledge: [],
    coreKnowledge: [],
    version: "1.5.0",
    lastUpdated: new Date("2024-11-15"),
    isActive: true
  },
  {
    id: "digital-template-3",
    type: "digital", 
    name: "Customer Support Agent",
    status: "active",
    joinedDate: new Date("2024-03-10"),
    lastActive: new Date("2024-12-01"),
    jobDescription: "AI-powered customer support agent that handles common inquiries, troubleshooting, and escalates complex issues to human agents.",
    workInstructions: "Be empathetic, patient, and solution-focused. Always attempt to resolve issues before escalation. Maintain detailed interaction logs.",
    capabilities: ["Customer Service", "Troubleshooting", "Product Knowledge", "Ticket Management", "Escalation"],
    knowledge: [
      { id: "kb-1", title: "Product Manual", description: "Complete product documentation", format: "markdown", createdAt: new Date() },
      { id: "kb-2", title: "FAQ Database", description: "Common questions and answers", format: "markdown", createdAt: new Date() },
    ],
    coreKnowledge: [],
    version: "3.0.0",
    lastUpdated: new Date("2024-11-30"),
    isActive: true
  },
  {
    id: "digital-template-4",
    type: "digital",
    name: "Data Analyst",
    status: "inactive",
    joinedDate: new Date("2024-04-05"),
    lastActive: new Date("2024-10-15"),
    jobDescription: "Automated data analysis assistant that processes datasets, generates insights, and creates visualizations for business intelligence.",
    workInstructions: "Ensure data accuracy, follow privacy guidelines, and present findings in clear, actionable formats. Focus on business impact.",
    capabilities: ["Data Analysis", "SQL", "Python", "Visualization", "Statistics", "Machine Learning"],
    knowledge: [],
    coreKnowledge: [],
    version: "1.2.0",
    lastUpdated: new Date("2024-10-15"),
    isActive: false
  }
];

const meta: Meta<typeof DigitalColleagueClone> = {
  title: "Digital Colleagues/DigitalColleagueClone",
  component: DigitalColleagueClone,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DigitalColleagueClone>;

export const Default: Story = {
  args: {
    digitalColleagues: mockDigitalColleagues,
    onColleagueClone: action('onColleagueClone'),
    onCancel: action('onCancel'),
  },
};

export const WithSelectedColleague: Story = {
  args: {
    digitalColleagues: mockDigitalColleagues,
    onColleagueClone: action('onColleagueClone'),
    onCancel: action('onCancel'),
    selectedColleagueId: "digital-template-2",
  },
};

export const EmptyColleagues: Story = {
  args: {
    digitalColleagues: [],
    onColleagueClone: action('onColleagueClone'),
    onCancel: action('onCancel'),
  },
};
