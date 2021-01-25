import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist } from 'types/media'
import {
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
} from './parser'

type nextURL = string | null

const getSaved = <T, U>(
  route: string,
  next: nextURL,
  parser: (items: T[]) => U[],
): Promise<{ entities: U[]; next: nextURL }> => {
  const baseLink = 'me/' + route
  const requestLink = next ? `${baseLink}${next}` : baseLink
  return spotifyInstance<T>(requestLink).then(({ data: { items, next } }) => {
    const nextLink =
      typeof next === 'string'
        ? next.replace('https://api.spotify.com/v1/' + baseLink, '')
        : null
    return {
      entities: parser(items),
      next: nextLink,
    }
  })
}

export const getSavedAlbums = (
  next: nextURL,
): Promise<{ entities: Array<Album>; next: nextURL }> => {
  const route = 'albums'
  return getSaved(route, next, parseSavedAlbums)
}

export const getSavedSongs = (
  next: nextURL,
): Promise<{ entities: Array<Song>; next: nextURL }> => {
  const route = 'tracks'
  return getSaved(route, next, parseSavedTracks)
}

export const getUsersTopArtists = (
  next: nextURL,
): Promise<{
  entities: Array<SimpleArtist>
  next: nextURL
}> => {
  const route = 'top/artists'
  return getSaved(route, next, parseSimpleArtists)
}
