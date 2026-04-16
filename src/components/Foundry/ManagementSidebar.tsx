"use client"
import React from 'react';
import { BarChart2, Calendar, Kanban, FileText, Target } from 'lucide-react';

interface ManagementSidebarProps {
  currentView: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics' | 'gantt';
  onViewChange: (view: 'kanban' | 'planning' | 'tasks' | 'files' | 'epics' | 'gantt') => void;
  children?: React.ReactNode;
}

const viewConfig = [
  {
    key: 'kanban' as const,
    icon: Kanban,
    label: 'Kanban',
    color: 'bg-primary',
    title: 'Kanban View'
  },
  {
    key: 'planning' as const,
    icon: Calendar,
    label: 'Planning',
    color: 'bg-brand-plum',
    title: 'Planning View',
    hiddenOnMobile: true
  },
  {
    key: 'epics' as const,
    icon: Target,
    label: 'Epics',
    color: 'bg-brand-orange',
    title: 'Epic Planning'
  },
  {
    key: 'files' as const,
    icon: FileText,
    label: 'Files',
    color: 'bg-brand-green',
    title: 'Files'
  },
  {
    key: 'tasks' as const,
    icon: Calendar,
    label: 'Tasks',
    color: 'bg-brand-cyan',
    title: 'Tasks'
  },
  {
    key: 'gantt' as const,
    icon: BarChart2,
    label: 'Gantt',
    color: 'bg-brand-blue',
    title: 'Gantt Chart',
    hiddenOnMobile: true,
  }
];

export const ManagementSidebar: React.FC<ManagementSidebarProps> = ({
  currentView,
  onViewChange,
  children
}) => {
  return (
    <div className="flex w-full h-full">
      {/* Sidebar */}
      <div className="w-12 h-full bg-sidebar-background flex flex-col flex-shrink-0 z-50 relative overflow-visible">
        {viewConfig.map((view) => {
          const Icon = view.icon;
          const isActive = currentView === view.key;
          
          return (
            <button
              key={view.key}
              onClick={() => onViewChange(view.key)}
              className={`flex-1 w-12 flex items-center justify-center text-sidebar-foreground transition-all duration-200 relative group/btn z-50 hover:w-28 hover:justify-start hover:pl-3 ${
                isActive ? view.color : `${view.color} brightness-75 hover:brightness-100`
              } ${view.hiddenOnMobile ? 'hidden md:flex' : ''}`}
              title={view.title}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span className="text-xs font-medium whitespace-nowrap opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200 absolute left-8">
                {view.label}
              </span>
            </button>
          );
        })}
      </div>
      
      {/* Main content */}
      <div className="flex-1 min-w-0 px-4 md:px-6 h-full overflow-auto z-0 relative">
        <div className="w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
