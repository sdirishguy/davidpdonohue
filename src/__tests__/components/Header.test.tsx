import { render, screen } from '@testing-library/react'
import Header from '@/components/layout/Header'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Header', () => {
  it('renders primary navigation', () => {
    render(<Header />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
  })
})
