
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Task } from '../Foundry/types';

interface KanbanColumnProps {
  title: string;
  status: Task['status'];
  taskCount: number;
  children: React.ReactNode;
  onDrop: (status: Task['status']) => void;
  isCompact?: boolean;
  height?: string; // Add dynamic height prop
}

export const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  taskCount,
  children,
  onDrop,
  isCompact = false,
  height,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    onDrop(status);
  };

  const getColumnColor = () => {
    switch (status) {
      case 'todo':
        return 'border-l-gray-400';
      case 'in-progress':
        return 'border-l-blue-500';
      case 'review':
        return 'border-l-orange-500';
      case 'done':
        return 'border-l-green-500';
      default:
        return 'border-l-gray-400';
    }
  };

  return (
    <Card 
      className={`p-4 bg-card border-l-4 ${getColumnColor()} shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col ${
        isCompact ? 'lg:max-w-xs' : ''
      }`}
      style={{ height: height || 'calc(100vh - 350px)' }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <h3 className={`font-semibold text-foreground select-none-important ${
          isCompact ? 'text-base' : 'text-lg'
        }`}>
          {title}
        </h3>
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          {taskCount}
        </Badge>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-4 min-h-0">
        {children}
      </div>
    </Card>
  );
};
