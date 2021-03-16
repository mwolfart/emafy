import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist } from 'types/media'
import { Nullable } from 'types/global'
import {
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
} from './parser'

export type NextURL = Nullable<string>

const getSaved = <T, U>(
  route: string,
  parser: (items: T[]) => U[],
  next?: NextURL,
): Promise<{ entities: U[]; next: NextURL; total: number }> => {
  const baseLink = 'me/' + route
  const requestLink = next ? `${baseLink}${next}` : baseLink
  return spotifyInstance<{ items: T[]; next?: string; total: number }>(
    requestLink,
  ).then(({ data: { items, next, total } }) => {
    const nextLink =
      typeof next === 'string'
        ? next.replace('https://api.spotify.com/v1/' + baseLink, '')
        : null
    return {
      entities: parser(items),
      next: nextLink,
      total: total,
    }
  })
}

export const getSavedAlbums = (
  next?: NextURL,
): Promise<{ entities: Array<Album>; next: NextURL; total: number }> => {
  const route = 'albums'
  return getSaved(route, parseSavedAlbums, next)
}

export const getSavedSongs = (
  next: NextURL,
): Promise<{ entities: Array<Song>; next: NextURL }> => {
  const route = 'tracks'
  return getSaved(route, parseSavedTracks, next)
}

export const getUsersTopArtists = (
  next: NextURL,
): Promise<{
  entities: Array<SimpleArtist>
  next: NextURL
}> => {
  const route = 'top/artists'
  return getSaved(route, parseSimpleArtists, next)
}
