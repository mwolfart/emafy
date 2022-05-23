import { fireEvent, render, screen } from '@testing-library/react'
import { MobileMenu } from './mobileMenu'
import { strings } from 'strings'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

describe('Mobile Menu', () => {
  it('renders component and props correctly', () => {
    const closeFn = jest.fn()
    const history = createMemoryHistory()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <MobileMenu closeMenu={closeFn} isOpen={true} />
        </Router>
      </ThemeProvider>,
    )
    const closeButtonElement = screen.getByRole('button', {
      name: strings.components.hamburger.close,
    })
    expect(closeButtonElement).toBeInTheDocument()

    fireEvent.click(closeButtonElement)
    expect(closeFn).toHaveBeenCalled()

    const elements = screen.getAllByRole('button', { hidden: true })
    expect(elements.length).toBe(8)
  })
})
