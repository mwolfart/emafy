import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { strings } from 'strings'
import { Topbar } from './topbar'
import { UserContext, UserContextProps } from 'contexts/user'
import { user } from 'fixtures/user'

describe('Topbar', () => {
  it('renders component and props correctly', () => {
    const history = createMemoryHistory()
    const context: UserContextProps = {
      user: user,
      preferences: {
        theme: 'light',
        font: 'classic',
        language: 'en',
      },
      setPreferences: () => {},
    }
    render(
      <ThemeProvider theme={defaultTheme}>
        <UserContext.Provider value={context}>
          <Router location={history.location} navigator={history}>
            <Topbar />
          </Router>
        </UserContext.Provider>
      </ThemeProvider>,
    )
    const nameElement = screen.getByText(user.name)
    const searchElement = screen.getByLabelText(
      strings.components.topbar.searchSong,
    )
    expect(nameElement).toBeInTheDocument()
    expect(searchElement).toBeInTheDocument()
  })
})
