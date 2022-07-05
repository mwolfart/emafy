import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseAlbums } from 'api/parser/album'
import { parseSimpleArtists } from 'api/parser/artist'
import { parseCategories, parsePagedData } from 'api/parser/browse'
import { parsePlaylists } from 'api/parser/playlist'
import { parseTracks } from 'api/parser/track'
import { Method, spotifyInstance } from 'api/spotifyInstance'
import {
  RawCategory,
  RawRecommendations,
  RawSearchResults,
} from 'api/types/browse'
import { RawAlbum, RawPlaylist } from 'api/types/media'
import { extractNextFromNextURL } from 'api/utils'
import { NextURL } from 'types/global'
import {
  Album,
  Category,
  PagedDataList,
  Playlist,
  SearchResults,
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
    next: extractNextFromNextURL(response.categories.next),
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
      next: extractNextFromNextURL(response.playlists.next),
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
    next: extractNextFromNextURL(response.albums.next),
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
    next: extractNextFromNextURL(response.playlists.next),
    total: response.playlists.total,
  }
}

export const searchTerm = async (
  term: string,
  type?: 'track' | 'album' | 'artist' | 'playlist',
  next?: NextURL,
): Promise<SearchResults> => {
  const route = `${SPOTIFY_ROUTE.SEARCH}${next || ''}`
  const params = { q: term, type: type || 'track,album,artist,playlist' }
  const {
    data: { tracks, albums, artists, playlists },
  } = await spotifyInstance<RawSearchResults>(route, Method.GET, { params })

  return {
    tracks: tracks && parsePagedData(parseTracks, tracks),
    albums: albums && parsePagedData(parseAlbums, albums),
    artists: artists && parsePagedData(parseSimpleArtists, artists),
    playlists: playlists && parsePagedData(parsePlaylists, playlists),
  }
}
