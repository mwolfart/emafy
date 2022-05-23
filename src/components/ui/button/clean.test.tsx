import { render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(<CleanButton>{text}</CleanButton>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeInTheDocument()
  })
})
