import { RawAlbum, RawTrack } from './media'

export type SavedAlbum = {
  added_at: string
  album: RawAlbum
}

export type SavedTrack = {
  added_at: string
  track: RawTrack
}
