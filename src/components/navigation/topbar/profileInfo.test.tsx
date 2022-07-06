import { render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter } from 'react-router-dom'
import { user } from 'fixtures/user'
import { UserContextProps, UserContext } from 'contexts/user'

describe('Profile Info', () => {
  it('renders component and props correctly', () => {
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
          <BrowserRouter>
            <ProfileInfo />
          </BrowserRouter>
        </UserContext.Provider>
      </ThemeProvider>,
    )
    const element = screen.getByText(user.name)
    expect(element).toBeInTheDocument()
  })
})
