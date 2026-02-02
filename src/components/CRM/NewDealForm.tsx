import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { NewCustomerForm } from './NewCustomerForm'
import type { Customer, DealCategory, Deal, EditableDeal } from './types'
import type { User } from '@/payload-types'

type NewDealFormProps = {
  customers: Customer[]
  users?: User[]
  categories: DealCategory[]
  onSubmit: (deal: Deal) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  onClose?: () => void
  onAddCustomer: (newCustomer: Partial<Customer>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  initialDeal?: Deal
}

export function NewDealForm({
  customers,
  users,
  categories,
  onSubmit,
  initialDeal,
  onAddCustomer,
  onClose,
}: NewDealFormProps) {
  const [deal, setDeal] = useState<Partial<EditableDeal>>(
    (initialDeal as Partial<EditableDeal>) || {
      customer: undefined,
      value: 0,
      assignee: undefined,
      status: 'Cold',
      categories: [],
      dateLogged: new Date().toISOString().split('T')[0],
      closureDate: '',
      // lastModified: new Date().toISOString(),
      comments: [],
      description: '',
    },
  )
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (initialDeal) {
      setDeal(initialDeal as Partial<EditableDeal>)
    }
  }, [initialDeal])

  const validate = () => {
    const newErrors: { [key: string]: string } = {}
    if (!deal.customer) newErrors.customer = 'Customer is required'
    if (!deal.value) newErrors.value = 'Value is required'
    if (!deal.assignee) newErrors.assignee = 'Assignee is required'
    if (!deal.closureDate) newErrors.closureDate = 'Closure Date is required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
  
    try {
      if (validate()) {
      const response = await onSubmit({...(deal as Deal)});
      if (response.success) {
        // Handle successful response
        setDeal({
          customer: undefined,
          value: 0,
          assignee: undefined,
          description: '',
          status: 'Cold',
          closureDate: '',
        })
        onClose?.();
      } else {
        // Handle unsuccessful response
        setErrors(response.errors || {});
      }
    }
    } catch (error) {
      // Handle error
      setErrors({ submit: 'An error occurred while submitting the form.' });
    }
  }
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   if (validate()) {
  //     onSubmit({
  //       ...(deal as Deal),
  //       // id: deal.id || Date.now().toString(),
  //       // lastModified: new Date().toISOString(),
  //     })
  //     setDeal({
  //       customer: undefined,
  //       value: 0,
  //       assignee: undefined,
  //       description: '',
  //       status: 'Cold',
  //       closureDate: '',
  //     })
  //     setErrors({})
  //     onClose?.()
  //   }
  // }

  const handleCategoryChange = (category: DealCategory) => {
    // console.log(category)

    setDeal((prevDeal) => ({
      ...prevDeal,
      categories: (prevDeal.categories || []).includes(category.id)
        ? (prevDeal.categories || []).filter((id) => id !== category.id)
        : [...(prevDeal.categories || []), category.id],
    }))
  }

  // const handleCategoryChange = (category: DealCategory) => {
  //   const updatedCategories = (editedDeal.categories || []).includes(category)
  //     ? (editedDeal.categories || []).filter((id) => id !== category)
  //     : [...(editedDeal.categories || []), category];
  //   handleChange('categories', updatedCategories);
  // };

  const handleAddCustomer =  async (newCustomer: Partial<Customer>) => {
    // customers.push(newCustomer)
    setDeal({ ...deal, customer: newCustomer })
    try {
    const result = await onAddCustomer(newCustomer)
    if (result.success) {
      // Handle successful response
      setIsCustomerModalOpen(false)
    } else {
      // Handle unsuccessful response
      setErrors(result.errors || {})
    }
  } catch (error) {
    // Handle error
    setErrors({ submit: 'An error occurred while submitting the form.' })
  }
}

  const getUserById = (userId: string) => {
    return users?.find((user) => (user as User).id === userId)
  }

  const getCustomerById = (customerID: string) => {
    return customers?.find((customer) => (customer as Customer).id === Number(customerID))
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 px-4">
            <div className="space-y-2 space-x-2">
              <Label htmlFor="customer">Customer</Label>
              <div className="flex items-center space-x-2">
                <Select
                  value={(deal.customer as Customer)?.id?.toString()}
                  onValueChange={(value) => setDeal({ ...deal, customer: getCustomerById(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id?.toString() || ''}>
                        {customer.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" onClick={() => setIsCustomerModalOpen(true)}>
                  <PlusIcon className="w-5 h-5" />
                </Button>
              </div>
              {errors.customerId && <p className="text-red-500 text-sm">{errors.customerId}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={deal.value || ''}
                onChange={(e) => setDeal({ ...deal, value: Number.parseFloat(e.target.value) })}
                placeholder="Enter deal value"
              />
              {errors.value && <p className="text-red-500 text-sm">{errors.value}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="assignee">Assignee</Label>

              <Select
                value={(deal.assignee as User)?.id?.toString()}
                onValueChange={(value) => setDeal({ ...deal, assignee: getUserById(value) })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {users &&
                    users.map((user) => (
                      <SelectItem key={user.id} value={user.id?.toString() || ''}>
                        {user.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              {/* <Input
                id="assignee"
                value={deal.assignee || ""}
                onChange={(e) => setDeal({ ...deal, assignee: e.target.value })}
                placeholder="Enter assignee name"
              /> */}
              {errors.assignee && <p className="text-red-500 text-sm">{errors.assignee}</p>}
            </div>
            <div className="space-y-2 space-x-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={deal.description || ''}
                onChange={(e) => setDeal({ ...deal, description: e.target.value })}
                placeholder="Enter deal description"
              />
            </div>
            {/* <div className="space-y-2 space-x-2">
              <Label htmlFor="status">Status</Label>
              <Select value={deal.status} onValueChange={(value) => setDeal({ ...deal, status: value as Status })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {["Cold", "Qualified", "Proposal Made", "Won", "Lost"].map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
            <div className="space-y-2 space-x-2">
              <Label>Categories</Label>
              <div className="space-y-4">
                {['proposition', 'source', 'sector'].map((type) => (
                  <div key={type} className="space-y-2">
                    <h4 className="text-sm font-medium">
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {categories
                        .filter((category) => category.type === type)
                        .map((category) => (
                          <div key={category.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={category.id.toString()}
                              checked={deal.categories?.includes(category.id)}
                              onCheckedChange={() => handleCategoryChange(category)}
                            />
                            <label
                              htmlFor={category.id.toString()}
                              className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70`}
                            >
                              {category.name}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* <div className="space-y-2 space-x-2">
              <Label htmlFor="dateLogged">Date Logged</Label>
              <Input
                id="dateLogged"
                type="date"
                value={deal.dateLogged}
                onChange={(e) => setDeal({ ...deal, dateLogged: e.target.value })}
              />
            </div> */}
            <div className="space-y-2 space-x-2">
              <Label htmlFor="closureDate">Closure Date</Label>
              <Input
                id="closureDate"
                type="date"
                value={deal.closureDate || ''}
                onChange={(e) => setDeal({ ...deal, closureDate: e.target.value })}
              />
              {errors.closureDate && <p className="text-red-500 text-sm">{errors.closureDate}</p>}
            </div>
          </div>
        </ScrollArea>
        <Button type="submit" className="w-full">
          {initialDeal ? 'Update Deal' : 'Add Deal'}
        </Button>
      </form>

      <Dialog open={isCustomerModalOpen} onOpenChange={setIsCustomerModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
          </DialogHeader>
          <NewCustomerForm onSubmit={handleAddCustomer} />
        </DialogContent>
      </Dialog>
    </>
  )
}
