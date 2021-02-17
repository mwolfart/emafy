import React from 'react'
import { render } from '@testing-library/react'

import { Button } from '../index'

describe('Button', () => {
  it('renders Button correctly', () => {
    const { getByRole } = render(<Button>Text</Button>)
    const buttonElement = getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
