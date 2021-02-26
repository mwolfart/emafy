import { render, screen } from '@testing-library/react'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders CleanButton correctly', () => {
    render(<CleanButton>Text</CleanButton>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
