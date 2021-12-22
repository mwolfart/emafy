import { render, screen } from '@testing-library/react'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Hamburger } from './hamburger'
import { BrowserRouter as Router } from 'react-router-dom'

describe('Hamburger', () => {
  it('renders hamburger', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
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
