import { Nullable } from './global'

export type PlaybackMediaType = 'track' | 'album' | 'artist'

export type PlaybackTrack = {
  id: string
  name: string
  album: {
    name: string
    images: string[]
  }
  artists: string[]
}

export type PlaybackState = {
  paused: boolean
  position: number
  duration: number
  repeatMode: number
  shuffle: boolean
  trackWindow: {
    currentTrack: PlaybackTrack
    previousTracks: PlaybackTrack[]
    nextTracks: PlaybackTrack[]
  }
}

export type PlaybackSDK = {
  deviceId?: string
  togglePlay: () => Promise<void>
  resume: () => Promise<void>
  pause: () => Promise<void>
  connect: () => Promise<boolean>
  getVolume: () => Promise<number>
  setVolume: (value: number) => Promise<void>
  seek: (value: number) => Promise<void>
  previousTrack: () => Promise<void>
  nextTrack: () => Promise<void>
  getCurrentState: () => Promise<Nullable<PlaybackState>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addListener: (name: string, foo: (params: any) => void) => boolean
}
