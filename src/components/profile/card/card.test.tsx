import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mainStyles } from 'styles'
import faker from 'faker'
import { ProfileCard } from './card'
import { user } from 'fixtures/user'

describe('ProfileCard', () => {
  it('renders ProfileCard correctly', () => {
    const followingCount = faker.datatype.number(200)
    const savedMusicCount = faker.datatype.number(200)
    const playlistCount = faker.datatype.number(200)

    render(
      <ThemeProvider theme={mainStyles}>
        <ProfileCard
          user={user}
          followingCount={followingCount}
          savedMusicCount={savedMusicCount}
          playlistCount={playlistCount}
        />
      </ThemeProvider>,
    )
    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.country)).toBeInTheDocument()
    expect(screen.getByText(user.followerCount)).toBeInTheDocument()
    expect(screen.getByText(followingCount)).toBeInTheDocument()
    expect(screen.getByText(savedMusicCount)).toBeInTheDocument()
    expect(screen.getByText(playlistCount)).toBeInTheDocument()
  })
})
