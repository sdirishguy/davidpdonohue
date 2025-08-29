import { render, screen } from '@testing-library/react'
import Badge from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders with default props', () => {
    render(<Badge>Default Badge</Badge>)
    expect(screen.getByText('Default Badge')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Badge className="custom-badge">Custom Badge</Badge>)
    const badge = screen.getByText('Custom Badge')
    expect(badge).toHaveClass('custom-badge')
  })

  it('renders with different variants', () => {
    const variants = [
      'default',
      'primary', 
      'secondary',
      'success',
      'warning',
      'error',
      'outline'
    ]

    variants.forEach(variant => {
      const { unmount } = render(<Badge variant={variant as any}>{variant} Badge</Badge>)
      expect(screen.getByText(`${variant} Badge`)).toBeInTheDocument()
      unmount()
    })
  })

  it('applies correct variant classes', () => {
    const { rerender } = render(<Badge variant="primary">Primary</Badge>)
    let badge = screen.getByText('Primary')
    expect(badge).toHaveClass('bg-primary-blue/20')
    expect(badge).toHaveClass('text-primary-blue')
    expect(badge).toHaveClass('border-primary-blue/30')

    rerender(<Badge variant="success">Success</Badge>)
    badge = screen.getByText('Success')
    expect(badge).toHaveClass('bg-green-500/20')
    expect(badge).toHaveClass('text-green-400')
    expect(badge).toHaveClass('border-green-500/30')

    rerender(<Badge variant="outline">Outline</Badge>)
    badge = screen.getByText('Outline')
    expect(badge).toHaveClass('bg-transparent')
    expect(badge).toHaveClass('text-slate-300')
    expect(badge).toHaveClass('border-slate-600')
    expect(badge).toHaveClass('hover:border-slate-500')
    expect(badge).toHaveClass('hover:text-slate-200')
  })

  it('applies base classes to all variants', () => {
    render(<Badge variant="primary">Test</Badge>)
    const badge = screen.getByText('Test')
    
    expect(badge).toHaveClass('inline-flex')
    expect(badge).toHaveClass('items-center')
    expect(badge).toHaveClass('px-2.5')
    expect(badge).toHaveClass('py-0.5')
    expect(badge).toHaveClass('rounded-full')
    expect(badge).toHaveClass('text-xs')
    expect(badge).toHaveClass('font-medium')
    expect(badge).toHaveClass('border')
    expect(badge).toHaveClass('transition-colors')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Badge ref={ref}>Ref Test</Badge>)
    expect(ref).toHaveBeenCalled()
  })

  it('passes through additional props', () => {
    render(<Badge data-testid="badge" aria-label="Test badge">Props Test</Badge>)
    const badge = screen.getByTestId('badge')
    expect(badge).toHaveAttribute('aria-label', 'Test badge')
  })

  it('renders with children content', () => {
    render(<Badge>Complex <strong>Content</strong> Here</Badge>)
    expect(screen.getByText(/Complex/)).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText(/Here/)).toBeInTheDocument()
    expect(screen.getByText('Content').tagName).toBe('STRONG')
  })
})
