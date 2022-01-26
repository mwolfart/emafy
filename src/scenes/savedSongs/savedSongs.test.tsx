import { screen, render } from '@testing-library/react'
import { songs as mockedSongs } from 'fixtures/songs'
import { BrowserRouter } from 'react-router-dom'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { SavedSongs } from './savedSongs'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedSongs,
    nextURL: null,
    totalCount: mockedSongs.length,
    isLoading: false,
  }),
}))

describe('Saved Songs', () => {
  it('renders scene headers correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedSongs />
        </BrowserRouter>
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.songs.mySavedSongs,
    )
    const labelSongCntElement = screen.getByText(
      `${mockedSongs.length} ${strings.scenes.songs.subtextSongs}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelSongCntElement).toBeTruthy()
  })

  it('renders song list correctly', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedSongs />
        </BrowserRouter>
      </ThemeProvider>,
    )

    mockedSongs.forEach((song) => {
      const el = screen.getByText(song.name)
      expect(el).toBeTruthy()
    })
  })
})
