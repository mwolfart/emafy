import { fireEvent, render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter, Router } from 'react-router-dom'
import { user } from 'fixtures/user'
import { createMemoryHistory } from 'history'
import { strings } from 'strings'

describe('Profile Info', () => {
  it('renders component and props correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <ProfileInfo userInfo={user} />
        </BrowserRouter>
      </ThemeProvider>,
    )
    const element = screen.getByText(user.name)
    expect(element).toBeInTheDocument()
  })

  it('redirects to profile page', () => {
    const history = createMemoryHistory()
    history.push = jest.fn()
    const path = '/me/'
    const pushParams = { hash: '', pathname: path, search: '' }

    render(
      <ThemeProvider theme={defaultTheme}>
        <Router location={history.location} navigator={history}>
          <ProfileInfo userInfo={user} />
        </Router>
      </ThemeProvider>,
    )

    fireEvent.click(screen.getByText(strings.components.topbar.viewProfile))
    expect(history.push).toHaveBeenCalledWith(pushParams, undefined)
  })
})
