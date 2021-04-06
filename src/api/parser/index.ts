import { Album, Song, SimpleArtist, MediaType, isAlbum } from 'types/media'
import {
  RawAlbum,
  RawTrack,
  RawArtist,
  SavedAlbum,
  SavedTrack,
  RawAlbumTrack,
} from 'types/apiMedia'

interface AlbumTrack extends Omit<RawTrack, 'album'> {
  album: Album
}

const parseImages = (images?: { url: string }[]): Array<string> | undefined =>
  images?.map((item) => item.url)

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

const parseTrack = ({
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

export const parseSimpleArtist = ({
  followers: { total },
  genres,
  id,
  images,
  name,
  popularity,
}: RawArtist): SimpleArtist => {
  const imagesLinks = parseImages(images)
  return {
    id,
    images: imagesLinks,
    name,
    genres,
    followers: total,
    popularity,
    mediaType: MediaType.artist,
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

export const parseSavedAlbums = (
  savedAlbums: Array<SavedAlbum>,
): Array<Album> => savedAlbums.map(({ album }) => parseAlbum(album))

export const parseSavedTracks = (savedTracks: Array<SavedTrack>): Array<Song> =>
  savedTracks.map(({ track }) => parseTrack(track))

export const parseSimpleArtists = (
  items: Array<RawArtist>,
): Array<SimpleArtist> => items.map((rawArtist) => parseSimpleArtist(rawArtist))
