import { fireEvent, render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { defaultTheme } from 'theme'
import { PlayerComponent } from './player'
import { PlaybackSDK, PlaybackState } from 'types/playbackSDK'
import { PlayerContext } from 'contexts/player'
import { Nullable } from 'types/global'
import { playbackState as mockPlaybackState } from 'fixtures/playback'
import { strings } from 'strings'
import { abbreviateText, nameListToString } from 'utils/utils'

const mockPlaybackSDK: PlaybackSDK = {
  togglePlay: jest.fn(),
  resume: jest.fn(),
  pause: jest.fn(),
  connect: jest.fn(),
  getCurrentState: jest.fn(),
  getVolume: jest.fn(() => Promise.resolve(1)),
  setVolume: jest.fn(),
  seek: jest.fn(),
  previousTrack: jest.fn(),
  nextTrack: jest.fn(),
  addListener: jest.fn(),
}

const mockPlayerContext = {
  playMedia: jest.fn(),
  playSong: jest.fn(),
  playArtist: jest.fn(),
  playAlbum: jest.fn(),
  playPlaylist: jest.fn(),
}

jest.mock('api/initPlaybackSDK', () => ({
  initPlaybackSDK: (callback: (state: Nullable<PlaybackState>) => void) => {
    callback(mockPlaybackState)
    return mockPlaybackSDK
  },
}))

describe('Player Component', () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={defaultTheme}>
        <PlayerContext.Provider value={mockPlayerContext}>
          <PlayerComponent />
        </PlayerContext.Provider>
      </ThemeProvider>,
    )
  })

  it('renders component correctly', () => {
    const buttons = [
      strings.ui.play,
      strings.ui.previous,
      strings.ui.next,
      strings.ui.viewQueue,
      strings.ui.adjustVolume,
    ]

    buttons.forEach((buttonLabel) => {
      const el = screen.getByRole('button', {
        name: buttonLabel,
      })
      expect(el).toBeInTheDocument()
    })

    const { currentTrack } = mockPlaybackState.trackWindow
    const trackName = abbreviateText(currentTrack.name, 50)
    const artistName = abbreviateText(
      nameListToString(currentTrack.artists),
      50,
    )

    const trackNameElement = screen.getByText(trackName)
    const artistNameElement = screen.getByText(artistName)
    expect(trackNameElement).toBeInTheDocument()
    expect(artistNameElement).toBeInTheDocument()
  })

  it('clicking on player navigation buttons triggers sdk navigation', () => {
    const buttons = [
      {
        label: strings.ui.play,
        mock: mockPlaybackSDK.togglePlay,
      },
      {
        label: strings.ui.previous,
        mock: mockPlaybackSDK.previousTrack,
      },
      {
        label: strings.ui.next,
        mock: mockPlaybackSDK.nextTrack,
      },
    ]
    buttons.forEach((buttonProps) => {
      const el = screen.getByRole('button', {
        name: buttonProps.label,
      })
      fireEvent.click(el)
      expect(buttonProps.mock).toHaveBeenCalled()
    })
  })

  /*
  it('calling context play triggers sdk play', () => {
    const playerContext = useContext(PlayerContext)
    const mockPlayMedia = jest.fn()
    jest.mock('api/data/playback', () => ({
      playMedia: mockPlayMedia,
    }))
    const currentTrack = mockPlaybackState.track_window.current_track
    playerContext.playSong(currentTrack.id)
    expect(mockPlayMedia).toHaveBeenCalled()
  })
  */
})
