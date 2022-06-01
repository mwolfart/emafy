import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseSimpleArtists } from 'api/parser/artist'
import { parsePlaylists } from 'api/parser/playlist'
import { parseSavedAlbums, parseSavedTracks } from 'api/parser/saved'
import { parseUserData } from 'api/parser/user'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/api/apiData'
import { RawUser } from 'types/api/apiUser'
import { User, Album, Song, SimpleArtist, Playlist } from 'types/media'
import { MediaListResponse } from 'types/mediaQuery'
import { getSpotifyData, getArtistListData } from './base'

export const getOwnProfile = (): Promise<User> => {
  const route = SPOTIFY_ROUTE.OWN
  return spotifyInstance<RawUser>(route, Method.GET).then(({ data }) =>
    parseUserData(data),
  )
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
  return spotifyInstance<boolean[]>(route, Method.GET, { ids: id, type }).then(
    ({ data }) => data[0],
  )
}

export const followArtist = (id: string, type: string): Promise<string> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  return spotifyInstance<string[]>(route, Method.PUT, { ids: id, type }).then(
    ({ data }) => data[0],
  )
}

export const unfollowArtist = (id: string, type: string): Promise<string> => {
  const route = SPOTIFY_ROUTE.OWN + SPOTIFY_ROUTE.FOLLOWING
  return spotifyInstance<string[]>(route, Method.DELETE, {
    ids: id,
    type,
  }).then(({ data }) => data[0])
}
