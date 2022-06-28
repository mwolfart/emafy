import { RawImage } from './data'
import { RawSavedTrack } from './savedMedia'

export type BasicRawMedia = {
  images?: RawImage[]
  id: string
  name: string
}

export type RawTracksAlbum = {
  images: RawImage[]
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

export interface RawPlaylist extends BasicRawMedia {
  followers: { total: number }
  owner: { display_name: string }
  description: string
  tracks: {
    total: number
  }
}

export interface RawPlaylistDetails extends RawPlaylist {
  tracks: {
    items: RawSavedTrack[]
    total: number
  }
}
