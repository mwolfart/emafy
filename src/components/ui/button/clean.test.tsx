import { render, screen } from '@testing-library/react'

import { CleanButton } from '../index'

describe('CleanButton', () => {
  it('renders CleanButton correctly', () => {
    const faker = require('faker')
    const text = faker.random.words()
    render(<CleanButton>{text}</CleanButton>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
