import { render, screen } from '@testing-library/react'
import { user } from 'fixtures/user'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import { Profile } from './profile'

describe('Profile', () => {
  it('renders Profile scene correctly', () => {
    render(
      <ThemeProvider theme={mainStyles}>
        <Profile user={user} />
      </ThemeProvider>,
    )

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.country)).toBeInTheDocument()
    expect(screen.getByText(user.followerCount)).toBeInTheDocument()
  })
})
