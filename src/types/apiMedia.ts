type Image = {
  url: string
}

export type BasicRawMedia = {
  images?: Image[]
  id: string
  name: string
}

export type RawTracksAlbum = {
  images: Image[]
  id: string
}

export interface RawAlbum extends BasicRawMedia {
  artists: BasicRawMedia[]
  total_tracks: number
}

export interface RawAlbumTrack extends BasicRawMedia {
  artists: BasicRawMedia[]
  duration_ms: number
  track_number: number
}

export interface RawTrack extends RawAlbumTrack {
  album: RawTracksAlbum
}

export interface RawArtist extends BasicRawMedia {
  genres: string[]
  followers: { total: number }
  popularity: number
}

export type SavedAlbum = {
  added_at: string
  album: RawAlbum
}

export type SavedTrack = {
  added_at: string
  track: RawTrack
}
