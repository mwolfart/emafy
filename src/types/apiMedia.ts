type image = {
  url: string
}

export type BasicRawMedia = {
  images?: image[]
  id: string
  name: string
}

type rawTracksAlbum = {
  images: image[]
  id: string
}

export interface RawAlbum extends BasicRawMedia {
  artists: BasicRawMedia[]
  total_tracks: number
}

export interface RawTrack extends BasicRawMedia {
  artists: BasicRawMedia[]
  album: rawTracksAlbum
  duration_ms: number
}

export interface RawArtist extends BasicRawMedia {
  genres: string[]
  followers: { total: number }
  popularity: number
}

export type savedAlbum = {
  added_at: string
  album: RawAlbum
}

export type savedTrack = {
  added_at: string
  track: RawTrack
}
