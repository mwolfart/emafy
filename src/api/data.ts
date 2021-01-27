import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist } from 'types/media'
import {
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
} from './parser'

type NextURL = string | null

const getSaved = <T, U>(
  route: string,
  next: NextURL,
  parser: (items: T[]) => U[],
): Promise<{ entities: U[]; next: NextURL }> => {
  const baseLink = 'me/' + route
  const requestLink = next ? `${baseLink}${next}` : baseLink
  return spotifyInstance<{ items: T[]; next?: string }>(requestLink).then(
    ({ data: { items, next } }) => {
      const nextLink =
        typeof next === 'string'
          ? next.replace('https://api.spotify.com/v1/' + baseLink, '')
          : null
      return {
        entities: parser(items),
        next: nextLink,
      }
    },
  )
}

export const getSavedAlbums = (
  next: NextURL,
): Promise<{ entities: Array<Album>; next: NextURL }> => {
  const route = 'albums'
  return getSaved(route, next, parseSavedAlbums)
}

export const getSavedSongs = (
  next: NextURL,
): Promise<{ entities: Array<Song>; next: NextURL }> => {
  const route = 'tracks'
  return getSaved(route, next, parseSavedTracks)
}

export const getUsersTopArtists = (
  next: NextURL,
): Promise<{
  entities: Array<SimpleArtist>
  next: NextURL
}> => {
  const route = 'top/artists'
  return getSaved(route, next, parseSimpleArtists)
}
