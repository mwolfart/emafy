import { NextURL } from 'types/api/apiData'
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
