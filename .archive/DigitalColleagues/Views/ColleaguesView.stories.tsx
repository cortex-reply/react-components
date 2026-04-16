import React from "react";
import ColleaguesView from "./ColleaguesView";
import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from "@storybook/react";
import { businessUnits } from "../../DigitalColleagues/test-data";
import { 
  mockColleagues,
} from '../test-data';
import type { User } from "../../DigitalColleagues/types";
import type { DigitalColleague } from "../types";

// Mock users data
const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alice Johnson",
    email: "alice.johnson@company.com",
    role: "Senior Designer",
    department: "Design",
    avatar: "https://github.com/shadcn.png",
    skills: ["UI/UX Design", "Figma", "Prototyping", "User Research"],
    location: "San Francisco, CA",
    phone: "+1 (555) 123-4567",
    timezone: "PST",
    bio: "Passionate about creating user-centered designs that solve real problems."
  },
  {
    id: "user-2", 
    name: "Bob Chen",
    email: "bob.chen@company.com",
    role: "Full Stack Developer",
    department: "Engineering", 
    skills: ["React", "Node.js", "TypeScript", "PostgreSQL"],
    location: "Seattle, WA",
    timezone: "PST",
    bio: "Building scalable web applications with modern technologies."
  },
  {
    id: "user-3",
    name: "Carol Williams",
    email: "carol.williams@company.com", 
    role: "Marketing Manager",
    department: "Marketing",
    skills: ["Digital Marketing", "Content Strategy", "Analytics", "SEO"],
    location: "New York, NY",
    timezone: "EST",
    bio: "Data-driven marketer focused on growth and customer acquisition."
  },
  {
    id: "user-4",
    name: "David Rodriguez",
    email: "david.rodriguez@company.com",
    role: "Product Manager", 
    department: "Product",
    skills: ["Product Strategy", "Agile", "Analytics", "User Research"],
    location: "Austin, TX", 
    timezone: "CST",
    bio: "Building products that users love and businesses need."
  },
  {
    id: "user-5",
    name: "Emma Thompson",
    email: "emma.thompson@company.com",
    role: "Sales Representative",
    department: "Sales",
    skills: ["B2B Sales", "CRM", "Lead Generation", "Negotiation"],
    location: "Chicago, IL",
    timezone: "CST", 
    bio: "Helping businesses find the right solutions for their needs."
  }
];

// Mock existing digital colleagues for cloning
const mockExistingDigitalColleagues: DigitalColleague[] = [
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
    knowledge: [],
    coreKnowledge: [],
    version: "3.0.0",
    lastUpdated: new Date("2024-11-30"),
    isActive: true
  }
];

const meta: Meta<typeof ColleaguesView> = {
  title: "Digital Colleagues/Views/ColleaguesView",
  component: ColleaguesView,
  parameters: {
    layout: "fullscreen",
  },
};
export default meta;

type Story = StoryObj<typeof ColleaguesView>;

export const Default: Story = {
  args: {
    initialColleagues: mockColleagues,
    onColleagueAdd: action('onColleagueAdd'),
    onColleagueEdit: action('onColleagueEdit'),
    onColleagueDelete: action('onColleagueDelete'),
    compactView: false,
    departments: businessUnits.map(unit => unit.name),
    className: '',
    availableUsers: mockUsers,
    existingDigitalColleagues: mockExistingDigitalColleagues,
  },
};

export const EmptyState: Story = {
  args: {
    initialColleagues: [],
    onColleagueAdd: action('onColleagueAdd'),
    onColleagueEdit: action('onColleagueEdit'),
    onColleagueDelete: action('onColleagueDelete'),
    compactView: false,
    departments: businessUnits.map(unit => unit.name),
    availableUsers: mockUsers,
    existingDigitalColleagues: mockExistingDigitalColleagues,
  },
};

export const CompactView: Story = {
  args: {
    initialColleagues: mockColleagues,
    onColleagueAdd: action('onColleagueAdd'),
    onColleagueEdit: action('onColleagueEdit'),
    onColleagueDelete: action('onColleagueDelete'),
    compactView: true,
    departments: businessUnits.map(unit => unit.name),
    availableUsers: mockUsers,
    existingDigitalColleagues: mockExistingDigitalColleagues,
  },
};
