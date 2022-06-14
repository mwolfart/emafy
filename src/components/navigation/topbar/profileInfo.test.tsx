import { render, screen } from '@testing-library/react'
import { ProfileInfo } from './profileInfo'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { BrowserRouter } from 'react-router-dom'
import { user } from 'fixtures/user'

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
})
