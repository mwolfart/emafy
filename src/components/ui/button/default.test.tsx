import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { faker } from '@faker-js/faker'

import { Button } from '../index'

describe('Button', () => {
  it('renders component and props correctly', () => {
    const text = faker.random.words()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Button>{text}</Button>
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', { name: text })
    expect(buttonElement).toBeInTheDocument()
  })
})
