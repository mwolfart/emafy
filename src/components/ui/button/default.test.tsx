import { render, screen } from '@testing-library/react'

import { Button } from '../index'

describe('Button', () => {
  it('renders Button correctly', () => {
    render(<Button>Text</Button>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
