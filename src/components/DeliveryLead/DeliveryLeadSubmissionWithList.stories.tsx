import type { Meta, StoryObj } from '@storybook/react'
import { DeliveryLeadSubmissionWithList } from './DeliveryLeadSubmissionWithList'

const meta: Meta<typeof DeliveryLeadSubmissionWithList> = {
  title: 'DeliveryReport/DeliveryLeadSubmissionWithList',
  component: DeliveryLeadSubmissionWithList,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

const sampleSubmissions = [
  {
    id: '1',
    clientName: 'TechCorp Solutions',
    projectName: 'Digital Transformation Initiative',
    deliveryLead: 'Sarah Johnson',
    projectSummary:
      "A comprehensive digital transformation project aimed at modernizing TechCorp's legacy systems and improving customer experience through innovative technology solutions.",
    milestones: [
      {
        name: 'Requirements Gathering',
        commentary: 'Completed stakeholder interviews and documented business requirements',
        dueDate: '2024-01-15',
        rag: 'Complete',
      },
      {
        name: 'System Design',
        commentary:
          'Architecture design in progress, facing some challenges with legacy integration',
        dueDate: '2024-02-28',
        rag: 'At Risk',
      },
      {
        name: 'Development Phase 1',
        commentary: 'Core modules development started',
        dueDate: '2024-04-15',
        rag: 'On-Track',
      },
      {
        name: 'User Testing',
        commentary: 'Planned for Q2 2024',
        dueDate: '2024-06-30',
        rag: 'On-Track',
      },
    ],
    projectUpdate:
      'The project is progressing well with requirements gathering completed ahead of schedule. The system design phase has encountered some challenges with legacy system integration, but the team is working on solutions. Development resources have been allocated and Phase 1 development is on track to begin next month.',
    projectConcerns:
      'Integration challenges with legacy systems may cause delays in the design phase. Additional technical expertise may be required for the integration work.',
    commercialOpportunities:
      'TechCorp has expressed interest in additional consulting services for their data migration strategy. There are also opportunities for ongoing support and maintenance contracts.',
    commercialRisks:
      'The integration challenges could impact project timeline and budget. Need to monitor scope creep and ensure proper change management processes are followed.',
    submittedAt: '2024-01-10T10:30:00Z',
  },
  {
    id: '2',
    clientName: 'Global Retail Inc',
    projectName: 'E-commerce Platform Enhancement',
    deliveryLead: 'Michael Chen',
    projectSummary:
      "Enhancement of Global Retail's existing e-commerce platform to improve performance, add new features, and enhance the mobile shopping experience.",
    milestones: [
      {
        name: 'Performance Optimization',
        commentary: 'Database optimization completed, 40% improvement in load times',
        dueDate: '2024-01-31',
        rag: 'Complete',
      },
      {
        name: 'Mobile App Development',
        commentary: 'Development team expanded, progress is behind schedule',
        dueDate: '2024-03-15',
        rag: 'Off-Track',
      },
      {
        name: 'Payment Integration',
        commentary: 'New payment gateway integration in progress',
        dueDate: '2024-04-30',
        rag: 'On-Track',
      },
    ],
    projectUpdate:
      'Performance optimization phase has been completed successfully with significant improvements in page load times. However, the mobile app development is behind schedule due to resource constraints. The payment integration is progressing well and should be completed on time.',
    projectConcerns:
      'Mobile app development is behind schedule due to limited mobile development resources. May need to extend timeline or bring in additional developers.',
    commercialOpportunities:
      'Client is interested in ongoing platform maintenance and future enhancement projects. Potential for long-term partnership.',
    commercialRisks:
      'Schedule delays in mobile development could impact client satisfaction and future project opportunities.',
    submittedAt: '2024-01-08T14:15:00Z',
  },
  {
    id: '3',
    clientName: 'Healthcare Systems Ltd',
    projectName: 'Patient Management System',
    deliveryLead: 'Emily Rodriguez',
    projectSummary:
      'Development of a comprehensive patient management system for healthcare providers, including appointment scheduling, medical records, and billing integration.',
    milestones: [
      {
        name: 'Security Assessment',
        commentary: 'HIPAA compliance review completed successfully',
        dueDate: '2024-01-20',
        rag: 'Complete',
      },
      {
        name: 'Core Development',
        commentary: 'Patient portal and appointment scheduling modules completed',
        dueDate: '2024-02-28',
        rag: 'Complete',
      },
      {
        name: 'Integration Testing',
        commentary: 'Testing with existing hospital systems in progress',
        dueDate: '2024-03-31',
        rag: 'On-Track',
      },
      {
        name: 'Go-Live',
        commentary: 'Planned for April 2024',
        dueDate: '2024-04-15',
        rag: 'On-Track',
      },
    ],
    projectUpdate:
      'The project is progressing excellently with all major milestones completed on time. The security assessment passed all HIPAA compliance requirements. Core development is complete and integration testing is proceeding smoothly. The system is on track for successful go-live in April.',
    projectConcerns: 'No major concerns at this time. The project is well-managed and on schedule.',
    commercialOpportunities:
      'Healthcare Systems is interested in expanding the system to additional facilities. There are also opportunities for training and support services.',
    commercialRisks: 'Minimal risks at this stage. The project is well-positioned for success.',
    submittedAt: '2024-01-05T09:45:00Z',
  },
]

const handleSubmit = async (formData: any) => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return { success: true, message: 'Delivery lead submitted successfully' }
}

export const Default: Story = {
  args: {
    submissions: sampleSubmissions,
    onSubmit: handleSubmit,
    isLoading: false,
  },
}

export const Empty: Story = {
  args: {
    submissions: [],
    onSubmit: handleSubmit,
    isLoading: false,
  },
}

export const Loading: Story = {
  args: {
    submissions: [],
    onSubmit: handleSubmit,
    isLoading: true,
  },
}

export const SingleSubmission: Story = {
  args: {
    submissions: [sampleSubmissions[0]],
    onSubmit: handleSubmit,
    isLoading: false,
  },
}
