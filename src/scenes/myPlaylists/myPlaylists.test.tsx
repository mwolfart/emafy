import { screen, render } from '@testing-library/react'
import { playlists as mockedPlaylists } from 'fixtures/playlists'
import { BrowserRouter } from 'react-router-dom'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { MyPlaylists } from './myPlaylists'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedPlaylists,
    nextURL: null,
    totalCount: mockedPlaylists.length,
    isLoading: false,
  }),
}))

describe('My Playlists', () => {
  it('renders scene headers correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <MyPlaylists />
        </BrowserRouter>
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.playlists.myPlaylists,
    )
    const labelSongCntElement = screen.getByText(
      `${mockedPlaylists.length} ${strings.scenes.playlists.subtextPlaylists}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelSongCntElement).toBeTruthy()
  })

  it('renders playlist list correctly', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <MyPlaylists />
        </BrowserRouter>
      </ThemeProvider>,
    )

    mockedPlaylists.forEach((playlist) => {
      const el = screen.getByText(playlist.name)
      expect(el).toBeTruthy()
    })
  })
})
