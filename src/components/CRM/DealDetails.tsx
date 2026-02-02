import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UserIcon, CalendarIcon, SaveIcon, Edit2Icon, PlusIcon } from 'lucide-react'
import type { Deal, Customer, User, DealCategory, PartialComment, EditableDeal } from './types'

type DealDetailsProps = {
  deal: Partial<Deal>
  users?: Partial<User>[]
  customer: Partial<Customer> | undefined
  categories: Partial<DealCategory>[]
  onClose: () => void
  onSave: (deal: Partial<EditableDeal>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
  onAddComment: (comment: Partial<NonNullable<EditableDeal['comments']>[number]>) => Promise<{ success: boolean; errors?: Record<string, string> }>;
}



export function DealDetails({
  deal,
  users,
  customer,
  categories,
  onClose,
  onSave,
  onAddComment,
}: DealDetailsProps) {
  const [editedDeal, setEditedDeal] = useState<EditableDeal>({
    ...deal,
    value: deal.value || 0,
    comments: deal.comments || [],
    customer: deal.customer as Partial<Customer> || {} as Partial<Customer>,
  })
  const [newComment, setNewComment] = useState('')
  const [hasChanges, setHasChanges] = useState(false)
  const [editingField, setEditingField] = useState<string | null>(null)

  useEffect(() => {
    setHasChanges(JSON.stringify(deal) !== JSON.stringify(editedDeal))


    
  }, [deal, editedDeal])

  const handleSave = async () => {
try {
    const result = await onSave(editedDeal)
    if (result.success) {
      setHasChanges(false)
    setEditingField(null)
    } else {
      console.error('Failed to save deal:', result.errors)
    }
    
  } catch (error) {
    console.error('Failed to save deal:', error)
  }
}

  const handleChange = (field: keyof Deal, value: any) => {
    setEditedDeal((prev) => ({ ...prev, [field]: value }))
  }

  const handleCategoryChange = (category: DealCategory) => {
    const updatedCategories = (editedDeal.categories || []).includes(category)
      ? (editedDeal.categories || []).filter((id) => id !== category)
      : [...(editedDeal.categories || []), category];
    handleChange('categories', updatedCategories);
  };

  // const handleCategoryChange = (categoryId: string) => {
  //   const categoryIdNumber = Number(categoryId);
  //   const updatedCategories = (editedDeal.categories || []).includes(categoryIdNumber)
  //     ? (editedDeal.categories || []).filter((deal) => (deal as DealCategory).id !== categoryIdNumber)
  //     : [...(editedDeal.categories || []), categoryIdNumber]
  //   handleChange('categories', updatedCategories)
  // }

  const handleAddComment = async () => {
    if (newComment.trim()) {
      const newPartialComment: PartialComment = {
        text: newComment,
        timestamp: new Date().toISOString(),
      };
  
      // Call the onAddComment handler with the new partial comment
      try {
        const result = await onAddComment(newPartialComment);
        if (!result.success) {
          console.error('Failed to add comment:', result.errors);
          return;
        }
      } catch (error) {
        console.error('Failed to add comment:', error);
      }
  
      // Update the editedDeal state with the new comment
      setEditedDeal((prev) => ({
        ...prev,
        comments: [
          ...(prev.comments || []), // Ensure previous comments are included
          newPartialComment,
        ] as Partial<NonNullable<Deal['comments']>[number]>[], // Explicitly cast as PartialComment array
      }));
  
      setNewComment('')
    }
  }

  const getCategoryColor = (type: DealCategory['type']) => {
    switch (type) {
      case 'proposition':
        return 'border-blue-800 text-blue-800'
      case 'source':
        return 'border-green-800 text-green-800'
      case 'sector':
        return 'border-purple-800 text-purple-800'
      default:
        return 'border-gray-800 text-gray-800'
    }
  }

  const getUserById = (userId: string) => {
    return users?.find((user) => (user as User).id === userId);
  };

  return (
    <Dialog open={true}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col [&>button:last-child]:hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold">{customer?.name || 'no customer'}</DialogTitle>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleSave} disabled={!hasChanges}>
              <SaveIcon className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </DialogHeader>
        <ScrollArea className="flex-grow pr-4">
          {/* row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="grid gap-2 m-1">
              {editingField === 'value' ? (
                <Input
                  type="number"
                  value={editedDeal.value}
                  onChange={(e) => handleChange('value', Number(e.target.value))}
                  onBlur={() => setEditingField(null)}
                  className="text-3xl font-bold text-green-600"
                  autoFocus
                />
              ) : (
                <div
                  className="text-3xl font-bold text-green-600 cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('value')}
                >
                  £{editedDeal.value?.toLocaleString()}
                </div>
              )}
            </div>
            <div className="grid gap-2 m-1">
              <Label className="text-sm font-medium text-accent">Assignee</Label>
              {editingField === 'assignee' ? (

                <Select value={(editedDeal?.assignee as User)?.id?.toString() || ''} onValueChange={(value) => handleChange('assignee', getUserById(value))}>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select assignee" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {users && users.map((user) => (
                      <SelectItem key={user.id} value={user?.id?.toString() || ''}>
                                        {user.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                // <Input
                //   value={editedDeal.assignee}
                //   onChange={(e) => handleChange('assignee', e.target.value)}
                //   placeholder="Enter assignee name"
                // />
              ) : (
                <div
                  className="flex items-center space-x-2 cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('assignee')}
                >
                  <UserIcon className="w-4 h-4 text-gray-400" />
                  <span>{(editedDeal?.assignee as User)?.name}</span>
                </div>
              )}
            </div>
            <div className="grid gap-2 m-1">
              <Label className="text-sm font-medium text-accent">Closure Date</Label>
              {editingField === 'closureDate' ? (
                <Input
                  type="date"
                  value={editedDeal.closureDate?.split('T')[0] ?? ''}
                  onChange={(e) => handleChange('closureDate', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  className='mr-2'
                  autoFocus
                />
              ) : (
                <div
                  className="flex items-center space-x-2 cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('closureDate')}
                >
                  <CalendarIcon className="w-4 h-4 text-gray-400" />
                  <span>{editedDeal.closureDate ? new Date(editedDeal.closureDate).toLocaleDateString('en-GB') : 'N/A'}</span>
                </div>
              )}
            </div>
            {/* row 2 */}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
            <div className="grid gap-2 m-1">
              <Label className="text-sm font-medium text-accent">Description</Label>
              {editingField === 'description' ? (
                <Textarea
                  value={editedDeal.description || ''}
                  onChange={(e) => handleChange('description', e.target.value)}
                  onBlur={() => setEditingField(null)}
                  className="min-h-[100px]"
                  autoFocus
                />
              ) : (
                <div
                  className="cursor-pointer p-1 border border-background hover:border-accent pb-5 rounded"
                  onClick={() => setEditingField('description')}
                >
                  {editedDeal.description}
                </div>
              )}
            </div>
          </div>

          {/* row 3 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 pt-2 gap-4">
            <div className="grid gap-2 m-1">
              <Label className="text-sm font-medium text-accent">Status</Label>
              {editingField === 'status' ? (
                <Select
                  value={editedDeal.status}
                  onValueChange={(value) => {
                    handleChange('status', value)
                    setEditingField(null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {['Cold', 'Qualified', 'Proposal Made', 'SoW Submitted', 'Won', 'Lost'].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div
                  className="cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('status')}
                >
                  {editedDeal.status}
                </div>
              )}
            </div>
            <div className="grid col-span-2 gap-2">
              <Label className="text-sm font-medium text-accent">Categories</Label>
              {editingField === 'categories' ? (
                <div className="grid grid-cols-2 gap-2 m-1">
                  {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={category.id?.toString() || ''}
                        checked={(editedDeal.categories || []).some((cat) => (cat as DealCategory).id === category.id)}
                        onCheckedChange={() => category.id !== undefined && handleCategoryChange(category as DealCategory)}
                      />
                      <label
                        htmlFor={(category.id ?? '').toString()}
                        className={`text-sm font-medium ${getCategoryColor(category.type || 'sector')} px-2 py-1 rounded`}
                      >
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  className="flex flex-wrap gap-2 cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('categories')}
                >
                  {editedDeal.categories && editedDeal.categories.map((cat) => {
                    // console.log('cat', cat)
                    // const category = categories.find((c) => Number(c.id) === (cat as DealCategory).id)
                    const category = (cat as DealCategory)
                    return category ? (
                      <Badge
                        key={category.id}
                        variant="outline"
                        className={getCategoryColor(category.type || 'sector')}
                      >
                        {category.name}
                      </Badge>
                    ) : null
                  })}
                </div>
              )}
            </div>
                  <div className="grid gap-2 m-1">
              <Label className="text-sm font-medium text-accent">COGE Status</Label>
              {editingField === 'gecoStatus' ? (
                <Select
                  value={editedDeal.gecoStatus ?? undefined}
                  onValueChange={(value) => {
                    handleChange('gecoStatus', value)
                    setEditingField(null)
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {['firm', 'forecast', 'other'].map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div
                  className="cursor-pointer p-1 border border-background hover:border-accent rounded"
                  onClick={() => setEditingField('gecoStatus')}
                >
                  {editedDeal.gecoStatus
                    ? editedDeal.gecoStatus.charAt(0).toUpperCase() + editedDeal.gecoStatus.slice(1)
                    : 'N/A'}
                </div>
              )}
            </div>
          </div>

          {/* <div className="grid gap-2">
              <Label className="text-sm font-medium text-gray-500">Date Logged</Label>
              <div className="flex items-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-gray-400" />
                <span>{new Date(editedDeal.dateLogged).toLocaleDateString()}</span>
              </div>
            </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-1 pt-4 gap-4">
            <div className="grid gap-2">
              <Label className="text-sm font-medium text-accent">Comments</Label>
              <ScrollArea className="h-[200px] overflow-y-auto">
                <div className="space-y-2">
                {editedDeal.comments && editedDeal.comments
                  .slice()
                  .sort((a, b) => new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime())
                  .map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg">
                      <p className="text-sm text-foreground">{comment.text}</p>
                      <p className="text-xs text-foreground mt-1">
                        {(comment?.author as User)?.name} - {new Date(comment.timestamp || '').toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="flex mt-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-grow ml-1"
                />
                <Button onClick={handleAddComment} className="ml-2">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
            </div>
            <div className="text-xs text-gray-500 mt-4">
              Last modified: {new Date(editedDeal.updatedAt || '').toLocaleString()}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
