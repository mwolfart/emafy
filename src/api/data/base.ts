import { parseSimpleArtists } from 'api/parser/artist'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { RawArtist } from 'api/types/media'
import { RawMediaListResponse } from 'api/types/query'
import { SimpleArtist, PagedDataList } from 'types/media'
import { NextURL } from 'types/global'
import { AxiosResponse } from 'axios'

export type RawPagedItems<T> = {
  items: T[]
  next?: string
  total: number
}

export const getPagedData = <T>(
  route: string,
  next?: NextURL,
  otherParams?: { [key: string]: string },
): Promise<AxiosResponse<RawPagedItems<T>>> => {
  const requestLink = next ? next : route
  return spotifyInstance<RawPagedItems<T>>(requestLink, Method.GET, {
    params: otherParams,
  })
}

export const getPagedMedia = <T, U>(
  route: string,
  parser: (items: T[]) => U[],
  next?: NextURL,
  otherParams?: { [key: string]: string },
): Promise<PagedDataList<U>> => {
  return getPagedData<T>(route, next, otherParams).then(
    ({ data: { items, next, total } }) => {
      return {
        entities: parser(items),
        next: next || null,
        total: total,
      }
    },
  )
}

export const getArtistListData = (
  route: string,
): Promise<PagedDataList<SimpleArtist>> => {
  return spotifyInstance<{
    artists: RawMediaListResponse<RawArtist>
  }>(route, Method.GET, { params: { type: 'artist' } }).then(
    ({
      data: {
        artists: { items, next, total },
      },
    }) => {
      return {
        entities: parseSimpleArtists(items),
        next: next || null,
        total: total,
      }
    },
  )
}
