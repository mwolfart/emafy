import { Album, Song, SimpleArtist } from 'types/media'
import {
  RawAlbum,
  RawTrack,
  RawArtist,
  SavedAlbum,
  SavedTrack,
} from 'types/apiMedia'

const parseImages = (images?: { url: string }[]): Array<string> | undefined =>
  images?.map((item) => item.url)

const parseAlbum = ({
  artists,
  images,
  total_tracks,
  id,
  name,
}: RawAlbum): Album => {
  const imagesLinks = parseImages(images)
  const parsedArtists = artists.map(({ id, name }) => ({ id, name }))

  return {
    name,
    images: imagesLinks,
    id,
    artists: parsedArtists,
    totalTracks: total_tracks,
  }
}

const parseTrack = ({
  artists,
  album,
  id,
  name,
  duration_ms,
}: RawTrack): Song => {
  const imagesLinks = parseImages(album.images)
  const parsedArtists = artists.map(({ id, name }) => ({ id, name }))

  return {
    name,
    images: imagesLinks,
    id,
    artists: parsedArtists,
    albumReference: album.id,
    duration: duration_ms,
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
  }
}

export const parseAlbums = (rawAlbums: Array<RawAlbum>): Array<Album> =>
  rawAlbums.map((item) => parseAlbum(item))

export const parseTracks = (rawTracks: Array<RawTrack>): Array<Song> =>
  rawTracks.map((item) => parseTrack(item))

export const parseSavedAlbums = (
  savedAlbums: Array<SavedAlbum>,
): Array<Album> => savedAlbums.map(({ album }) => parseAlbum(album))

export const parseSavedTracks = (savedTracks: Array<SavedTrack>): Array<Song> =>
  savedTracks.map(({ track }) => parseTrack(track))

export const parseSimpleArtists = (
  items: Array<RawArtist>,
): Array<SimpleArtist> => items.map((rawArtist) => parseSimpleArtist(rawArtist))
