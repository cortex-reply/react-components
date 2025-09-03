import React from "react";
import Home from "./dashboardpage";
import { 
  businessUnits, 
  mockProjectSummary, 
  mockSidebarItems, 
  mockColleagues,
  mockDigitalColleagues 
} from "../test-data";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Home> = {
  title: "Digital Colleagues/Pages/DashboardPage",
  component: Home,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    onCreateProject: { action: 'create project clicked' },
    onOpenProject: { action: 'open project clicked' },
    onColleagueAdd: { action: 'colleague added' },
    onColleagueEdit: { action: 'colleague edited' },
    onColleagueDelete: { action: 'colleague deleted' },
  },
};
export default meta;

type Story = StoryObj<typeof Home>;

// Default props for all stories
const defaultProps = {
  businessUnits,
  projects: mockProjectSummary,
  fileCount: 42,
  teamMemberCount: 8,
  sidebarItems: mockSidebarItems,
  initialColleagues: mockColleagues,
  users: mockColleagues.filter(c => c.type === 'human'),
  onCreateProject: () => console.log('Create project clicked'),
  onOpenProject: () => console.log('Open project clicked'),
  onColleagueAdd: () => console.log('Colleague added'),
  onColleagueEdit: () => console.log('Colleague edited'),
  onColleagueDelete: () => console.log('Colleague deleted'),
};

export const Default: Story = {
  render: () => <Home title="Nuvia" {...defaultProps} />,
};

export const CustomTitle: Story = {
  render: () => <Home title="Creative Workspace" {...defaultProps} />,
};

export const MinimalBusinessUnits: Story = {
  render: () => <Home title="Design Hub" {...defaultProps} businessUnits={businessUnits.slice(0, 2)} />,
};
