import { SPOTIFY_ROUTE } from 'api/enum/spotifyRoute.enum'
import { parseAlbum, parseAlbumTracks } from 'api/parser/album'
import { spotifyInstance, Method } from 'api/spotifyInstance'
import { NextURL } from 'types/global'
import { RawAlbumTrack, RawAlbum } from 'api/types/media'
import { Album, Song } from 'types/media'
import { MediaListResponse } from 'types/mediaQuery'
import { getSpotifyData } from './base'

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
  return spotifyInstance<RawAlbum>(route, Method.GET).then(
    ({ data: album }) => {
      return {
        entities: parseAlbum(album),
      }
    },
  )
}
