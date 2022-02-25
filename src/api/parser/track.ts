import { RawTrack } from 'types/api/apiMedia'
import { Song, isAlbum, MediaType, Album } from 'types/media'
import { parseImages } from '.'

interface AlbumTrack extends Omit<RawTrack, 'album'> {
  album: Album
}

export const parseTrack = ({
  artists,
  album,
  id,
  name,
  duration_ms,
  track_number,
}: RawTrack | AlbumTrack): Song => {
  const imagesLinks = isAlbum(album) ? album.images : parseImages(album.images)
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
    albumReference: album.id,
    duration: duration_ms,
    trackNumber: track_number,
    mediaType: MediaType.song,
  }
}

export const parseTracks = (rawTracks: Array<RawTrack>): Array<Song> =>
  rawTracks.map((item) => parseTrack(item))
