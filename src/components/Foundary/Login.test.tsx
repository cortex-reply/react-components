import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from './Login'

describe('Login Component', () => {
  it('renders the login button and logo with default props', () => {
    render(<Login />)
    
    expect(screen.getByRole('button', { name: /sign in to continue/i })).toBeTruthy()
    expect(screen.getByText('Welcome to Cortex')).toBeTruthy()
    expect(screen.getByText('Click below to access your digital workspace')).toBeTruthy()
    expect(screen.getByAltText('Cortex Logo')).toBeTruthy()
  })

  it('shows loading state when isLoading prop is true', () => {
    render(<Login isLoading={true} />)
    
    const button = screen.getByRole('button')
    expect(button.hasAttribute('disabled')).toBe(true)
    expect(screen.getByText('Signing you in...')).toBeTruthy()
  })

  it('calls onLogin callback when button is clicked', async () => {
    const mockOnLogin = vi.fn()
    render(<Login onLogin={mockOnLogin} />)
    
    const button = screen.getByRole('button', { name: /sign in to continue/i })
    fireEvent.click(button)
    
    // Wait for the simulated login process to complete
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled()
    }, { timeout: 2000 })
  })

  it('shows workspace selection after login', async () => {
    render(<Login />)
    
    const button = screen.getByRole('button', { name: /sign in to continue/i })
    fireEvent.click(button)
    
    // Wait for the login process and workspace selection to appear
    await waitFor(() => {
      expect(screen.getByText('Choose how you\'d like to get started')).toBeTruthy()
    }, { timeout: 2000 })

    // Check that both workspace options are available
    expect(screen.getByText('Chat with Ava')).toBeTruthy()
    expect(screen.getByText('Collaborate with Team')).toBeTruthy()
    
    // Verify logo is present in both login and post-login states
    expect(screen.getAllByAltText('Cortex Logo')).toHaveLength(2)
  })

  it('applies custom className', () => {
    const { container } = render(<Login className="custom-class" />)
    
    expect((container.firstChild as HTMLElement)?.className).toContain('custom-class')
  })

  it('shows loading state during login process', async () => {
    render(<Login />)
    
    const button = screen.getByRole('button', { name: /sign in to continue/i })
    fireEvent.click(button)
    
    // Should show loading state immediately after click
    expect(screen.getByText('Signing you in...')).toBeTruthy()
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('renders custom workspace choices', async () => {
    const customChoices = [
      {
        id: 'custom1',
        title: 'Custom Option',
        description: 'A custom workspace option',
        icon: <div>Icon</div>,
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-green-600',
        url: '/custom'
      }
    ]

    render(<Login workspaceChoices={customChoices} />)
    
    const button = screen.getByRole('button', { name: /sign in to continue/i })
    fireEvent.click(button)
    
    // Wait for the workspace selection to appear
    await waitFor(() => {
      expect(screen.getByText('Custom Option')).toBeTruthy()
      expect(screen.getByText('A custom workspace option')).toBeTruthy()
    }, { timeout: 2000 })
  })

  it('handles workspace choice with custom onClick', async () => {
    const mockOnClick = vi.fn()
    const customChoices = [
      {
        id: 'custom1',
        title: 'Custom Option',
        description: 'A custom workspace option',
        icon: <div>Icon</div>,
        color: 'text-blue-600',
        gradient: 'from-blue-500 to-green-600',
        onClick: mockOnClick
      }
    ]

    render(<Login workspaceChoices={customChoices} />)
    
    const loginButton = screen.getByRole('button', { name: /sign in to continue/i })
    fireEvent.click(loginButton)
    
    // Wait for the workspace selection to appear
    await waitFor(() => {
      expect(screen.getByText('Custom Option')).toBeTruthy()
    }, { timeout: 2000 })

    // Click the workspace choice
    const workspaceCard = screen.getByText('Custom Option').closest('div')
    if (workspaceCard) {
      fireEvent.click(workspaceCard)
      expect(mockOnClick).toHaveBeenCalled()
    }
  })
})

  it('renders with custom props', () => {
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      buttonText: 'Custom Button',
      logoAlt: 'Custom Logo'
    }
    
    render(<Login {...customProps} />)
    
    expect(screen.getByText('Custom Title')).toBeTruthy()
    expect(screen.getByText('Custom Subtitle')).toBeTruthy()
    expect(screen.getByRole('button', { name: /custom button/i })).toBeTruthy()
    expect(screen.getByAltText('Custom Logo')).toBeTruthy()
  })
