import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { TeamCard } from './team-card'
import { mockTeamSummary } from '../Foundry/test-data'

describe('TeamCard', () => {
  const mockOnOpen = vi.fn()

  beforeEach(() => {
    mockOnOpen.mockClear()
  })

  it('renders team information correctly', () => {
    const team = mockTeamSummary[0]
    render(<TeamCard team={team} onOpen={mockOnOpen} />)

    expect(screen.getByText(team.name)).toBeTruthy()
    expect(screen.getByText(team.description)).toBeTruthy()
    expect(screen.getByText(team.humanColleagues.toString())).toBeTruthy()
    expect(screen.getByText(team.digitalColleagues.toString())).toBeTruthy()
    expect(screen.getByText(team.projects.toString())).toBeTruthy()
  })

  it('calls onOpen when View Team button is clicked', () => {
    const team = mockTeamSummary[0]
    render(<TeamCard team={team} onOpen={mockOnOpen} />)

    fireEvent.click(screen.getByText('View Team'))
    expect(mockOnOpen).toHaveBeenCalledWith(team)
  })
})
