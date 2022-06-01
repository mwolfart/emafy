import { RawAlbum, RawTrack } from './apiMedia'

export type SavedAlbum = {
  added_at: string
  album: RawAlbum
}

export type SavedTrack = {
  added_at: string
  track: RawTrack
}
