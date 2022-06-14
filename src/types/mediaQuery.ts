import { NextURL } from 'types/global'
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

export type MediaListResponse<T> = {
  entities: Array<T>
  next: NextURL
  total: number
}
