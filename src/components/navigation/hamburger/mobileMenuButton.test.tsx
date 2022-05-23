import { fireEvent, render, screen } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { MobileMenuButton } from './mobileMenuButton'
import { createMemoryHistory } from 'history'
import { defaultTheme } from 'theme'
import { ThemeProvider } from 'styled-components'
import { Router } from 'react-router-dom'

describe('Mobile Menu Button', () => {
  it('renders component correctly and click works', () => {
    const text = faker.random.words()
    const path = `/${text.split(' ').join('/')}`
    const pushParams = { hash: '', pathname: path, search: '' }
    const history = createMemoryHistory()
    history.push = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <MobileMenuButton icon="fa-times" title={text} path={path} />
        </Router>
      </ThemeProvider>,
    )
    const buttonElement = screen.getByRole('button', { hidden: true })
    expect(buttonElement).toBeInTheDocument()

    fireEvent.click(buttonElement)
    expect(history.push).toHaveBeenCalledWith(pushParams, undefined)
  })
})
