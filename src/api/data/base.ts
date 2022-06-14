import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseSimpleArtists } from 'api/parser/artist'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { extractNextFromNextURL } from 'api/utils'
import { SpotifyDataRequest } from 'api/types/data'
import { RawArtist } from 'api/types/media'
import { RawMediaListResponse } from 'api/types/query'
import { SimpleArtist } from 'types/media'
import { MediaListResponse } from 'types/mediaQuery'
import { NextURL } from 'types/global'

export const getSpotifyData = <T, U>({
  route,
  parser,
  next,
  shouldGetInfoFromLoggedUser,
  otherParams,
}: SpotifyDataRequest<T, U>): Promise<{
  entities: U[]
  next: NextURL
  total: number
}> => {
  const linkPrefix = shouldGetInfoFromLoggedUser ? SPOTIFY_ROUTE.OWN : ''
  const baseLink = linkPrefix + route
  const requestLink = next ? `${baseLink}${next}` : baseLink
  return spotifyInstance<{ items: T[]; next?: string; total: number }>(
    requestLink,
    Method.GET,
    { params: otherParams },
  ).then(({ data: { items, next, total } }) => {
    return {
      entities: parser(items),
      next: extractNextFromNextURL(next),
      total: total,
    }
  })
}

export const getArtistListData = (
  route: string,
): Promise<MediaListResponse<SimpleArtist>> => {
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
        next: extractNextFromNextURL(next),
        total: total,
      }
    },
  )
}
