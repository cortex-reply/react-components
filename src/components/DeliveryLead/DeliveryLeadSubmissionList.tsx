'use client'
import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  FileText,
  ListChecks,
  AlertTriangle,
  Users,
  Briefcase,
  ShieldAlert,
  Calendar,
  User,
  Building,
  X,
} from 'lucide-react'
import { DeliveryReport } from '@/payload-types'

export interface DeliveryLeadSubmissionListProps {
  submissions: DeliveryReport[]
  isLoading?: boolean
}

const ragColorMap = {
  'On-Track': 'bg-green-100 text-green-800 border-green-200',
  'Off-Track': 'bg-red-100 text-red-800 border-red-200',
  'At Risk': 'bg-yellow-100 text-yellow-800 border-yellow-200',
  Complete: 'bg-blue-100 text-blue-800 border-blue-200',
}

export function DeliveryLeadSubmissionList({
  submissions,
  isLoading = false,
}: DeliveryLeadSubmissionListProps) {
  const [selectedSubmission, setSelectedSubmission] = useState<string | null>(null)

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedSubmission(null)
      }
    }

    if (selectedSubmission) {
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }
  }, [selectedSubmission])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  const selectedSubmissionData = submissions.find((s) => s.id.toString() === selectedSubmission)

  // Helper functions to get project and customer names
  function getProjectName(project: number | { projectName: string; id: number }) {
    if (typeof project === 'object' && project !== null && 'projectName' in project) {
      return project.projectName
    }
    return `Project #${project}`
  }

  function getCustomerName(customer: number | { name: string; id: number }) {
    if (typeof customer === 'object' && customer !== null && 'name' in customer) {
      return customer.name
    }
    return `Customer #${customer}`
  }

  if (isLoading) {
    return (
      <div className="mx-auto p-4 max-w-6xl">
        <div className="rounded-xl shadow-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (submissions.length === 0) {
    return (
      <div className="mx-auto p-4 max-w-6xl">
        <div className="rounded-xl shadow-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6">
          <div className="text-center py-12">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-zinc-100">
              No submissions found
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-zinc-400">
              There are no submitted delivery reports yet.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="mx-auto p-4 max-w-6xl">
        <div className="rounded-xl shadow-lg bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 p-6">
          {/* <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-zinc-100">
              Delivery Lead Reports
            </h2>
            <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1">
              View all your submitted delivery lead reports
            </p>
          </div> */}

          <div className="overflow-y-auto max-h-96">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
              <thead className="bg-gray-50 dark:bg-zinc-800 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Project Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Delivery Lead
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Milestones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-zinc-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-700">
                {submissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-zinc-100">
                          {getProjectName(submission.project)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                          <Building className="h-3 w-3" />
                          {getCustomerName(submission.customer)}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 dark:text-zinc-100 flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {/* Show delivery lead name if available on project object, else fallback */}
                        {typeof submission.project === 'object' && submission.project !== null && 'deliveryLead' in submission.project && typeof submission.project.deliveryLead === 'object' && submission.project.deliveryLead !== null && 'name' in submission.project.deliveryLead
                          ? submission.project.deliveryLead.name
                          : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {submission.milestones?.slice(0, 3).map((milestone, idx) => (
                          <span
                            key={idx}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${ragColorMap[milestone.rag]}`}
                          >
                            {milestone.rag}
                          </span>
                        ))}
                        {submission.milestones && submission.milestones.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            +{submission.milestones.length - 3} more
                          </span>
                        )}
                        {!submission.milestones && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                            No milestones
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500 dark:text-zinc-400 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(submission.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedSubmission(submission.id.toString())}
                        className="text-accent hover:text-accent/80"
                      >
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedSubmissionData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-zinc-100">
                  {getProjectName(selectedSubmissionData.project)}
                </h2>
                <p className="text-sm text-gray-500 dark:text-zinc-400">
                  {getCustomerName(selectedSubmissionData.customer)} •{' '}
                  {formatDate(selectedSubmissionData.createdAt)}
                </p>
              </div>
              <button
                onClick={() => setSelectedSubmission(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-zinc-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Project Summary */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    Project Summary
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                    {selectedSubmissionData.projectSummary}
                  </p>
                </div>

                {/* Project Update */}
                <div>
                  <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    Project Update
                  </Label>
                  <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                    {selectedSubmissionData.projectUpdate}
                  </p>
                </div>

                {/* Project Concerns */}
                {selectedSubmissionData.projectConcerns && (
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" />
                      Project Concerns
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                      {selectedSubmissionData.projectConcerns}
                    </p>
                  </div>
                )}

                {/* Commercial Opportunities */}
                {selectedSubmissionData.commercialOpportunities && (
                  <div>
                    <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                      <Briefcase className="h-4 w-4" />
                      Commercial Opportunities
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                      {selectedSubmissionData.commercialOpportunities}
                    </p>
                  </div>
                )}

                {/* Commercial Risks */}
                {selectedSubmissionData.commercialRisks && (
                  <div className="lg:col-span-2">
                    <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                      <ShieldAlert className="h-4 w-4" />
                      Commercial Risks
                    </Label>
                    <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                      {selectedSubmissionData.commercialRisks}
                    </p>
                  </div>
                )}
              </div>

              {/* Milestones */}
              <div>
                <Label className="text-sm font-semibold text-gray-700 dark:text-zinc-300 mb-2 flex items-center gap-1">
                  <ListChecks className="h-4 w-4" />
                  Milestones
                </Label>
                {selectedSubmissionData.milestones &&
                selectedSubmissionData.milestones.length > 0 ? (
                  <div className="bg-gray-50 dark:bg-zinc-800 rounded-lg border overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-700">
                      <thead className="bg-gray-100 dark:bg-zinc-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Name
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Commentary
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Due Date
                          </th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-zinc-400">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-zinc-700">
                        {selectedSubmissionData.milestones.map((milestone, idx) => (
                          <tr key={idx}>
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-zinc-100">
                              {milestone.name}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-zinc-400">
                              {milestone.commentary || '-'}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-600 dark:text-zinc-400">
                              {milestone.dueDate ? formatDate(milestone.dueDate) : '-'}
                            </td>
                            <td className="px-4 py-2">
                              <span
                                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${ragColorMap[milestone.rag]}`}
                              >
                                {milestone.rag}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-zinc-400 bg-gray-50 dark:bg-zinc-800 p-3 rounded-lg border">
                    No milestones defined for this project.
                  </p>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-200 dark:border-zinc-700">
              <Button onClick={() => setSelectedSubmission(null)} variant="outline">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
