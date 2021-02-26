import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'

import { Button } from '../index'

describe('Button', () => {
  it('renders Button correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Button>Text</Button>
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeTruthy()
  })
})
