import { render, screen } from '@testing-library/react'
import { songs as mockedSongs } from 'fixtures/songs'
import { user } from 'fixtures/user'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { Profile } from './profile'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedSongs,
    nextURL: null,
    totalCount: mockedSongs.length,
    isLoading: false,
  }),
}))

jest.mock('hooks/useGetUserFollows', () => ({
  useGetUserFollows: () => ({
    mediaList: mockedSongs,
    nextURL: null,
    fetchMoreMedia: jest.fn(),
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
    expect(
      screen.getAllByText(user.followerCount).length,
    ).toBeGreaterThanOrEqual(1)
  })
})
