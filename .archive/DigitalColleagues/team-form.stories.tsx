import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { expect, within, userEvent, waitFor } from '@storybook/test'
import { TeamForm, type Team } from './team-form'

const mockExistingTeam: Team = {
  id: 1,
  name: 'Product Development Team',
  description: 'Cross-functional team focused on developing innovative products.',
  systemMsg: 'This team follows agile methodology and focuses on user-centered design.',
  useProjects: true,
  useKnowledge: true,
  useFiles: false,
  useChat: true,
  updatedAt: '2024-02-27T10:30:00Z',
  createdAt: '2024-01-15T09:00:00Z',
}

const meta = {
  title: 'Digital Colleagues/TeamForm',
  component: TeamForm,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A simplified form for creating and editing teams with basic configuration options.',
      },
    },
  },
  argTypes: {
    team: {
      description: 'Optional existing team data for editing',
      control: 'object',
    },
    onSave: {
      description: 'Callback function called when the form is submitted',
      action: 'onSave',
    },
    onCancel: {
      description: 'Callback function called when the form is cancelled',
      action: 'onCancel',
    },
    isLoading: {
      description: 'Loading state of the form',
      control: 'boolean',
    },
    title: {
      description: 'Custom title for the form',
      control: 'text',
    },
    submitLabel: {
      description: 'Custom label for the submit button',
      control: 'text',
    },
    cancelLabel: {
      description: 'Custom label for the cancel button',
      control: 'text',
    },
    readOnly: {
      description: 'Whether the form is in read-only mode',
      control: 'boolean',
    },
  },
} satisfies Meta<typeof TeamForm>

export default meta
type Story = StoryObj<typeof meta>

// Base story with actions
export const Default: Story = {
  args: {
    onSave: action('onSave'),
    onCancel: action('onCancel'),
  },
}

// Story for creating a new team
export const CreateNewTeam: Story = {
  args: {
    ...Default.args,
    title: 'Create New Team',
    submitLabel: 'Create Team',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test form title
    await expect(canvas.getByText('Create New Team')).toBeInTheDocument()
    
    // Test form fields are present and editable
    const nameInput = canvas.getByLabelText('Team Name *')
    await expect(nameInput).toBeInTheDocument()
    await expect(nameInput).not.toBeDisabled()
    
    const descriptionTextarea = canvas.getByLabelText('Description')
    await expect(descriptionTextarea).toBeInTheDocument()
    await expect(descriptionTextarea).not.toBeDisabled()
    
    // Test submit button is present but disabled without name
    const submitButton = canvas.getByRole('button', { name: 'Create Team' })
    await expect(submitButton).toBeInTheDocument()
    await expect(submitButton).toBeDisabled()
  },
}

// Story for editing an existing team
export const EditExistingTeam: Story = {
  args: {
    ...Default.args,
    team: mockExistingTeam,
    title: 'Edit Team',
    submitLabel: 'Update Team',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test form is populated with existing data
    await expect(canvas.getByDisplayValue('Product Development Team')).toBeInTheDocument()
    await expect(canvas.getByDisplayValue('Cross-functional team focused on developing innovative products.')).toBeInTheDocument()
    
    // Test that enabled switches are checked
    const projectsSwitch = canvas.getByRole('switch', { name: 'Enable Projects' })
    await expect(projectsSwitch).toBeChecked()
    
    const knowledgeSwitch = canvas.getByRole('switch', { name: 'Enable Knowledge Base' })
    await expect(knowledgeSwitch).toBeChecked()
    
    const chatSwitch = canvas.getByRole('switch', { name: 'Enable Team Chat' })
    await expect(chatSwitch).toBeChecked()
    
    // Test that disabled switch is unchecked
    const filesSwitch = canvas.getByRole('switch', { name: 'Enable File Management' })
    await expect(filesSwitch).not.toBeChecked()
  },
}

// Story for read-only view
export const ReadOnlyView: Story = {
  args: {
    ...Default.args,
    team: mockExistingTeam,
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test form title shows view mode
    await expect(canvas.getByText('View Team')).toBeInTheDocument()
    
    // Test form fields are disabled
    const nameInput = canvas.getByDisplayValue('Product Development Team')
    await expect(nameInput).toBeDisabled()
    
    // Test edit button is present
    const editButton = canvas.getByRole('button', { name: 'Edit' })
    await expect(editButton).toBeInTheDocument()
    
    // Test close button instead of cancel
    const closeButton = canvas.getByRole('button', { name: 'Close' })
    await expect(closeButton).toBeInTheDocument()
  },
}

// Story for loading state
export const LoadingState: Story = {
  args: {
    ...Default.args,
    isLoading: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    
    // Test form fields are disabled during loading
    const nameInput = canvas.getByLabelText('Team Name *')
    await expect(nameInput).toBeDisabled()
    
    // Test buttons show loading state
    await expect(canvas.getByText('Saving...')).toBeInTheDocument()
  },
}

// Interactive story for testing form interactions
export const InteractiveFormTest: Story = {
  args: {
    ...Default.args,
    onSave: action('Team Saved'),
    onCancel: action('Form Cancelled'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // Fill in team name
    const nameInput = canvas.getByLabelText('Team Name *')
    await user.clear(nameInput)
    await user.type(nameInput, 'Test Team')
    await expect(nameInput).toHaveValue('Test Team')
    
    // Fill in description
    const descriptionTextarea = canvas.getByLabelText('Description')
    await user.type(descriptionTextarea, 'This is a test team for demonstration purposes.')
    await expect(descriptionTextarea).toHaveValue('This is a test team for demonstration purposes.')
    
    // Fill in ways of working
    const systemMsgTextarea = canvas.getByLabelText('Ways of working')
    await user.type(systemMsgTextarea, 'Follow best practices and collaborate effectively.')
    await expect(systemMsgTextarea).toHaveValue('Follow best practices and collaborate effectively.')
    
    // Toggle all configuration switches
    const projectsSwitch = canvas.getByRole('switch', { name: 'Enable Projects' })
    await user.click(projectsSwitch)
    await expect(projectsSwitch).toBeChecked()
    
    const knowledgeSwitch = canvas.getByRole('switch', { name: 'Enable Knowledge Base' })
    await user.click(knowledgeSwitch)
    await expect(knowledgeSwitch).toBeChecked()
    
    const filesSwitch = canvas.getByRole('switch', { name: 'Enable File Management' })
    await user.click(filesSwitch)
    await expect(filesSwitch).toBeChecked()
    
    const chatSwitch = canvas.getByRole('switch', { name: 'Enable Team Chat' })
    await user.click(chatSwitch)
    await expect(chatSwitch).toBeChecked()
    
    // Test that submit button is now enabled
    const submitButton = canvas.getByRole('button', { name: 'Create Team' })
    await expect(submitButton).not.toBeDisabled()
  },
}

// Story for testing configuration toggles
export const ConfigurationTogglesTest: Story = {
  args: {
    ...Default.args,
    onSave: action('Team Configuration Saved'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // Add team name first to enable submit
    const nameInput = canvas.getByLabelText('Team Name *')
    await user.type(nameInput, 'Configuration Test Team')
    
    // Test all configuration toggles
    const toggles = [
      { name: 'Enable Projects', initialState: false },
      { name: 'Enable Knowledge Base', initialState: false },
      { name: 'Enable File Management', initialState: false },
      { name: 'Enable Team Chat', initialState: false },
    ]
    
    // Test initial states (all should be unchecked for new team)
    for (const toggle of toggles) {
      const switchElement = canvas.getByRole('switch', { name: toggle.name })
      if (toggle.initialState) {
        await expect(switchElement).toBeChecked()
      } else {
        await expect(switchElement).not.toBeChecked()
      }
    }
    
    // Toggle each switch and verify state change
    for (const toggle of toggles) {
      const switchElement = canvas.getByRole('switch', { name: toggle.name })
      await user.click(switchElement)
      await expect(switchElement).toBeChecked()
      
      // Toggle back
      await user.click(switchElement)
      await expect(switchElement).not.toBeChecked()
    }
  },
}

// Story for testing form validation
export const FormValidationTest: Story = {
  args: {
    ...Default.args,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // Test that submit button is disabled when name is empty
    const submitButton = canvas.getByRole('button', { name: 'Create Team' })
    await expect(submitButton).toBeDisabled()
    
    // Add team name
    const nameInput = canvas.getByLabelText('Team Name *')
    await user.type(nameInput, 'Valid Team Name')
    
    // Test that submit button is now enabled
    await waitFor(() => {
      expect(submitButton).not.toBeDisabled()
    })
    
    // Clear the name and verify button is disabled again
    await user.clear(nameInput)
    await waitFor(() => {
      expect(submitButton).toBeDisabled()
    })
  },
}

// Story for testing edit mode toggle
export const EditModeToggleTest: Story = {
  args: {
    ...Default.args,
    team: mockExistingTeam,
    readOnly: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // Test initial read-only state
    const nameInput = canvas.getByDisplayValue('Product Development Team')
    await expect(nameInput).toBeDisabled()
    
    // Click edit button
    const editButton = canvas.getByRole('button', { name: 'Edit' })
    await user.click(editButton)
    
    // Test that form is now editable
    await waitFor(() => {
      expect(nameInput).not.toBeDisabled()
    })
    
    // Test that submit button is now visible
    await expect(canvas.getByRole('button', { name: 'Update Team' })).toBeInTheDocument()
  },
}

// Story for testing cancel functionality
export const CancelFunctionalityTest: Story = {
  args: {
    ...Default.args,
    onCancel: action('Form Cancelled - Data should be reset'),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const user = userEvent.setup()
    
    // Make some changes to the form
    const nameInput = canvas.getByLabelText('Team Name *')
    await user.type(nameInput, 'Changed Team Name')
    
    const descriptionTextarea = canvas.getByLabelText('Description')
    await user.type(descriptionTextarea, 'Changed description')
    
    // Click cancel button
    const cancelButton = canvas.getByRole('button', { name: 'Cancel' })
    await user.click(cancelButton)
    
    // The onCancel action should be triggered (visible in Actions tab)
  },
}
