'use client'

import { useState } from 'react'
import { Plus, Search, File, Filter, Download, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { NavigationTabs } from '../AdvancedComponents/navigation-tabs'
import { FileList } from './file-list'
import { DashboardHero } from '../Heros/DashboardHero/DashboardHero'
import { type RecentFile } from '../DigitalColleagues/types'
import { motion, AnimatePresence } from 'framer-motion'

interface FileViewProps {
  initialFiles?: RecentFile[]
  onFileAdd?: () => void
  onFileEdit?: (file: RecentFile) => void
  onFileDelete?: (fileId: string) => void
  onFileClick?: (file: RecentFile) => void
  compactView?: boolean
  className?: string
}

export default function FileView({
  initialFiles = [],
  onFileAdd,
  onFileEdit,
  onFileDelete,
  onFileClick,
  compactView = false,
  className,
}: FileViewProps) {
  const [files, setFiles] = useState<RecentFile[]>(initialFiles)
  const [searchTerm, setSearchTerm] = useState('')
  const [appFilter, setAppFilter] = useState<string>('all')
  const [activeTab, setActiveTab] = useState('all')

  // Get unique apps for filter
  const uniqueApps = Array.from(new Set(files.map((file) => file.app)))

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesApp = appFilter === 'all' || file.app === appFilter
    return matchesSearch && matchesApp
  })

  const recentFiles = filteredFiles.slice(0, 10) // Show 10 most recent
  const sharedFiles = filteredFiles.filter((file) => file.shared)

  const handleAddFile = () => {
    // This would typically open a file upload dialog
    onFileAdd?.()
  }

  const handleEditFile = (file: RecentFile) => {
    onFileEdit?.(file)
  }

  const handleDeleteFile = (file: RecentFile) => {
    setFiles((prev) => prev.filter((f) => f.name !== file.name))
    onFileDelete?.(file.name)
  }

  const handleFileClick = (file: RecentFile) => {
    onFileClick?.(file)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setAppFilter('all')
  }

  return (
    <div className="px-2 md:px-4 py-4 space-y-8">
      <AnimatePresence mode="wait">
        <motion.div
          key="files-view"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className={`space-y-6 ${className || ''}`}>
            <DashboardHero
              title="Files"
              description="Manage and organize your files and documents."
              gradient="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"
              primaryAction={{
                label: 'Upload file',
                onClick: handleAddFile,
              }}
              secondaryAction={{
                label: 'Download all',
                onClick: () => console.log('Download all clicked'),
              }}
            />

            {/* Stats Cards */}
            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                  <File className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{files.length}</div>
                  <p className="text-xs text-muted-foreground">
                    {files.filter((f) => f.shared).length} shared
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <File className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2.4 GB</div>
                  <p className="text-xs text-muted-foreground">of 10 GB used</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                  <File className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">files modified today</p>
                </CardContent>
              </Card>
            </div> */}

            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search files..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  {/* <Select value={appFilter} onValueChange={setAppFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Filter by app" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Apps</SelectItem>
                      {uniqueApps.map((app) => (
                        <SelectItem key={app} value={app}>
                          {app}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select> */}
                  {(searchTerm || appFilter !== 'all') && (
                    <Button variant="outline" onClick={clearFilters} className="gap-2">
                      <Filter className="h-4 w-4" />
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Files List */}
            <div className="space-y-4">
              <NavigationTabs
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabOptions={[
                  { value: 'all', label: `All Files (${filteredFiles.length})` },
                  { value: 'recent', label: `Recent (${recentFiles.length})` },
                  // { value: 'shared', label: `Shared (${sharedFiles.length})` },
                ]}
                maxWidth="500px"
                gridCols={3}
              />

              {activeTab === 'all' && (
                <FileList
                  files={filteredFiles}
                  onFileClick={handleFileClick}
                  onFileEdit={handleEditFile}
                  onFileDelete={handleDeleteFile}
                  showHeader={!compactView}
                />
              )}

              {activeTab === 'recent' && (
                <FileList
                  files={recentFiles}
                  onFileClick={handleFileClick}
                  onFileEdit={handleEditFile}
                  onFileDelete={handleDeleteFile}
                  showHeader={!compactView}
                />
              )}

              {activeTab === 'shared' && (
                <FileList
                  files={sharedFiles}
                  onFileClick={handleFileClick}
                  onFileEdit={handleEditFile}
                  onFileDelete={handleDeleteFile}
                  showHeader={!compactView}
                />
              )}
            </div>

            {filteredFiles.length === 0 && (
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <File className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No files found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchTerm || appFilter !== 'all'
                        ? 'Try adjusting your filters to see more results.'
                        : 'Get started by uploading your first file.'}
                    </p>
                    <Button onClick={handleAddFile} className="gap-2">
                      <Plus className="h-4 w-4" />
                      Upload File
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
