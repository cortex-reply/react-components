'use client'

import React, { useState, useCallback } from 'react'
import type { BoardData, Deal, CRMStatus, Customer, EditableDeal, PartialComment } from './types'
import { DealDetails } from './DealDetails'
import { KanbanColumn } from './KanbanColumn'
import {
  DragDropContext,
  type DropResult,
} from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'

export const statuses: CRMStatus[] = [
  'Cold',
  'Qualified',
  'Proposal Made',
  'SoW Submitted',
  'Won',
  'Lost',
]

type KanbanBoardProps = {
  initialData: BoardData
  // onDragEnd: (result: DropResult) => void
  addNewDeal: (newDeal: Deal) => Promise<{ success: boolean; errors?: Record<string, string> }>
  updateDeal: (
    updatedDeal: Partial<EditableDeal>,
  ) => Promise<{ success: boolean; errors?: Record<string, string> }>
  addComment: (
    dealId: string,
    comment: PartialComment,
  ) => Promise<{ success: boolean; errors?: Record<string, string> }>
  addNewCustomer: (
    newCustomer: Partial<Customer>,
  ) => Promise<{ success: boolean; errors?: Record<string, string> }>
}

export function CRMKanbanBoard({
  initialData,
  addNewDeal,
  updateDeal,
  addComment,
  addNewCustomer,
}: KanbanBoardProps) {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  // const [boardData, setBoardData] = useState<BoardData>(initialData)

  const getColumnDeals = (status: CRMStatus) => {
    return (initialData.deals ?? []).filter((deal) => deal.status === status)
  }

  const calculateColumnValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  }

  const calculateWeightedValue = (deals: Deal[], status: CRMStatus) => {
    const weightMap: { [key in CRMStatus]: number } = {
      Cold: 0.2,
      Qualified: 0.4,
      'Proposal Made': 0.6,
      'SoW Submitted': 0.7,
      Won: 1,
      Lost: 0,
    }
    return deals.reduce((sum, deal) => sum + (deal.value || 0) * weightMap[status], 0)
  }

  const onDragEnd = useCallback(
    (result: DropResult) => {
      const { source, destination } = result
      // console.log('onDragEnd', result, destination)
      if (!destination) {
        return
      }

      if (source.droppableId === destination.droppableId && source.index === destination.index) {
        return
      }

      const sourceStatus = source.droppableId as CRMStatus
      const destinationStatus = destination.droppableId as CRMStatus
      // console.log('Moving from ', sourceStatus, 'to', destinationStatus)
      // find the deal with id source.index
      //
      let movedDeal = initialData.deals?.filter((deal) => deal.id === source.index)[0]
      // console.log('deal', movedDeal)

      const updatedDeals = [...(initialData.deals ?? [])]
      // const [movedDeal] = updatedDeals.splice(source.index, 1)
      if (movedDeal) {
        movedDeal.status = destinationStatus
        // updatedDeals.splice(destination.index, 0, movedDeal)

        // Update the deal using the updateDeal function
        updateDeal(movedDeal as EditableDeal)
      }
    },
    [updateDeal],
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4">
        <div className="flex flex-col">
          <div className="flex flex-row">
            {statuses
              .filter((status) => status !== 'Won' && status !== 'Lost')
              .map((status) => {
                return (
                  <div key={status} className="w-80">
                    <h2 className="text-xl font-semibold mb-7">{status}</h2>
                  </div>
                )
              })}
          </div>

          <div className="flex flex-row h-[80vh] overflow-y-auto">
            {statuses
              .filter((status) => status !== 'Won' && status !== 'Lost')
              .map((status) => {
                const deals = getColumnDeals(status)
                return (
                  <KanbanColumn
                    key={status}
                    status={status}
                    deals={deals}
                    customers={initialData.customers ?? []}
                    users={initialData.users}
                    categories={initialData.categories ?? []}
                    onDealClick={setSelectedDeal}
                    calculateColumnValue={calculateColumnValue}
                    calculateWeightedValue={calculateWeightedValue}
                    addNewDeal={status === 'Cold' ? addNewDeal : undefined}
                    onAddCustomer={addNewCustomer}
                  />
                )
              })}
          </div>

          <div className="flex flex-row">
            {statuses
              .filter((status) => status !== 'Won' && status !== 'Lost')
              .map((status) => {
                const deals = getColumnDeals(status)
                return (
                  <div className="w-80 mt-4 text-sm bg-white p-3 rounded-lg shadow">
                    <p className="font-semibold">
                      Total:{' '}
                      <span className="text-green-600">
                        £{calculateColumnValue(deals).toLocaleString()}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Weighted:{' '}
                      <span className="text-blue-600">
                        £{calculateWeightedValue(deals, status).toLocaleString()}
                      </span>
                    </p>
                  </div>
                )
              })}
          </div>
        </div>

        {selectedDeal && (
          <DealDetails
            deal={selectedDeal}
            users={initialData.users}
            customer={selectedDeal.customer as Customer}
            categories={initialData.categories ?? []}
            onClose={() => setSelectedDeal(null)}
            onSave={updateDeal}
            onAddComment={(comment) => addComment(selectedDeal.id.toString(), comment)}
          />
        )}
      </div>
    </DragDropContext>
  )
}
