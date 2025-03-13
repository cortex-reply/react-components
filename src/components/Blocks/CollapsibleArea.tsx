'use client'
import React from 'react'

import type { CollapsibleAreaBlock as CollapsibleAreaBlockProps } from '@/payload-types'

import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { cn } from '@/lib/utils/cn'
import { RichText } from '../Payload/RichText'

export const CollapsibleBlock: React.FC<CollapsibleAreaBlockProps> = ({ title, richText }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="border rounded-lg overflow-hidden">
      <Collapsible.Root className={cn('w-full')} open={isOpen} onOpenChange={setIsOpen}>
        <Collapsible.Trigger className="flex w-full items-center justify-between bg-white px-4 py-3 text-left hover:bg-gray-50">
          <h2 className="text-lg font-medium">{title}</h2>
          {isOpen ? <ChevronUpIcon className="h-6 w-6" /> : <ChevronDownIcon className="h-6 w-6" />}
        </Collapsible.Trigger>

        <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-collapse data-[state=open]:animate-expand border-t">
          <div className="px-4 py-3 bg-white">
            <RichText content={richText || {}} enableGutter={false} />
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  )
}
