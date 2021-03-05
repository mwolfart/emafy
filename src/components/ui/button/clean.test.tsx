import { render, screen } from '@testing-library/react'
import faker from 'faker'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders CleanButton correctly', () => {
    const text = faker.random.words()
    render(<CleanButton>{text}</CleanButton>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
  })
})
