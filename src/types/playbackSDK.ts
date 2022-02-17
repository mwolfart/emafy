import { Nullable } from './global'

type WebPlaybackTrack = {
  uri: string
  id: string
  type: string
  media_type: string
  name: string
  is_playable: boolean
  album: {
    uri: string
    name: string
    images: Array<{ url: string }>
  }
  artists: Array<{ uri: string; name: string }>
}

export type WebPlaybackState = {
  context: {
    uri: Nullable<string>
    metadata: unknown
  }
  disallows: {
    [key: string]: boolean
  }
  paused: boolean
  position: number
  duration: number
  repeat_mode: number
  shuffle: boolean
  track_window: {
    current_track: WebPlaybackTrack
    previous_track: WebPlaybackTrack[]
    next_tracks: WebPlaybackTrack[]
  }
}

export type PlaybackSDK = {
  togglePlay: () => Promise<void>
  resume: () => Promise<void>
  pause: () => Promise<void>
  connect: () => Promise<boolean>
  getVolume: () => Promise<number>
  setVolume: (value: number) => Promise<void>
  seek: (value: number) => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
  getCurrentState: () => Promise<Nullable<WebPlaybackState>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addListener: (name: string, foo: (params: any) => void) => boolean
}
