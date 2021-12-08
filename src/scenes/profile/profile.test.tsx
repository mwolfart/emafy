import { render, screen } from '@testing-library/react'
import { songs as mockedSongs } from 'fixtures/songs'
import { user } from 'fixtures/user'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Profile } from './profile'

jest.mock('hooks/useGetSavedMedia', () => ({
  useGetSavedMedia: () => ({
    changeView: jest.fn(),
    fetchMoreMedia: jest.fn(),
    isTransitioning: false,
    isViewList: false,
    mediaList: mockedSongs,
    nextURL: null,
    totalCount: mockedSongs.length,
    isLoading: false,
  }),
}))

jest.mock('hooks/useGetUserFollows', () => ({
  useGetUserFollows: () => ({
    followList: mockedSongs,
    nextURL: null,
    fetchMoreFollows: jest.fn(),
    totalCount: mockedSongs.length,
    isLoading: false,
  }),
}))

describe('Profile', () => {
  it('renders basic card information correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <Profile user={user} />
        </BrowserRouter>
      </ThemeProvider>,
    )

    expect(screen.getByText(user.name)).toBeInTheDocument()
    expect(screen.getByText(user.country)).toBeInTheDocument()
    expect(screen.getByText(user.followerCount)).toBeInTheDocument()
  })
})
