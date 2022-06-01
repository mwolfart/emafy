import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseSavedTracks } from 'api/parser'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/api/apiData'
import { SimpleArtist, Song } from 'types/media'
import { MediaListResponse } from 'types/mediaQuery'
import { getArtistListData, getSpotifyData } from './base'

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
  return spotifyInstance<boolean>(route, Method.GET, {
    ids: artistId,
    type,
  }).then(({ data }) => data)
}
