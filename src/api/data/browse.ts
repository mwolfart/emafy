import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseCategories } from 'api/parser/browse'
import { parsePlaylists } from 'api/parser/playlist'
import { parseTracks } from 'api/parser/track'
import { Method, spotifyInstance } from 'api/spotifyInstance'
import { RawCategory, RawRecommendations } from 'api/types/browse'
import { RawPlaylist } from 'api/types/media'
import { NextURL } from 'types/global'
import { Category, PagedDataList, Playlist, Song } from 'types/media'
import { RawPagedItems } from './base'

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
