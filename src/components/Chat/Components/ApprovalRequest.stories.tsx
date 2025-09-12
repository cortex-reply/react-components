import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { ApprovalRequestModal } from './ApprovalRequest'

const meta: Meta<typeof ApprovalRequestModal> = {
  title: 'Chat/Components/ApprovalRequestModal',
  component: ApprovalRequestModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A modal component for requesting user approval with a reason. Used when explicit confirmation is needed before proceeding with an action.'
      }
    }
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls whether the modal is visible'
    },
    reason: {
      control: 'text',
      description: 'The reason why approval is required (shown to the user)'
    },
    title: {
      control: 'text',
      description: 'The title of the modal'
    },
    onClose: {
      action: 'closed',
      description: 'Callback fired when the modal is closed'
    },
    onApprove: {
      action: 'approved',
      description: 'Callback fired when the user approves the action'
    },
    onDeny: {
      action: 'denied',
      description: 'Callback fired when the user denies the action'
    }
  }
}

export default meta
type Story = StoryObj<typeof ApprovalRequestModal>

export const Default: Story = {
  args: {
    isOpen: true,
    reason: 'This action will permanently delete all user data. Do you want to proceed?',
    onClose: action('onClose'),
    onApprove: action('onApprove'),
    onDeny: action('onDeny')
  }
}

export const FileOperation: Story = {
  args: {
    isOpen: true,
    reason: 'This will overwrite the existing file "document.pdf". This action cannot be undone.',
    title: 'File Overwrite Confirmation',
    onClose: action('onClose'),
    onApprove: action('onApprove'),
    onDeny: action('onDeny')
  }
}

export const DatabaseOperation: Story = {
  args: {
    isOpen: true,
    reason: 'You are about to execute a database migration that will affect 10,000+ records. This operation may take several minutes to complete.',
    title: 'Database Migration Approval',
    onClose: action('onClose'),
    onApprove: action('onApprove'),
    onDeny: action('onDeny')
  }
}

export const PaymentOperation: Story = {
  args: {
    isOpen: true,
    reason: 'You are about to process a payment of $1,250.00 to vendor "Acme Corp". Please confirm this transaction.',
    title: 'Payment Authorization',
    onClose: action('onClose'),
    onApprove: action('onApprove'),
    onDeny: action('onDeny')
  }
}

export const Closed: Story = {
  args: {
    isOpen: false,
    reason: 'This modal is closed and should not be visible',
    onClose: action('onClose'),
    onApprove: action('onApprove'),
    onDeny: action('onDeny')
  }
}
