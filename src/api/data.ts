import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist } from 'types/media'
import { Nullable } from 'types/global'
import {
  parseAlbum,
  parseSavedAlbums,
  parseTracks,
  parseSavedTracks,
  parseSimpleArtists,
} from './parser'
import { RawAlbum } from 'types/apiMedia'

export type NextURL = Nullable<string>

const getSpotifyData = <T, U>(
  route: string,
  parser: (items: T[]) => U[],
  next?: NextURL,
  saved?: boolean,
): Promise<{ entities: U[]; next: NextURL; total: number }> => {
  const baseLink = (saved ? 'me/' : '') + route
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

const getSaved = <T, U>(
  route: string,
  parser: (items: T[]) => U[],
  next?: NextURL,
): Promise<{ entities: U[]; next: NextURL; total: number }> =>
  getSpotifyData(route, parser, next, true)

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

export const getAlbumTracks = (
  albumId: string,
  next?: NextURL,
): Promise<{ entities: Array<Song>; next: NextURL; total: number }> => {
  const route = `albums/${albumId}/tracks`
  return getSpotifyData(route, parseTracks, next)
}

export const getAlbum = (id: string): Promise<{ entities: Album }> => {
  const route = `albums/${id}`
  return spotifyInstance<RawAlbum>(route).then(({ data: album }) => {
    return {
      entities: parseAlbum(album),
    }
  })
}
