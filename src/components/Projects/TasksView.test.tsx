import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TasksView } from './TasksView';

// Mock colleagues for testing
const mockColleagues = [
  { id: '1', name: 'Alex AI', department: 'Development', role: 'Senior Developer' },
  { id: '2', name: 'Maya Bot', department: 'Design', role: 'UX Designer' },
] as any[];

// Mock reminders for testing
const mockReminders = [
  {
    id: '1',
    title: 'Test reminder',
    description: 'This is a test reminder',
    dueDate: new Date(2024, 2, 15),
    dueTime: '14:30',
    colleague: mockColleagues[0],
    isCompleted: false,
    isRecurring: false,
    priority: 'high',
    reminderEnabled: true,
    reminderMinutes: 30,
    createdAt: new Date(2024, 2, 10),
    tags: ['test']
  },
] as any[];

describe('TasksView', () => {
  it('renders the TasksView component', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('Task Reminders')).toBeTruthy();
    expect(screen.getByText('Test reminder')).toBeTruthy();
  });

  it('displays stats correctly', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('1')).toBeTruthy(); // Total count
    expect(screen.getByText('Total')).toBeTruthy();
    expect(screen.getByText('Pending')).toBeTruthy();
  });

  it('can toggle reminder completion', () => {
    const mockOnUpdate = vi.fn();
    
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
        onUpdateReminder={mockOnUpdate}
      />
    );
    
    const checkButton = screen.getByRole('button', { name: /toggle complete/i });
    fireEvent.click(checkButton);
    
    expect(mockOnUpdate).toHaveBeenCalledWith('1', {
      isCompleted: true,
      completedAt: expect.any(Date)
    });
  });

  it('can filter reminders', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    const filterSelect = screen.getByRole('combobox');
    fireEvent.click(filterSelect);
    
    expect(screen.getByText('All (1)')).toBeTruthy();
    expect(screen.getByText('Pending (1)')).toBeTruthy();
  });

  it('can search reminders', () => {
    render(
      <TasksView
        initialReminders={mockReminders}
        initialColleagues={mockColleagues}
      />
    );
    
    const searchInput = screen.getByPlaceholderText('Search reminders...');
    fireEvent.change(searchInput, { target: { value: 'test' } });
    
    expect(screen.getByText('Test reminder')).toBeTruthy();
  });

  it('shows empty state when no reminders', () => {
    render(
      <TasksView
        initialReminders={[]}
        initialColleagues={mockColleagues}
      />
    );
    
    expect(screen.getByText('No reminders yet')).toBeTruthy();
    expect(screen.getByText('Create your first reminder to get started')).toBeTruthy();
  });
});
