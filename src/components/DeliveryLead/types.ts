import { DeliveryReport as PayloadDeliveryLeadSubmission } from '../../payload-types'

/**
 * RAG Status configuration for delivery lead submissions
 * Centralized configuration to ensure consistency across all components
 */
export const RAG_STATUS_OPTIONS = [
  { label: 'Not Started', value: 'Not-Started' },
  { label: 'On Track', value: 'On-Track' },
  { label: 'Delayed', value: 'Delayed' },
  { label: 'At Risk', value: 'At Risk' },
  { label: 'Delivered', value: 'Delivered' },
] as const

export type RagStatus = (typeof RAG_STATUS_OPTIONS)[number]['value']

/**
 * Color mapping for RAG status badges
 * Uses Tailwind CSS classes for consistent styling
 */
export const RAG_COLOR_MAP: Record<RagStatus, string> = {
  'Not-Started': 'bg-gray-100 text-gray-800 border-gray-200',
  'On-Track': 'bg-green-100 text-green-800 border-green-200',
  'Delayed': 'bg-red-100 text-red-800 border-red-200',
  'At Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  'Delivered': 'bg-blue-100 text-blue-800 border-blue-200',
}

/**
 * Get the display label for a RAG status value
 */
export const getRagStatusLabel = (value: RagStatus): string => {
  const option = RAG_STATUS_OPTIONS.find((opt) => opt.value === value)
  return option?.label ?? value
}

export interface Milestone {
  name: string
  commentary?: string | null
  dueDate?: string | null
  rag: RagStatus
  id?: string | null
}

/**
 * Data structure for submitting delivery lead reports
 * Uses our local Milestone type with new RAG status values
 */
export interface DeliveryLeadSubmissionData {
  customer: number
  project: number
  projectSummary: string
  milestones?: Milestone[] | null
  projectUpdate: string
  projectConcerns?: string | null
  commercialOpportunities?: string | null
  commercialRisks?: string | null
}

export type DeliveryLeadSubmissionPrefill = Partial<PayloadDeliveryLeadSubmission>

export interface DeliveryLeadSubmissionProps {
  onSubmit?: (
    formData: DeliveryLeadSubmissionData,
  ) => Promise<{ success: boolean; message: string }>
  isSubmitting?: boolean
  initialData?: DeliveryLeadSubmissionPrefill
}
