import { Nullable } from 'types/global'

export type RawArtistReference = {
  uri: string
  name: string
}

export type WebPlaybackTrack = {
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
  artists: RawArtistReference[]
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
    previous_tracks: WebPlaybackTrack[]
    next_tracks: WebPlaybackTrack[]
  }
}

export type RawDevice = {
  id: string
  is_active: boolean
  is_private_session: boolean
  is_restricted: boolean
  name: string
  type: string
  volume_percent: boolean
}

export type RawDeviceList = {
  devices: RawDevice[]
}
