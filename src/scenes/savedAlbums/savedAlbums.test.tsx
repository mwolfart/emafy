import { render, screen } from '@testing-library/react'
import { albums as mockedAlbums } from 'fixtures/albums'
import { BrowserRouter } from 'react-router-dom'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { SavedAlbums } from './savedAlbums'

jest.mock('hooks/useGetMediaList', () => ({
  useGetMediaList: () => ({
    fetchMoreMedia: jest.fn(),
    mediaList: mockedAlbums,
    nextURL: null,
    totalCount: mockedAlbums.length,
    isLoading: false,
  }),
}))

describe('Saved Albums', () => {
  it('renders scene headers correctly', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedAlbums />
        </BrowserRouter>
      </ThemeProvider>,
    )

    const labelSavedElement = screen.getByText(
      strings.scenes.albums.mySavedAlbums,
    )
    const labelAlbumCntElement = screen.getByText(
      `${mockedAlbums.length} ${strings.scenes.albums.subtextAlbums}`,
    )
    expect(labelSavedElement).toBeTruthy()
    expect(labelAlbumCntElement).toBeTruthy()
  })

  it('renders album list correctly', async () => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <SavedAlbums />
        </BrowserRouter>
      </ThemeProvider>,
    )

    mockedAlbums.forEach((album) => {
      const el = screen.getByText(album.name)
      expect(el).toBeTruthy()
    })
  })
})
