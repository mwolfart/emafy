import { NextURL } from 'api/data'
import { Album, Media, SimpleArtist, Song } from './media'
import { MediaExtraProps } from './mediaExtraProps'

export type MediaListQuery<T> = {
  fetchMoreMedia: () => void
  mediaList: T[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}

export type ArtistDetailsQuery = {
  artistInfo?: SimpleArtist
  relatedArtists: SimpleArtist[]
  artistAlbums: Album[]
  artistTotalAlbums: number
  artistTopTracks: Song[]
  isLoading: boolean
}
