import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import type { Deal, CRMStatus, gecoStatus, DealCategory, Customer, User } from './types'
import { DealCard } from './DealCard'
import { Droppable, Draggable } from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { NewDealForm } from './NewDealForm'

type KanbanColumnProps = {
  status: CRMStatus | gecoStatus
  deals: Deal[]
  users?: User[]
  customers: Customer[]
  categories: DealCategory[]
  onDealClick: (deal: Deal) => void
  calculateColumnValue: (deals: Deal[]) => number
  calculateWeightedValue: (deals: Deal[], status: CRMStatus | gecoStatus ) => number
  // addNewDeal?: (deal: Deal) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  // onAddCustomer?: (customer: Partial<Customer>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  compact?: boolean

}

export function KanbanColumn({
  status,
  deals,
  users,
  customers,
  categories,
  onDealClick,
  calculateColumnValue,
  calculateWeightedValue,
  // addNewDeal,
  // onAddCustomer,
  compact = false,
}: KanbanColumnProps) {
  // const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <div className="flex flex-col w-80 h-full">
      <h2 className="text-xl font-semibold mb-4 flex-shrink-0">  {status.charAt(0).toUpperCase() + status.slice(1)}</h2>
      {/* {addNewDeal && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mb-4 w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Deal
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <NewDealForm
              customers={customers}
              users={users}
              categories={categories}
              onSubmit={addNewDeal}
              onAddCustomer={onAddCustomer ?? (async () => Promise.resolve({ success: false }))}
              onClose={() => setIsDialogOpen(false)} // Pass the onClose prop to NewDealForm
            />
          </DialogContent>
        </Dialog>
      )} */}
      <Droppable droppableId={status} isDropDisabled={false}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-background/90 p-4 rounded-lg flex-1 min-h-0 overflow-y-auto shadow-inner scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {deals.map((deal, index) => (
              <Draggable key={deal.id.toString()} draggableId={deal.id.toString()} index={deal.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <DealCard
                      deal={deal}
                      customer={deal.customer as Customer}
                      categories={categories}
                      onClick={() => onDealClick(deal)}
                      compact={compact}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <div className="text-sm p-3 rounded-lg shadow flex-shrink-0 mt-auto">
        <p className="font-semibold">
          Total:{' '}
          <span className="text-green-600">£{calculateColumnValue(deals).toLocaleString()}</span>
        </p>
        <p className="font-semibold">
          Weighted:{' '}
          <span className="text-blue-600">
            £{calculateWeightedValue(deals, status).toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  )
}
