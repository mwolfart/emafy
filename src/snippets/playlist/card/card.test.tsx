import { fireEvent, render, screen } from '@testing-library/react'
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

    const labelSavedElement = screen.getByText(mockedPlaylist.name)
    expect(labelSavedElement).toBeTruthy()
  })

  it('renders track list correctly', async () => {
    const fnCloseSnippet = jest.fn()

    render(
      <ThemeProvider theme={defaultTheme}>
        <PlaylistCard playlistId="0" fnCloseSnippet={fnCloseSnippet} />
      </ThemeProvider>,
    )

    mockedPlaylist.tracks.forEach((track) => {
      const el = screen.getByText(track.name)
      expect(el).toBeTruthy()
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
      name: strings.components.modal.closeModal,
    })
    fireEvent.click(el)
    expect(fnCloseSnippet).toHaveBeenCalled()
  })
})
