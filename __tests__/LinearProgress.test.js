import React from 'react'
import { render } from './test-utils'
import { LinearProgress } from '../components/linear-progress'

describe('LinearProgress', () => {
  it('renders correctly', () => {
    const { container } = render(<LinearProgress />)
    expect(container.firstChild).toHaveClass('bg-primary')
  })
})

