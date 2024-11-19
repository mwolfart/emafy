import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseSimpleArtists } from 'api/parser/artist'
import { parsePlaylists } from 'api/parser/playlist'
import { parseSavedAlbums, parseSavedTracks } from 'api/parser/saved'
import { parseUserData } from 'api/parser/user'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/global'
import { RawUser } from 'api/types/user'
import {
  User,
  Album,
  Song,
  SimpleArtist,
  Playlist,
  PagedDataList,
} from 'types/media'
import { getPagedMedia, getArtistListData } from './base'

export const getOwnProfile = (): Promise<User> => {
  const route = SPOTIFY_ROUTE.OWN
  return spotifyInstance<RawUser>(route, Method.GET).then(({ data }) =>
    parseUserData(data),
  )
}

export const getOwnSavedAlbums = (
  next?: NextURL,
): Promise<PagedDataList<Album>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.ALBUMS}`
  return getPagedMedia(route, parseSavedAlbums, next)
}

export const getOwnSavedSongs = (
  next?: NextURL,
): Promise<PagedDataList<Song>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.TRACKS}`
  return getPagedMedia(route, parseSavedTracks, next)
}

export const getOwnTopArtists = (
  next?: NextURL,
): Promise<PagedDataList<SimpleArtist>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.TOP_ARTISTS}`
  return getPagedMedia(route, parseSimpleArtists, next)
}

export const getOwnPlaylists = (
  next?: NextURL,
): Promise<PagedDataList<Playlist>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.PLAYLISTS}`
  return getPagedMedia(route, parsePlaylists, next)
}

export const getOwnFollowedUsers = (
  next?: NextURL,
): Promise<PagedDataList<SimpleArtist>> => {
  const baseLink = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  const route = next || baseLink
  return getArtistListData(route)
}

export const checkIfOwnFollowsArtist = (
  id: string,
  type: string,
): Promise<boolean> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING_CHECK
  return spotifyInstance<boolean[]>(route, Method.GET, {
    params: { ids: id, type },
  }).then(({ data }) => data[0])
}

export const setFollowingArtist = (
  id: string,
  type: string,
  isFollowing: boolean,
): Promise<string> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  return spotifyInstance<string[]>(
    route,
    isFollowing ? Method.PUT : Method.DELETE,
    {
      params: { ids: id, type },
    },
  ).then(({ data }) => data[0])
}
