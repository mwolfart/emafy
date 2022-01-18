import { NextURL } from 'api/data'
import { Media } from './media'
import { MediaExtraProps } from './mediaExtraProps'

export type MediaListQuery<T> = {
  fetchMoreMedia: () => void
  mediaList: T[]
  nextURL: NextURL
  totalCount: number
  isLoading: boolean
}
