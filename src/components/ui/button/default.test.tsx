import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'

import { Button } from '../index'

describe('Button', () => {
  it('renders Button correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={mainStyles}>
        <Button>{text}</Button>
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', { name: text })
    expect(buttonElement).toBeInTheDocument()
  })
})
