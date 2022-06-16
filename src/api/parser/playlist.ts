import { RawPlaylist, RawPlaylistDetails } from 'api/types/media'
import { Playlist, MediaType, DetailedPlaylist } from 'types/media'
import { parseImages } from './images'
import { parseTracks } from './track'

export const parsePlaylist = ({
  id,
  name,
  description,
  images,
  owner: { display_name },
}: RawPlaylist): Playlist => {
  const imagesLinks = parseImages(images)
  return {
    id,
    images: imagesLinks,
    name,
    description,
    owner: display_name,
    mediaType: MediaType.playlist,
  }
}

export const parsePlaylists = (
  rawPlaylists: Array<RawPlaylist>,
): Array<Playlist> => rawPlaylists.map((playlist) => parsePlaylist(playlist))

export const parseDetailedPlaylist = ({
  id,
  name,
  description,
  images,
  tracks,
  owner: { display_name },
}: RawPlaylistDetails): DetailedPlaylist => {
  const imagesLinks = parseImages(images)
  return {
    id,
    images: imagesLinks,
    name,
    description,
    owner: display_name,
    tracks: parseTracks(tracks.items),
    mediaType: MediaType.playlist,
  }
}
