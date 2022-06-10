import { RawPlaylist } from 'api/types/media'
import { Playlist, MediaType } from 'types/media'
import { parseImages } from './images'

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
    tracks: [],
    mediaType: MediaType.playlist,
  }
}

export const parsePlaylists = (
  rawPlaylists: Array<RawPlaylist>,
): Array<Playlist> => rawPlaylists.map((playlist) => parsePlaylist(playlist))
