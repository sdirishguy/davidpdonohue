import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, ...props }: any) => (
      <div className={className} {...props}>{children}</div>
    ),
  },
}))

describe('Card', () => {
  it('renders with default props', () => {
    render(<Card>Test content</Card>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<Card className="custom-class">Test content</Card>)
    const card = screen.getByText('Test content')
    expect(card).toHaveClass('custom-class')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Card variant="default">Default</Card>)
    expect(screen.getByText('Default')).toBeInTheDocument()

    rerender(<Card variant="elevated">Elevated</Card>)
    expect(screen.getByText('Elevated')).toBeInTheDocument()

    rerender(<Card variant="bordered">Bordered</Card>)
    expect(screen.getByText('Bordered')).toBeInTheDocument()
  })

  it('renders with different padding options', () => {
    const { rerender } = render(<Card padding="none">No padding</Card>)
    expect(screen.getByText('No padding')).toBeInTheDocument()

    rerender(<Card padding="sm">Small padding</Card>)
    expect(screen.getByText('Small padding')).toBeInTheDocument()

    rerender(<Card padding="md">Medium padding</Card>)
    expect(screen.getByText('Medium padding')).toBeInTheDocument()

    rerender(<Card padding="lg">Large padding</Card>)
    expect(screen.getByText('Large padding')).toBeInTheDocument()
  })

  it('renders with hover effect when enabled', () => {
    render(<Card hover>Hover card</Card>)
    const card = screen.getByText('Hover card')
    expect(card).toHaveClass('hover:bg-primary-navy/80/70')
    expect(card).toHaveClass('transition-colors')
    expect(card).toHaveClass('cursor-pointer')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<Card ref={ref}>Ref test</Card>)
    expect(ref).toHaveBeenCalled()
  })

  it('passes through additional props', () => {
    render(<Card data-testid="card" aria-label="Test card">Props test</Card>)
    const card = screen.getByTestId('card')
    expect(card).toHaveAttribute('aria-label', 'Test card')
  })
})

describe('CardHeader', () => {
  it('renders with default props', () => {
    render(<CardHeader>Header content</CardHeader>)
    expect(screen.getByText('Header content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<CardHeader className="header-class">Header</CardHeader>)
    const header = screen.getByText('Header')
    expect(header).toHaveClass('header-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<CardHeader ref={ref}>Header</CardHeader>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('CardContent', () => {
  it('renders with default props', () => {
    render(<CardContent>Content</CardContent>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<CardContent className="content-class">Content</CardContent>)
    const content = screen.getByText('Content')
    expect(content).toHaveClass('content-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<CardContent ref={ref}>Content</CardContent>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('CardFooter', () => {
  it('renders with default props', () => {
    render(<CardFooter>Footer</CardFooter>)
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    render(<CardFooter className="footer-class">Footer</CardFooter>)
    const footer = screen.getByText('Footer')
    expect(footer).toHaveClass('footer-class')
  })

  it('forwards ref correctly', () => {
    const ref = jest.fn()
    render(<CardFooter ref={ref}>Footer</CardFooter>)
    expect(ref).toHaveBeenCalled()
  })
})

describe('Card composition', () => {
  it('renders complete card structure', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>
    )

    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
