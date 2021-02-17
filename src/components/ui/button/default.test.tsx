import React from 'react'
import { render } from '@testing-library/react'

import { Button } from '../index'

describe('Button', () => {
  it('renders Button correctly', () => {
    const { container } = render(<Button>Text</Button>)
    expect(container.childElementCount).toBeTruthy()
  })
})
