import React from 'react'
import { render, fireEvent } from './test-utils'
import { FilterDrawer } from '../components/filter-drawer'

describe('FilterDrawer', () => {
  it('renders correctly when open', () => {
    const { getByText } = render(
      <FilterDrawer isOpen={true} onOpenChange={() => {}} onFilter={() => {}} />
    )
    expect(getByText('Filter')).toBeInTheDocument()
  })

  it('calls onFilter when Apply button is clicked', () => {
    const mockOnFilter = jest.fn()
    const { getByText } = render(
      <FilterDrawer isOpen={true} onOpenChange={() => {}} onFilter={mockOnFilter} />
    )
    fireEvent.click(getByText('Apply'))
    expect(mockOnFilter).toHaveBeenCalled()
  })
})

