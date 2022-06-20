import { RawAlbumTrack, RawTrack } from 'api/types/media'
import { Song, MediaType } from 'types/media'
import { parseImages } from './images'

export const parseTrack = (rawTrack: RawTrack | RawAlbumTrack): Song => {
  const { artists, id, name, duration_ms, track_number } = rawTrack
  const imagesLinks =
    'album' in rawTrack ? parseImages(rawTrack.album.images) : undefined
  const albumRef = 'album' in rawTrack ? rawTrack.album.id : undefined
  const parsedArtists = artists.map(({ id, name }) => ({
    id,
    name,
    mediaType: MediaType.artist,
  }))

  return {
    name,
    images: imagesLinks,
    id,
    artists: parsedArtists,
    albumReference: albumRef,
    duration: duration_ms,
    trackNumber: track_number,
    mediaType: MediaType.song,
  }
}

export const parseTracks = (rawTracks: Array<RawTrack>): Array<Song> =>
  rawTracks.map((item) => parseTrack(item))
