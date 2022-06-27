import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseAlbums } from 'api/parser/album'
import { parseSimpleArtists } from 'api/parser/artist'
import { parseCategories } from 'api/parser/browse'
import { parsePlaylists } from 'api/parser/playlist'
import { parseTracks } from 'api/parser/track'
import { Method, spotifyInstance } from 'api/spotifyInstance'
import { RawCategory, RawRecommendations } from 'api/types/browse'
import { RawAlbum, RawPlaylist } from 'api/types/media'
import { NextURL } from 'types/global'
import {
  Album,
  Category,
  PagedDataList,
  Playlist,
  SimpleArtist,
  Song,
} from 'types/media'
import { getPagedMedia, RawPagedItems } from './base'

export const getRecommendations = (): Promise<Song[]> => {
  const route = SPOTIFY_ROUTE.RECOMMENDATIONS
  return spotifyInstance<RawRecommendations>(route, Method.GET).then(
    ({ data }) => parseTracks(data.tracks),
  )
}

export const getCategories = async (
  next?: NextURL,
): Promise<PagedDataList<Category>> => {
  const route = `${SPOTIFY_ROUTE.CATEGORIES}${next || ''}`
  const { data: response } = await spotifyInstance<{
    categories: RawPagedItems<RawCategory>
  }>(route, Method.GET)
  return {
    entities: parseCategories(response.categories.items),
    next: response.categories.next || null,
    total: response.categories.total,
  }
}

export const getCategoryPlaylists = async (
  categoryId: string,
  next?: NextURL,
): Promise<PagedDataList<Playlist>> => {
  try {
    const route =
      `${SPOTIFY_ROUTE.CATEGORIES}/${categoryId}/${SPOTIFY_ROUTE.PLAYLISTS}` +
      `${next || ''}`
    const { data: response } = await spotifyInstance<{
      playlists: RawPagedItems<RawPlaylist>
    }>(route, Method.GET)
    return {
      entities: parsePlaylists(response.playlists.items),
      next: response.playlists.next || null,
      total: response.playlists.total,
    }
  } catch (error) {
    return {
      entities: [],
      next: null,
      total: 0,
    }
  }
}

export const getNewReleases = async (
  next?: NextURL,
): Promise<PagedDataList<Album>> => {
  const route = `${SPOTIFY_ROUTE.NEW_RELEASES}${next || ''}`
  const { data: response } = await spotifyInstance<{
    albums: RawPagedItems<RawAlbum>
  }>(route, Method.GET)
  return {
    entities: parseAlbums(response.albums.items),
    next: response.albums.next || null,
    total: response.albums.total,
  }
}

export const getTopArtists = async (
  next?: NextURL,
): Promise<PagedDataList<SimpleArtist>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.TOP_ARTISTS}${next || ''}`
  return getPagedMedia(route, parseSimpleArtists, next)
}

export const getTopTracks = async (
  next?: NextURL,
): Promise<PagedDataList<Song>> => {
  const route = `${SPOTIFY_ROUTE.OWN}${SPOTIFY_ROUTE.TOP_TRACKS}${next || ''}`
  return getPagedMedia(route, parseTracks, next)
}

export const getFeaturedPlaylists = async (
  next?: NextURL,
): Promise<PagedDataList<Playlist>> => {
  const route = `${SPOTIFY_ROUTE.FEATURED_PLAYLISTS}${next || ''}`
  const { data: response } = await spotifyInstance<{
    playlists: RawPagedItems<RawPlaylist>
  }>(route, Method.GET)
  return {
    entities: parsePlaylists(response.playlists.items),
    next: response.playlists.next || null,
    total: response.playlists.total,
  }
}
