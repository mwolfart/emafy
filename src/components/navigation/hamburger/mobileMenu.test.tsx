import { fireEvent, render, screen } from '@testing-library/react'
import { MobileMenu } from './mobileMenu'
import { strings } from 'strings'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router } from 'react-router-dom'

describe('MobileMenu', () => {
  it('renders menu', () => {
    const closeFn = jest.fn()
    render(
      <ThemeProvider theme={defaultTheme}>
        <Router>
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
