'use client'

import { motion } from 'framer-motion'
import { MoreHorizontal, Trash2, Edit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { RecentFile } from '../DigitalColleagues/types'

interface FileListProps {
  files: RecentFile[]
  onFileClick?: (file: RecentFile) => void
  onFileEdit?: (file: RecentFile) => void
  onFileDelete?: (file: RecentFile) => void
  showHeader?: boolean
  className?: string
}

export function FileList({
  files,
  onFileClick,
  onFileEdit,
  onFileDelete,
  showHeader = true,
  className,
}: FileListProps) {
  return (
    <div className={`rounded-3xl border overflow-hidden ${className || ''}`}>
      {showHeader && (
        <div className="bg-muted/50 p-3 hidden md:grid md:grid-cols-10 text-sm font-medium">
          <div className="col-span-6">Name</div>
          <div className="col-span-2">Size</div>
          <div className="col-span-2">Modified</div>
        </div>
      )}
      <div className="divide-y">
        {files.map((file) => (
          <motion.div
            key={file.name}
            whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
            className="p-3 md:grid md:grid-cols-10 items-center flex flex-col md:flex-row gap-3 md:gap-0 cursor-pointer"
            onClick={() => onFileClick?.(file)}
          >
            <div className="col-span-6 flex items-center gap-3 w-full md:w-auto">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-muted">
                {file.icon}
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
              </div>
            </div>
            <div className="col-span-2 text-sm md:text-base">{file.size}</div>
            <div className="col-span-2 flex items-center justify-between w-full md:w-auto">
              <span className="text-sm md:text-base">{file.modified}</span>
              <div className="flex gap-1">
                {/* <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFileEdit?.(file)
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button> */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-xl text-red-500 hover:text-red-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    onFileDelete?.(file)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-xl">
                  <MoreHorizontal className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
