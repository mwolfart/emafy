import { RawAlbum, RawAlbumTrack } from 'types/api/apiMedia'
import { Album, MediaType, Song } from 'types/media'
import { parseImages, parseTrack } from '.'

export const parseAlbum = ({
  artists,
  images,
  total_tracks,
  id,
  name,
}: RawAlbum): Album => {
  const imagesLinks = parseImages(images)
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
    totalTracks: total_tracks,
    mediaType: MediaType.album,
  }
}

export const parseAlbums = (rawAlbums: Array<RawAlbum>): Array<Album> =>
  rawAlbums.map((item) => parseAlbum(item))

export const parseAlbumTracks = (
  rawTracks: Array<RawAlbumTrack>,
  parsedAlbum: Album,
): Array<Song> => {
  return rawTracks.map((track) => parseTrack({ ...track, album: parsedAlbum }))
}
