import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseSavedTracks } from 'api/parser/saved'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/global'
import { SimpleArtist, Song, PagedDataList } from 'types/media'
import { getArtistListData, getPagedMedia } from './base'

export const getUserFollowedUsers = (
  id: string,
  next?: NextURL,
): Promise<PagedDataList<SimpleArtist>> => {
  const baseLink = '/' + id + '/' + SPOTIFY_ROUTE.FOLLOWING
  const route = next || baseLink
  return getArtistListData(route)
}

export const getUserSavedSongs = (
  id: string,
  next?: NextURL,
): Promise<PagedDataList<Song>> => {
  const route = '/' + id + '/' + SPOTIFY_ROUTE.TRACKS
  return getPagedMedia(route, parseSavedTracks, next)
}

export const checkIfUserFollowsArtist = (
  userId: string,
  artistId: string,
  type: string,
): Promise<boolean> => {
  const route = '/' + userId + '/' + SPOTIFY_ROUTE.FOLLOWING_CHECK
  return spotifyInstance<boolean>(route, Method.GET, {
    params: { ids: artistId, type },
  }).then(({ data }) => data)
}
