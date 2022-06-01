import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseAlbums } from 'api/parser/album'
import { parseSimpleArtist, parseSimpleArtists } from 'api/parser/artist'
import { parseTracks } from 'api/parser/track'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/api/apiData'
import { RawArtist, RawAlbum, RawTrack } from 'types/api/apiMedia'
import { SimpleArtist, Album, Song } from 'types/media'
import { MediaListResponse } from 'types/mediaQuery'
import { getSpotifyData } from './base'

export const getArtist = (id: string): Promise<{ entities: SimpleArtist }> => {
  const route = SPOTIFY_ROUTE.ARTIST.replace(':id', id)
  return spotifyInstance<RawArtist>(route, Method.GET).then(
    ({ data: artist }) => {
      return {
        entities: parseSimpleArtist(artist),
      }
    },
  )
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
  return spotifyInstance<{ tracks: RawTrack[] }>(route, Method.GET, {
    market: 'US',
  }).then(({ data: { tracks } }) => {
    return {
      entities: parseTracks(tracks),
    }
  })
}

export const getArtistRelatedArtists = (
  id: string,
): Promise<{ entities: SimpleArtist[] }> => {
  const route = SPOTIFY_ROUTE.ARTIST_RELATED.replace(':id', id)
  return spotifyInstance<{ artists: RawArtist[] }>(route, Method.GET).then(
    ({ data: { artists } }) => {
      return {
        entities: parseSimpleArtists(artists),
      }
    },
  )
}
