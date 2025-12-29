import { DeliveryReport as PayloadDeliveryLeadSubmission } from '../../payload-types'

export interface DeliveryLeadSubmissionProps {
  onSubmit?: (
    formData: Omit<PayloadDeliveryLeadSubmission, 'id' | 'user' | 'updatedAt' | 'createdAt'>,
  ) => Promise<{ success: boolean; message: string }>
  isSubmitting?: boolean
  initialData?: DeliveryLeadSubmissionPrefill
}

export type DeliveryLeadSubmissionPrefill = Partial<PayloadDeliveryLeadSubmission>

export type DeliveryLeadSubmissionData = Omit<
  PayloadDeliveryLeadSubmission,
  'id' | 'user' | 'updatedAt' | 'createdAt'
>

export interface Milestone {
  name: string
  commentary?: string | null
  dueDate?: string | null
  rag: 'On-Track' | 'Off-Track' | 'At Risk' | 'Complete'
  id?: string | null
}
