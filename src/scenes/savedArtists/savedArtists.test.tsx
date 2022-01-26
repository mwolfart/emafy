import { screen, render } from '@testing-library/react'
import { artists as mockedArtists } from 'fixtures/artists'
import { BrowserRouter } from 'react-router-dom'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { SavedArtists } from './savedArtists'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedArtists,
    nextURL: null,
    totalCount: mockedArtists.length,
    isLoading: false,
  }),
}))

describe('Saved Artists', () => {
  it('renders scene headers correctly', () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedArtists />
        </BrowserRouter>
      </ThemeProvider>,
    )
    const labelSavedElement = screen.getByText(
      strings.scenes.artists.mySavedArtists,
    )
    const labelArtistCntElement = screen.getByText(
      `${mockedArtists.length} ${strings.scenes.artists.subtextArtists}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelArtistCntElement).toBeTruthy()
  })

  it('renders artist list correctly', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedArtists />
        </BrowserRouter>
      </ThemeProvider>,
    )

    mockedArtists.forEach((artist) => {
      const el = screen.getByText(artist.name)
      expect(el).toBeTruthy()
    })
  })
})
