import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { PlusCircle } from 'lucide-react'
import type { Deal, CRMStatus, DealCategory, Customer, User } from './types'
import { DealCard } from './DealCard'
import {
  Droppable,
  Draggable,
} from '@atlaskit/pragmatic-drag-and-drop-react-beautiful-dnd-migration'
import { NewDealForm } from './NewDealForm'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui'

type KanbanColumnProps = {
  status: CRMStatus
  deals: Deal[]
  users?: User[]
  customers: Customer[]
  categories: DealCategory[]
  onDealClick: (deal: Deal) => void
  calculateColumnValue: (deals: Deal[]) => number
  calculateWeightedValue: (deals: Deal[], status: CRMStatus) => number
  addNewDeal?: (deal: Deal) => Promise<{ success: boolean; errors?: Record<string, string> }>
  onAddCustomer: (
    customer: Partial<Customer>,
  ) => Promise<{ success: boolean; errors?: Record<string, string> }>
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
  addNewDeal,
  onAddCustomer,
}: KanbanColumnProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <>
      {addNewDeal && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button className="absolute top-14 left-2 bg-green-600 text-white p-2 rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center justify-center w-9 h-9">
                    <PlusCircle className="w-6 h-6" />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>Add new deal</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Deal</DialogTitle>
            </DialogHeader>
            <NewDealForm
              customers={customers}
              users={users}
              categories={categories}
              onSubmit={addNewDeal}
              onAddCustomer={onAddCustomer}
              onClose={() => setIsDialogOpen(false)} // Pass the onClose prop to NewDealForm
            />
          </DialogContent>
        </Dialog>
      )}

      <Droppable droppableId={status} isDropDisabled={false}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="bg-gray-100 p-4 rounded-lg flex-grow  shadow-inner"
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
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  )
}
