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

export type RawUser = {
  country: string
  display_name: string
  email: string
  id: string
  images: Image[]
  followers: {
    href: string
    total: number
  }
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

export interface RawPlaylist extends BasicRawMedia {
  followers: { total: number }
  owner: { display_name: string }
  description: string
  tracks: {
    items: RawTrack[]
    total: number
  }
}

export type SavedAlbum = {
  added_at: string
  album: RawAlbum
}

export type SavedTrack = {
  added_at: string
  track: RawTrack
}
