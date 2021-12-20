import { fireEvent, render, screen } from '@testing-library/react'
import { album } from 'fixtures/album'
import { albumTracks as mockedAlbumTracks } from 'fixtures/albumTracks'
import { BrowserRouter } from 'react-router-dom'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { AlbumCard } from './card'

jest.mock('hooks/useGetSavedMedia', () => ({
  useGetSavedMedia: () => ({
    changeView: jest.fn(),
    fetchMoreMedia: jest.fn(),
    isTransitioning: false,
    isViewList: false,
    mediaList: mockedAlbumTracks,
    nextURL: null,
    totalCount: mockedAlbumTracks.length,
    isLoading: false,
  }),
}))

describe('Album Tracks', () => {
  it('renders artist headline correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <AlbumCard albumInfo={album} fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    const labelSavedElement = screen.getByText(album.name)
    const labelAlbumCntElement = screen.getByText(album.artists[0].name)
    expect(labelSavedElement).toBeTruthy()
    expect(labelAlbumCntElement).toBeTruthy()
  })

  it('renders track list correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <AlbumCard albumInfo={album} fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    mockedAlbumTracks.forEach((track) => {
      const el = screen.getByText(track.name)
      expect(el).toBeTruthy()
    })
  })

  it('closes modal correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <AlbumCard albumInfo={album} fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    const el = screen.getByRole('button', {
      name: strings.components.modal.closeModal,
    })
    fireEvent.click(el)
    expect(fnCloseSnippet).toHaveBeenCalled()
  })
})
