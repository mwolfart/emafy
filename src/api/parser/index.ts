import {
  Album,
  Song,
  SimpleArtist,
  MediaType,
  isAlbum,
  User,
  Playlist,
} from 'types/media'
import {
  RawAlbum,
  RawTrack,
  RawArtist,
  SavedAlbum,
  SavedTrack,
  RawAlbumTrack,
  RawUser,
  RawPlaylist,
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

export const parsePlaylist = ({
  id,
  name,
  description,
  followers: { total },
  images,
  owner: { display_name },
  tracks,
}: RawPlaylist): Playlist => {
  const imagesLinks = parseImages(images)
  const parsedTracks = tracks.items.map((track) => parseTrack(track))
  return {
    id,
    images: imagesLinks,
    name,
    description,
    owner: display_name,
    followers: total,
    tracks: parsedTracks,
    mediaType: MediaType.playlist,
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

export const parsePlaylists = (
  rawPlaylists: Array<RawPlaylist>,
): Array<Playlist> => rawPlaylists.map((playlist) => parsePlaylist(playlist))

export const parseSavedAlbums = (
  savedAlbums: Array<SavedAlbum>,
): Array<Album> => savedAlbums.map(({ album }) => parseAlbum(album))

export const parseSavedTracks = (savedTracks: Array<SavedTrack>): Array<Song> =>
  savedTracks.map(({ track }) => parseTrack(track))

export const parseSimpleArtists = (
  items: Array<RawArtist>,
): Array<SimpleArtist> => items.map((rawArtist) => parseSimpleArtist(rawArtist))

export const parseUserData = ({
  country,
  display_name,
  email,
  id,
  images,
  followers,
}: RawUser): User => ({
  id,
  name: display_name,
  email,
  country,
  images: parseImages(images),
  followerCount: followers.total,
})
