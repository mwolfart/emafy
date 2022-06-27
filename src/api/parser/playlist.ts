import { RawPlaylist, RawPlaylistDetails } from 'api/types/media'
import { Playlist, MediaType, DetailedPlaylist } from 'types/media'
import { parseImages } from './images'
import { parseTracks } from './track'

export const parsePlaylist = ({
  id,
  name,
  description,
  images,
  tracks,
  owner: { display_name },
}: RawPlaylist): Playlist => {
  const imagesLinks = parseImages(images)
  return {
    id,
    images: imagesLinks,
    name,
    description,
    owner: display_name,
    totalTracks: tracks.total,
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
  tracks: savedTracks,
  owner: { display_name },
}: RawPlaylistDetails): DetailedPlaylist => {
  const imagesLinks = parseImages(images)
  const trackList = savedTracks.items.map((savedTrack) => savedTrack.track)
  return {
    id,
    images: imagesLinks,
    name,
    description,
    owner: display_name,
    totalTracks: savedTracks.total,
    tracks: parseTracks(trackList),
    mediaType: MediaType.playlist,
  }
}
