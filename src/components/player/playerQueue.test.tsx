import { defaultTheme } from 'theme'
import { PlayerQueue } from './playerQueue'
import { playbackState as mockPlaybackState } from 'fixtures/playback'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { abbreviateText, nameListToString } from 'utils/utils'

describe('Player Queue', () => {
  it('renders component correctly', () => {
    const currentTrack = mockPlaybackState.track_window.current_track
    const nextTracks = mockPlaybackState.track_window.next_tracks
    render(
      <ThemeProvider theme={defaultTheme}>
        <PlayerQueue currentTrack={currentTrack} tracks={nextTracks} />
      </ThemeProvider>,
    )

    const tracks = [currentTrack, ...nextTracks]
    tracks.forEach((track) => {
      const trackName = abbreviateText(track.name, 50)
      const artistNames = track.artists.map((artist) => artist.name)
      const artistName = abbreviateText(nameListToString(artistNames), 50)

      const trackNameElement = screen.getByText(trackName)
      const artistNameElement = screen.getByText(artistName)
      expect(trackNameElement).toBeInTheDocument()
      expect(artistNameElement).toBeInTheDocument()
    })
  })
})
