import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, CheckCircle2, Clock, RefreshCw } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import { TaskData } from '@/common-types';
import { Button } from '@/components/ui/button';

interface ChatCardArtefactProps {
  artefact: string;
  taskId: number;
}

export function ChatCardArtefact({ 
  artefact,
  taskId,
  taskData: externalTaskData,
  loading = false,
  error = null
}: ChatCardArtefactProps & { taskData?: TaskData; loading?: boolean; error?: any }) {
  // Use the external task data if provided, otherwise fallback to initial props
  const taskData: TaskData = externalTaskData || {
    id: taskId,
    name: "Loading...",
    description: "",
    status: "done",
    dateLogged: new Date().toISOString(),
    project: { id: -1, name: "" }
  };

  // Try to parse the date, if it's valid use formatDistanceToNow, otherwise use the raw string
  let formattedDate = taskData.dateLogged;
  try {
    const date = new Date(taskData.dateLogged);
    if (!isNaN(date.getTime())) {
      formattedDate = formatDistanceToNow(date, { addSuffix: true });
    }
  } catch (e) {
    // Keep the original date string if parsing fails
  }

  return (
    <Card className="w-full max-w-md shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {loading ? "Loading..." : taskData.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {loading ? (
          <div className="animate-pulse h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        ) : error ? (
          <p className="text-sm text-red-500">Error loading task details</p>
        ) : (
          <p className="text-sm text-foreground">{artefact}</p>
        )}
      </CardContent>
      <CardFooter className="pt-2 flex items-center justify-between">
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          <span>Created {formattedDate}</span>
          <span className="mx-2">•</span>
          <span>Task #{taskData.id}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
