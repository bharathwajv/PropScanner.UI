import React from 'react'
import { render, fireEvent } from './test-utils'
import { BottomNav } from '../components/bottom-nav'

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('BottomNav', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<BottomNav />)
    expect(getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /favorites/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /compare/i })).toBeInTheDocument()
    expect(getByRole('button', { name: /search/i })).toBeInTheDocument()
    expect(getByRole('link', { name: /scan/i })).toBeInTheDocument()
  })

  it('dispatches search action when search button is clicked', () => {
    const { getByRole, store } = render(<BottomNav />)
    fireEvent.click(getByRole('button', { name: /search/i }))
    expect(store.getState().ui.isSearchOpen).toBe(true)
  })
})

