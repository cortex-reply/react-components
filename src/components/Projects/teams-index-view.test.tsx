import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import TeamsIndexView from '../Foundry/Views/TeamsIndexView'
import { mockTeamSummary } from '../Foundry/test-data'

describe('TeamsIndexView', () => {
  const mockOnCreateTeam = vi.fn()
  const mockOnTeamOpen = vi.fn()

  beforeEach(() => {
    mockOnCreateTeam.mockClear()
    mockOnTeamOpen.mockClear()
  })

  it('renders hero section correctly', () => {
    render(
      <TeamsIndexView
        teams={mockTeamSummary}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    expect(screen.getByText('My Teams')).toBeTruthy()
    expect(screen.getByText('Collaborate with your human and digital colleagues across different teams and projects.')).toBeTruthy()
    expect(screen.getByText('Create Team')).toBeTruthy()
  })

  it('renders teams correctly', () => {
    render(
      <TeamsIndexView
        teams={mockTeamSummary}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    expect(screen.getByText('Active Teams')).toBeTruthy()
    
    // Check that team names are rendered
    mockTeamSummary.forEach(team => {
      expect(screen.getByText(team.name)).toBeTruthy()
    })
  })

  it('shows empty state when no teams', () => {
    render(
      <TeamsIndexView
        teams={[]}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    expect(screen.getByText("You're not part of any teams yet.")).toBeTruthy()
    expect(screen.getByText("Create a new team or ask to be added to an existing one.")).toBeTruthy()
  })

  it('calls onCreateTeam when create button is clicked', () => {
    render(
      <TeamsIndexView
        teams={mockTeamSummary}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    fireEvent.click(screen.getByText('Create Team'))
    expect(mockOnCreateTeam).toHaveBeenCalled()
  })

  it('calls onTeamOpen when team is opened', () => {
    render(
      <TeamsIndexView
        teams={mockTeamSummary}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    // Click on first team's "View Team" button
    const viewButtons = screen.getAllByText('View Team')
    fireEvent.click(viewButtons[0])
    expect(mockOnTeamOpen).toHaveBeenCalledWith(mockTeamSummary[0])
  })

  it('renders correct number of team cards', () => {
    render(
      <TeamsIndexView
        teams={mockTeamSummary}
        onCreateTeam={mockOnCreateTeam}
        onTeamOpen={mockOnTeamOpen}
      />
    )

    // Should have as many "View Team" buttons as teams
    const viewButtons = screen.getAllByText('View Team')
    expect(viewButtons).toHaveLength(mockTeamSummary.length)
  })
})
