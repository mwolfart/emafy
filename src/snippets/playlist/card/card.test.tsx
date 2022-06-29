import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { detailedPlaylist as mockedPlaylist } from 'fixtures/detailedPlaylist'
import { strings } from 'strings'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { PlaylistCard } from './card'
import * as ApiPlaylist from 'api/data/playlist'

describe('Playlist Tracks', () => {
  jest.spyOn(ApiPlaylist, 'getPlaylist').mockResolvedValue({
    entities: mockedPlaylist,
  })

  it('renders headline correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <PlaylistCard playlistId="0" fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    await waitFor(() =>
      expect(screen.getByText(mockedPlaylist.name)).toBeTruthy(),
    )
  })

  it('renders track list correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <PlaylistCard playlistId="0" fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    mockedPlaylist.tracks.forEach(async (track) => {
      await waitFor(() => expect(screen.getByText(track.name)).toBeTruthy())
    })
  })

  it('closes modal correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <PlaylistCard playlistId="0" fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    const el = screen.getByRole('button', {
      name: strings.ui.closeModal,
    })
    fireEvent.click(el)
    expect(fnCloseSnippet).toHaveBeenCalled()
  })
})
