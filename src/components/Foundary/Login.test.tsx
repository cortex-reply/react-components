import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Login } from './Login'

// Mock window.location for redirect tests
Object.defineProperty(window, 'location', {
  value: {
    href: ''
  },
  writable: true
})

describe('Login Component', () => {
  it('renders the login button and logo with default props', () => {
    const mockOnLogin = vi.fn()
    render(<Login onLogin={mockOnLogin} />)
    
    expect(screen.getByRole('button', { name: /login/i })).toBeTruthy()
    expect(screen.getByText('Login to Cortex')).toBeTruthy()
    expect(screen.getByText('Welcome back')).toBeTruthy()
  })

  it('calls onLogin callback with token when button is clicked', async () => {
    const mockOnLogin = vi.fn()
    render(<Login onLogin={mockOnLogin} />)
    
    const button = screen.getByRole('button', { name: /login/i })
    fireEvent.click(button)
    
    // Wait for the simulated login process to complete
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith(expect.stringContaining('token_'))
    }, { timeout: 2000 })
  })

  it('shows loading state during login process', async () => {
    const mockOnLogin = vi.fn()
    render(<Login onLogin={mockOnLogin} />)
    
    const button = screen.getByRole('button', { name: /login/i })
    fireEvent.click(button)
    
    // Should show loading state immediately after click
    expect(screen.getByText('Signing In...')).toBeTruthy()
    expect(button.hasAttribute('disabled')).toBe(true)
  })

  it('applies custom className', () => {
    const mockOnLogin = vi.fn()
    const { container } = render(<Login onLogin={mockOnLogin} className="custom-class" />)
    
    expect((container.firstChild as HTMLElement)?.className).toContain('custom-class')
  })

  it('renders with custom text props', () => {
    const mockOnLogin = vi.fn()
    const customProps = {
      title: 'Custom Title',
      subtitle: 'Custom Subtitle',
      buttonText: 'Custom Button'
    }
    
    render(<Login onLogin={mockOnLogin} {...customProps} />)
    
    expect(screen.getByText('Custom Title')).toBeTruthy()
    expect(screen.getByText('Custom Subtitle')).toBeTruthy()
    expect(screen.getByRole('button', { name: /custom button/i })).toBeTruthy()
  })

  it('passes logoProps to Logo component', () => {
    const mockOnLogin = vi.fn()
    const logoProps = { 
      width: 100, 
      height: 100, 
      className: 'custom-logo-class' 
    }
    
    render(<Login onLogin={mockOnLogin} logoProps={logoProps} />)
    
    // Logo should be rendered (exact testing depends on Logo component implementation)
    const logoContainer = screen.getByRole('button').closest('div')?.querySelector('.custom-logo-class')
    expect(logoContainer).toBeTruthy()
  })

  it('redirects to custom URL after login', async () => {
    const mockOnLogin = vi.fn()
    const customRedirectUrl = '/custom/dashboard'
    
    render(<Login onLogin={mockOnLogin} redirectUrl={customRedirectUrl} />)
    
    const button = screen.getByRole('button', { name: /login/i })
    fireEvent.click(button)
    
    // Wait for login process to complete and check redirect
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled()
      expect(window.location.href).toBe(customRedirectUrl)
    }, { timeout: 2000 })
  })

  it('handles external URLs by opening in new tab', async () => {
    const mockOnLogin = vi.fn()
    const mockWindowOpen = vi.fn()
    window.open = mockWindowOpen
    
    const externalUrl = 'https://example.com/dashboard'
    
    render(<Login onLogin={mockOnLogin} redirectUrl={externalUrl} />)
    
    const button = screen.getByRole('button', { name: /login/i })
    fireEvent.click(button)
    
    // Wait for login process to complete and check external redirect
    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalled()
      expect(mockWindowOpen).toHaveBeenCalledWith(externalUrl, '_blank')
    }, { timeout: 2000 })
  })
})
