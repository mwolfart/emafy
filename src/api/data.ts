import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist, User } from 'types/media'
import { Nullable } from 'types/global'
import {
  parseAlbum,
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
  parseAlbumTracks,
  parseUserData,
} from './parser'
import { RawAlbum, RawAlbumTrack, RawArtist, RawUser } from 'types/apiMedia'
import { SPOTIFY_ROUTE } from './spotifyRoute.enum'

export type NextURL = Nullable<string>

type SpotifyDataRequest<T, U> = {
  route: string
  parser: (items: T[]) => U[]
  next?: NextURL
  saved?: boolean
  otherParams?: { [key: string]: string }
}

export type MediaListResponse<T> = {
  entities: Array<T>
  next: NextURL
  total: number
}

const getSpotifyData = <T, U>({
  route,
  parser,
  next,
  saved,
}: SpotifyDataRequest<T, U>): Promise<{
  entities: U[]
  next: NextURL
  total: number
}> => {
  const baseLink = (saved ? SPOTIFY_ROUTE.OWN : '') + route
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
): Promise<MediaListResponse<Album>> => {
  const route = SPOTIFY_ROUTE.ALBUMS
  return getSpotifyData({ route, parser: parseSavedAlbums, next, saved: true })
}

export const getSavedSongs = (
  next?: NextURL,
): Promise<MediaListResponse<Song>> => {
  const route = SPOTIFY_ROUTE.TRACKS
  return getSpotifyData({ route, parser: parseSavedTracks, next, saved: true })
}

export const getUsersTopArtists = (
  next?: NextURL,
): Promise<MediaListResponse<SimpleArtist>> => {
  const route = SPOTIFY_ROUTE.TOP_ARTISTS
  return getSpotifyData({
    route,
    parser: parseSimpleArtists,
    next,
    saved: true,
  })
}

export const getUserProfile = (): Promise<User> => {
  const route = SPOTIFY_ROUTE.OWN
  return spotifyInstance<RawUser>(route).then(({ data }) => parseUserData(data))
}

export const getFollowedUsers = (
  next?: NextURL,
): Promise<MediaListResponse<SimpleArtist>> => {
  const baseLink = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  const route = baseLink + (next || '')
  return spotifyInstance<{
    artists: {
      items: RawArtist[]
      next?: string
      total: number
    }
  }>(route, { type: 'artist' }).then(
    ({
      data: {
        artists: { items, next, total },
      },
    }) => {
      const nextLink =
        typeof next === 'string'
          ? next.replace('https://api.spotify.com/v1/' + baseLink, '')
          : null
      return {
        entities: parseSimpleArtists(items),
        next: nextLink,
        total: total,
      }
    },
  )
}

export const getAlbumTracks = (
  album: Album,
  next?: NextURL,
): Promise<MediaListResponse<Song>> => {
  const route = SPOTIFY_ROUTE.ALBUM_TRACKS.replace(':id', album.id)
  return getSpotifyData({
    route,
    parser: (items: RawAlbumTrack[]) => parseAlbumTracks(items, album),
    next,
  })
}

export const getAlbum = (id: string): Promise<{ entities: Album }> => {
  const route = SPOTIFY_ROUTE.ALBUM.replace(':id', id)
  return spotifyInstance<RawAlbum>(route).then(({ data: album }) => {
    return {
      entities: parseAlbum(album),
    }
  })
}
