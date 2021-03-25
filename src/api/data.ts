import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist } from 'types/media'
import { Nullable } from 'types/global'
import {
  parseAlbum,
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
  parseAlbumTracks,
} from './parser'
import { RawAlbum, RawAlbumTrack } from 'types/apiMedia'

export type NextURL = Nullable<string>

type spotifyDataRequest<T, U> = {
  route: string
  parser: (items: T[]) => U[]
  next?: NextURL
  saved?: boolean
}

const getSpotifyData = <T, U>({
  route,
  parser,
  next,
  saved,
}: spotifyDataRequest<T, U>): Promise<{
  entities: U[]
  next: NextURL
  total: number
}> => {
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

export const getSavedAlbums = (
  next?: NextURL,
): Promise<{ entities: Array<Album>; next: NextURL; total: number }> => {
  const route = 'albums'
  return getSpotifyData({ route, parser: parseSavedAlbums, next, saved: true })
}

export const getSavedSongs = (
  next: NextURL,
): Promise<{ entities: Array<Song>; next: NextURL }> => {
  const route = 'tracks'
  return getSpotifyData({ route, parser: parseSavedTracks, next, saved: true })
}

export const getUsersTopArtists = (
  next: NextURL,
): Promise<{
  entities: Array<SimpleArtist>
  next: NextURL
}> => {
  const route = 'top/artists'
  return getSpotifyData({
    route,
    parser: parseSimpleArtists,
    next,
    saved: true,
  })
}

export const getAlbumTracks = (
  album: Album,
  next?: NextURL,
): Promise<{ entities: Array<Song>; next: NextURL; total: number }> => {
  const route = `albums/${album.id}/tracks`
  return getSpotifyData({
    route,
    parser: (items: RawAlbumTrack[]) => parseAlbumTracks(items, album),
  })
}

export const getAlbum = (id: string): Promise<{ entities: Album }> => {
  const route = `albums/${id}`
  return spotifyInstance<RawAlbum>(route).then(({ data: album }) => {
    return {
      entities: parseAlbum(album),
    }
  })
}
