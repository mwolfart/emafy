import { spotifyInstance } from 'api/spotifyInstance'
import { Album, Song, SimpleArtist, User, Playlist } from 'types/media'
import { Nullable } from 'types/global'
import {
  parseAlbum,
  parseSavedAlbums,
  parseSavedTracks,
  parseSimpleArtists,
  parseAlbumTracks,
  parseUserData,
  parsePlaylists,
  parseSimpleArtist,
  parseAlbums,
  parseTracks,
} from './parser'
import {
  RawAlbum,
  RawAlbumTrack,
  RawArtist,
  RawTrack,
  RawUser,
} from 'types/apiMedia'
import { SPOTIFY_ROUTE } from './spotifyRoute.enum'
import { extractNextFromNextURL } from './utils'

export type NextURL = Nullable<string>

type SpotifyDataRequest<T, U> = {
  route: string
  parser: (items: T[]) => U[]
  next?: NextURL
  shouldGetInfoFromLoggedUser?: boolean
  otherParams?: { [key: string]: string }
}

type RawMediaListResponse<T> = {
  items: T[]
  next?: string
  total: number
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
    otherParams,
  ).then(({ data: { items, next, total } }) => {
    return {
      entities: parser(items),
      next: extractNextFromNextURL(next),
      total: total,
    }
  })
}

const getArtistListData = (
  route: string,
): Promise<MediaListResponse<SimpleArtist>> => {
  return spotifyInstance<{
    artists: RawMediaListResponse<RawArtist>
  }>(route, { type: 'artist' }).then(
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

export const getOwnProfile = (): Promise<User> => {
  const route = SPOTIFY_ROUTE.OWN
  return spotifyInstance<RawUser>(route).then(({ data }) => parseUserData(data))
}

export const getOwnSavedAlbums = (
  next?: NextURL,
): Promise<MediaListResponse<Album>> => {
  const route = SPOTIFY_ROUTE.ALBUMS
  return getSpotifyData({
    route,
    parser: parseSavedAlbums,
    next,
    shouldGetInfoFromLoggedUser: true,
  })
}

export const getOwnSavedSongs = (
  next?: NextURL,
): Promise<MediaListResponse<Song>> => {
  const route = SPOTIFY_ROUTE.TRACKS
  return getSpotifyData({
    route,
    parser: parseSavedTracks,
    next,
    shouldGetInfoFromLoggedUser: true,
  })
}

export const getOwnTopArtists = (
  next?: NextURL,
): Promise<MediaListResponse<SimpleArtist>> => {
  const route = SPOTIFY_ROUTE.TOP_ARTISTS
  return getSpotifyData({
    route,
    parser: parseSimpleArtists,
    next,
    shouldGetInfoFromLoggedUser: true,
  })
}

export const getOwnPlaylists = (
  next?: NextURL,
): Promise<MediaListResponse<Playlist>> => {
  const route = SPOTIFY_ROUTE.PLAYLISTS
  return getSpotifyData({
    route,
    parser: parsePlaylists,
    next,
    shouldGetInfoFromLoggedUser: true,
  })
}

export const getOwnFollowedUsers = (
  next?: NextURL,
): Promise<MediaListResponse<SimpleArtist>> => {
  const baseLink = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  const route = baseLink + (next || '')
  return getArtistListData(route)
}

export const checkIfOwnFollowsArtist = (
  id: string,
  type: string,
): Promise<boolean> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING_CHECK
  return spotifyInstance<boolean>(route, { ids: id, type }).then(
    ({ data }) => data,
  )
}

export const getUserFollowedUsers = (
  id: string,
  next?: NextURL,
): Promise<MediaListResponse<SimpleArtist>> => {
  const baseLink = '/' + id + '/' + SPOTIFY_ROUTE.FOLLOWING
  const route = baseLink + (next || '')
  return getArtistListData(route)
}

export const getUserSavedSongs = (
  id: string,
  next?: NextURL,
): Promise<MediaListResponse<Song>> => {
  const route = '/' + id + '/' + SPOTIFY_ROUTE.TRACKS
  return getSpotifyData({
    route,
    parser: parseSavedTracks,
    next,
  })
}

export const checkIfUserFollowsArtist = (
  userId: string,
  artistId: string,
  type: string,
): Promise<boolean> => {
  const route = '/' + userId + '/' + SPOTIFY_ROUTE.FOLLOWING_CHECK
  return spotifyInstance<boolean>(route, { ids: artistId, type }).then(
    ({ data }) => data,
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

export const getArtist = (id: string): Promise<{ entities: SimpleArtist }> => {
  const route = SPOTIFY_ROUTE.ARTIST.replace(':id', id)
  return spotifyInstance<RawArtist>(route).then(({ data: artist }) => {
    return {
      entities: parseSimpleArtist(artist),
    }
  })
}

export const getArtistAlbums = (
  id: string,
  next?: NextURL,
): Promise<MediaListResponse<Album>> => {
  const route = SPOTIFY_ROUTE.ARTIST_ALBUMS.replace(':id', id)
  return getSpotifyData({
    route,
    parser: (items: RawAlbum[]) => parseAlbums(items),
    next,
  })
}

export const getArtistTopTracks = (
  id: string,
): Promise<{ entities: Song[] }> => {
  const route = SPOTIFY_ROUTE.ARTIST_TRACKS.replace(':id', id)
  return spotifyInstance<{ tracks: RawTrack[] }>(route, { market: 'US' }).then(
    ({ data: { tracks } }) => {
      return {
        entities: parseTracks(tracks),
      }
    },
  )
}

export const getArtistRelatedArtists = (
  id: string,
): Promise<{ entities: SimpleArtist[] }> => {
  const route = SPOTIFY_ROUTE.ARTIST_RELATED.replace(':id', id)
  return spotifyInstance<{ artists: RawArtist[] }>(route).then(
    ({ data: { artists } }) => {
      return {
        entities: parseSimpleArtists(artists),
      }
    },
  )
}
