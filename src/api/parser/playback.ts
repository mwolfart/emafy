import { WebPlaybackState, WebPlaybackTrack } from 'api/types/playback'
import { PlaybackState, PlaybackTrack } from 'types/playbackSDK'
import { parseImages } from './images'

export const parsePlaybackState = ({
  paused,
  position,
  duration,
  repeat_mode,
  shuffle,
  track_window,
}: WebPlaybackState): PlaybackState => ({
  paused,
  position,
  duration,
  repeatMode: repeat_mode,
  shuffle,
  trackWindow: {
    currentTrack: parsePlaybackTrack(track_window.current_track),
    nextTracks: parsePlaybackTracks(track_window.next_tracks),
    previousTracks: parsePlaybackTracks(track_window.previous_tracks),
  },
})

const parsePlaybackTrack = ({
  id,
  name,
  album: { name: albumName, images },
  artists,
}: WebPlaybackTrack): PlaybackTrack => ({
  id,
  name,
  album: {
    name: albumName,
    images: parseImages(images) || [],
  },
  artists: artists.map((artist) => artist.name),
})

const parsePlaybackTracks = (tracks: WebPlaybackTrack[]): PlaybackTrack[] =>
  tracks.map((track) => parsePlaybackTrack(track))
