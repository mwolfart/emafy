import { RawAlbum, RawTrack } from './media'

export type RawSavedAlbum = {
  added_at: string
  album: RawAlbum
}

export type RawSavedTrack = {
  added_at: string
  track: RawTrack
}
