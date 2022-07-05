import { RawAlbum, RawArtist, RawPlaylist, RawTrack } from './media'
import { RawMediaListResponse } from './query'

export type RawCategory = {
  id: string
  name: string
}

export type RawRecommendations = {
  tracks: RawTrack[]
}

export type RawSearchResults = {
  tracks: RawMediaListResponse<RawTrack>
  artists: RawMediaListResponse<RawArtist>
  albums: RawMediaListResponse<RawAlbum>
  playlists: RawMediaListResponse<RawPlaylist>
}
