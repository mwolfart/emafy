import { NextURL } from 'api/data'
import { DetailedArtist } from './media'

export type MediaListQuery<T> = {
  fetchMoreMedia: () => void
  mediaList: T[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}

export type ArtistDetailsQuery = {
  artistInfo: DetailedArtist
  setArtistInfo: (artistInfo: DetailedArtist) => void
  isLoading: boolean
}
