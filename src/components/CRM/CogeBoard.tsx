'use client'

import React, { useState, useCallback } from 'react'
import type { BoardData, Deal, gecoStatus, CRMStatus, Customer, EditableDeal, PartialComment } from './types'
import { DealDetails } from './DealDetails'
import { KanbanColumn } from './KanbanColumn'
import {
  DragDropContext,
  type DropResult,
} from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'

const gcstatuses: gecoStatus[] = ['firm', 'forecast', 'other']
const statuses: CRMStatus[] = ['Cold', 'Qualified', 'Proposal Made', 'SoW Submitted', 'Won', 'Lost', 'Dormant']

type CogeBoardProps = {
  initialData: BoardData
  // onDragEnd: (result: DropResult) => void
  // addNewDeal: (newDeal: Deal) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  updateDeal: (updatedDeal: Partial<EditableDeal>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  addComment: (dealId: string, comment: PartialComment) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  // addNewCustomer: (newCustomer: Partial<Customer>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
}

export function CRMCogeBoard({
  initialData,
  // addNewDeal,
  updateDeal,
  addComment,
  // addNewCustomer,
}: CogeBoardProps) {
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  // const [boardData, setBoardData] = useState<BoardData>(initialData)

  const getColumnDeals = (status: gecoStatus) => {
  return (initialData.deals ?? [])
    .filter((deal) => deal.gecoStatus === status)
    .filter((deal) => deal.status !== 'Lost' )
    .filter((deal) => deal.status !== 'Cold' )
}

  const calculateColumnValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + (deal.value || 0), 0)
  }

  const calculateWeightedValue = (deals: Deal[], status: CRMStatus | gecoStatus) => {
    const weightMap: Record<CRMStatus, number> = {
      Cold: 0,
      Qualified: 0.1,
      'Proposal Made': 0.25,
      'SoW Submitted': 0.8,
      Won: 1,
      Lost: 0,
      Dormant: 0,
    }
    return deals.reduce((sum, deal) => sum + (deal.value || 0) * (weightMap[deal.status] ?? 0), 0)
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

      const sourceStatus = source.droppableId as gecoStatus
      const destinationStatus = destination.droppableId as gecoStatus
      // console.log('Moving from ', sourceStatus, 'to', destinationStatus)
      // find the deal with id source.index
      //
      let movedDeal = initialData.deals?.filter((deal) => deal.id === source.index)[0]
      // console.log('deal', movedDeal)

      const updatedDeals = [...(initialData.deals ?? [])]
      // const [movedDeal] = updatedDeals.splice(source.index, 1)
      if (movedDeal) {
        movedDeal.gecoStatus = destinationStatus
        // updatedDeals.splice(destination.index, 0, movedDeal)

        // Update the deal using the updateDeal function
        updateDeal(movedDeal as EditableDeal)
      }
    },
    [updateDeal],
  )

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="p-4 h-full overflow-auto">
        {/* <h1 className="text-3xl font-bold mb-8">Cortex Sales Pipeline</h1> */}
        <div className="flex space-x-4 pb-4">
          {gcstatuses
          
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
                  compact={true}
                />
              )
            })}
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
