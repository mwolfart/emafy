import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Hamburger } from './hamburger'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('Hamburger', () => {
  it('renders component correctly', () => {
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <Hamburger />
        </Router>
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', {
      name: strings.components.hamburger.open,
    })
    expect(buttonElement).toBeInTheDocument()
  })
})
